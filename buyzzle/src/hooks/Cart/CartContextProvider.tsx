import React, { createContext, useContext, useEffect, useState } from "react";
import { CartItem, CartModel, CartProduct } from "../../Model/CartModel";
import { ModelCart, cartControllers } from "../../Controllers/CartControllers";
import { toast } from "react-toastify";

export default function useCartContext() {
  const [loading, setLoading] = useState(true);
  const [idProduct, setIdProduct] = useState(0);

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
  const removeItemCart = (id: number) => {
    cartControllers.removeItemCart(idProduct).then(() => {
      getCart();
      // closeModal(idItemCart);
      // const _productChecked = [...productChecked];
      // const Product = _productChecked.filter((item) => item.productid !== id);
      // setProductChecked(Product);
    });
  };
  return {
    carts,
    setCarts,
    addProduct,
    loading,
    setLoading,
    getCart,
    removeItemCart,
    setIdProduct,
    idProduct,
  };
}
type CartContextType = ReturnType<typeof useCartContext>;

export const CartContext = createContext<CartContextType>(
  {} as CartContextType
);

export const useCart = () => useContext(CartContext);
