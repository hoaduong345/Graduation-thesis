import { useState } from "react";
import Buyzzle from "../../../../Assets/TSX/Buyzzle";
import { paymentControllers } from "../../../../Controllers/PaymentControllers";
import { CartItem } from "../../../../Model/CartModel";
import { PaymentMethod } from "./CheckOut";
import axios from "axios";

export interface StripePayment {
   cartItems: CartItem[];
   discount: number;
   method: PaymentMethod;
   idUser: number;
}

export default function PaymentBtn(props: StripePayment) {
   const { cartItems, method, discount, idUser } = props;
   const [loading, setLoading] = useState(false);

   const handleCheckout = async () => {
      if (method == "stripe") {
         setLoading(true);
         setTimeout(async () => {
            await paymentControllers
               .createPayment({
                  cartItems: cartItems,
                  method: "stripe",
                  discount: discount,
                  idUser: Number(idUser),
               })
               .then((res) => {
                  if (res.data.url) {
                     window.location.href = res.data.url;
                  }
               })
               .catch((err) => console.log(err.message));
         }, 1000);
      } else if (method == "cash") {
         setLoading(true);
         await axios
            .post(
               "http://localhost:5000/buyzzle/order",
               {
                  cartItems: cartItems,
               },
               {
                  headers: {
                     "Access-Control-Allow-Origin": "*",
                  },
                  withCredentials: true,
               }
            )
            .then(() => {
               window.location.href = "/orderdetail";
            })
            .finally(() => {
               setLoading(false);
            });
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
