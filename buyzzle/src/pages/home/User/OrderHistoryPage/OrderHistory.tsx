import { IonIcon } from "@ionic/react";
import { Accordion, AccordionBody } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import ArrowNextHistory from "../../../../Assets/TSX/ArrowNextHistory";
// import QuantityHistory from "../../../../Assets/TSX/QuantityHistory";
import Container from "../../../../components/container/Container";
import ArrowDown from "../../Admin/Assets/TSX/ArrowDown";
import Sitebar from "../UserProfile/Sitebar/Sitebar";
import { orderControllers } from "../../../../Controllers/OrderControllers";
import { OrderModel } from "../../../../Model/OrderModel";
import { currentDate, numberFormat } from "../../../../Helper/Format";
import { Link } from "react-router-dom";
import EmptyPage from "../../../../Helper/Empty/EmptyPage";
export default function OrderHistory() {
   const [order, setOrder] = useState<OrderModel[]>([]);

   const [open, setOpen] = useState<number>();

   const handleOpen = (value: number) => setOpen(open === value ? 0 : value);
   //  const [arrowAction, setArrowAction] = useState(false);
   const openModal = () => {
      const modal = document.getElementById(
         "my_modal_3"
      ) as HTMLDialogElement | null;
      if (modal) {
         modal.showModal();
      }
   };
   const closeModal = () => {
      const modal = document.getElementById(
         "my_modal_3"
      ) as HTMLDialogElement | null;
      if (modal) {
         modal.close();
      }
   };

   useEffect(() => {
      getOrder();
   }, []);

   const getOrder = async () => {
      await orderControllers.get().then((res) => {
         setOrder(res.data);
      });
   };
   return (
      <Container>
         <div
            className="float-right cursor-pointer max-[1920px]:invisible max-2xl:visible"
            onClick={() => openModal()}
         >
            <IonIcon className="text-[2rem]" name={"menu"}></IonIcon>
         </div>
         <div className="grid grid-cols-4 gap-4">
            <div className={`col-span-1 `}>
               {/* You can open the modal using document.getElementById('ID').showModal() method */}
               <dialog id="my_modal_3" className="max-2xl:modal ">
                  <div className="relative">
                     <button
                        className="btn btn-sm btn-circle btn-ghost absolute right-1 top-10"
                        onClick={closeModal}
                     >
                        <IonIcon
                           className="text-[1rem]"
                           name={"close"}
                        ></IonIcon>
                     </button>
                     <Sitebar />
                  </div>
               </dialog>
               <div className="max-2xl:hidden">
                  <Sitebar />
               </div>
            </div>
            {/* Table history order */}
            <div className="flex-col mt-9 col-span-3 max-2xl:col-span-5">
               <h1 className="text-[32px] font-bold mb-4 max-lg:text-[28px] max-[870px]:text-2xl max-[769px]:text-xl">
                  Danh Sách Đơn Hàng
               </h1>
               <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 ">
                  <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8 max-lg:text-xs">
                     <div className=" ">
                        <div className=" w-full text-center text-sm max-lg:text-[11px]  z-20 ">
                           <div className="border-b w-full bg-[#FFEAE9] font-medium dark:text-[#4C4C4C]">
                              <div className=" justify-around w-full flex ">
                                 <div className=" py-4 max-2xl:text-left ">
                                    #ID ĐƠN HÀNG
                                 </div>
                                 <div className=" py-4">NGÀY TẠO ĐƠN</div>
                                 <div className=" py-4">TỔNG PHÍ</div>
                                 <div className=" py-4">TRẠNG THÁI</div>
                                 <div className=" py-4"></div>
                              </div>
                           </div>
                        </div>

                        {order.length > 0 ? (
                           order.map((e) => {
                              return (
                                 <>
                                    <Accordion open={open === e.id}>
                                       <div
                                          className="w-full bg-black"
                                          onClick={() => handleOpen(e.id)}
                                       >
                                          <div className="text-sm bg-black ">
                                             <div className="border-b dark:border-neutral-500 bg-white px-4">
                                                <div className="cursor-pointer flex items-center py-4 w-full justify-start">
                                                   <div className="w-[5%]">
                                                      {open === e.id ? (
                                                         <ArrowDown />
                                                      ) : (
                                                         <ArrowNextHistory />
                                                      )}
                                                   </div>
                                                   <div className="w-[24%]">
                                                      #ID: 000{e.id}
                                                   </div>
                                                   <div className="w-[20%]">
                                                      {currentDate(e.createdAt)}
                                                   </div>
                                                   <div className="w-[22%] text-center">
                                                      {numberFormat(e.subtotal)}{" "}
                                                      ({e.OrderDetail.length}{" "}
                                                      SP)
                                                   </div>
                                                   <div className="w-[16%] text-center">
                                                      {/* {e.status} */}
                                                      Dang giao hang
                                                   </div>
                                                   <Link
                                                      to={`/orderdetail/${e.id}`}
                                                      className="text-[#EA4B48] hover:text-[#ea4b48ad] text-center w-[13%]"
                                                   >
                                                      Xem chi tiết
                                                   </Link>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                       <AccordionBody>
                                          <table className="w-full">
                                             <thead className="border-b bg-[#F2F2F2] dark:text-[#4C4C4C]">
                                                <tr>
                                                   <th className=" px-[50px] py-2 w-[50%] text-left font-normal">
                                                      Thông tin sản phẩm
                                                   </th>
                                                   <th className=" px-6 py-2 w-[14%] font-normal">
                                                      Giá
                                                   </th>
                                                   <th className=" px-6 py-2 w-[14%] font-normal max-lg:px-4 max-lg:py-2">
                                                      Số lượng
                                                   </th>
                                                   <th className=" px-6 py-2 w-[14%] font-normal">
                                                      Tổng
                                                   </th>
                                                   <th className=" px-6 py-2 w-[14%] font-normal">
                                                      <Link
                                                         to={`/invoice/${e.id}`}
                                                         className="text-[#EA4B48]"
                                                      >
                                                         Invoice
                                                      </Link>
                                                   </th>
                                                </tr>
                                             </thead>
                                             <tbody>
                                                {e.OrderDetail.map(
                                                   (element) => {
                                                      return (
                                                         <>
                                                            <tr className="border-b dark:border-[#E0E0E0] text-center">
                                                               <td className="flex items-center pl-[50px] py-4 text-left gap-3">
                                                                  <img
                                                                     src={
                                                                        element.image
                                                                     }
                                                                     className="w-[50px] h-[50px] 
                                                   max-lg:h-[35px]  max-lg:w-[35px]
                                                   "
                                                                     alt="imgProduct"
                                                                  />
                                                                  {/* <QuantityHistory />
                                                               <p className="text-[#4C4C4C] text-base font-medium max-lg:text-sm">
                                                                  +2
                                                               </p> */}
                                                                  <p className="text-[#4C4C4C] text-base font-medium max-lg:text-sm">
                                                                     {
                                                                        element.name
                                                                     }
                                                                  </p>
                                                               </td>
                                                               <td className="whitespace-nowrap  px-6 py-4">
                                                                  {numberFormat(
                                                                     element.price
                                                                  )}
                                                               </td>
                                                               <td className="whitespace-nowrap  px-6 py-4">
                                                                  x
                                                                  {
                                                                     element.quantity
                                                                  }
                                                               </td>
                                                               <td className="whitespace-nowrap  px-6 py-4">
                                                                  {numberFormat(
                                                                     element.total
                                                                  )}
                                                               </td>
                                                            </tr>
                                                         </>
                                                      );
                                                   }
                                                )}
                                             </tbody>
                                          </table>
                                       </AccordionBody>
                                    </Accordion>
                                 </>
                              );
                           })
                        ) : (
                           <EmptyPage
                              title="Chưa có đơn hàng"
                              button="Mua ngay"
                           />
                        )}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </Container>
   );
}
