import Plus from "../../../../Assets/TSX/Plus";
import DialogComfirm from "../../../../Helper/Dialog/DialogComfirm";
import { formatDate } from "../../../../Helper/Format";
import { VoucherModel } from "../../../../Model/VoucherModel";
import Container from "../../../../components/container/Container";
import Delete from "../../Admin/Assets/TSX/Delete";
import Edit from "../../Admin/Assets/TSX/Edit";
import Handle from "../../Admin/Assets/TSX/bacham";
import Sitebar from "../UserProfile/Sitebar/Sitebar";

export default function VoucherUserPage() {
   const voucherLocal = localStorage.getItem("voucher");
   const dataVoucherLocal: VoucherModel[] =
      voucherLocal == null ? [] : JSON.parse(voucherLocal);

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
                        Voucher
                     </h1>
                     <div className="grid grid-cols-4">
                        <div className="col-span-1 flex gap-2 text-base text-[#4C4C4C] mx-auto items-center">
                           <p className="max-[940px]:text-sm"></p>
                        </div>
                        <div className="col-span-1 text-base text-[#4C4C4C] mx-auto max-[940px]:text-sm">
                           <p>Mã Voucher</p>
                        </div>
                        <div className="col-span-1 text-base text-[#4C4C4C] mx-auto max-[940px]:text-sm">
                           <p>Giảm Giá</p>
                        </div>
                        <div className="col-span-1 text-base text-[#4C4C4C] mx-auto max-[940px]:text-sm">
                           <p>Thời Gian</p>
                        </div>
                     </div>

                     <div className="shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
                        {dataVoucherLocal.map((e) => {
                           return (
                              <>
                                 <div className="grid grid-cols-4 border-t-[1px] py-7">
                                    <div className="col-span-1 flex gap-2 text-base text-[#4C4C4C] mx-auto items-center">
                                       <input
                                          type="checkbox"
                                          className="w-5 h-5 accent-[#EA4B48] checkbox checkbox-sm items-center  max-lg:w-[14px] max-lg:h-[14px] max-[940px]:w-3"
                                       />
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
                                          {e.discount ?? "FREE SHIP"}%
                                       </p>
                                    </div>
                                    <div className="col-span-1 text-base text-[#4C4C4C] mx-auto">
                                       <p
                                          className="font-medium text-base text-[#1A1A1A]
                                max-[940px]:text-xs "
                                       >
                                          {formatDate(e.startDay)} -{" "}
                                          {formatDate(e.endDay)}
                                       </p>
                                    </div>
                                 </div>
                              </>
                           );
                        })}

                        {/* <DialogComfirm
                           desc="voucher"
                           onClose={() => closeModal(idRemove)}
                           title="Xóa voucher này"
                           onSave={() => onRemoveVoucher(idVoucher)}
                           id={idRemove}
                        /> */}
                     </div>
                  </div>
               </div>
            </div>
         </Container>
      </>
   );
}
