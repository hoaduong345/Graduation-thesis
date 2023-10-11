import { Controller, useForm } from "react-hook-form";
import Plus from "../../../../Assets/TSX/Plus";
import Search from "../../../../Assets/TSX/Search";
import Container from "../../../../components/container/Container";
import Delete from "../Assets/TSX/Delete";
import Download from "../Assets/TSX/Download";
import Edit from "../Assets/TSX/Edit";
import RemoveCate from "../Assets/TSX/RemoveCate";
import Handle from "../Assets/TSX/bacham";
import SitebarAdmin from "../Sitebar/Sitebar";
import DialogModal from "../../../../Helper/Dialog/DialogModal";
import { useEffect, useState } from "react";
import { categoryController } from "../../../../Controllers/CategoryController";
import { Cate } from "../../../../components/home/components/Category";
import { voucherControllers } from "../../../../Controllers/VoucherControllers";
import { VoucherModel } from "../../../../Model/VoucherModel";
import { toast } from "react-toastify";
import DialogAddress from "../../../../Helper/Dialog/DialogAddress";
import ReactPaginate from "react-paginate";
import "./voucher.css";

type FormValues = {
   voucherType: number;
   startDate: string;
   endDate: string;
   quantity: number;
   voucherCode: string;
};

export default function VoucherPage() {
   const idModal = "voucher";
   const idRemove = "removeVoucher";

   const [category, setCategory] = useState<Cate[]>([]);
   const [voucher, setVoucher] = useState<VoucherModel[]>([]);
   const [idVoucher, setIdVoucher] = useState<number | undefined>(0);
   const [page, setPage] = useState(1);
   const [total, setTotal] = useState(0);

   useEffect(() => {
      getVoucher();
      getCategory();
   }, []);

   const getVoucher = async () => {
      await voucherControllers.get(page).then((res) => {
         console.log(res);
         setVoucher(res.data);
         setTotal(res.totalPage);
      });
   };

   const onRemoveVoucher = async (id: number | undefined) => {
      await voucherControllers.remove(id);
      getVoucher();
      closeModal(idRemove);
   };

   const getCategory = async () => {
      await categoryController.getAll().then((res) => {
         setCategory(res.data);
      });
   };

   const {
      control,
      handleSubmit,
      reset,
      clearErrors,
      formState: { errors },
   } = useForm<FormValues>({
      mode: "all",
      defaultValues: {
         voucherType: 0,
         quantity: 1,
         voucherCode: "",
         startDate: "",
         endDate: "",
      },
   });

   const openModal = async (id: string, data: FormValues) => {
      const modal = document.getElementById(id) as HTMLDialogElement | null;
      if (modal) {
         reset(data);
         modal.showModal();
      }
   };

   const closeModal = async (id: string) => {
      const modal = document.getElementById(id) as HTMLDialogElement | null;
      if (modal) {
         clearErrors();
         reset({});
         modal.close();
      }
   };

   const saveModal = (data: FormValues) => {
      const dataForm: VoucherModel = {
         categoryId: Number(data.voucherType),
         quantity: Number(data.quantity),
         code: data.voucherCode,
         startDay: new Date(data.startDate),
         endDay: new Date(data.endDate),
      };

      voucherControllers.add(dataForm).then(() => {
         getVoucher();
         toast.success("Thành Công");
      });

      reset({});

      closeModal(idModal);
   };

   const handlePageClick = async (event: any) => {
      const newOffset = (event.selected % total) + 1;

      await voucherControllers.get(newOffset).then((res) => {
         setVoucher(res.data);
      });
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

                     <div className="grid grid-cols-5">
                        <div className="col-span-1 flex gap-2 text-base text-[#4C4C4C] mx-auto items-center">
                           <Delete />
                           <p className="max-[940px]:text-sm">Xóa</p>
                        </div>
                        <div className="col-span-1 text-base text-[#4C4C4C] mx-auto max-[940px]:text-sm">
                           <p>Danh mục Áp dụng</p>
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
                                 onClick={() =>
                                    openModal(idModal, {} as FormValues)
                                 }
                                 className="flex gap-3 items-center "
                              >
                                 <Plus />
                                 <p className="cursor-default text-[#7A828A] text-base font-bold max-[940px]:text-sm ">
                                    THÊM VOUCHER
                                 </p>
                              </button>
                           </div>
                           <div>
                              <DialogModal
                                 body={
                                    <>
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
                                                            Danh Mục Áp Dụng*
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
                                                               -- Chọn danh mục
                                                               --
                                                            </option>
                                                            <option>
                                                               Tất cả
                                                            </option>
                                                            {category.map(
                                                               (e) => {
                                                                  return (
                                                                     <option
                                                                        value={
                                                                           e.id
                                                                        }
                                                                     >
                                                                        {e.name}
                                                                     </option>
                                                                  );
                                                               }
                                                            )}
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
                                                      </>
                                                   )}
                                                />
                                             </div>
                                          </div>
                                       </div>
                                    </>
                                 }
                                 id={idModal}
                                 title="Mã Voucher"
                                 onClose={() => closeModal(idModal)}
                                 onSave={handleSubmit((data: any) => {
                                    saveModal(data);
                                 })}
                              />
                           </div>
                        </div>

                        {voucher.map((e) => {
                           return (
                              <>
                                 <div className="grid grid-cols-5 border-t-[1px] py-7">
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
                                                   onClick={() =>
                                                      openModal(idModal, {
                                                         voucherType:
                                                            e.categoryId,
                                                         startDate:
                                                            e.startDay.toString(),
                                                         endDate:
                                                            e.endDay.toString(),
                                                         quantity: e.quantity,
                                                         voucherCode: e.code,
                                                      })
                                                   }
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
                                                <button
                                                   onClick={() => {
                                                      openModal(
                                                         idRemove,
                                                         {} as FormValues
                                                      );
                                                      setIdVoucher(e.id);
                                                   }}
                                                   className="flex items-center gap-4"
                                                >
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
                                          {e.fK_category?.name ?? "Tất cả"}
                                       </p>
                                    </div>
                                    <div className="col-span-1 text-base text-[#4C4C4C] mx-auto">
                                       <p
                                          className="font-medium text-base text-[#EA4B48]
                                 max-[940px]:text-xs "
                                       >
                                          {e.code}
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
                                          0/{e.quantity}
                                       </p>
                                    </div>
                                 </div>
                              </>
                           );
                        })}

                        <DialogAddress
                           body={<></>}
                           onClose={() => closeModal(idRemove)}
                           title="Bạn chắc chắn"
                           onSave={() => onRemoveVoucher(idVoucher)}
                           id={idRemove}
                        />
                        <div className="pani">
                           <ReactPaginate
                              breakLabel="..."
                              nextLabel=" >"
                              onPageChange={handlePageClick}
                              pageRangeDisplayed={5}
                              pageCount={total}
                              previousLabel="<"
                              renderOnZeroPageCount={null}
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
