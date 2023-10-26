import { IonIcon } from "@ionic/react";
import { useEffect, useState } from "react";
import ResponsivePagination from "react-responsive-pagination";
import { useNavigate } from "react-router-dom";
import Search from "../../../../../Assets/TSX/Search";
import { orderControllers } from "../../../../../Controllers/OrderControllers";
import { formatDate, numberFormat } from "../../../../../Helper/Format";
import { OrderPanigation } from "../../../../../Model/OrderModel";
import Container from "../../../../../components/container/Container";
import Filter from "../../Assets/TSX/Filter";
import RemoveCate from "../../Assets/TSX/RemoveCate";
import Calendar from "../../Assets/TSX/calendar";
import Excel from "../../Assets/TSX/excel";
import Print from "../../Assets/TSX/print";
import SitebarAdmin from "../../Sitebar/Sitebar";

export default function OrderManagement() {
   const [order, setOrder] = useState<OrderPanigation>({} as OrderPanigation);
   const [currentPage, setCurrentPage] = useState<number>(1);

   // const [currentPage, setCurrentPage] = useState<number>(1);
   const [open, setOpen] = useState(false);

   const openModal = () => {
      const modal = document.getElementById(
         "my_modal_3"
      ) as HTMLDialogElement | null;
      if (modal) {
         modal.showModal();
         setOpen(!open);
      }
   };
   const closeModal = () => {
      const modal = document.getElementById(
         "my_modal_3"
      ) as HTMLDialogElement | null;
      if (modal) {
         modal.close();
      }
   };

   const [changeButton, setChangeButton] = useState([
      {
         id: 1,
         text: "Tất cả",
         badgeNum: (
            <div className="badge badge-xs badge-error badge-outline py-2">
               100
            </div>
         ),
         active: true, // Thêm trường active
      },
      {
         id: 2,
         text: "Mới",
         badgeNum: (
            <div className="badge badge-xs badge-info badge-outline py-2">
               100
            </div>
         ),
         active: false, // Thêm trường active
      },
      {
         id: 3,
         text: "Chờ xác nhận",
         badgeNum: (
            <div className="badge badge-xs badge-secondary badge-outline py-2">
               100
            </div>
         ),
         active: false, // Thêm trường active
      },
      {
         id: 4,
         text: "Đã giao cho ĐVVC",
         badgeNum: (
            <div className="badge badge-xs badge-accent badge-outline py-2">
               100
            </div>
         ),
         active: false, // Thêm trường active
      },
   ]);

   const handleClick = (id: number) => {
      const updatedButtons = changeButton.map((btn) => {
         if (btn.id === id) {
            console.log(
               "🚀 ~ file: OrderManagement.tsx:91 ~ updatedButtons ~ btn.id:",
               btn.id
            );
            return { ...btn, active: true };
         } else {
            return { ...btn, active: false };
         }
      });
      setChangeButton(updatedButtons);
   };

   function getBorderColor(id: number) {
      switch (id) {
         case 1:
            return "#FA9595"; // Màu biên cho id 1
         case 2:
            return "#3DC0F8"; // Màu biên cho id 2
         case 3:
            return "#F43FCA"; // Màu biên cho id 3
         case 4:
            return "#21CEBD"; // Màu biên cho id 4
         default:
            return "#ccc"; // Màu biên mặc định (nếu id không khớp với bất kỳ case nào)
      }
   }

   const getOrder = async () => {
      await orderControllers.getAdmin(currentPage).then((res) => {
         setOrder(res);
      });
   };

   useEffect(() => {
      getOrder();
   }, [currentPage]);

   const navigate = useNavigate();

   return (
      <Container>
         <div
            className="float-right cursor-pointer max-[1920px]:invisible max-2xl:visible"
            onClick={() => openModal()}
         >
            <IonIcon className="text-[2rem]" name={"menu"}></IonIcon>
         </div>
         <div className="grid grid-cols-5">
            <div className={`col-span-1`}>
               {/* You can open the modal using document.getElementById('ID').showModal() method */}
               <dialog id="my_modal_3" className="max-2xl:modal ">
                  <div className="relative">
                     <button
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-[120px]"
                        onClick={closeModal}
                     >
                        ✕
                     </button>
                     <SitebarAdmin />
                  </div>
               </dialog>
               <div className="max-2xl:hidden">
                  <SitebarAdmin />
               </div>
            </div>
            <div className="content-right-filter mt-[34px] col-span-4 max-2xl:col-span-5 ">
               {/* h2 */}
               <div>
                  <h2 className="txt-filter font-bold text-[#1A1A1A] text-3xl max-2xl:text-2xl">
                     QUẢN LÝ ĐƠN HÀNG
                  </h2>
               </div>
               {/* end h2 */}
               {/* button */}
               <div className="flex mt-[45px] gap-5">
                  {changeButton.map((btnItems) => {
                     return (
                        <button
                           className={`bg-white btn `}
                           style={{
                              backgroundColor: "white ",
                              borderColor: btnItems.active
                                 ? getBorderColor(btnItems.id)
                                 : "",
                              borderWidth: btnItems.active ? "1px" : "",
                           }}
                           onClick={() => handleClick(btnItems.id)}
                        >
                           {btnItems.text}
                           <div>{btnItems.badgeNum}</div>
                        </button>
                     );
                  })}
               </div>
               {/* end button */}
               {/* card search */}
               <div
                  className="mt-3 py-7 px-5 
          shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
               >
                  <div className="flex gap-[24px]">
                     <div
                        className="Search-input-headerCenter items-center flex 
                                        py-[3px] px-[6px] border-[1px] border-[#FFAAAF] rounded-md"
                     >
                        <div className="mb-2">
                           <Search />
                        </div>
                        <input
                           className=" rounded-lg focus:outline-none text-lg relative pr-7 flex-1 pl-3 max-xl:text-sm max-lg:text-sm"
                           placeholder="Tìm kiếm..."
                        />
                     </div>
                     <div>
                        <div
                           className={`flex items-center w-[112px] rounded-md h-[46px] hover:bg-[#ffeeed]
                    transition duration-150 border-[#FFAAAF] border-[1px] justify-evenly cursor-pointer
                    max-xl:w-[125px]
                    max-xl:h-[40px]
                    max-[885px]:h-[35px]
                    bg-[#FFF]
                    text-center text-base font-bold text-[#EA4B48] 
                     max-xl:font-medium max-lg:text-xs max-[885px]:w-[102px]`}
                        >
                           <div className={`stroke-[#EA4B48]`}>
                              <Filter />
                           </div>
                           <button>Bộ lọc</button>
                        </div>
                     </div>
                  </div>
               </div>
               {/* end card search */}
               {/* checkBox and Printf */}
               <div className="grid grid-cols-2 items-center py-4 px-10">
                  {/* checkBox */}
                  <div className="col-span-1 flex gap-3">
                     {/* <Delete /> */}
                     <input
                        className="checkbox checkbox-sm items-center"
                        type="checkbox"
                     />
                     <p>Chọn tất cả</p>
                  </div>
                  {/* end checkBox */}
                  <div className="col-span-1 flex items-center gap-4 justify-end">
                     <div className="border-[#EA4B48] border-[1px] p-3 rounded-md hover:bg-[#ffe0e0] cursor-pointer transition-all duration-150">
                        <RemoveCate />
                     </div>
                     <div className="border-[#107C41] border-[1px] p-3 rounded-md hover:bg-[#d7fee1] cursor-pointer transition-all duration-150">
                        <Excel />
                     </div>
                  </div>
               </div>
               {/* end checkBox and Printf*/}
               <div className="flex flex-col space-y-4">
                  {order?.data?.map((e) => {
                     return (
                        <>
                           {/* card */}
                           <div
                              className="p-10 group relative 
shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
                           >
                              <div className="justify-between flex ">
                                 <div className="col-span-2 flex items-center gap-4">
                                    <input
                                       className="checkbox checkbox-sm items-center"
                                       type="checkbox"
                                    />
                                    <div className="flex items-center gap-1">
                                       <p className="text-[#4C4C4C] font-bold text-base">
                                          Đơn hàng:{" "}
                                       </p>
                                       <p className="text-[#1A1A1A] font-bold text-base mr-3">
                                          #000{e.id}
                                       </p>
                                       <div className="badge badge-xs badge-accent py-3 px-3">
                                          <p className="font-bold text-xs text-white ">
                                             {e.paymentMethod == "Thẻ tín dụng"
                                                ? "Đã thanh toán"
                                                : "Chưa thanh toán"}
                                          </p>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="col-span-2">
                                    <p className="text-[#EA4B48] text-2xl font-bold">
                                       {numberFormat(e.amountTotal)}
                                    </p>
                                 </div>
                              </div>
                              <div className="mx-9">
                                 <div className="my-2 flex items-center gap-2">
                                    {/* calendarIcon */}
                                    <div>
                                       <Calendar />
                                    </div>
                                    {/* end calendarIcon */}
                                    <div className="flex">
                                       <p className="text-[#4C4C4C] font-bold text-sm">
                                          {formatDate(e.createdAt)}
                                       </p>
                                       <div className=" border-r-2 border-[#4C4C4C] mx-2"></div>
                                       <div className="flex items-center gap-2">
                                          <p className="text-[#4C4C4C] font-bold text-sm">
                                             Mã vận đơn:
                                          </p>
                                          <p className="text-[#EA4B48] font-bold text-sm">
                                             SPXR24
                                          </p>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="flex items-center mt-5 gap-5">
                                    {/* Select box */}
                                    <div className="relative h-10 w-[142px] min-w-[200px]">
                                       <select className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
                                          <option value="pending">
                                             Chờ xác nhận
                                          </option>
                                          <option value="in-transit">
                                             Đang vận chuyển
                                          </option>
                                          <option value="delivered">
                                             Đã giao hàng
                                          </option>
                                          <option value="cancelled">
                                             Đã hủy
                                          </option>
                                       </select>
                                       <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                          Trạng thái
                                       </label>
                                    </div>
                                    {/* end Select box  */}
                                    <div className="badge badge-xs badge-error py-3 px-5">
                                       <p className="font-bold text-xs text-white ">
                                          Mới
                                       </p>
                                    </div>
                                 </div>
                                 <div className="grid grid-cols-3 mt-4 ">
                                    {e.OrderDetail.map((items) => {
                                       return (
                                          <>
                                             {/* San pham */}
                                             <div
                                                className="py-[16px] items-center"
                                                key={items.name}
                                             >
                                                <div className="col-span-2 text-sm flex gap-4 items-center">
                                                   {items.image && (
                                                      <img
                                                         className="w-[50px] h-[50px] object-contain"
                                                         src={items.image}
                                                         alt=""
                                                      />
                                                   )}
                                                   <div>
                                                      <p className="text-sm font-bold text-[#393939] max-[870px]:text-[13px]">
                                                         {items.name}
                                                      </p>
                                                      <p className="text-xs text-[#1A1A1A] max-[870px]:text-[13px]">
                                                         SL:{" "}
                                                         <span className="text-[#4C4C4C]">
                                                            x{items.quantity}
                                                         </span>
                                                      </p>
                                                   </div>
                                                </div>
                                             </div>
                                             {/* end San pham */}
                                          </>
                                       );
                                    })}
                                 </div>
                              </div>
                              <div className="group-hover:opacity-100 flex absolute top-1/3 transform -translate-y-1/2 right-0 space-x-2 p-4 opacity-0 transition-opacity duration-500 ease-in-out">
                                 <button className="btn btn-outline hover:bg-[#E0E0E0] hover:text-[#4C4C4C] px-4 py-1 flex">
                                    <Print />
                                    <p>Print</p>
                                 </button>
                                 <button className="btn btn-outline hover:bg-[#E0E0E0] hover:text-[#4C4C4C] px-4 py-1 flex">
                                    <p>Cập nhật</p>
                                 </button>
                                 <button
                                    className="btn btn-outline hover:bg-[#E0E0E0] hover:text-[#4C4C4C] px-4 py-1 flex"
                                    onClick={() => {
                                       navigate(`${e.id}`);
                                    }}
                                 >
                                    <p>Xem chi tiết</p>
                                 </button>
                              </div>
                           </div>
                           {/* end card */}
                        </>
                     );
                  })}
                  <ResponsivePagination
                     current={currentPage}
                     total={order.totalPage}
                     onPageChange={setCurrentPage}
                     maxWidth={500}
                  />
               </div>
            </div>
         </div>
      </Container>
   );
}
