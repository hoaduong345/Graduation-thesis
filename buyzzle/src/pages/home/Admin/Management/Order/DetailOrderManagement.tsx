import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Orderbuyzzle from "../../../../../Assets/TSX/Orderbuyzzle";
import { orderControllers } from "../../../../../Controllers/OrderControllers";
import { OrderModel } from "../../../../../Model/OrderModel";
import Container from "../../../../../components/container/Container";
import SitebarAdmin from "../../Sitebar/Sitebar";
import PrintOrder from "../../Assets/TSX/PrintOrder";
import { formatDateYYYY } from "../../../../../Helper/Format";
import { Images } from "../../../../../Assets/TS";
import TimelineStepper from "../../../../../Helper/Stepper/TimelineStepper";

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
                                 #000{order.id}
                              </span>
                           </h2>
                        </div>
                        <div className="flex flex-col gap-[4px] items-center">
                           <p className="py-[1px] px-5 border-[1px] rounded-[10px] bg-[#00B207] text-xs text-white font-bold">
                              Nhận thanh toán
                           </p>
                           <p className="text-[#4C4C4C] text-sm">
                              {formatDateYYYY(order.createdAt)}
                           </p>
                        </div>
                     </div>
                     <div className="flex gap-2 items-center">
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

                                 <div className="grid grid-cols-4 pl-2 py-[16px] items-center bg-[#FFFFFF]">
                                    <div className="col-span-2 text-sm flex gap-4 items-center">
                                       <img
                                          className="w-[70px] h-[70px] object-contain"
                                          src={Images.imageproduct}
                                          alt=""
                                       />
                                       <div>
                                          <p className="text-base font-medium text-[#393939] max-[870px]:text-[13px]">
                                             Sản phẩ, xiij jj
                                          </p>
                                          <p className="text-sm text-[#1A1A1A] font-medium max-[870px]:text-[13px]">
                                             SL:{" "}
                                             <span className="text-[#4C4C4C]">
                                                x2
                                             </span>
                                          </p>
                                       </div>
                                    </div>
                                    <div className="col-span-1 flex gap-1 justify-around items-center">
                                       <p className="font-medium text-[#7A828A] text-sm line-through max-[870px]:text-[13px]">
                                          10.000đ
                                       </p>
                                       <p className="font-medium text-[#1A1A1A] text-base max-[870px]:text-[13px]">
                                          10.000đ
                                       </p>
                                    </div>
                                    <div className="col-span-1">
                                       <p className="font-medium text-[#EA4B48] text-base text-center max-[870px]:text-[13px]">
                                          10.000đ
                                       </p>
                                    </div>
                                 </div>

                              </div>
                              <div className="flex justify-end mt-6 px-4">
                                 <div className="w-[270px] flex flex-col gap-3">
                                    <div className="flex justify-between">
                                       <p className="text-sm font-medium text-[#393939] max-[870px]:text-[11px]">
                                          Tổng Giá Sản Phẩm:{" "}
                                       </p>
                                       <p className="text-sm text-[#EA4B48] max-[870px]:text-[11px]">
                                          {/* {numberFormat(orderDetails.subtotal)} */}
                                          10.000đ
                                       </p>
                                    </div>
                                    <div className="flex justify-between border-t-[1px] pt-2">
                                       <p className="text-sm font-medium text-[#393939] max-[870px]:text-[11px]">
                                          Giảm:{" "}
                                       </p>
                                       <div className="flex gap-1">
                                          <p className="text-sm text-[#FFAAAF] line-through max-[870px]:text-[11px]">
                                             {/* {numberFormat(orderDetails.discount)} */}
                                             10.000đ
                                          </p>
                                       </div>
                                    </div>
                                    <div className="flex justify-between border-t-[1px] pt-2">
                                       <p className="text-sm font-medium text-[#393939] max-[870px]:text-[11px]">
                                          Phí Giao Hàng:{" "}
                                       </p>
                                       <div className="flex gap-1">
                                          <p className="text-sm text-[#EA4B48] max-[870px]:text-[11px]">
                                             {/* {numberFormat(orderDetails.shipping)} */}
                                             30.000đ
                                          </p>
                                       </div>
                                    </div>
                                    <div className="flex justify-between items-center border-t-[1px] pt-2">
                                       <p className="text-sm font-medium text-[#393939] max-[870px]:text-[11px]">
                                          Tổng Thanh Toán:{" "}
                                       </p>
                                       <p className="text-xl text-[#EA4B48] font-semibold max-[870px]:text-sm">
                                          {/* {numberFormat(orderDetails.amountTotal)} */}
                                          10.000đ
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
                        <div className="flex flex-col gap-5 py-8 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
                           <div className="px-5 text-xl font-semibold text-[#393939]">
                              <p>Thông Tin User</p>
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
