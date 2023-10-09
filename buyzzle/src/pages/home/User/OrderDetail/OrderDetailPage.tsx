import { Images } from "../../../../Assets/TS";
import Location from "../../../../Assets/TSX/Location";
import StepperPage from "../../../../Helper/Stepper/StepperPage";
import Container from "../../../../components/container/Container";
import Back from "../../Admin/Assets/TSX/Back";
import Sitebar from "../UserProfile/Sitebar/Sitebar";

export default function OrderDetailPage() {
   return (
      <Container>
         <div className="body-filter container mx-auto">
            <div className="grid grid-cols-4 gap-6">
               <div className="col-span-1 max-2xl:hidden">
                  <Sitebar />
               </div>

               <div className="col-span-3 max-2xl:col-span-5">
                  <div className="back h-[57px] my-[46px] ">
                     <div className="flex gap-3 items-center">
                        <div className="border-[1px] border-[#EA4B48] rounded-md py-4 px-4 max-xl:p-3 max-lg:p-2">
                           <Back />
                        </div>
                        <div>
                           <p className="font-normal text-sm max-xl:text-xs max-lg:text-[10px]">
                              Quay lại danh sách đơn hàng
                           </p>
                           <h2 className="uppercase text-[32px] font-bold max-xl:text-[28px] max-lg:text-xl">
                              Chi tiết đơn hàng
                           </h2>
                        </div>
                     </div>
                  </div>

                  <div className="p-12 shadow border-[#6C6C6C40] rounded-md flex flex-col gap-10 max-lg:p-6">
                     <div className="flex gap-5">
                        <div className="w-[60%] max-lg:w-[55%] border-[#6C6C6C40] border-[1px] rounded-md p-[26px] flex flex-col gap-9">
                           <div className="flex flex-col gap-3">
                              <div className="flex gap-1 items-center">
                                 <Location />
                                 <p className="text-[#EA4B48] font-medium text-sm max-[870px]:text-xs">
                                    Địa chỉ nhận hàng
                                 </p>
                              </div>
                              <div>
                                 <p className="text-sm font-normal text-[#1A1A1A] max-[870px]:text-xs">
                                    <span className="font-bold">
                                       Trần Văn Bảo (+84) 92381882{" "}
                                    </span>{" "}
                                    407 Hoàng Diệu, Phường Thống Nhất, Thành Phố
                                    Buôn Ma Thuột, Đắk Lắk
                                 </p>
                              </div>
                           </div>

                           <div className="flex flex-col gap-3">
                              <div className="flex gap-1 items-center">
                                 <Location />
                                 <p className="text-[#EA4B48] font-medium text-sm max-[870px]:text-xs">
                                    Ghi chú cho người gửi
                                 </p>
                              </div>
                              <div>
                                 <p className="text-sm font-normal text-[#1A1A1A] max-[870px]:text-xs">
                                    Giao vào giờ hành chính từ thứ 2 - 6{" "}
                                 </p>
                              </div>
                           </div>
                        </div>

                        <div className="w-[40%] max-lg:w-[45%] flex flex-col gap-7 p-[20px] border-[#6C6C6C40] border-[1px] rounded-md">
                           <div className="">
                              <div className="flex gap-5 max-xl:gap-3 max-lg:gap-0">
                                 <div>
                                    <p className="text-sm text-[#E0E0E0] max-xl:text-[13px] max-[870px]:text-xs">
                                       ID ĐƠN HÀNG
                                    </p>
                                    <p className="max-xl:text-sm max-[870px]:text-xs">
                                       #A23V
                                    </p>
                                 </div>
                                 <div>
                                    <p className="text-sm text-[#E0E0E0] max-xl:text-[13px] max-[870px]:text-xs">
                                       PHƯƠNG THỨC THANH TOÁN
                                    </p>
                                    <p className="max-xl:text-sm max-[870px]:text-xs">
                                       Thanh toán khi nhận hàng
                                    </p>
                                 </div>
                              </div>
                           </div>

                           <div className="flex justify-between">
                              <p className="text-sm text-[#393939] max-[870px]:text-[11px]">
                                 Tổng Giá Sản Phẩm:{" "}
                              </p>
                              <p className="text-sm text-[#EA4B48] max-[870px]:text-[11px]">
                                 ₫216.000
                              </p>
                           </div>
                           <div className="flex justify-between border-t-[1px] pt-2">
                              <p className="text-sm text-[#393939] max-[870px]:text-[11px]">
                                 Phí vận chuyển:{" "}
                              </p>
                              <div className="flex gap-1">
                                 <p className="text-sm text-[#EA4B48] max-[870px]:text-[11px]">
                                    ₫0
                                 </p>
                                 <p className="text-[#EA4B48]"> - </p>
                                 <p className="text-sm text-[#FFAAAF] line-through max-[870px]:text-[11px]">
                                    ₫15.000
                                 </p>
                              </div>
                           </div>
                           <div className="flex justify-between border-t-[1px] pt-2">
                              <p className="text-sm text-[#393939] max-[870px]:text-[11px]">
                                 Tổng Phí:{" "}
                              </p>
                              <p className="text-xl text-[#EA4B48] font-semibold max-[870px]:text-sm">
                                 ₫231.000
                              </p>
                           </div>
                        </div>
                     </div>
                     <div>
                        <StepperPage />
                     </div>

                     <div className="flex flex-col gap-3">
                        <div className="grid grid-cols-4 px-[26px] py-[10px] bg-[#F2F2F2]">
                           <h4 className="col-span-2 font-normal text-[#1A1A1A] text-sm max-[870px]:text-xs">
                              SẢN PHẨM
                           </h4>
                           <h4 className="col-span-1 font-normal text-[#1A1A1A] text-sm text-center max-[870px]:text-xs">
                              GIÁ
                           </h4>
                           <h4 className="col-span-1 font-normal text-[#1A1A1A] text-sm text-center max-[870px]:text-xs">
                              TỔNG
                           </h4>
                        </div>
                        <div className="grid grid-cols-4 px-[26px] py-[16px] items-center bg-[#FFFFFF] shadow">
                           <div className="col-span-2 text-sm flex gap-4 items-center">
                              <img src={Images.cateAD} alt="" />
                              <div>
                                 <p className="text-base text-[#393939] max-[870px]:text-[13px]">
                                    Máy tính để bàn
                                 </p>
                                 <p className="text-sm text-[#1A1A1A] max-[870px]:text-[13px]">
                                    SL:{" "}
                                    <span className="text-[#4C4C4C]">x2</span>
                                 </p>
                              </div>
                           </div>
                           <div className="col-span-1 flex gap-2 justify-around items-center">
                              <p className="font-medium text-[#7A828A] text-sm line-through max-[870px]:text-[13px]">
                                 ₫56.000
                              </p>
                              <p className="font-medium text-[#1A1A1A] text-base max-[870px]:text-[13px]">
                                 ₫36.000
                              </p>
                           </div>
                           <div className="col-span-1">
                              <p className="font-medium text-[#EA4B48] text-base text-center max-[870px]:text-[13px]">
                                 ₫72.000
                              </p>
                           </div>
                        </div>

                        <div className="grid grid-cols-4 px-[26px] py-[16px] items-center bg-[#FFFFFF] shadow">
                           <div className="col-span-2 text-sm flex gap-4 items-center">
                              <img src={Images.cateAD} alt="" />
                              <div>
                                 <p className="text-base text-[#393939] max-[870px]:text-[13px]">
                                    Máy tính để bàn
                                 </p>
                                 <p className="text-sm text-[#1A1A1A] max-[870px]:text-[13px]">
                                    SL:{" "}
                                    <span className="text-[#4C4C4C]">x2</span>
                                 </p>
                              </div>
                           </div>
                           <div className="col-span-1 flex gap-2 justify-around items-center">
                              <p className="font-medium text-[#7A828A] text-sm line-through max-[870px]:text-[13px]">
                                 ₫56.000
                              </p>
                              <p className="font-medium text-[#1A1A1A] text-base max-[870px]:text-[13px]">
                                 ₫36.000
                              </p>
                           </div>
                           <div className="col-span-1">
                              <p className="font-medium text-[#EA4B48] text-base text-center max-[870px]:text-[13px]">
                                 ₫72.000
                              </p>
                           </div>
                        </div>
                        <div className="grid grid-cols-4 px-[26px] py-[16px] items-center bg-[#FFFFFF] shadow">
                           <div className="col-span-2 text-sm flex gap-4 items-center">
                              <img src={Images.cateAD} alt="" />
                              <div>
                                 <p className="text-base text-[#393939] max-[870px]:text-[13px]">
                                    Máy tính để bàn
                                 </p>
                                 <p className="text-sm text-[#1A1A1A] max-[870px]:text-[13px]">
                                    SL:{" "}
                                    <span className="text-[#4C4C4C]">x2</span>
                                 </p>
                              </div>
                           </div>
                           <div className="col-span-1 flex gap-2 justify-around items-center">
                              <p className="font-medium text-[#7A828A] text-sm line-through max-[870px]:text-[13px]">
                                 ₫56.000
                              </p>
                              <p className="font-medium text-[#1A1A1A] text-base max-[870px]:text-[13px]">
                                 ₫36.000
                              </p>
                           </div>
                           <div className="col-span-1">
                              <p className="font-medium text-[#EA4B48] text-base text-center max-[870px]:text-[13px]">
                                 ₫72.000
                              </p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </Container>
   );
}
