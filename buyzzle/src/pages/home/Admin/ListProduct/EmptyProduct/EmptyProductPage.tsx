import SalesIcon from "../../Assets/Icon/SalesIcon";

export default function EmptyProductPage() {
   return (
      <>
         <div className="p-32 items-center flex flex-col gap-6">
            <div className="max-w-max mx-auto">
               <SalesIcon />
            </div>
            <p className="text-[#b39393] text-xl">Danh sách sản phẩm trống</p>
            <button className="bg-[#EA4B48] w-[20%] cursor-pointer py-2 text-white rounded">
               Thêm Ngay
            </button>
         </div>
      </>
   );
}
