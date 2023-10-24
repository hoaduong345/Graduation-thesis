import { useState } from "react";
import Buyzzle from "../../../../Assets/TSX/Buyzzle";
import { paymentControllers } from "../../../../Controllers/PaymentControllers";
import { CartItem } from "../../../../Model/CartModel";
import { PaymentMethod } from "./CheckOut";
import { OrderItems } from "../../../../Model/OrderModel";
import { orderControllers } from "../../../../Controllers/OrderControllers";

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
         let item: OrderItems[] = [];

         cartItems?.map(async (e) => {
            item.push({
               productId: e.productid,
               name: e.product.name,
               image: e.product.ProductImage[0].url,
               price: e.product.sellingPrice,
               quantity: e.quantity,
               total: e.product.sellingPrice * e.quantity,
            });
         });

         let order = {
            iduser: Number(idUser),
            cartItems: item,
            amount_subtotal: 1,
            shipping: 30000,
            discount: 1,
            amount_total: 1,
         };
         setLoading(true);
         setTimeout(async () => {
            await orderControllers.create(order).then(() => {
               window.location.href = "/orderhistory";
            });
         }, 5000);
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
