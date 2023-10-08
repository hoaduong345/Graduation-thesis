import { ReactNode } from "react";
import LogoCate from "../../pages/home/Admin/Assets/TSX/logoCateAdmin";

type Props = {
   title: string;
   body: ReactNode;
   onSave: () => void;
   onClose: () => void;
   id: string;
};
export default function DialogModal(props: Props) {
   const { title, id, body, onClose, onSave } = props;
   return (
      <>
         <dialog id={id} className="modal">
            <div className="bg-white relative flex flex-col p-[60px] max-xl:w-[650px] max-lg:w-[450px] max-lg:p-[30px]">
               <form method="dialog">
                  <button
                     onClick={() => onClose()}
                     className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                  >
                     ✕
                  </button>
               </form>
               <div className="flex flex-col gap-10 max-lg:gap-4">
                  <div className="flex items-center">
                     <LogoCate />
                     <h3 className="font-bold text-2xl max-xl:text-[18px] uppercase">
                        {title}
                     </h3>
                  </div>

                  {body}

                  <div className="flex justify-end gap-2">
                     <button
                        onClick={() => onClose()}
                        className="py-2 px-14 border-[1px] border-[#EA4B48] text-sm text-[#1A1A1A] rounded"
                     >
                        Hủy
                     </button>
                     <button
                        onClick={() => onSave()}
                        className="py-2 px-11 border-[1px] text-sm text-[#FCFCFD] rounded bg-[#EA4B48]"
                     >
                        Xác Nhận
                     </button>
                  </div>
               </div>
            </div>
         </dialog>
      </>
   );
}
