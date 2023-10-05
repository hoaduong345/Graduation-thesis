import { Controller, useForm } from "react-hook-form";
import Plus from "../../../../Assets/TSX/Plus";
import Search from "../../../../Assets/TSX/Search";
import Container from "../../../../components/container/Container";
import AddCateBtn from "../Assets/TSX/AddCateAdmin";
import Delete from "../Assets/TSX/Delete";
import Download from "../Assets/TSX/Download";
import Edit from "../Assets/TSX/Edit";
import RemoveCate from "../Assets/TSX/RemoveCate";
import Handle from "../Assets/TSX/bacham";
import LogoCate from "../Assets/TSX/logoCateAdmin";
import SitebarAdmin from "../Sitebar/Sitebar";

type FormValues = {
   voucherType: string;
   name: string;
   startDate: string;
   endDate: string;
   quantity: number;
   voucherCode: string;
};

export default function VoucherPage() {
   const openModal = () => {
      const modal = document.getElementById(
         "my_modal_3"
      ) as HTMLDialogElement | null;
      if (modal) {
         modal.showModal();
      }
   };

   const closeModal = async () => {
      const modal = document.getElementById(
         "my_modal_3"
      ) as HTMLDialogElement | null;
      if (modal) {
         modal.close();
      }
   };

   const {
      control,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm<FormValues>({
      mode: "all",
      defaultValues: {
         voucherType: "",
         name: "",
         quantity: 1,
         voucherCode: "",
         startDate: "",
         endDate: "",
      },
   });

   const postVoucher = (data: FormValues) => {
      const dataForm = {
         voucherType: data.voucherType,
         name: data.name,
         quantity: data.quantity,
         voucherCode: data.voucherCode,
         startDate: data.startDate,
         endDate: data.endDate,
      };

      reset({});

      console.log(dataForm);
   };

   return (
      <>
         <Container>
            <div className="grid grid-cols-5">
               <div className="col-span-1 max-2xl:hidden">
                  <SitebarAdmin />
               </div>

               <div className="content-right-filter mt-[34px] col-span-4 flex flex-col gap-[50px] max-2xl:col-span-5">
                  <div>
                     <h2
                        className="txt-filter font-bold text-[#1A1A1A] text-3xl
                                max-lg:text-xl"
                     >
                        QUẢN LÝ DANH SÁCH MÃ GIẢM GIÁ
                     </h2>
                  </div>
                  <div className="flex flex-col gap-[35px]">
                     <div className="flex gap-[24px]">
                        <div
                           className="Search-input-headerCenter items-center flex
                                        py-[3px] px-[6px] border-[1px] border-[#FFAAAF] rounded-md"
                        >
                           <div className="mb-2">
                              <Search />
                           </div>
                           <input
                              className=" rounded-lg focus:outline-none text-lg relative pr-7 flex-1 pl-3 max-xl:text-sm max-lg:text-sm"
                              placeholder="Tìm kiếm..."
                           />
                        </div>
                        <div className="flex items-center w-[133px] rounded-md h-[46px] hover:bg-[#FFEAE9] transition duration-150 border-[#FFAAAF] border-[1px] justify-evenly cursor-pointer">
                           <Download />
                           <button className="text-center text-base font-bold text-[#EA4B48] max-lg:text-sm">
                              Xuất excel
                           </button>
                        </div>
                     </div>

                     <div className="grid grid-cols-6">
                        <div className="col-span-1 flex gap-2 text-base text-[#4C4C4C] mx-auto items-center">
                           <Delete />
                           <p className="max-[940px]:text-sm">Xóa</p>
                        </div>
                        <div className="col-span-1 text-base text-[#4C4C4C] mx-auto max-[940px]:text-sm">
                           <p>Loại Voucher</p>
                        </div>
                        <div className="col-span-1 text-base text-[#4C4C4C] mx-auto max-[940px]:text-sm">
                           <p>Tên Voucher</p>
                        </div>
                        <div className="col-span-1 text-base text-[#4C4C4C] mx-auto max-[940px]:text-sm">
                           <p>Mã Voucher</p>
                        </div>
                        <div className="col-span-1 text-base text-[#4C4C4C] mx-auto max-[940px]:text-sm">
                           <p>Thời Gian</p>
                        </div>
                        <div className="col-span-1 text-base text-[#4C4C4C] mx-auto max-[940px]:text-sm">
                           <p>
                              Đã dùng / Tổng{" "}
                              <span className="max-[940px]:hidden"> SL</span>
                           </p>
                        </div>
                     </div>

                     <div className="shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
                        <div className="grid grid-cols-7 border-t-[1px] py-7">
                           <div className="col-span-1"></div>
                           <div className="col-span-6">
                              <button
                                 onClick={openModal}
                                 className="flex gap-3 items-center "
                              >
                                 <Plus />
                                 <p className="cursor-default text-[#7A828A] text-base font-bold max-[940px]:text-sm ">
                                    THÊM VOUCHER
                                 </p>
                              </button>
                           </div>
                           <div>
                              <dialog id="my_modal_3" className="modal ">
                                 <div className="bg-white relative flex flex-col p-[40px] max-w-[1000px] max-xl:w-[650px] max-lg:w-[450px] max-lg:p-[30px]">
                                    <form method="dialog">
                                       <button
                                          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                          onClick={closeModal}
                                       >
                                          ✕
                                       </button>
                                    </form>
                                    <div className="flex flex-col gap-6 max-lg:gap-3">
                                       <div className="flex items-center gap-3">
                                          <LogoCate />
                                          <h3 className="font-bold text-2xl max-xl:text-[18px] uppercase">
                                             Mã Voucher
                                          </h3>
                                       </div>

                                       <div className="grid grid-cols-4 gap-5 max-[940px]:gap-2">
                                          <div className="col-span-2">
                                             <div className="flex flex-col gap-1">
                                                <Controller
                                                   control={control}
                                                   name="voucherType"
                                                   rules={{
                                                      required: {
                                                         value: true,
                                                         message:
                                                            "Vui lòng chọn",
                                                      },
                                                   }}
                                                   render={({ field }) => (
                                                      <>
                                                         <label className="text-sm text-[#4C4C4C] max-xl:text-xs max-lg:text-[10px]">
                                                            Loại Voucher*
                                                         </label>

                                                         <select
                                                            name=""
                                                            id=""
                                                            value={field.value}
                                                            onChange={(e) => {
                                                               const reg = /[]/;
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
                                                            className={`focus:outline-none border-[1px] text-center text-[#333333] text-base placeholder-[#7A828A]
                                             rounded-[6px] px-[10px] py-[12px] w-[100%] mt-2
                                             max-xl:text-xs max-lg:text-[10px]
                                            `}
                                                         >
                                                            <option
                                                               value=""
                                                               className="text-[#718096]"
                                                            >
                                                               {" "}
                                                               -- Chọn loại giảm
                                                               giá --
                                                            </option>

                                                            <option>GPS</option>
                                                            <option>
                                                               GPRS
                                                            </option>
                                                            <option>
                                                               GssRS
                                                            </option>
                                                         </select>
                                                         {errors.voucherType && (
                                                            <p className="text-[11px] text-red-700 mt-2">
                                                               {
                                                                  errors
                                                                     .voucherType
                                                                     .message
                                                               }
                                                            </p>
                                                         )}
                                                         {/* <p className="text-[11px] text-[#718096]">
                                                            Loại giảm giá trực
                                                            tiếp cho sản phẩm
                                                            hoặc phí vẫn chuyển
                                                         </p> */}
                                                      </>
                                                   )}
                                                />
                                             </div>
                                          </div>
                                          <div className="col-span-1">
                                             <div className="flex flex-col gap-1">
                                                <Controller
                                                   name="startDate"
                                                   control={control}
                                                   rules={{
                                                      required: {
                                                         value: true,
                                                         message:
                                                            "Hãy chọn ngày",
                                                      },
                                                   }}
                                                   render={({ field }) => (
                                                      <>
                                                         <label className="text-sm text-[#4C4C4C] max-xl:text-xs max-lg:text-[10px]">
                                                            Thời Gian Bắt Đầu
                                                         </label>

                                                         <input
                                                            className={`focus:outline-none border-[1px] text-[#333333] text-base placeholder-[#7A828A]
                                             rounded-[6px] px-[10px] py-[12px] w-[100%] mt-2
                                             max-xl:text-xs max-lg:text-[10px]
                                            `}
                                                            //    onChange={handleChange}
                                                            name="name"
                                                            type="date"
                                                            value={field.value}
                                                            onChange={(e) => {
                                                               const reg =
                                                                  /[!]/;
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
                                                            //    value={category.name}
                                                         />
                                                         {errors.startDate && (
                                                            <p className="text-[11px] text-red-700 mt-2">
                                                               {
                                                                  errors
                                                                     .startDate
                                                                     .message
                                                               }
                                                            </p>
                                                         )}
                                                         {/* <p className="text-[11px] text-[#718096]">
                                                            Sẽ bắt đầu áp dụng
                                                            mã giảm giá cho đến
                                                            khi thời gian này
                                                            bắt đầu
                                                         </p> */}
                                                      </>
                                                   )}
                                                />
                                             </div>
                                          </div>
                                          <div className="col-span-1">
                                             <div className="flex flex-col gap-1">
                                                <Controller
                                                   control={control}
                                                   name="endDate"
                                                   rules={{
                                                      required: {
                                                         value: true,
                                                         message:
                                                            "Hãy chọn ngày",
                                                      },
                                                   }}
                                                   render={({ field }) => (
                                                      <>
                                                         <label className="text-sm text-[#4C4C4C] max-xl:text-xs max-lg:text-[10px]">
                                                            Thời Gian Kết Thúc
                                                         </label>

                                                         <input
                                                            className={`focus:outline-none border-[1px] text-[#333333] text-base placeholder-[#7A828A]
                                             rounded-[6px] px-[10px] py-[12px] w-[100%] mt-2
                                             max-xl:text-xs max-lg:text-[10px]
                                            `}
                                                            //   onChange={handleChange}
                                                            name="name"
                                                            type="date"
                                                            value={field.value}
                                                            onChange={(e) => {
                                                               const reg =
                                                                  /[!@#$%^&]/;
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
                                                         {errors.endDate && (
                                                            <p className="text-[11px] text-red-700 mt-2">
                                                               {
                                                                  errors.endDate
                                                                     .message
                                                               }
                                                            </p>
                                                         )}
                                                         {/* <p className="text-[11px] text-[#718096]">
                                                            Sẽ kết thúc không
                                                            thể áp dụng mã giảm
                                                            giá khi thời gian
                                                            này qua
                                                         </p> */}
                                                      </>
                                                   )}
                                                />
                                             </div>
                                          </div>
                                       </div>

                                       <div className="grid grid-cols-4 gap-5 max-[940px]:gap-2">
                                          <div className="col-span-2">
                                             <div className="flex flex-col gap-1">
                                                <Controller
                                                   name="name"
                                                   control={control}
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
                                                         value: 20,
                                                         message:
                                                            "Ít hơn 20 ký tự",
                                                      },
                                                   }}
                                                   render={({ field }) => (
                                                      <>
                                                         <label className="text-sm text-[#4C4C4C] max-xl:text-xs max-lg:text-[10px]">
                                                            Tên Voucher*
                                                         </label>

                                                         <input
                                                            className={`focus:outline-none border-[1px] text-[#333333] text-base placeholder-[#7A828A]
                                             rounded-[6px] px-[10px] py-[12px] w-[100%] mt-2
                                             max-xl:text-xs max-lg:text-[10px]
                                            `}
                                                            placeholder="Nhập tiêu đề cho mã giảm giá này"
                                                            //   onChange={handleChange}
                                                            value={field.value}
                                                            onChange={(e) => {
                                                               const reg =
                                                                  /[!@#$%^&]/;
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
                                                            <p className="text-[11px] text-red-700 mt-2">
                                                               {
                                                                  errors.name
                                                                     .message
                                                               }
                                                            </p>
                                                         )}
                                                         {/* <p className="text-[11px] text-[#718096]">
                                                            Hiển thị cho người
                                                            dùng nhận biết sự
                                                            kiện giảm giá
                                                         </p> */}
                                                      </>
                                                   )}
                                                />
                                             </div>
                                          </div>
                                          <div className="col-span-2">
                                             <div className="flex flex-col gap-1">
                                                <Controller
                                                   name="quantity"
                                                   control={control}
                                                   rules={{
                                                      required: {
                                                         value: true,
                                                         message:
                                                            "Không để trống",
                                                      },
                                                   }}
                                                   render={({ field }) => (
                                                      <>
                                                         <label className="text-sm text-[#4C4C4C] max-xl:text-xs max-lg:text-[10px]">
                                                            Số Lượng Voucher
                                                         </label>

                                                         <input
                                                            className={`focus:outline-none border-[1px] text-[#333333] text-base placeholder-[#7A828A]
                                             rounded-[6px] px-[10px] py-[12px] w-[100%] mt-2
                                             max-xl:text-xs max-lg:text-[10px]
                                            `}
                                                            placeholder="Nhập số lượng voucher"
                                                            //    onChange={handleChange}
                                                            type="number"
                                                            name="name"
                                                            value={field.value}
                                                            onChange={(e) => {
                                                               const reg =
                                                                  /[a-zA-Z!@#$e]/;
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
                                                            //    value={category.name}
                                                         />
                                                         {errors.quantity && (
                                                            <p className="text-[11px] text-red-700 mt-2">
                                                               {
                                                                  errors
                                                                     .quantity
                                                                     .message
                                                               }
                                                            </p>
                                                         )}
                                                         {/* <p className="text-[11px] text-[#718096]">
                                                            Số lượng voucher khi
                                                            sử dụng hết người
                                                            dùng không thể tiếp
                                                            tục sử dụng mã này
                                                            nữa
                                                         </p> */}
                                                      </>
                                                   )}
                                                />
                                             </div>
                                          </div>
                                       </div>

                                       <div className="grid grid-cols-4 gap-5 max-[940px]:gap-2">
                                          <div className="col-span-2">
                                             <div className="flex flex-col gap-1">
                                                <Controller
                                                   name="voucherCode"
                                                   control={control}
                                                   rules={{
                                                      required: {
                                                         value: true,
                                                         message:
                                                            "Không để trống",
                                                      },
                                                      maxLength: {
                                                         value: 20,
                                                         message:
                                                            "Nhiều nhất 20 ký tự",
                                                      },
                                                   }}
                                                   render={({ field }) => (
                                                      <>
                                                         <label className="text-sm text-[#4C4C4C] max-xl:text-xs max-lg:text-[10px]">
                                                            Mã Voucher*
                                                         </label>

                                                         <input
                                                            className={`focus:outline-none border-[1px] text-[#333333] text-base placeholder-[#7A828A]
                                             rounded-[6px] px-[10px] py-[12px] w-[100%] mt-2
                                             max-xl:text-xs max-lg:text-[10px]
                                            `}
                                                            placeholder="Nhập mã voucher"
                                                            name="name"
                                                            value={field.value}
                                                            onChange={(e) => {
                                                               const reg =
                                                                  /[!@#$%^&]/;
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
                                                         {errors.voucherCode && (
                                                            <p className="text-[11px] text-red-700 mt-2">
                                                               {
                                                                  errors
                                                                     .voucherCode
                                                                     .message
                                                               }
                                                            </p>
                                                         )}
                                                         {/* <p className="text-[11px] text-[#718096]">
                                                            Mã sử dụng cho người
                                                            dùng nhập vào đơn
                                                            hàng của mình và sẽ
                                                            áp dụng giảm giá
                                                            theo loại mã giảm
                                                            giá trên, và không
                                                            được trùng với mã đã
                                                            tồn tại
                                                         </p> */}
                                                      </>
                                                   )}
                                                />
                                             </div>
                                          </div>
                                       </div>

                                       <div className="flex gap-2 items-center justify-end">
                                          <button
                                             onClick={handleSubmit(
                                                (data: any) => {
                                                   postVoucher(data);
                                                }
                                             )}
                                             className="text-base font-bold flex gap-3 px-[50px] py-3 border-[#EA4B48] items-center rounded-md border-[1px]
                                             max-lg:text-sm max-lg:py-[10px] max-lg:px-8 max-lg:gap-2
                                             max-[940px]:text-[13px] max-[940px]:py-[6px] max-[940px]:px-7 "
                                          >
                                             <AddCateBtn />
                                             Xác Nhận
                                          </button>
                                          <button
                                             className="py-3 px-8 text-white text-base bg-[#EA4B48] rounded-md
                                             max-lg:text-sm
                                             max-[940px]:text-[13px] max-[940px]:py-2 max-[940px]:px-4"
                                             onClick={closeModal}
                                          >
                                             Hủy
                                          </button>
                                       </div>
                                    </div>
                                 </div>
                              </dialog>
                           </div>
                        </div>

                        <div className="grid grid-cols-6 border-t-[1px] py-7">
                           <div className="col-span-1 flex gap-2 text-base text-[#4C4C4C] mx-auto items-center">
                              <div className="dropdown dropdown-left">
                                 <label tabIndex={0}>
                                    <Handle />
                                 </label>
                                 <ul
                                    tabIndex={0}
                                    className="dropdown-content menu bg-white rounded-box w-52
                                                shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]
                                                max-2xl:left-[100%] max-2xl:origin-left max-[940px]:w-32 max-[940px]:h-[88px] max-[940px]:rounded"
                                 >
                                    <li>
                                       <button
                                          onClick={openModal}
                                          className="flex items-center gap-4"
                                       >
                                          <Edit />
                                          <p
                                             className="text-[#EA4B48] text-sm font-medium
                                            max-[940px]:text-xs "
                                          >
                                             Sửa
                                          </p>
                                       </button>
                                    </li>
                                    <li>
                                       <button className="flex items-center gap-4">
                                          <RemoveCate />
                                          <p
                                             className="text-[#EA4B48] text-sm font-medium
                                             max-[940px]:text-xs "
                                          >
                                             Xóa
                                          </p>
                                       </button>
                                    </li>
                                 </ul>
                              </div>
                              <input
                                 type="checkbox"
                                 className="w-5 h-5 accent-[#EA4B48]  max-lg:w-[14px] max-lg:h-[14px] max-[940px]:w-3"
                              />
                           </div>
                           <div className="col-span-1 text-base text-[#4C4C4C] mx-auto">
                              <p
                                 className="font-medium text-base text-[#1A1A1A] 
                                    max-[940px]:text-xs "
                              >
                                 GPS
                              </p>
                           </div>
                           <div className="col-span-1 text-base text-[#4C4C4C] mx-auto">
                              <p
                                 className="font-medium text-base text-[#1A1A1A]
                                 max-[940px]:text-xs "
                              >
                                 Thiết Bị Điện Tử
                              </p>
                           </div>
                           <div className="col-span-1 text-base text-[#4C4C4C] mx-auto">
                              <p
                                 className="font-medium text-base text-[#EA4B48]
                                 max-[940px]:text-xs "
                              >
                                 THANGDZ
                              </p>
                           </div>
                           <div className="col-span-1 text-base text-[#4C4C4C] mx-auto">
                              <p
                                 className="font-medium text-base text-[#1A1A1A]
                                max-[940px]:text-xs "
                              >
                                 12/11/23 - 20/11/23
                              </p>
                           </div>
                           <div className="col-span-1 text-base text-[#4C4C4C] mx-auto">
                              <p
                                 className="font-medium text-base text-[#1A1A1A]
                                 max-[940px]:text-xs "
                              >
                                 10/1000
                              </p>
                           </div>
                        </div>

                        <div className="grid grid-cols-6 border-t-[1px] py-7">
                           <div className="col-span-1 flex gap-2 text-base text-[#4C4C4C] mx-auto items-center">
                              <div className="dropdown dropdown-left">
                                 <label tabIndex={0}>
                                    <Handle />
                                 </label>
                                 <ul
                                    tabIndex={0}
                                    className="dropdown-content menu bg-white rounded-box w-52
                                                shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]
                                                max-2xl:left-[100%] max-2xl:origin-left max-[940px]:w-32 max-[940px]:h-[88px] max-[940px]:rounded"
                                 >
                                    <li>
                                       <button
                                          onClick={openModal}
                                          className="flex items-center gap-4"
                                       >
                                          <Edit />
                                          <p
                                             className="text-[#EA4B48] text-sm font-medium
                                            max-[940px]:text-xs "
                                          >
                                             Sửa
                                          </p>
                                       </button>
                                    </li>
                                    <li>
                                       <button className="flex items-center gap-4">
                                          <RemoveCate />
                                          <p
                                             className="text-[#EA4B48] text-sm font-medium
                                             max-[940px]:text-xs "
                                          >
                                             Xóa
                                          </p>
                                       </button>
                                    </li>
                                 </ul>
                              </div>
                              <input
                                 type="checkbox"
                                 className="w-5 h-5 accent-[#EA4B48]  max-lg:w-[14px] max-lg:h-[14px] max-[940px]:w-3"
                              />
                           </div>
                           <div className="col-span-1 text-base text-[#4C4C4C] mx-auto">
                              <p
                                 className="font-medium text-base text-[#1A1A1A] 
                                    max-[940px]:text-xs "
                              >
                                 GPS
                              </p>
                           </div>
                           <div className="col-span-1 text-base text-[#4C4C4C] mx-auto">
                              <p
                                 className="font-medium text-base text-[#1A1A1A]
                                 max-[940px]:text-xs "
                              >
                                 Thiết Bị Điện Tử
                              </p>
                           </div>
                           <div className="col-span-1 text-base text-[#4C4C4C] mx-auto">
                              <p
                                 className="font-medium text-base text-[#EA4B48]
                                 max-[940px]:text-xs "
                              >
                                 THANGDZ
                              </p>
                           </div>
                           <div className="col-span-1 text-base text-[#4C4C4C] mx-auto">
                              <p
                                 className="font-medium text-base text-[#1A1A1A]
                                max-[940px]:text-xs "
                              >
                                 12/11/23 - 20/11/23
                              </p>
                           </div>
                           <div className="col-span-1 text-base text-[#4C4C4C] mx-auto">
                              <p
                                 className="font-medium text-base text-[#1A1A1A]
                                 max-[940px]:text-xs "
                              >
                                 10/1000
                              </p>
                           </div>
                        </div>

                        <div className="grid grid-cols-6 border-t-[1px] py-7">
                           <div className="col-span-1 flex gap-2 text-base text-[#4C4C4C] mx-auto items-center">
                              <div className="dropdown dropdown-left">
                                 <label tabIndex={0}>
                                    <Handle />
                                 </label>
                                 <ul
                                    tabIndex={0}
                                    className="dropdown-content menu bg-white rounded-box w-52
                                                shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]
                                                max-2xl:left-[100%] max-2xl:origin-left max-[940px]:w-32 max-[940px]:h-[88px] max-[940px]:rounded"
                                 >
                                    <li>
                                       <button
                                          onClick={openModal}
                                          className="flex items-center gap-4"
                                       >
                                          <Edit />
                                          <p
                                             className="text-[#EA4B48] text-sm font-medium
                                            max-[940px]:text-xs "
                                          >
                                             Sửa
                                          </p>
                                       </button>
                                    </li>
                                    <li>
                                       <button className="flex items-center gap-4">
                                          <RemoveCate />
                                          <p
                                             className="text-[#EA4B48] text-sm font-medium
                                             max-[940px]:text-xs "
                                          >
                                             Xóa
                                          </p>
                                       </button>
                                    </li>
                                 </ul>
                              </div>
                              <input
                                 type="checkbox"
                                 className="w-5 h-5 accent-[#EA4B48]  max-lg:w-[14px] max-lg:h-[14px] max-[940px]:w-3"
                              />
                           </div>
                           <div className="col-span-1 text-base text-[#4C4C4C] mx-auto">
                              <p
                                 className="font-medium text-base text-[#1A1A1A] 
                                    max-[940px]:text-xs "
                              >
                                 GPS
                              </p>
                           </div>
                           <div className="col-span-1 text-base text-[#4C4C4C] mx-auto">
                              <p
                                 className="font-medium text-base text-[#1A1A1A]
                                 max-[940px]:text-xs "
                              >
                                 Thiết Bị Điện Tử
                              </p>
                           </div>
                           <div className="col-span-1 text-base text-[#4C4C4C] mx-auto">
                              <p
                                 className="font-medium text-base text-[#EA4B48]
                                 max-[940px]:text-xs "
                              >
                                 THANGDZ
                              </p>
                           </div>
                           <div className="col-span-1 text-base text-[#4C4C4C] mx-auto">
                              <p
                                 className="font-medium text-base text-[#1A1A1A]
                                max-[940px]:text-xs "
                              >
                                 12/11/23 - 20/11/23
                              </p>
                           </div>
                           <div className="col-span-1 text-base text-[#4C4C4C] mx-auto">
                              <p
                                 className="font-medium text-base text-[#1A1A1A]
                                 max-[940px]:text-xs "
                              >
                                 10/1000
                              </p>
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
