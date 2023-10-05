import { ReactNode } from "react";

type Props = {
   title: string;
   body: ReactNode;
   onSave: () => void;
   onOpen: () => void;
   onClose: () => void;
};
export default function DialogModal(props: Props) {
   const { title } = props;
   const { body } = props;
   return (
      <>
         <dialog id="my_modal_update" className="modal">
            <div className="w-[512px] bg-white p-4 relative rounded-md">
               <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                     ✕
                  </button>
               </form>
               <div className="border-b-[1px] pb-4 mb-4">
                  <h1 className="text-[#EA4B48] text-sm font-lg font-bold tracking-normal leading-tight max-[870px]:text-xs">
                     {title}
                  </h1>
               </div>

               {body}

               <div className="flex justify-end gap-2">
                  <button className="py-2 px-11 border-[1px] text-sm text-[#FCFCFD] rounded bg-[#EA4B48]">
                     Xác Nhận
                  </button>
                  <button className="py-2 px-11 border-[1px] border-[#EA4B48] text-sm text-[#1A1A1A] rounded">
                     Hủy
                  </button>
               </div>
            </div>
         </dialog>
      </>
   );
}
