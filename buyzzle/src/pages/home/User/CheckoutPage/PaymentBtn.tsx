import { useState } from "react";
import Buyzzle from "../../../../Assets/TSX/Buyzzle";
import { paymentControllers } from "../../../../Controllers/PaymentControllers";
import { CartItem } from "../../../../Model/CartModel";

export interface StripePayment {
   userId: number;
   cartItems: CartItem[];
}

export default function PaymentBtn(props: StripePayment) {
   const { cartItems } = props;

   const [loading, setLoading] = useState(false);

   const handleCheckout = async () => {
      setLoading(true);
      setTimeout(async () => {
         await paymentControllers
            .createPayment({
               cartItems: cartItems,
               userId: 1,
            })
            .then((res) => {
               if (res.data.url) {
                  window.location.href = res.data.url;
               }
            })
            .catch((err) => console.log(err.message));
      }, 2000);
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
