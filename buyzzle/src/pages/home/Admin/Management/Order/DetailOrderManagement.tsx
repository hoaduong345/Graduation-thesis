import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Images } from "../../../../../Assets/TS";
import Map from "../../../../../Assets/TSX/Map";
import NoteOrderAdmin from "../../../../../Assets/TSX/NoteOrderAdmin";
import Orderbuyzzle from "../../../../../Assets/TSX/Orderbuyzzle";
import { orderControllers } from "../../../../../Controllers/OrderControllers";
import { formatDateYYYY, numberFormat } from "../../../../../Helper/Format";
import TimelineStepper from "../../../../../Helper/Stepper/TimelineStepper";
import { OrderModel } from "../../../../../Model/OrderModel";
import Container from "../../../../../components/container/Container";
import MessageOrderAdmin from "../../Assets/TSX/MessageOrderAdmin";
import Paymethod from "../../Assets/TSX/Paymethod";
import PhoneOrderAdmin from "../../Assets/TSX/PhoneOrderAdmin";
import PrintOrder from "../../Assets/TSX/PrintOrder";
import SitebarAdmin from "../../Sitebar/Sitebar";

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
                  <div className="flex justify-between">
                     <div className="flex gap-5 items-center text-center">
                        <div className="content-center items-center">
                           <h2 className="txt-filter font-bold text-[#4C4C4C] text-3xl max-2xl:text-2xl">
                              ĐƠN HÀNG{" "}
                              <span className="text-[#1A1A1A]">
                                 #00{order.id}
                              </span>
                           </h2>
                        </div>
                        <div className="flex flex-col gap-[4px] items-center">
                           <p className="py-[1px] px-5 border-[1px] rounded-[10px] bg-[#00B207] text-xs text-white font-bold">
                              {order.paymentMethod == "Thẻ tín dụng"
                                 ? "Đã thanh toán"
                                 : "Chưa thanh toán"}
                           </p>
                           <p className="text-[#4C4C4C] text-sm">
                              {formatDateYYYY(order.createdAt)}
                           </p>
                        </div>
                     </div>
                     <div className="flex gap-2 items-center">
                        {order.invoice == "true" ? (
                           <>
                              <Link to={`/admin/invoice/${order.id}`}>
                                 <button
                                    className="justify-center gap-3 items-center text-sm font-bold text-[#4C4C4C] hover:bg-[#E0E0E0] hover:text-[#4C4C4C]
                                 rounded-md py-2 px-3 flex
                                 transition duration-150 cursor-pointer border-[#E0E0E0] border-[1px]
                                 max-[1105px]:px-[80px] max-lg:px-[60px] max-lg:text-sm max-[850px]:px-[45px] max-[850px]:text-xs"
                                 >
                                    <PrintOrder />
                                    <p>Hóa đơn</p>
                                 </button>
                              </Link>
                           </>
                        ) : (
                           <></>
                        )}

                        <button
                           className="justify-center gap-2 items-center text-sm font-bold text-white
                             rounded-md py-[8px] px-3 flex
                                transition duration-150 bg-[#00B207] cursor-pointer
                                max-[1105px]:px-[80px] max-lg:px-[60px] max-lg:text-sm max-[850px]:px-[45px] max-[850px]:text-xs"
                        >
                           <p>Xác nhận</p>
                           <Orderbuyzzle />
                        </button>

                        <button
                           className="justify-center gap-3 items-center text-sm font-bold text-white
                             rounded-md py-[8px] px-[27.9px] flex
                                transition duration-150 bg-[#EA4B48] cursor-pointer
                                max-[1105px]:px-[80px] max-lg:px-[60px] max-lg:text-sm max-[850px]:px-[45px] max-[850px]:text-xs"
                        >
                           <p>Hủy đơn</p>
                        </button>
                     </div>
                  </div>

                  <div className="grid grid-cols-4 gap-3 mt-[34px] ">
                     <div className="col-span-3 flex flex-col gap-8">
                        <div className="flex flex-col gap-5 py-8 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
                           <div className="px-5 text-xl font-semibold text-[#393939]">
                              <p>Chi Tiết Đơn Hàng</p>
                           </div>
                           <div className="flex flex-col gap-3">
                              <div className="bg-[#F2F2F2]">
                                 <div className="grid grid-cols-4 py-[10px] px-4">
                                    <h4 className="col-span-1 text-center font-normal text-[#1A1A1A] text-sm max-[870px]:text-xs">
                                       SẢN PHẨM
                                    </h4>
                                    <div className="col-span-1"> </div>
                                    <h4 className="col-span-1 font-normal text-[#1A1A1A] text-sm text-center max-[870px]:text-xs">
                                       GIÁ
                                    </h4>
                                    <h4 className="col-span-1 items-center font-normal text-[#1A1A1A] text-sm text-center max-[870px]:text-xs">
                                       TỔNG
                                    </h4>
                                 </div>
                              </div>

                              <div className="border-b-[1px] mx-4">
                                 {order?.OrderDetail?.map((e) => {
                                    return (
                                       <>
                                          <div className="grid grid-cols-4 pl-2 py-[16px] items-center bg-[#FFFFFF]">
                                             <div className="col-span-2 text-sm flex gap-4 items-center">
                                                <img
                                                   className="w-[70px] h-[70px] object-contain"
                                                   src={e.image}
                                                   alt=""
                                                />
                                                <div>
                                                   <p className="text-base font-medium text-[#393939] max-[870px]:text-[13px]">
                                                      {e.name}
                                                   </p>
                                                   <p className="text-sm text-[#1A1A1A] font-medium max-[870px]:text-[13px]">
                                                      SL:{" "}
                                                      <span className="text-[#4C4C4C]">
                                                         x{e.quantity}
                                                      </span>
                                                   </p>
                                                </div>
                                             </div>
                                             <div className="col-span-1 flex justify-center items-center">
                                                <p className="font-medium text-[#1A1A1A] text-base max-[870px]:text-[13px]">
                                                   {numberFormat(e.price)}
                                                </p>
                                             </div>
                                             <div className="col-span-1">
                                                <p className="font-medium text-[#EA4B48] text-base text-center max-[870px]:text-[13px]">
                                                   {numberFormat(e.total)}
                                                </p>
                                             </div>
                                          </div>
                                       </>
                                    );
                                 })}
                              </div>
                              <div className="flex justify-end mt-6 px-16">
                                 <div className="w-[270px] flex flex-col gap-3">
                                    <div className="flex justify-between">
                                       <p className="text-sm font-medium text-[#393939] max-[870px]:text-[11px]">
                                          Tổng Giá Sản Phẩm:{" "}
                                       </p>
                                       <p className="text-sm text-[#EA4B48] max-[870px]:text-[11px]">
                                          {numberFormat(order.subtotal)}
                                       </p>
                                    </div>
                                    <div className="flex justify-between border-t-[1px] pt-2">
                                       <p className="text-sm font-medium text-[#393939] max-[870px]:text-[11px]">
                                          Giảm:{" "}
                                       </p>
                                       <div className="flex gap-1">
                                          <p className="text-sm text-[#FFAAAF] line-through max-[870px]:text-[11px]">
                                             {numberFormat(order.discount)}
                                          </p>
                                       </div>
                                    </div>
                                    <div className="flex justify-between border-t-[1px] pt-2">
                                       <p className="text-sm font-medium text-[#393939] max-[870px]:text-[11px]">
                                          Phí Giao Hàng:{" "}
                                       </p>
                                       <div className="flex gap-1">
                                          <p className="text-sm text-[#EA4B48] max-[870px]:text-[11px]">
                                             {numberFormat(order.shipping)}
                                          </p>
                                       </div>
                                    </div>
                                    <div className="flex justify-between items-center border-t-[1px] pt-2">
                                       <p className="text-sm font-medium text-[#393939] max-[870px]:text-[11px]">
                                          Tổng Thanh Toán:{" "}
                                       </p>
                                       <p className="text-xl text-[#EA4B48] font-semibold max-[870px]:text-sm">
                                          {numberFormat(order.amountTotal)}
                                       </p>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="py-8 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
                           <div className="px-5 text-xl font-semibold text-[#393939] pb-3 border-b-[1px]">
                              <p>Trạng Thái Đơn Hàng</p>
                           </div>
                           <div className="px-11 pt-4">
                              <TimelineStepper />
                           </div>
                        </div>
                     </div>

                     <div className="col-span-1">
                        <div className="flex flex-col gap-5 px-5 py-8 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
                           <div className="text-xl font-semibold text-[#393939]">
                              <p>Thông Tin User</p>
                           </div>

                           <div className="flex justify-between mb-8">
                              <div className="flex gap-1">
                                 <img
                                    className="w-[40px] h-[40px] object-cover rounded-full border-4"
                                    src={Images.avatar_admin}
                                    alt=""
                                 />

                                 <div>
                                    <p className="text-sm">
                                       {order?.name?.length > 0
                                          ? order?.name.substring(0, 11)
                                          : ""}{" "}
                                    </p>

                                    <p className="text-[#12b004] text-[10px]">
                                       {order?.name?.length
                                          ? order?.address.substring(0, 11)
                                          : ""}{" "}
                                    </p>
                                 </div>
                              </div>

                              <div className="flex flex-col gap-3">
                                 <div className="flex justify-end items-centers">
                                    <button
                                       className="text-white text-center text-xs font-bold
                 bg-[#EA4B48] hover:bg-[#ff6d65] mt-2
                 rounded-md transition duration-150 cursor-pointer
                 flex items-center px-2 py-1"
                                    >
                                       <p className="w-full">Chat</p>
                                       <MessageOrderAdmin />
                                    </button>
                                 </div>
                                 <div className=" flex gap-1 items-center text-[10px] text-red-700">
                                    Đang hoạt động
                                 </div>
                              </div>
                           </div>

                           <div className="flex flex-col gap-5 mb-10">
                              <p className="text-xl font-semibold text-[#393939]">
                                 Địa Chỉ Nhận Hàng
                              </p>

                              <div className="flex flex-col gap-6">
                                 <div className="flex flex-col gap-1">
                                    <div className="flex gap-2 items-center text-[#4C4C4C] font-medium text-sm">
                                       <PhoneOrderAdmin />
                                       <p>Phone</p>
                                    </div>
                                    <p className="pl-2 border-l-[1px] border-[#FFAAAF] font-semibold text-[#5D5FEF] text-sm">
                                       {order?.phoneNumber}
                                    </p>
                                 </div>

                                 <div className="flex flex-col gap-1">
                                    <div className="flex gap-2 items-center text-[#4C4C4C] font-medium text-sm">
                                       <Map />
                                       <p>Địa Chỉ</p>
                                    </div>
                                    <div className="pl-2 border-l-[1px] border-[#FFAAAF] font-semibold">
                                       <p className="text-[#1A1A1A] text-sm">
                                          {order?.name}
                                       </p>
                                       <p className="text-[#4C4C4C] text-sm">
                                          {order?.address}
                                       </p>
                                    </div>
                                 </div>

                                 <div className="flex flex-col gap-1">
                                    <div className="flex gap-2 items-center text-[#4C4C4C] font-medium text-sm">
                                       <NoteOrderAdmin />
                                       <p>Ghi chú</p>
                                    </div>
                                    <div className="pl-2 border-l-[1px] border-[#FFAAAF] font-semibold">
                                       {order?.note == "" ||
                                       order?.note == null ? (
                                          <p className="text-[#1A1A1A] text-sm">
                                             Không có
                                          </p>
                                       ) : (
                                          <p className="text-[#1A1A1A] text-sm">
                                             {order?.note}
                                          </p>
                                       )}
                                    </div>
                                 </div>
                              </div>
                           </div>

                           <div className="flex flex-col gap-5">
                              <p className="text-xl font-semibold text-[#393939]">
                                 Thanh Toán
                              </p>

                              <div className="flex flex-col gap-6">
                                 <div className="flex flex-col gap-1">
                                    <div className="flex gap-2 items-center text-[#4C4C4C] font-medium text-sm">
                                       <Paymethod />
                                       <p>Phương thức thanh toán</p>
                                    </div>
                                    <p className="pl-2 border-l-[1px] border-[#FFAAAF] font-semibold text-[#5D5FEF] text-sm">
                                       {order?.paymentMethod}
                                    </p>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </Container>
      </>
   );
}
