import { useState } from "react";
import { Images } from "../../../../Assets/TS";
import Location from "../../../../Assets/TSX/Location";
import Voucher from "../../../../Assets/TSX/Voucher";
import Container from "../../../../components/container/Container";
import CheckoutSeacrch from "../../Admin/Assets/TSX/CheckoutSeacrch";
import Sitebar from "../UserProfile/Sitebar/Sitebar";
import PinkRight from "../../../../Assets/SVG/LetterPayment/PinkRight";
import BlueRight from "../../../../Assets/SVG/LetterPayment/BlueRight";
import PinkMedium from "../../../../Assets/SVG/LetterPayment/PinkMedium";
import BlueMedium from "../../../../Assets/SVG/LetterPayment/BlueMedium";
import PinkMediumSmall from "../../../../Assets/SVG/LetterPayment/PinkMediumSmall";
import BlueMediumSmall from "../../../../Assets/SVG/LetterPayment/BlueMediumSmall";
import Address from "../../../../Assets/SVG/LetterPayment/Address";

export default function CheckOut() {
   const [chooseMomo, setChooseMoMo] = useState(false);
   const [chooseZalo, setChooseZalo] = useState(false);
   const [chooseCOD, setChooseCOD] = useState(false);

   const openModal = () => {
      const modal = document.getElementById(
         "my_modal_3"
      ) as HTMLDialogElement | null;
      if (modal) {
         modal.showModal();
      }
   };
   const openUpadate = () => {
      const modal = document.getElementById(
         "my_modal_update"
      ) as HTMLDialogElement | null;
      if (modal) {
         modal.showModal();
      }
   };

   return (
      <>
         <Container>
            <div className="body-filter container mx-auto">
               <div className="grid grid-cols-4 gap-6">
                  <div className="col-span-1 max-2xl:hidden">
                     <Sitebar />
                  </div>
                  <div className="mt-9 col-span-3 max-2xl:col-span-5">
                     <h1 className="text-[32px] font-bold mb-4 max-lg:text-[28px] max-[870px]:text-2xl max-[769px]:text-xl">
                        Xác Nhận Thanh Toán
                     </h1>
                     <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-2 flex flex-col gap-2">
                           <div className=" shadow">
                              <div className="flex gap-2">
                                 {[1, 2, 3, 4].map((element) => {
                                    return (
                                       <div
                                          key={element}
                                          className="flex gap-3"
                                       >
                                          <PinkMediumSmall />
                                          <BlueMediumSmall />
                                       </div>
                                    );
                                 })}
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="34"
                                    height="3"
                                    viewBox="0 0 34 3"
                                    fill="none"
                                 >
                                    <path d="M0 0H34V3H3L0 0Z" fill="#FFAAAF" />
                                 </svg>
                              </div>
                              <div className="flex flex-col gap-3 p-[26px]">
                                 <div className="flex justify-between">
                                    <div className="flex gap-1 items-center">
                                       <Location />
                                       <p className="text-[#EA4B48] font-medium text-sm max-[870px]:text-xs">
                                          Địa chỉ nhận hàng
                                       </p>
                                    </div>
                                    <button
                                       onClick={openModal}
                                       className="text-[10px] text-[#5D5FEF] font-semibold max-[870px]:text-[8px]"
                                    >
                                       Thay đổi
                                    </button>
                                 </div>
                                 <div>
                                    <p className="text-sm font-normal text-[#1A1A1A] max-[870px]:text-xs">
                                       <span className="font-bold">
                                          Trần Văn Bảo (+84) 92381882
                                       </span>{" "}
                                       407 Hoàng Diệu, Phường Thống Nhất, Thành
                                       Phố Buôn Ma Thuột, Đắk Lắk
                                    </p>
                                 </div>
                              </div>
                              <div className="flex gap-2">
                                 {[1, 2, 3, 4].map((element) => {
                                    return (
                                       <div
                                          key={element}
                                          className="flex gap-3"
                                       >
                                          <PinkMedium />
                                          <BlueMedium />
                                       </div>
                                    );
                                 })}
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="34"
                                    height="8"
                                    viewBox="0 0 34 8"
                                    fill="none"
                                 >
                                    <path d="M0 0H34V8H3L0 0Z" fill="#FFAAAF" />
                                 </svg>
                              </div>
                           </div>
                           <div>
                              <dialog id="my_modal_3" className="modal">
                                 <div className="modal-box">
                                    <form method="dialog">
                                       <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                          ✕
                                       </button>
                                    </form>
                                    <div className="border-b-[1px] pb-4 mb-4">
                                       <h1 className="text-[#EA4B48] text-sm font-lg font-bold tracking-normal leading-tight max-[870px]:text-xs">
                                          Địa Chỉ Của Tôi
                                       </h1>
                                    </div>

                                    {/* <input id="name" className="max-[870px]:text-xs mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Nhập địa chỉ của bạn" /> */}

                                    <div className="border-b-[1px] pb-4 mb-4 flex gap-1">
                                       <div className="flex items-center mr-4 justify-start ">
                                          <input
                                             type="radio"
                                             name="colored-radio"
                                             id="orange-radio"
                                             className="appearance-none h-5 w-5 border border-[#CCCCCC] rounded-full 
                                                                checked:bg-[#EA4B48] checked:scale-75 transition-all duration-200 peer "
                                          />
                                          <div
                                             className="h-5 w-5 absolute rounded-full pointer-events-none
                                                                peer-checked:border-[#EA4B48] peer-checked:border-2"
                                          />
                                       </div>
                                       <div className="flex flex-col gap-1">
                                          <div className="flex justify-between w-full">
                                             <div className="flex items-center gap-3">
                                                <p className="text-sm font-medium text-[#1A1A1A]">
                                                   Trần Văn Bình
                                                </p>
                                                <p className="text-[10px] text-[#4C4C4C]">
                                                   (+84) 933234442
                                                </p>
                                             </div>
                                             <div className="">
                                                <button
                                                   onClick={openUpadate}
                                                   className="text-[#5D5FEF] text-[10px]"
                                                >
                                                   Cập nhật
                                                </button>
                                             </div>
                                          </div>
                                          <div>
                                             <p className="text-[13px] font-normal text-[#4C4C4C]">
                                                407 Hoàng Diệu, Phường Thống
                                                Nhất, Thành Phố Buôn Ma Thuột,
                                                Đắk Lắk{" "}
                                             </p>
                                          </div>
                                       </div>
                                    </div>

                                    <div className="border-b-[1px] pb-4 mb-4 flex gap-1">
                                       <div className="flex items-center mr-4 justify-start ">
                                          <input
                                             type="radio"
                                             name="colored-radio"
                                             id="orange-radio"
                                             className="appearance-none h-5 w-5 border border-[#CCCCCC] rounded-full 
                                                                checked:bg-[#EA4B48] checked:scale-75 transition-all duration-200 peer "
                                          />
                                          <div
                                             className="h-5 w-5 absolute rounded-full pointer-events-none
                                                                peer-checked:border-[#EA4B48] peer-checked:border-2"
                                          />
                                       </div>
                                       <div className="flex flex-col gap-1">
                                          <div className="flex justify-between w-full">
                                             <div className="flex items-center gap-3">
                                                <p className="text-sm font-medium text-[#1A1A1A]">
                                                   Trần Văn Bình
                                                </p>
                                                <p className="text-[10px] text-[#4C4C4C]">
                                                   (+84) 933234442
                                                </p>
                                             </div>
                                             <div className="">
                                                <button className="text-[#5D5FEF] text-[10px]">
                                                   Cập nhật
                                                </button>
                                             </div>
                                          </div>
                                          <div>
                                             <p className="text-[13px] font-normal text-[#4C4C4C]">
                                                407 Hoàng Diệu, Phường Thống
                                                Nhất, Thành Phố Buôn Ma Thuột,
                                                Đắk Lắk{" "}
                                             </p>
                                          </div>
                                       </div>
                                    </div>

                                    <div className="border-b-[1px] pb-4 mb-4 flex gap-1 items-center justify-center">
                                       <button className="flex gap-1">
                                          <Address />
                                          <p className="text-sm text-[#4C4C4C]">
                                             Thêm địa chỉ mới
                                          </p>
                                       </button>
                                    </div>
                                    <div className="flex justify-end gap-2">
                                       <button className="py-2 px-11 border-[1px] border-[#EA4B48] text-sm text-[#1A1A1A] rounded">
                                          Hủy
                                       </button>
                                       <button className="py-2 px-11 border-[1px] text-sm text-[#FCFCFD] rounded bg-[#EA4B48]">
                                          Xác Nhận
                                       </button>
                                    </div>
                                 </div>
                              </dialog>
                           </div>

                           <div>
                              <dialog id="my_modal_update" className="modal">
                                 <div className="w-[512px] bg-white p-4 relative rounded-md">
                                    <form method="dialog">
                                       <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                          ✕
                                       </button>
                                    </form>
                                    <div className="border-b-[1px] pb-4 mb-4">
                                       <h1 className="text-[#EA4B48] text-sm font-lg font-bold tracking-normal leading-tight max-[870px]:text-xs">
                                          Cập Nhật Địa Chỉ
                                       </h1>
                                    </div>

                                    <div className="flex justify-around gap-5">
                                       <div className=" w-full">
                                          <label className="text-sm text-[#4C4C4C]">
                                             Họ và tên:
                                          </label>
                                          <input
                                             id="name"
                                             className="max-[870px]:text-xs mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-[#FFAAAF] rounded border"
                                             placeholder="Nhập Họ Tên"
                                          />
                                       </div>
                                       <div className=" w-full">
                                          <label className="text-sm text-[#4C4C4C]">
                                             Loại địa chỉ
                                          </label>
                                          <select
                                             id="name"
                                             className="max-[870px]:text-xs mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-[#FFAAAF] rounded border"
                                          >
                                             <option value="">Nhà riêng</option>
                                          </select>
                                       </div>
                                    </div>

                                    <div>
                                       <label className="text-sm text-[#4C4C4C]">
                                          Địa chỉ:
                                       </label>
                                       <select
                                          id="name"
                                          className="max-[870px]:text-xs mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-[#FFAAAF] rounded border"
                                       >
                                          <option value="">
                                             Tỉnh/Thành phố, Quận/Huyện,
                                             Phường/Xã
                                          </option>
                                       </select>
                                    </div>

                                    <div className="flex flex-col border-b-[1px] pb-4 mb-4 gap-2">
                                       <label className="text-sm text-[#4C4C4C]">
                                          Địa chỉ cụ thể:
                                       </label>
                                       <textarea
                                          className="text-xs p-3 border-[#FFAAAF] rounded border"
                                          cols={30}
                                          rows={4}
                                          defaultValue={
                                             "407 Hoàng Diệu, Phường Thống Nhất, Thành Phố Buôn Ma Thuột, Đắk Lắk "
                                          }
                                       />
                                    </div>

                                    <div className="flex justify-end gap-2">
                                       <button className="py-2 px-11 border-[1px] border-[#EA4B48] text-sm text-[#1A1A1A] rounded">
                                          Hủy
                                       </button>
                                       <button className="py-2 px-11 border-[1px] text-sm text-[#FCFCFD] rounded bg-[#EA4B48]">
                                          Xác Nhận
                                       </button>
                                    </div>
                                 </div>
                              </dialog>
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
                                          <span className="text-[#4C4C4C]">
                                             x2
                                          </span>
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
                                          <span className="text-[#4C4C4C]">
                                             x2
                                          </span>
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
                                          <span className="text-[#4C4C4C]">
                                             x2
                                          </span>
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

                        <div className="col-span-1 flex flex-col gap-5 p-[20px] shadow">
                           <div className="flex flex-col gap-1">
                              <h3 className="text-[20px] font-bold max-lg:text-lg max-[870px]:text-base">
                                 Thông tin đơn hàng
                              </h3>
                              <div className="flex gap-2">
                                 <PinkRight />
                                 <BlueRight />
                                 <PinkRight />
                              </div>
                           </div>
                           <div className="flex flex-col gap-2">
                              <p className="text-sm font-medium text-[#1A1A1A] max-[870px]:text-[13px]">
                                 Ghi chú cho (
                                 <span className="text-[#7A828A]">
                                    Người gửi
                                 </span>
                                 ):{" "}
                              </p>
                              <textarea
                                 className="w-full h-28 outline-0 border-[1px] border-[#FFAAAF] rounded-md p-3
                                                    max-lg:text-[10px]"
                                 placeholder="Nhập ghi chú cho người gửi hàng."
                              />
                           </div>
                           <div className="flex gap-3 items-center">
                              <Voucher />
                              <div className="flex w-full items-center border-[#FFAAAF] border-[1px] py-[8px] rounded-md max-lg:py-[4px]">
                                 <input
                                    className="outline-none w-full pl-3"
                                    type="text"
                                    placeholder="Nhập mã giảm giá"
                                 />
                                 <div className="mx-3">
                                    <CheckoutSeacrch />
                                 </div>
                              </div>
                           </div>
                           <div className="flex flex-col gap-[18px]">
                              <div className="flex justify-between">
                                 <p className="text-sm text-[#393939] max-[870px]:text-[11px]">
                                    Tổng Giá Sản Phẩm:{" "}
                                 </p>
                                 <p className="text-sm text-[#EA4B48] max-[870px]:text-[11px]">
                                    ₫216.000
                                 </p>
                              </div>
                              <div className="flex justify-between">
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
                              <div className="flex justify-between">
                                 <p className="text-sm text-[#393939] max-[870px]:text-[11px]">
                                    Tổng Phí:{" "}
                                 </p>
                                 <p className="text-xl text-[#EA4B48] max-[870px]:text-sm">
                                    ₫231.000
                                 </p>
                              </div>
                           </div>
                           <div className="flex flex-col gap-4">
                              <h4 className="text-base text-[#4C4C4C] font-bold max-[870px]:text-[13px]">
                                 Phương Thức Thanh Toán
                              </h4>
                              <div className="flex flex-col gap-[10px]">
                                 <div className="flex gap-3 items-center">
                                    <input
                                       className="max-lg:w-[10px]"
                                       name="choose"
                                       type="radio"
                                       onChange={() =>
                                          setChooseMoMo(!chooseMomo)
                                       }
                                       checked={chooseMomo}
                                    />
                                    <div className="w-6">
                                       <img
                                          className="w-full h-full object-contain"
                                          src={Images.momo}
                                          alt=""
                                       />
                                    </div>
                                    <p
                                       className={`max-lg:text-[10px] ${
                                          chooseMomo
                                             ? "text-[#393939]"
                                             : "text-[#9c9c9c]"
                                       }`}
                                    >
                                       Thanh toán bằng ví Momo
                                    </p>
                                 </div>
                                 <div className="flex gap-3 items-center">
                                    <input
                                       className="max-lg:w-[10px]"
                                       name="choose"
                                       type="radio"
                                       onChange={() =>
                                          setChooseZalo(!chooseZalo)
                                       }
                                       checked={chooseZalo}
                                    />
                                    <div className="w-6">
                                       <img
                                          className="w-full h-full object-contain"
                                          src={Images.zalo}
                                          alt=""
                                       />
                                    </div>
                                    <p
                                       className={`max-lg:text-[10px] ${
                                          chooseZalo
                                             ? "text-[#393939]"
                                             : "text-[#9c9c9c]"
                                       }`}
                                    >
                                       Thanh toán bằng ví ZaloPay
                                    </p>
                                 </div>
                                 <div className="flex gap-3 items-center">
                                    <input
                                       className="max-lg:w-[10px]"
                                       name="choose"
                                       type="radio"
                                       onChange={() => setChooseCOD(!chooseCOD)}
                                       checked={chooseCOD}
                                    />
                                    <div className="w-6">
                                       <img
                                          className="w-full h-full object-contain"
                                          src={Images.nhanHang}
                                          alt=""
                                       />
                                    </div>
                                    <p
                                       className={`max-lg:text-[10px] ${
                                          chooseCOD
                                             ? "text-[#393939]"
                                             : "text-[#9c9c9c]"
                                       }`}
                                    >
                                       Thanh toán Khi Nhận Hàng
                                    </p>
                                 </div>
                              </div>
                           </div>
                           <div className="">
                              <button
                                 className="text-base text-[#FCFCFD] font-bold bg-[#7879F1] px-[100px] py-[11px] rounded-md w-full
                                                    max-[1105px]:px-[80px] max-lg:px-[60px] max-lg:text-sm max-[850px]:px-[45px] max-[850px]:text-xs"
                              >
                                 Đặt Hàng
                              </button>
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
