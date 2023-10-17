import Buyzzle from "../../../../Assets/TSX/Buyzzle";
import { paymentControllers } from "../../../../Controllers/PaymentControllers";
import { CartItem } from "../../../../Model/CartModel";

type Props = {
   cartItems: CartItem[];
};

export default function PaymentBtn(props: Props) {
   const { cartItems } = props;
   const handleCheckout = () => {
      console.log(cartItems);
      paymentControllers.createPayment(cartItems);
   };

   return (
      <>
         <button
            onClick={() => handleCheckout()}
            className="justify-center gap-3 items-center text-base font-bold text-white w-full
                             rounded-md py-[11px] hover:bg-[#ff6d65] flex mt-6
                                transition duration-150 bg-[#EA4B48] cursor-pointer
                                max-[1105px]:px-[80px] max-lg:px-[60px] max-lg:text-sm max-[850px]:px-[45px] max-[850px]:text-xs"
         >
            <Buyzzle />
            <p>Mua ngay</p>
         </button>
      </>
   );
}
