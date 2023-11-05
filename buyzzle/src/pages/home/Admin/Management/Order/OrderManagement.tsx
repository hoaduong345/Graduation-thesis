import { IonIcon } from "@ionic/react";
import { Input } from "@material-tailwind/react";
import moment from "moment";
import { useEffect, useState } from "react";
import ResponsivePagination from "react-responsive-pagination";
import { useNavigate } from "react-router-dom";
import Search from "../../../../../Assets/TSX/Search";
import { orderControllers } from "../../../../../Controllers/OrderControllers";
import { numberFormat } from "../../../../../Helper/Format";
import { OrderPanigation } from "../../../../../Model/OrderModel";
import Container from "../../../../../components/container/Container";
import { getStatusOrder } from "../../../User/OrderHistoryPage/OrderHistory";
import Calendar from "../../Assets/TSX/calendar";
import Excel from "../../Assets/TSX/excel";
import SitebarAdmin from "../../Sitebar/Sitebar";

export const dateOrder = (date: Date) => {
   return moment(date).format("L");
};
export const timeOrder = (date: Date) => {
   return moment(date).format("LT");
};

export default function OrderManagement() {
   const [order, setOrder] = useState<OrderPanigation>({} as OrderPanigation);
   const [currentPage, setCurrentPage] = useState<number>(1);

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
   console.log(
      "🚀 ~ file: OrderManagement.tsx:39 ~ OrderManagement ~ order?.totalOrder;:",
      order?.totalOrder
   );
   const [changeButton, setChangeButton] = useState([
      {
         id: 1,
         text: "Tất cả",
         active: true, // Thêm trường active
      },
      // {
      //    id: 2,
      //    text: "Mới",
      //    active: false, // Thêm trường active
      // },
      {
         id: 3,
         text: "Chờ xác nhận",
         active: false, // Thêm trường active
      },
      {
         id: 4,
         text: "Đã giao cho ĐVVC",
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
                           {btnItems.id == 1 && (
                              <div className="badge badge-xs badge-error badge-outline py-2">
                                 {order?.totalOrder}
                              </div>
                           )}
                           {btnItems.id == 2 && (
                              <div className="badge badge-xs badge-info badge-outline py-2">
                                 0
                              </div>
                           )}
                           {btnItems.id == 3 && (
                              <div className="badge badge-xs badge-secondary badge-outline py-2">
                                 0
                              </div>
                           )}
                           {btnItems.id == 4 && (
                              <div className="badge badge-xs badge-accent badge-outline py-2">
                                 0
                              </div>
                           )}
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
                  </div>
               </div>
               {/* end card search */}
               {/* checkBox and Printf */}
               <div className="grid grid-cols-2 items-center py-4 px-10">
                  <div className="col-span-2 flex items-center gap-4 justify-end">
                     <div className="hidden border-[#107C41] border-[1px] p-3 rounded-md hover:bg-[#d7fee1] cursor-pointer transition-all duration-150">
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
                                 <div className="col-span-2 flex items-center">
                                    <div className="flex items-center gap-1">
                                       <p className="text-[#4C4C4C] font-bold text-base">
                                          Đơn hàng:{" "}
                                       </p>
                                       <p className="text-[#1A1A1A] font-bold text-base mr-3">
                                          #00{e.id}
                                       </p>
                                    </div>
                                    <div className="flex items-center gap-1 border-l-2 border-[#4C4C4C] pl-2">
                                       <p className="text-[#4C4C4C] font-bold text-base">
                                          Khách Hàng:{" "}
                                       </p>
                                       <p className="text-[#1A1A1A] font-bold text-base mr-3">
                                          {e.name}
                                       </p>
                                    </div>
                                 </div>
                                 <div className="col-span-2">
                                    <p className="text-[#EA4B48] text-2xl font-bold">
                                       {numberFormat(e.amountTotal)}
                                    </p>
                                 </div>
                              </div>
                              <div className="">
                                 <div className="my-2 flex justify-between items-center gap-2">
                                    <div className="flex items-center">
                                       {/* calendarIcon */}
                                       <div>
                                          <Calendar />
                                       </div>
                                       {/* end calendarIcon */}
                                       <div className="flex">
                                          <p className="text-[#4C4C4C] font-bold text-sm">
                                             {dateOrder(e.createdAt)} lúc{" "}
                                             {timeOrder(e.createdAt)}
                                          </p>
                                          <div className=" border-r-2 border-[#4C4C4C] mx-2"></div>
                                          <div className="badge badge-xs badge-accent text-center py-2 px-3">
                                             <p className="font-bold text-xs text-white">
                                                {e.paymentMethod ==
                                                "Thẻ tín dụng"
                                                   ? "Đã thanh toán"
                                                   : "Chưa thanh toán"}
                                             </p>
                                          </div>
                                          {/* <div className=" border-r-2 border-[#4C4C4C] mx-2"></div>
                                          <div className="flex items-center gap-2">
                                             <p className="text-[#4C4C4C] font-bold text-sm">
                                                Mã vận đơn:
                                             </p>
                                             <p className="text-[#EA4B48] font-bold text-sm">
                                                SPXR24
                                             </p>
                                          </div> */}
                                       </div>
                                    </div>

                                    {e.invoice == "true" ? (
                                       <>
                                          <div className="flex justify-end items-center gap-2">
                                             <p className="text-[#4C4C4C] font-bold text-sm">
                                                Yêu cầu:
                                             </p>
                                             <p className="text-[#EA4B48] font-bold text-sm">
                                                In Hóa đơn
                                             </p>
                                          </div>
                                       </>
                                    ) : (
                                       <></>
                                    )}
                                 </div>
                                 <div className="flex items-center mt-5 gap-5">
                                    <div className="max-w-max">
                                       {/* Select box */}
                                       <Input
                                          crossOrigin=""
                                          label="Trạng thái"
                                          value={getStatusOrder(e.status)}
                                       />
                                    </div>
                                    {/* end Select box  */}
                                    {/* <div className="badge badge-xs badge-error py-3 px-5">
                                       <p className="font-bold text-xs text-white ">
                                          Mới
                                       </p>
                                    </div> */}
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
                              <div className="group-hover:opacity-100 flex absolute top-[50%] transform -translate-y-1/2 right-0 space-x-2 p-4 opacity-0 transition-opacity duration-500 ease-in-out">
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
