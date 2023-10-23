import React, { useContext } from "react";
import { ThemeContext } from "../../../hooks/Context/ThemeContextProvider";
import Shoppingcart from "../../../Assets/TSX/Shopping-cart";
import Ellips from "../../../Assets/TSX/Ellips";
import { useCart } from "../../../hooks/Cart/CartContextProvider";

export default function CartCount() {
  // conText cartQuantity
  const cartContext = useContext(ThemeContext);
  if (!cartContext) {
    // Xử lý trường hợp context không tồn tại
    return null;
  }
  const { cart } = cartContext;
  console.log("🚀 ~ file: Header.tsx:33 ~ Header ~ cart:", cartContext);

  const { carts } = useCart();

  return (
    <div className="items-center flex pr-11 max-[769px]:pr-[10px]">
      <Shoppingcart />
      <div className="absolute">
        <Ellips />
        <span className="text-white font-bold absolute top-[-21px] ml-[30px] text-xs max-xl:text-[9px] max-xl:absolute max-xl:mr-[100px]">
          {carts.item?.length ?? 0}
        </span>
      </div>
    </div>
  );
}
