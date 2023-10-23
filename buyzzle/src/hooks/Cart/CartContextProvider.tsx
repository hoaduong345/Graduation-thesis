import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ModelCart, cartControllers } from "../../Controllers/CartControllers";
import { CartItem, CartModel, CartProduct } from "../../Model/CartModel";

export default function useCartContext() {
  const [loading, setLoading] = useState(true);
  const [idProduct, setIdProduct] = useState(0);
  const [productChecked, setProductChecked] = useState<CartItem[]>([]);
  const [cart, setCart] = useState<CartModel>({} as CartModel);
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
        setTimeout(() => setLoading(false), 2000);
      })
      .finally(() => {
        toast.success("Thêm thành công");
      });
  };

  const getCart = () => {
    setLoading(true);
    cartControllers
      .getCart()
      .then((res) => setCarts(res.data))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    getCart();
  }, []);

  const buynow = () => {
    if (productChecked.length == 0) {
      toast.warn("Chưa chọn sản phẩm");
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

  return {
    carts,
    setCarts,
    addProduct,
    loading,
    setLoading,
    getCart,
    setIdProduct,
    idProduct,
    cart,
    productChecked,
    setProductChecked,
    buynow,
    setCart,
    openModal,
    closeModal,
  };
}
type CartContextType = ReturnType<typeof useCartContext>;

export const CartContext = createContext<CartContextType>(
  {} as CartContextType
);

export const useCart = () => useContext(CartContext);
