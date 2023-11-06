import { useState } from "react";
import Buyzzle from "../../../../Assets/TSX/Buyzzle";
import { paymentControllers } from "../../../../Controllers/PaymentControllers";
import { CartItem } from "../../../../Model/CartModel";
import { PaymentMethod } from "./CheckOut";
import { OrderItems } from "../../../../Model/OrderModel";
import { orderControllers } from "../../../../Controllers/OrderControllers";
import { cartControllers } from "../../../../Controllers/CartControllers";
import { toast } from "react-toastify";
import { VoucherModel } from "../../../../Model/VoucherModel";
import { voucherControllers } from "../../../../Controllers/VoucherControllers";

export interface StripePayment {
   cartItems: CartItem[];
   voucher: VoucherModel;
   method: PaymentMethod;
   idUser: number;
   note: string;
   invoice: boolean;
   name: string;
   address: string;
   phoneNumber: number;
}

export default function PaymentBtn(props: StripePayment) {
   const {
      cartItems,
      method,
      voucher,
      idUser,
      note,
      invoice,
      address,
      name,
      phoneNumber,
   } = props;
   const [loading, setLoading] = useState(false);

   const handleCheckout = async () => {
      if (address != null) {
         if (cartItems.length > 0) {
            if (method == "stripe") {
               setLoading(true);
               setTimeout(async () => {
                  await paymentControllers
                     .createPayment({
                        cartItems: cartItems,
                        method: method,
                        discount: voucher.discount,
                        idUser: Number(idUser),
                        note: note,
                        invoice: invoice,
                        name: name,
                        address: address,
                        phoneNumber: phoneNumber,
                     })
                     .then((res) => {
                        if (res.data.url) {
                           window.location.href = res.data.url;
                        }
                     })
                     .then(() => sessionStorage.removeItem("cartBuyzzle"))
                     .catch((err) => console.log(err.message));
               }, 100);
            } else if (method == "cash") {
               let item: OrderItems[] = [];
               let subtotal = 0;

               cartItems?.map(async (e) => {
                  subtotal += e.product.sellingPrice * e.quantity;
                  item.push({
                     productId: e.product.id,
                     name: e.product.name,
                     image: e.product.ProductImage[0].url,
                     price: e.product.sellingPrice,
                     quantity: e.quantity,
                     total: e.product.sellingPrice * e.quantity,
                  });
               });

               let order = {
                  iduser: Number(idUser),
                  method: "Thanh toán khi nhận hàng",
                  cartItems: item,
                  amount_subtotal: subtotal,
                  shipping: 30000,
                  discount: subtotal * (voucher.discount / 100),
                  amount_total:
                     subtotal - subtotal * (voucher.discount / 100) + 30000,
                  note: note,
                  invoice: invoice,
                  name: name,
                  address: address,
                  phoneNumber: phoneNumber,
               };
               setLoading(true);
               setTimeout(async () => {
                  await orderControllers
                     .create(order)
                     .then(() => {
                        window.location.href = "/orderhistory";
                        sessionStorage.removeItem("cartBuyzzle");
                     })
                     .then(() => {
                        order.cartItems.map((e) => {
                           cartControllers.removeItemCart(e.productId);
                        });
                     })
                     .then(() => {
                        voucherControllers.useVoucher(
                           Number(idUser),
                           voucher.id
                        );
                     });
               }, 3000);
            }
         } else {
            toast.warning("Chưa có sản phẩm");
         }
      } else {
         toast.warn("Chưa có Địa chỉ giao hàng");
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
                             rounded-md py-[11px] hover:bg-[#ff6d65] flex mt-1
                                transition duration-150 bg-[#EA4B48] cursor-pointer
                                max-[1105px]:px-[80px] max-lg:px-[60px] max-lg:text-sm max-[850px]:px-[45px] max-[850px]:text-xs"
         >
            {handleLoading()}
         </button>
      </>
   );
}
