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
import DialogAddress from "../../../../Helper/Dialog/DialogAddress";
import Address from "../../../../Assets/SVG/LetterPayment/Address";
import { Controller, useForm } from "react-hook-form";
import Buyzzle from "../../../../Assets/TSX/Buyzzle";

type FormValues = {
   name: string;
   address: string;
   typeAddress: string;
   currentAddress: string;
   phone: number;
};

const userInfo: FormValues[] = [
   {
      name: "Trần Văn Bình",
      address: "Phường Thống Nhất, Thành Phố Buôn Ma Thuột, Đắk Lắk",
      currentAddress: "407 Hoàng Diệu",
      typeAddress: "Công ty",
      phone: 933234442,
   },
   {
      name: "Nguyễn Trọng Nhâm",
      address: "Phường Tân An, Thành Phố Buôn Ma Thuột, Đắk Lắk",
      currentAddress: "12 Nguyễn Chí Thanh",
      typeAddress: "Nhà riêng",
      phone: 383404215,
   },
];

export default function CheckOut() {
   const idModal = "checkout";
   const idModalUpdate = "my_modal_update";

   const [chooseMomo, setChooseMoMo] = useState(false);
   const [chooseZalo, setChooseZalo] = useState(false);
   const [chooseCOD, setChooseCOD] = useState(false);

   const {
      control,
      handleSubmit,
      clearErrors,
      reset,
      formState: { errors },
   } = useForm<FormValues>({
      mode: "all",
      defaultValues: {
         address: "",
         currentAddress: "",
         typeAddress: "",
         name: "",
      },
   });

   const openModal = (id: string) => {
      const modal = document.getElementById(id) as HTMLDialogElement | null;
      if (modal) {
         modal.showModal();
      }
   };
   const closeModal = async (id: string) => {
      const modal = document.getElementById(id) as HTMLDialogElement | null;
      if (modal) {
         clearErrors();
         setNull();
         modal.close();
      }
   };
   const saveModal = (data: FormValues) => {
      console.log(data);
   };
   const openUpadate = (id: string, i: number) => {
      const modal = document.getElementById(id) as HTMLDialogElement | null;
      if (modal) {
         reset({
            address: userInfo[i].address,
            name: userInfo[i].name,
            typeAddress: userInfo[i].typeAddress,
            currentAddress: userInfo[i].currentAddress,
         });
         modal.showModal();
      }
   };

   const setNull = () => {
      reset({});
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
                                       onClick={() => openModal(idModal)}
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
                              <DialogAddress
                                 id={idModal}
                                 title="Địa Chỉ Của Tôi"
                                 onClose={() => closeModal(idModal)}
                                 onSave={() => saveModal({} as FormValues)}
                                 body={
                                    <>
                                       {userInfo.map((e, i) => {
                                          return (
                                             <>
                                                <div className="border-b-[1px] pb-4 mb-4 flex gap-1">
                                                   <div className="flex items-center mr-4 justify-start ">
                                                      <input
                                                         checked
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
                                                               {e.name}
                                                            </p>
                                                            <p className="text-[10px] text-[#4C4C4C]">
                                                               (+84) {e.phone}
                                                            </p>
                                                         </div>
                                                         <div className="">
                                                            <button
                                                               onClick={() =>
                                                                  openUpadate(
                                                                     idModalUpdate,
                                                                     i
                                                                  )
                                                               }
                                                               className="text-[#5D5FEF] text-[10px]"
                                                            >
                                                               Cập nhật
                                                            </button>
                                                         </div>
                                                      </div>
                                                      <div>
                                                         <p className="text-[13px] font-normal text-[#4C4C4C]">
                                                            {e.currentAddress}
                                                            <span> </span>
                                                            {e.address}
                                                         </p>
                                                      </div>
                                                   </div>
                                                </div>
                                             </>
                                          );
                                       })}

                                       <div className="border-b-[1px] pb-4 mb-4 flex gap-1 items-center justify-center">
                                          <button
                                             onClick={() =>
                                                openUpadate(idModalUpdate, NaN)
                                             }
                                             className="flex gap-1"
                                          >
                                             <Address />
                                             <p className="text-sm text-[#4C4C4C]">
                                                Thêm địa chỉ mới
                                             </p>
                                          </button>
                                       </div>
                                    </>
                                 }
                              />
                           </div>

                           <div>
                              <DialogAddress
                                 id={idModalUpdate}
                                 title="Cập Nhật Địa Chỉ"
                                 onClose={() => closeModal(idModalUpdate)}
                                 onSave={handleSubmit((data: any) => {
                                    saveModal(data);
                                 })}
                                 body={
                                    <>
                                       <div className="flex flex-col gap-2">
                                          <div className="flex justify-around gap-5">
                                             <div className=" w-full">
                                                <Controller
                                                   control={control}
                                                   name="name"
                                                   rules={{
                                                      required: {
                                                         value: true,
                                                         message:
                                                            "Không để trống",
                                                      },
                                                      minLength: {
                                                         value: 4,
                                                         message:
                                                            "Ít nhất 4 ký tự",
                                                      },
                                                      maxLength: {
                                                         value: 25,
                                                         message:
                                                            "Nhiều nhất 25 ký tự",
                                                      },
                                                   }}
                                                   render={({ field }) => (
                                                      <>
                                                         <label className="text-sm text-[#4C4C4C]">
                                                            Họ và tên:
                                                         </label>
                                                         <input
                                                            id="name"
                                                            className="max-[870px]:text-xs mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-[#FFAAAF] rounded border"
                                                            placeholder="Nhập Họ Tên"
                                                            value={field.value}
                                                            onChange={(e) => {
                                                               const reg =
                                                                  /[!@#$%^&*]/;
                                                               const value =
                                                                  e.target
                                                                     .value;
                                                               field.onChange(
                                                                  value.replace(
                                                                     reg,
                                                                     ""
                                                                  )
                                                               );
                                                            }}
                                                         />
                                                         {errors.name && (
                                                            <p className="text-red-600 text-xs my-2">
                                                               {
                                                                  errors.name
                                                                     .message
                                                               }
                                                            </p>
                                                         )}
                                                      </>
                                                   )}
                                                />
                                             </div>
                                             <div className=" w-full">
                                                <Controller
                                                   name="typeAddress"
                                                   control={control}
                                                   rules={{
                                                      required: {
                                                         value: true,
                                                         message:
                                                            "Vui lòng chọn",
                                                      },
                                                   }}
                                                   render={({ field }) => (
                                                      <>
                                                         <label className="text-sm text-[#4C4C4C]">
                                                            Loại địa chỉ
                                                         </label>
                                                         <select
                                                            id="name"
                                                            className="max-[870px]:text-xs mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-[#FFAAAF] rounded border"
                                                            value={field.value}
                                                            onChange={(e) => {
                                                               const value =
                                                                  e.target
                                                                     .value;
                                                               const reg = /[]/;
                                                               field.onChange(
                                                                  value.replace(
                                                                     reg,
                                                                     ""
                                                                  )
                                                               );
                                                            }}
                                                         >
                                                            <option value="">
                                                               -- Chọn loại địa
                                                               chỉ --
                                                            </option>
                                                            <option>
                                                               Nhà riêng
                                                            </option>
                                                            <option>
                                                               Công ty
                                                            </option>
                                                         </select>
                                                         {errors.typeAddress && (
                                                            <p className="text-red-600 text-xs my-2">
                                                               {
                                                                  errors
                                                                     .typeAddress
                                                                     .message
                                                               }
                                                            </p>
                                                         )}
                                                      </>
                                                   )}
                                                />
                                             </div>
                                          </div>

                                          <div>
                                             <Controller
                                                name="address"
                                                control={control}
                                                rules={{
                                                   required: {
                                                      value: true,
                                                      message: "Vui lòng chọn",
                                                   },
                                                }}
                                                render={({ field }) => (
                                                   <>
                                                      <label className="text-sm text-[#4C4C4C]">
                                                         Địa chỉ:
                                                      </label>
                                                      <select
                                                         id="name"
                                                         className="max-[870px]:text-xs mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-[#FFAAAF] rounded border"
                                                         value={field.value}
                                                         onChange={(e) => {
                                                            const value =
                                                               e.target.value;
                                                            const reg = /[]/;
                                                            field.onChange(
                                                               value.replace(
                                                                  reg,
                                                                  ""
                                                               )
                                                            );
                                                         }}
                                                      >
                                                         <option value="">
                                                            -- Tỉnh/Thành phố,
                                                            Quận/Huyện,
                                                            Phường/Xã --
                                                         </option>
                                                         <option>
                                                            Phường Thống Nhất,
                                                            Thành Phố Buôn Ma
                                                            Thuột, Đắk Lắk
                                                         </option>
                                                         <option>
                                                            Phường Tân An, Thành
                                                            Phố Buôn Ma Thuột,
                                                            Đắk Lắk
                                                         </option>
                                                      </select>
                                                      {errors.address && (
                                                         <p className="text-red-600 text-xs my-2">
                                                            {
                                                               errors.address
                                                                  .message
                                                            }
                                                         </p>
                                                      )}
                                                   </>
                                                )}
                                             />
                                          </div>

                                          <div className="flex flex-col border-b-[1px] pb-4 mb-4 gap-2">
                                             <Controller
                                                name="currentAddress"
                                                control={control}
                                                rules={{
                                                   required: {
                                                      value: true,
                                                      message: "Không để trống",
                                                   },
                                                   minLength: {
                                                      value: 4,
                                                      message:
                                                         "Ít nhất 4 ký tự",
                                                   },
                                                   maxLength: {
                                                      value: 200,
                                                      message:
                                                         "Nhiều nhất 200 ký tự",
                                                   },
                                                }}
                                                render={({ field }) => (
                                                   <>
                                                      <label className="text-sm text-[#4C4C4C]">
                                                         Địa chỉ cụ thể:
                                                      </label>
                                                      <textarea
                                                         className="text-xs p-3 border-[#FFAAAF] rounded border"
                                                         cols={30}
                                                         rows={4}
                                                         value={field.value}
                                                         onChange={(e) => {
                                                            const value =
                                                               e.target.value;
                                                            const reg =
                                                               /[!@#$%^&*]/;
                                                            field.onChange(
                                                               value.replace(
                                                                  reg,
                                                                  ""
                                                               )
                                                            );
                                                         }}
                                                         defaultValue={
                                                            "407 Hoàng Diệu, Phường Thống Nhất, Thành Phố Buôn Ma Thuột, Đắk Lắk "
                                                         }
                                                      />
                                                      {errors.currentAddress && (
                                                         <p className="text-red-600 text-xs my-2">
                                                            {
                                                               errors
                                                                  .currentAddress
                                                                  .message
                                                            }
                                                         </p>
                                                      )}
                                                   </>
                                                )}
                                             />
                                          </div>
                                       </div>
                                    </>
                                 }
                              />
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
                           <button
                              className="justify-center gap-3 items-center text-base font-bold text-white w-full
                             rounded-md py-[11px] hover:bg-[#ff6d65] flex mt-6
                                transition duration-150 bg-[#EA4B48] cursor-pointer
                                max-[1105px]:px-[80px] max-lg:px-[60px] max-lg:text-sm max-[850px]:px-[45px] max-[850px]:text-xs"
                           >
                              <Buyzzle />
                              <p>Mua ngay</p>
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </Container>
      </>
   );
}
