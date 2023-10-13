import { useEffect, useState } from "react";
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
import { CartItem } from "../../../../Model/CartModel";
import { numberFormat } from "../../../../Helper";
import { userController } from "../../../../Controllers/UserController";

type FormValues = {
   name: string;
   address: string;
   typeAddress: string;
   currentAddress: string;
   phonenumber: number;
};

interface User {
   username: string;
}

export default function CheckOut() {
   const idModal = "checkout";
   const idModalUpdate = "my_modal_update";

   const [user, setUser] = useState<FormValues>({} as FormValues);
   const [payment, setPayment] = useState([
      {
         id: 1,
         icon: Images.momo,
         title: "Thanh toán bằng ví Momo",
         color: "#9c9c9c",
      },
      {
         id: 2,
         icon: Images.zalo,
         title: "Thanh toán bằng ví Zalopay",
         color: "#9c9c9c",
      },
      {
         id: 3,
         icon: Images.nhanHang,
         title: "Thanh toán khi nhận hàng",
         color: "#9c9c9c",
      },
   ]);

   const localCart = sessionStorage.getItem("cartBuyzzle");
   const listLocalCart: CartItem[] =
      localCart == null ? [] : JSON.parse(localCart);

   const localUsername = localStorage.getItem("user");
   const userLocal: User =
      localUsername == null ? "" : JSON.parse(localUsername);
   useEffect(() => {
      getUser();
   }, []);

   const getUser = async () => {
      await userController
         .getUserWhereUsername(userLocal.username)
         .then((res) => {
            setUser(res);
         });
   };

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
   const openUpadate = (id: string) => {
      const modal = document.getElementById(id) as HTMLDialogElement | null;
      if (modal) {
         reset({
            address: "",
            name: user.name,
            typeAddress: "",
            currentAddress: "",
         });
         modal.showModal();
      }
   };

   const setNull = () => {
      reset({});
   };

   const calculatePrice = () => {
      let totalCart = 0;
      let sale = 0;
      for (let i = 0; i < listLocalCart.length; i++) {
         const element = listLocalCart[i];
         totalCart += element.quantity * element.product.sellingPrice;
         sale +=
            element.quantity *
            (element.product.price - element.product.sellingPrice);
      }

      return {
         sale,
         totalCart,
      };
   };

   const paymentChecked = (id: number) => {
      const updatedItems = payment.map((item) => {
         if (item.id === id) {
            return { ...item, color: "#393939" };
         } else {
            return { ...item, color: "#9c9c9c" };
         }
         return item;
      });

      setPayment(updatedItems);
   };

   return (
      <>
         <Container>
            {/* <div role="status">
               <svg
                  aria-hidden="true"
                  className="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <path
                     d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                     fill="currentColor"
                  />
                  <path
                     d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                     fill="currentFill"
                  />
               </svg>
               <span className="sr-only">Loading...</span>
            </div> */}
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
                                          {user.name} {user.phonenumber}
                                       </span>{" "}
                                       12 Nguyễn Chí Thanh Phường Tân An, Thành
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
                                                      {user.name}
                                                   </p>
                                                   <p className="text-[10px] text-[#4C4C4C]">
                                                      (+84) {user.phonenumber}
                                                   </p>
                                                </div>
                                                <div className="">
                                                   <button
                                                      onClick={() =>
                                                         openUpadate(
                                                            idModalUpdate
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
                                                   12 Nguyễn Chí Thanh Phường
                                                   Tân An, Thành Phố Buôn Ma
                                                   Thuột, Đắk Lắk
                                                </p>
                                             </div>
                                          </div>
                                       </div>

                                       <div className="border-b-[1px] pb-4 mb-4 flex gap-1 items-center justify-center">
                                          <button
                                             onClick={() =>
                                                openUpadate(idModalUpdate)
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
                              {listLocalCart.map((e) => {
                                 return (
                                    <>
                                       <div className="grid grid-cols-4 px-[26px] py-[16px] items-center bg-[#FFFFFF] shadow">
                                          <div className="col-span-2 text-sm flex gap-4 items-center">
                                             <img
                                                className="w-[70px] h-[70px] object-contain"
                                                src={
                                                   e.product.ProductImage[0].url
                                                }
                                                alt=""
                                             />
                                             <div>
                                                <p className="text-base text-[#393939] max-[870px]:text-[13px]">
                                                   {e.product.name}
                                                </p>
                                                <p className="text-sm text-[#1A1A1A] max-[870px]:text-[13px]">
                                                   SL:{" "}
                                                   <span className="text-[#4C4C4C]">
                                                      x{e.quantity}
                                                   </span>
                                                </p>
                                             </div>
                                          </div>
                                          <div className="col-span-1 flex gap-2 justify-around items-center">
                                             <p className="font-medium text-[#7A828A] text-sm line-through max-[870px]:text-[13px]">
                                                {numberFormat(e.product.price)}
                                             </p>
                                             <p className="font-medium text-[#1A1A1A] text-base max-[870px]:text-[13px]">
                                                {numberFormat(
                                                   e.product.sellingPrice
                                                )}
                                             </p>
                                          </div>
                                          <div className="col-span-1">
                                             <p className="font-medium text-[#EA4B48] text-base text-center max-[870px]:text-[13px]">
                                                {numberFormat(
                                                   e.quantity *
                                                      e.product.sellingPrice
                                                )}
                                             </p>
                                          </div>
                                       </div>
                                    </>
                                 );
                              })}
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
                                 <p className="text-base text-[#EA4B48] max-[870px]:text-[11px]">
                                    {numberFormat(calculatePrice().totalCart)}
                                 </p>
                              </div>
                              <div className="flex justify-between">
                                 <p className="text-sm text-[#393939] max-[870px]:text-[11px]">
                                    Phí vận chuyển:{" "}
                                 </p>
                                 <div className="flex gap-1">
                                    <p className="text-sm text-[#EA4B48] max-[870px]:text-[11px]">
                                       {numberFormat(0)}
                                    </p>
                                    <p className="text-[#EA4B48]"> - </p>
                                    <p className="text-sm text-[#FFAAAF] line-through max-[870px]:text-[11px]">
                                       {numberFormat(49000)}
                                    </p>
                                 </div>
                              </div>
                              <div className="flex justify-between">
                                 <p className="text-sm text-[#393939] max-[870px]:text-[11px]">
                                    Tổng Thanh Toán:{" "}
                                 </p>
                                 <p className="text-xl text-[#EA4B48] max-[870px]:text-sm">
                                    {numberFormat(calculatePrice().totalCart)}
                                 </p>
                              </div>
                           </div>
                           <div className="flex flex-col gap-4">
                              <h4 className="text-base text-[#4C4C4C] font-bold max-[870px]:text-[13px]">
                                 Phương Thức Thanh Toán
                              </h4>
                              <div className="flex flex-col gap-[10px]">
                                 {payment.map((element) => {
                                    return (
                                       <>
                                          <div
                                             key={element.id}
                                             className="flex gap-3 items-center"
                                          >
                                             <input
                                                className="max-lg:w-[10px]"
                                                name="choose"
                                                type="radio"
                                                onChange={() =>
                                                   paymentChecked(element.id)
                                                }
                                             />
                                             <div className="w-6">
                                                <img
                                                   className="w-full h-full object-contain"
                                                   src={element.icon}
                                                   alt=""
                                                />
                                             </div>
                                             <p
                                                className="max-lg:text-[10px]"
                                                style={{
                                                   color: `${element.color}`,
                                                }}
                                             >
                                                {element.title}
                                             </p>
                                          </div>
                                       </>
                                    );
                                 })}
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
