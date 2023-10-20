import { useState } from "react";
import Buyzzle from "../../../../Assets/TSX/Buyzzle";
import { paymentControllers } from "../../../../Controllers/PaymentControllers";
import { CartItem } from "../../../../Model/CartModel";
import { PaymentMethod } from "./CheckOut";

export interface StripePayment {
   cartItems: CartItem[];
   discount: number;
   isCheckedPayment: PaymentMethod;
}

export default function PaymentBtn(props: StripePayment) {
   const { cartItems, isCheckedPayment, discount } = props;
   const [loading, setLoading] = useState(false);

   const handleCheckout = async () => {
      if (isCheckedPayment == "stripe") {
         setLoading(true);
         setTimeout(async () => {
            await paymentControllers
               .createPayment({
                  cartItems: cartItems,
                  isCheckedPayment: "stripe",
                  discount: discount,
               })
               .then((res) => {
                  if (res.data.url) {
                     window.location.href = res.data.url;
                  }
               })
               .catch((err) => console.log(err.message));
         }, 1000);
      } else if (isCheckedPayment == "cash") {
         setLoading(true);
         setTimeout(async () => {
            window.location.href = "/orderdetail";
         }, 1500);
      }
   };

   const handleLoading = () => {
      if (loading) {
         return (
            <>
               <span className="loading loading-spinner loading-md"></span>
               <p>Đang xử lý...</p>
            </>
         );
      } else {
         return (
            <>
               <Buyzzle />
               <p>Đặt ngay</p>
            </>
         );
      }
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
            {handleLoading()}
         </button>
      </>
   );
}
