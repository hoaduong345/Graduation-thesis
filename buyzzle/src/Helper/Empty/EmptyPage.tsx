import EmptyUI from "../../Assets/TSX/EmptyPage";

// interface EmptyModel {
//    title: string;
//    button: string;
// }

export default function EmptyPage() {
   // const { title, button } = props;
   return (
      <>
         <div className="flex flex-col gap-2 justify-center items-center w-full relative">
            <EmptyUI />
            <div className="items-center flex flex-col justify-center gap-6 absolute left-[30%]"></div>
         </div>
      </>
   );
}
