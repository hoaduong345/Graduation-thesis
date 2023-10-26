import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Orderbuyzzle from "../../../../../Assets/TSX/Orderbuyzzle";
import { orderControllers } from "../../../../../Controllers/OrderControllers";
import { OrderModel } from "../../../../../Model/OrderModel";
import Container from "../../../../../components/container/Container";
import SitebarAdmin from "../../Sitebar/Sitebar";
import PrintOrder from "../../Assets/TSX/PrintOrder";
import { formatDateYYYY } from "../../../../../Helper/Format";

export default function DetailOrderManagement() {
   const { id } = useParams();
   const idOrder = Number(id);

   const [order, setOrder] = useState<OrderModel>({} as OrderModel);

   const getOrder = async () => {
      await orderControllers.getDetails(idOrder).then((res) => {
         setOrder(res);
      });
   };

   useEffect(() => {
      getOrder();
   }, []);

   return (
      <>
         <Container>
            <div className="grid grid-cols-5">
               <div className={`col-span-1`}>
                  <div className="max-2xl:hidden">
                     <SitebarAdmin />
                  </div>
               </div>
               <div className="content-right-filter mt-[34px] col-span-4 max-2xl:col-span-5 ">
                  <div className="flex justify-between items-center">
                     <div className="flex gap-8 items-center">
                        <h2 className="txt-filter font-bold text-[#4C4C4C] text-3xl max-2xl:text-2xl">
                           ĐƠN HÀNG{" "}
                           <span className="text-[#1A1A1A]">
                              #000{order.id}
                           </span>
                        </h2>
                        <div className="flex flex-col gap-1 items-center">
                           <p className="py-1 px-5">Nhận thanh toán</p>
                           <p className="text-[#4C4C4C]">
                              {formatDateYYYY(order.createdAt)}
                           </p>
                        </div>
                     </div>
                     <div className="flex gap-2">
                        <button
                           className="justify-center gap-3 items-center text-sm font-bold text-[#4C4C4C]
                             rounded-md py-[8px] px-3 flex
                                transition duration-150 cursor-pointer border-[#E0E0E0] border-[1px]
                                max-[1105px]:px-[80px] max-lg:px-[60px] max-lg:text-sm max-[850px]:px-[45px] max-[850px]:text-xs"
                        >
                           <PrintOrder />
                           <p>Print</p>
                        </button>

                        <button
                           className="justify-center gap-3 items-center text-sm font-bold text-white
                             rounded-md py-[8px] px-3 flex
                                transition duration-150 bg-[#00B207] cursor-pointer
                                max-[1105px]:px-[80px] max-lg:px-[60px] max-lg:text-sm max-[850px]:px-[45px] max-[850px]:text-xs"
                        >
                           <p>Xác nhận</p>
                           <Orderbuyzzle />
                        </button>

                        <button
                           className="justify-center gap-3 items-center text-sm font-bold text-white
                             rounded-md py-[8px] px-[29.5px] flex
                                transition duration-150 bg-[#EA4B48] cursor-pointer
                                max-[1105px]:px-[80px] max-lg:px-[60px] max-lg:text-sm max-[850px]:px-[45px] max-[850px]:text-xs"
                        >
                           <p>Hủy đơn</p>
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </Container>
      </>
   );
}
