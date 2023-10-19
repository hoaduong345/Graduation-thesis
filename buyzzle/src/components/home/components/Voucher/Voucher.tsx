import LogoVoucher from "../../../../Assets/TSX/LogoVoucher";
import { formatDate } from "../../../../Helper/Format";
import { VoucherModel } from "../../../../Model/VoucherModel";
import "./voucher.css";

type Props = {
   voucher: VoucherModel;
   save: (id: number) => void;
};

export default function VoucherIcon(props: Props) {
   // { props }: { props: VoucherModel }
   const { voucher, save } = props;

   return (
      <>
         <div className="card col-span-1 ">
            <div className="grid grid-cols-4 items-center justify-center">
               <div className="col-span-2 items-center flex">
                  <LogoVoucher />
               </div>
               <div className="content col-span-2 items-center flex flex-col">
                  <h2>Buyzzle</h2>
                  <h1 className="font-medium">
                     {voucher.discount}% <span>OFF</span>
                  </h1>
                  <p>
                     {formatDate(voucher.startDay)} -{" "}
                     {formatDate(voucher.endDay)}
                  </p>
               </div>
            </div>
            <div className="copy-button grid grid-cols-4">
               <p className="col-span-2 text-2xl font-bold text-[#EA4B48] text-center">
                  {voucher.code}
               </p>
               <div className="col-span-2 items-center flex flex-col justify-center">
                  <button
                     onClick={() => save(voucher.id)}
                     className="copybtn bg-[#EA4B48] hover:bg-[#b24341] rounded-md py-1 px-5"
                  >
                     Lưu
                  </button>
               </div>
            </div>
         </div>
      </>
   );
}
