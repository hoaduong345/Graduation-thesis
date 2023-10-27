import { ReactNode } from "react";
import HomeSitebar from "../Assets/Icon/homeSitebar";
import Statistical from "../Assets/Icon/Statistical";
import ProductIcon from "../Assets/Icon/ProductIcon";
import EventIcon from "../Assets/Icon/EventIcon";
import Members from "../Assets/Icon/Members";
import SalesIcon from "../Assets/Icon/SalesIcon";
import VouchersIcon from "../Assets/Icon/VouchersIcon";
import SettingsIcon from "../Assets/Icon/SettingsIcon";
import Oder from "../Assets/Icon/Oder";
import MessagesIcon from "../Assets/Icon/MessagesIcon";
import { Link, useLocation } from "react-router-dom";
import CategoryIcon from "../Assets/Icon/CategoryIcon";
export interface SitebarAdmin {
   title: ReactNode;
   icon: ReactNode;
   pathName: string;
}
const listSitebar: SitebarAdmin[] = [
   {
      title: <p>Trang Chủ</p>,
      icon: <HomeSitebar />,
      pathName: "",
   },
   {
      title: "Thống Kê",
      icon: <Statistical />,
      pathName: "",
   },
   {
      title: "Sản Phẩm",
      icon: <ProductIcon />,
      pathName: "/admin/ListproductsAdmin",
   },
   {
      title: "Danh mục",
      icon: <CategoryIcon />,
      pathName: "/admin/category",
   },
   {
      title: "Sự Kiện",
      icon: <EventIcon />,
      pathName: "",
   },
   {
      title: "Thành Viên",
      icon: <Members />,
      pathName: "/admin/usersmanager",
   },

   {
      title: "Khuyễn Mãi",
      icon: <SalesIcon />,
      pathName: "",
   },
   {
      title: "Mã Giảm Giá",
      icon: <VouchersIcon />,
      pathName: "/admin/voucher",
   },
   {
      title: "Đơn Hàng",
      icon: <Oder />,
      pathName: "/admin/order",
   },
   {
      title: "Tin Nhắn",
      icon: <MessagesIcon />,
      pathName: "",
   },
   {
      title: "Cài Đặt",
      icon: <SettingsIcon />,
      pathName: "",
   },
];
export default function SitebarAdmin() {
   const { pathname } = useLocation();
   const loadBorder = (index: number) => {
      if ((index + 1) % 2 == 0) {
         return (
            <p className="border-dashed border-t-2 solid #E8E8EA w-[100%]"></p>
         );
      }
   };
   return (
      <div
         className="mt-28 py-8 px-5 w-56 rounded-[6px] mb-5 bg-white 
      shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]
      "
      >
         {listSitebar.map((element, index) => {
            return (
               <>
                  <div
                     className={`w-[100%] flex justify-start items-center py-2 gap-6 transition duration-200
                     hover:rounded-[6px] cursor-pointer hover:bg-[#FFEAE9] hover:text-[#EA4B48] pl-7 
                     ${
                        element.pathName == pathname
                           ? `bg-[#FFEAE9] rounded-[6px]`
                           : `bg-white`
                     }  `}
                  >
                     {element.icon}
                     <span className="text-sm font-normal ">
                        <Link to={element.pathName}>{element.title}</Link>
                     </span>
                  </div>
                  {loadBorder(index)}
               </>
            );
         })}
      </div>
   );
}
