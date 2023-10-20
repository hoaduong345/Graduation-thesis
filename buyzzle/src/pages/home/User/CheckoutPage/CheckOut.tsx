import { useEffect, useState } from "react";
import { Images } from "../../../../Assets/TS";
import Location from "../../../../Assets/TSX/Location";
import Voucher from "../../../../Assets/TSX/Voucher";
import Container from "../../../../components/container/Container";
import PinkRight from "../../../../Assets/SVG/LetterPayment/PinkRight";
import BlueRight from "../../../../Assets/SVG/LetterPayment/BlueRight";
import PinkMedium from "../../../../Assets/SVG/LetterPayment/PinkMedium";
import BlueMedium from "../../../../Assets/SVG/LetterPayment/BlueMedium";
import PinkMediumSmall from "../../../../Assets/SVG/LetterPayment/PinkMediumSmall";
import BlueMediumSmall from "../../../../Assets/SVG/LetterPayment/BlueMediumSmall";
import DialogAddress from "../../../../Helper/Dialog/DialogAddress";
import Address from "../../../../Assets/SVG/LetterPayment/Address";
import { Controller, useForm } from "react-hook-form";
import { CartItem } from "../../../../Model/CartModel";
import { userController } from "../../../../Controllers/UserController";
import { numberFormat } from "../../../../Helper/Format";
import { VoucherModel } from "../../../../Model/VoucherModel";
import PaymentBtn from "./PaymentBtn";

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

export type PaymentMethod = "stripe" | "cash";

interface PaymentModel {
   id: number;
   icon: string;
   title: string;
   type: PaymentMethod;
}

const paymentMethods: PaymentModel[] = [
   {
      id: 1,
      icon: Images.visa,
      title: "Thanh toán bằng thẻ tín dụng",
      type: "stripe",
   },
   {
      id: 2,
      icon: Images.nhanHang,
      title: "Thanh toán khi nhận hàng",
      type: "cash",
   },
];

export default function CheckOut() {
   const idModal = "checkout";
   const idModalUpdate = "my_modal_update";

   const [user, setUser] = useState<FormValues>({} as FormValues);
   const [discount, setDiscount] = useState<number>(0);
   const [selectedPaymentMethod, setSelectedPaymentMethod] =
      useState<PaymentMethod>("stripe");

   const localCart = sessionStorage.getItem("cartBuyzzle");
   const listLocalCart: CartItem[] =
      localCart == null ? [] : JSON.parse(localCart);

   const voucherLocal = localStorage.getItem("voucher");
   const dataVoucherLocal: VoucherModel[] =
      voucherLocal == null ? [] : JSON.parse(voucherLocal);

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
      for (let i = 0; i < listLocalCart.length; i++) {
         const element = listLocalCart[i];
         totalCart += element.quantity * element.product.sellingPrice;
      }
      return totalCart;
   };

   return (
      <>
         <Container>
            <div className="body-filter container mx-auto">
               <div className="grid grid-cols-5 gap-6">
                  <div className="mt-9 col-span-5 max-2xl:col-span-5">
                     <h1 className="text-[32px] font-bold mb-4 max-lg:text-[28px] max-[870px]:text-2xl max-[769px]:text-xl">
                        Xác Nhận Thanh Toán
                     </h1>
                     <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-2 flex flex-col gap-2">
                           <div className=" shadow">
                              <div className="flex gap-2">
                                 {[1, 2, 3, 4, 5].map((element) => {
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
                                 <PinkMediumSmall />
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
                                 {[1, 2, 3, 4, 5].map((element) => {
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
                                 <PinkMedium />
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
                              <select
                                 onChange={(e) => {
                                    setDiscount(Number(e.target.value));
                                 }}
                                 className="outline-none w-full text-[#EA4B48] items-center border-[#FFAAAF] bg-[#fff] border-[1px] py-[8px] rounded-md max-lg:py-[4px]"
                              >
                                 <option value={0}>
                                    -- chọn mã giảm giá --
                                 </option>
                                 {dataVoucherLocal.map((e) => {
                                    return (
                                       <>
                                          <option value={e.discount}>
                                             {e.code} - {e.discount}%
                                          </option>
                                       </>
                                    );
                                 })}
                              </select>
                           </div>
                           <div className="flex flex-col gap-[18px]">
                              <div className="flex justify-between">
                                 <p className="text-sm text-[#393939] max-[870px]:text-[11px]">
                                    Tổng Giá Sản Phẩm:{" "}
                                 </p>
                                 <p className="text-base text-[#EA4B48] max-[870px]:text-[11px]">
                                    {numberFormat(calculatePrice())}
                                 </p>
                              </div>
                              <div className="flex justify-between">
                                 <p className="text-sm text-[#393939] max-[870px]:text-[11px]">
                                    Giảm{" "}
                                 </p>
                                 <div className="flex gap-1">
                                    <p className="text-sm text-[#FFAAAF] max-[870px]:text-[11px]">
                                       {numberFormat(
                                          calculatePrice() * (discount / 100)
                                       )}
                                    </p>
                                 </div>
                              </div>
                              <div className="flex justify-between">
                                 <p className="text-sm text-[#393939] max-[870px]:text-[11px]">
                                    Phí vận chuyển{" "}
                                 </p>
                                 <div className="flex gap-1">
                                    <p className="text-sm text-[#EA4B48] max-[870px]:text-[12px]">
                                       {numberFormat(30000)}
                                    </p>
                                 </div>
                              </div>
                              <div className="flex justify-between">
                                 <p className="text-sm text-[#393939] max-[870px]:text-[11px]">
                                    Tổng Thanh Toán:{" "}
                                 </p>
                                 <p className="text-xl text-[#EA4B48] max-[870px]:text-sm">
                                    {numberFormat(
                                       calculatePrice() -
                                          calculatePrice() * (discount / 100) +
                                          30000
                                    )}
                                 </p>
                              </div>
                           </div>
                           <div className="flex flex-col gap-4">
                              <h4 className="text-base text-[#4C4C4C] font-bold max-[870px]:text-[13px]">
                                 Phương Thức Thanh Toán
                              </h4>
                              <div className="flex flex-col gap-[10px]">
                                 {paymentMethods.map((element) => {
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
                                                value={element.type}
                                                checked={
                                                   selectedPaymentMethod ===
                                                   element.type
                                                }
                                                onChange={() => {
                                                   setSelectedPaymentMethod(
                                                      element.type
                                                   );
                                                }}
                                             />
                                             <div className="w-6">
                                                <img
                                                   className="w-full h-full object-contain"
                                                   src={element.icon}
                                                   alt=""
                                                />
                                             </div>
                                             <p
                                                className={`max-lg:text-[10px] ${
                                                   selectedPaymentMethod ===
                                                   element.type
                                                      ? "text-[#393939]"
                                                      : "text-[#9c9c9c]"
                                                }`}
                                             >
                                                {element.title}
                                             </p>
                                          </div>
                                       </>
                                    );
                                 })}
                              </div>
                           </div>
                           <PaymentBtn
                              cartItems={listLocalCart}
                              isCheckedPayment={selectedPaymentMethod}
                              discount={discount}
                           />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </Container>
      </>
   );
}
