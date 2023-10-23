import React, {
  ChangeEvent,
  ReactNode,
  createContext,
  useEffect,
  useState,
} from "react";
import { ModelCart, cartControllers } from "../../Controllers/CartControllers";
type ThemeContextType = {
  cart: ModelCart[]; // Giỏ hàng sẽ lưu trữ danh sách sản phẩm (kiểu ModelCarts)
  data: string;
  addToCart: (product: ModelCart) => void; // Thêm sản phẩm vào giỏ hàng
  removeFromCart: (product: ModelCart) => void; // Xóa sản phẩm khỏi giỏ hàng
  onChange: (e: ChangeEvent<HTMLInputElement>) => void; // Cập nhật thông tin dữ liệu khác
};
type ThemeContextProviderProps = {
  children: ReactNode;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);
export default function ThemeContextProvider({
  children,
}: ThemeContextProviderProps) {
  const [cart, setCart] = useState<ModelCart[]>([]); // Ban đầu, giỏ hàng trống
  console.log("🚀 ~ file: ThemeContextProvider.tsx:21 ~ cart1:", cart);

  const [data, setData] = useState("");

  const addToCart = (product: ModelCart) => {
    // setCart([...cart, product]);
    setCart((prev) => [...prev, product]);
  };

  const removeFromCart = (product: ModelCart) => {
    const updatedCart = cart.filter((cartItem) => cartItem.id !== product.id);
    setCart(updatedCart);
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData(e.target.value);
  };

  // useEffect(() => {
  //   cartControllers.getCart().then((res) => console.log(res.data));
  // }, []);

  const key: ThemeContextType = {
    data,
    onChange,
    cart,
    addToCart,
    removeFromCart,
  };
  return (
    <>
      <ThemeContext.Provider value={key}>{children}</ThemeContext.Provider>
    </>
  );
}
