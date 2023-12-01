import { useEffect, useState } from "react";
import LogoVoucher from "../../../../assets/TSX/LogoVoucher";
import VoucherManage from "../../../../assets/TSX/VoucherManage";
import VoucherManageItem from "../../../../assets/TSX/VoucherManageItem";
import { voucherControllers } from "../../../../controllers/VoucherControllers";
import { formatDate } from "../../../../helper/Format";
import { toastWarn } from "../../../../helper/Toast/Warning";
import { VoucherModel } from "../../../../model/VoucherModel";
import Container from "../../../container/Container";
import "./voucher.css";

export default function VoucherHomePage() {
   const [voucher, setVoucher] = useState<VoucherModel[]>([]);

   const getVoucher = async () => {
      await voucherControllers.getUser(1).then((res) => {
         setVoucher(res.data);
      });
   };
   useEffect(() => {
      getVoucher();
   }, []);

   const savedVoucher = (id: number) => {
      voucherControllers
         .userSavedVoucher(id)
         .then((_) => {
            getVoucher();
         })
         .catch((err) => {
            toastWarn(err.response?.data);
         });
   };

   return (
      <>
         <Container>
            <div className="pt-2 pb-5 flex justify-center">
               <div className="flex gap-3 items-center border-b-[2px] border-b-[#F7755F] py-5 w-[70%] justify-center">
                  <div className="flex flex-col items-center">
                     <p className="font-bold text-[18px] text-[#4C4C4C]">
                        VOUCHER
                     </p>
                     <p className="font-bold text-[24px] text-[#4C4C4C]">
                        BUYZZLE
                     </p>
                  </div>
                  <div className="bg-[#F7755F]">
                     <VoucherManage />
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-3 gap-5">
               {voucher.map((e) => {
                  let isSave: boolean = e.savedBy?.length! > 0;
                  return (
                     <>
                        <div className="col-span-1 relative ">
                           <VoucherManageItem />

                           <div className="absolute left-[8%] top-[17%] flex flex-col gap-3 items-center">
                              <p className="font-bold text-xl text-[#F7755F]">
                                 GIẢM {e.discount}%
                              </p>
                              <p className="text-[#4C4C4C] text-lg font-semibold bg-[#FFEAE9] w-full text-center py-1">
                                 #{e.code}
                              </p>
                              <div className={`flex items-center ${isSave ? `gap-4` : `gap-6`}`}>
                                 <button
                                    onClick={() => !isSave && savedVoucher(e.id)}
                                    className={`${isSave ? `cursor-not-allowed bg-white border-[1px] border-[#F7755F] text-[#F7755F] px-3` : `bg-[#F7755F] text-white hover:bg-[#ec8f7f] px-5`} py-1 rounded  font-bold text-base`}
                                 >
                                    {isSave ? e.savedBy![0].used ? 'Đã dùng' : 'Đã lưu' : 'Lưu'}
                                 </button>
                                 <p className="text-sm font-medium text-[#EA4B48]">
                                    {formatDate(e.startDay)} -{" "}
                                    {formatDate(e.endDay)}
                                 </p>
                              </div>
                           </div>

                           <div className="absolute right-[10%] top-[17%] flex flex-col items-center gap-1">
                              <p className="text-white font-bold text-xl">
                                 BUYZZLE
                              </p>
                              <LogoVoucher />
                           </div>
                        </div>
                     </>
                  );
               })}
            </div>
         </Container>
      </>
   );
}
