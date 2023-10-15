import LogoVoucher from "../../../../Assets/TSX/LogoVoucher";
import { formatDate } from "../../../../Helper/Format";
import { VoucherModel } from "../../../../Model/VoucherModel";
import "./voucher.css";

export default function VoucherIcon({ props }: { props: VoucherModel }) {
   const { code, endDay, startDay, discount } = props;
   return (
      <>
         <div className="card col-span-1">
            <div className="flex px-7 items-center justify-between">
               <LogoVoucher />
               <div className="content">
                  <h2>Buyzzle</h2>
                  <h1>
                     {discount}% <span>OFF</span>
                  </h1>
                  <p>
                     {formatDate(startDay)} - {formatDate(endDay)}
                  </p>
               </div>
            </div>
            <div className="copy-button grid grid-cols-3 px-7 items-center">
               <p className="col-span-2 text-xl font-bold text-[#EA4B48]">
                  {code}
               </p>
               <button className="col-span-1 copybtn bg-[#EA4B48] rounded-md">
                  Lưu
               </button>
            </div>
         </div>
      </>
   );
}
