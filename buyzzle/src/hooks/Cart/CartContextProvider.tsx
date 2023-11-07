import { createContext, useContext, useEffect, useState } from "react";
import { ModelCart, cartControllers } from "../../Controllers/CartControllers";
import { toastSuccess } from "../../Helper/Toast/Success";
import { toastWarn } from "../../Helper/Toast/Warning";
import { CartItem, CartProduct } from "../../Model/CartModel";

export default function useCartContext() {
   const [loading, setLoading] = useState(true);
   const [idProduct, setIdProduct] = useState(0);
   const [productChecked, setProductChecked] = useState<CartItem[]>([]);
   const [carts, setCarts] = useState<CartProduct>({} as CartProduct);
   const addProduct = (productId: number, productQuantities: number) => {
      const data: ModelCart = {
         productId: productId,
         quantity: productQuantities,
      };
      cartControllers
         .addCart(data)
         .then((res) => {
            setCarts(res.data);
            toastSuccess("Thêm thành công");
         })
         .catch((err) => {
            toastWarn(err.response?.data);
         });
   };

   const getCart = () => {
      setLoading(true);
      cartControllers
         .getCart()
         .then((res) => {
            setCarts(res.data);
         })
         .finally(() => setLoading(false));
   };
   useEffect(() => {
      getCart();
   }, []);

   const handleBuyNow = () => {
      if (productChecked.length == 0) {
         toastWarn("Chưa chọn sản phẩm");
      } else {
         sessionStorage.setItem("cartBuyzzle", JSON.stringify(productChecked));
      }
   };

   // asdasd

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
   };
}
type CartContextType = ReturnType<typeof useCartContext>;

export const CartContext = createContext<CartContextType>(
   {} as CartContextType
);

export const useCart = () => useContext(CartContext);
