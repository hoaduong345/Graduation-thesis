import { createContext, useContext, useEffect, useState } from "react";
import { ModelCart, cartControllers } from "../../Controllers/CartControllers";
import { toastSuccess } from "../../Helper/Toast/Success";
import { toastWarn } from "../../Helper/Toast/Warning";
import { CartItem, CartProduct } from "../../Model/CartModel";
import { orderControllers } from "../../Controllers/OrderControllers";
import { UpdateQuantityModal } from "../../Model/OrderModel";
import { useNavigate } from 'react-router-dom';

export default function useCartContext() {
   const [loading, setLoading] = useState(true);
   const [idProduct, setIdProduct] = useState(0);
   const [warning, setWarning] = useState<string>('')
   const [productChecked, setProductChecked] = useState<CartItem[]>([]);
   const [carts, setCarts] = useState<CartProduct>({} as CartProduct);
   let listProductQuantity: UpdateQuantityModal[] = [];
   const navigate = useNavigate();

   const addProduct = (productId: number, productQuantities: number, type: boolean) => {
      const data: ModelCart = {
         productId: productId,
         quantity: productQuantities,
      };
      cartControllers
         .addCart(data)
         .then((_) => {
            getCart()

            if (productChecked.length > 0) {
               const indexProduct = productChecked.findIndex(
                  (item) => item.productid === data.productId
               );
               const _productChecked = [...productChecked];
               _productChecked[indexProduct].quantity += productQuantities;
               setProductChecked(_productChecked);
            }

            if (type) {
               navigate('/cart');
            }

            toastSuccess("Thêm thành công");
         })
         .catch((err) => {
            setWarning(err.response?.data);
            openModal('idWarningQuantity')
         });
   };

   const getCart = async () => {
      setLoading(true);
      await cartControllers
         .getCart()
         .then((res) => {
            setCarts(res.data);
            return res.data
         }).then((data) => {
            data.item.map((e) => {
               if (e.quantity > e.product.quantity) {
                  listProductQuantity.push({
                     productId: e.id!,
                     quantity: e.product.quantity,
                  })
               }

            })
         })
         .then(() => {
            updateQuantityCart()
         })
         .finally(() => setLoading(false));
   };

   const updateQuantityCart = async () => {
      if (listProductQuantity.length > 0) {
         await orderControllers.updateQuantityCart(listProductQuantity);
         await cartControllers.getCart()
            .then((res) => {
               setCarts(res.data);
            });
      }
   }
   useEffect(() => {
      getCart();
   }, []);

   const handleBuyNow = async () => {

      if (productChecked.length == 0) {
         toastWarn("Chưa chọn sản phẩm");
      } else {
         await getCart();
         sessionStorage.setItem("cartBuyzzle", JSON.stringify(productChecked));
         navigate('/checkout')
      }
   };

   // open - close modal
   const openModal = (id: string) => {
      const modal = document.getElementById(id) as HTMLDialogElement | null;
      if (modal) {
         modal.showModal();
      }
   };

   const closeModal = (id: string) => {
      const modal = document.getElementById(id) as HTMLDialogElement | null;
      if (modal) {
         modal.close();
      }
   };
   const idItemCart = "confirmCart";
   const idAllCart = "confirmAllCart";
   const removeItemCart = (id: number) => {
      cartControllers.removeItemCart(idProduct).then(() => {
         getCart();
         closeModal(idItemCart);
         const _productChecked = [...productChecked];
         const Product = _productChecked.filter(
            (item) => item.productid !== id
         );
         setProductChecked(Product);
      });
   };
   const removeAllCart = () => {
      cartControllers.removeAllCart().then(() => {
         getCart();
         setProductChecked([]);
         closeModal(idAllCart);
      });
   };
   return {
      carts,
      setCarts,
      addProduct,
      loading,
      setLoading,
      getCart,
      setIdProduct,
      idProduct,
      productChecked,
      setProductChecked,
      handleBuyNow,
      openModal,
      closeModal,
      removeItemCart,
      removeAllCart,
      idItemCart,
      idAllCart,
      warning,
   };
}
type CartContextType = ReturnType<typeof useCartContext>;

export const CartContext = createContext<CartContextType>(
   {} as CartContextType
);

export const useCart = () => useContext(CartContext);
