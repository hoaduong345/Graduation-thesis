import ComfirmIcon from "../../Assets/TSX/ComfirmIcon";

type Props = {
   title: string;
   id: string;
   desc: string;
   onClose: () => void;
   onSave: () => void;
};

export default function DialogComfirm(props: Props) {
   const { desc, id, onClose, onSave, title } = props;
   return (
      <>
         <dialog id={id} className="modal">
            <div className="modal-box">
               <form method="dialog">
                  <button
                     onClick={() => onClose()}
                     className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                  >
                     ✕
                  </button>
               </form>
               <div className="pb-4 mb-3 ">
                  <div className="flex-col flex gap-2 justify-center items-center">
                     <ComfirmIcon />
                     <h1 className="text-[#EA4B48] text-sm font-lg font-bold tracking-normal leading-tight max-[870px]:text-xs">
                        {title}
                     </h1>
                     <p className=" text-center text-[#4C4C4C]">{desc}</p>
                  </div>
               </div>

               <div className="flex justify-center gap-2">
                  <button
                     onClick={() => onClose()}
                     className="py-2 px-20 border-[1px] border-[#EA4B48] text-sm text-[#1A1A1A] rounded"
                  >
                     Hủy
                  </button>
                  <button
                     onClick={() => onSave()}
                     className="py-2 px-20 border-[1px] text-sm text-[#FCFCFD] rounded bg-[#EA4B48]"
                  >
                     Xác Nhận
                  </button>
               </div>
            </div>
         </dialog>
      </>
   );
}
