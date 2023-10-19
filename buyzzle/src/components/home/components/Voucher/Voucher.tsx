import { useEffect, useState } from "react";
import LogoVoucher from "../../../../Assets/TSX/LogoVoucher";
import VoucherManage from "../../../../Assets/TSX/VoucherManage";
import { formatDate } from "../../../../Helper/Format";
import { VoucherModel } from "../../../../Model/VoucherModel";
import Container from "../../../container/Container";
import "./voucher.css";
import { voucherControllers } from "../../../../Controllers/VoucherControllers";
import { toast } from "react-toastify";
import VoucherManageItem from "../../../../Assets/TSX/VoucherManageItem";

export default function VoucherHomePage() {
   // { props }: { props: VoucherModel }
   // const { voucher, save } = props;

   const [voucher, setVoucher] = useState<VoucherModel[]>([]);

   const voucherLocal = localStorage.getItem("voucher");
   const dataVoucherLocal: VoucherModel[] =
      voucherLocal == null ? [] : JSON.parse(voucherLocal);

   const getVoucher = async () => {
      await voucherControllers.get(1).then((res) => {
         setVoucher(res.data);
      });
   };
   useEffect(() => {
      getVoucher();
   }, []);

   const saveVoucherLocal = (data: VoucherModel) => {
      const maxVoucher = dataVoucherLocal.length;
      const index = dataVoucherLocal.findIndex((e) => e.id == data.id);
      if (maxVoucher >= 5) {
         toast.error("Lưu tối đa 5 voucher");
      } else {
         if (index !== -1) {
            toast.warning("Bạn đã lưu mã giảm giá này");
         } else {
            dataVoucherLocal.push(data);
            localStorage.setItem(
               "voucher",
               JSON.stringify([...dataVoucherLocal])
            );
            toast.success("Thành công");
         }
      }
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
                  return (
                     <>
                        <div className="col-span-1 relative">
                           <VoucherManageItem />

                           <div className="absolute left-[8%] top-[17%] flex flex-col gap-3 items-center">
                              <p className="font-bold text-xl text-[#F7755F]">
                                 GIẢM {e.discount}%
                              </p>
                              <p className="text-[#4C4C4C] text-lg font-semibold bg-[#FFEAE9] w-full text-center py-1">
                                 #{e.code}
                              </p>
                              <div className="flex items-center gap-6">
                                 <button
                                    onClick={() => saveVoucherLocal(e)}
                                    className="py-1 px-5 rounded text-white font-bold bg-[#F7755F] hover:bg-[#ec8f7f] text-base"
                                 >
                                    Lưu
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
