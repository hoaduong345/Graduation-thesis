import Ellips from "../../../Assets/TSX/Ellips";
import Shoppingcart from "../../../Assets/TSX/Shopping-cart";
import LoadingAddCart from "../../../Helper/Loading/loadingAddCart";
import { useCart } from "../../../hooks/Cart/CartContextProvider";

export default function CartCount() {
  const { carts, loading } = useCart();
  return (
    <div>
      {
        <div>
          {loading ? (
            <LoadingAddCart />
          ) : (
            // Hiển thị nội dung khi loading đã kết thúc
            <div className="items-center flex pr-11 max-[769px]:pr-[10px]">
              <Shoppingcart />
              <div className="absolute">
                <Ellips />
                <span className="text-white font-bold absolute top-[-21px] ml-[30px] text-xs max-xl:text-[9px] max-xl:absolute max-xl:mr-[100px]">
                  {carts.item?.length ?? 0}
                </span>
              </div>
            </div>
          )}
        </div>
      }
    </div>
  );
}
