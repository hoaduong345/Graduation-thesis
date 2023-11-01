import { ReactNode, useEffect, useState } from "react";
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
import { adminController } from "../../../../Controllers/AdminControllder";
import { title } from "process";
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
    pathName: "/admin/statisticsPage",
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
    title: "Người dùng",
    icon: <Members />,
    pathName: "/admin/usersmanager",
  },

  {
    title: "Admin",
    icon: <Members />,
    pathName: "/admin/adminmanager",
  },
  {
    title: "Mã Giảm Giá",
    icon: <VouchersIcon />,
    pathName: "/admin/voucher",
  },
  {
    title: "Đơn Hàng",
    icon: <Oder />,
    pathName: "/admin/ordermanagement",
  },
  {
    title: "Tin Nhắn",
    icon: <MessagesIcon />,
    pathName: "",
  },
  // {
  //   title: "Cài Đặt",
  //   icon: <SettingsIcon />,
  //   pathName: "",
  // },

];

export default function SitebarAdmin() {
  // const listSitebar: SitebarAdmin[] = [];
  const { pathname } = useLocation();
  const [href, setHref] = useState<string>();
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [image, setImage] = useState<string>();
  const loadBorder = (index: number) => {
    if ((index + 1) % 2 == 0) {
      return (
        <p className="border-dashed border-t-2 solid #E8E8EA w-[100%]"></p>
      );
    }
  };
  function ImageLoad() {

  }
  useEffect(() => {
    const fetchData = async () => {
      const user = localStorage.getItem("user");
      try {
        if (user != null) {
          const UserData = (JSON.parse(user));
          const username = UserData.username;
          console.log("USERNAME: " + JSON.stringify(username));
          await adminController.getAdminWhereUsername(username)
            .then((res) => {

              const name = res.adminWithImage.name;
              const Image = res.adminWithImage.AdminImage.url;
              const email = res.adminWithImage.email;
              // const pathName = `/admin/adminprofile/${username}`
              setHref(`/admin/adminprofile/${username}`);
              setName(name);
              setImage(Image);
              setEmail(email);
              // newListSitebarItem(title);

              return res;
            })

        } else {
          console.log("Chua Dang Nhap Dung");
        }

      } catch (error) {
        console.log(
          "ERROR", error
        );
      }

    };

    // Call the fetchData function
    fetchData();
  }, [])

  return (
    <div
      className="mt-20 py-8 px-5 w-56 rounded-[6px] mb-5 bg-white 
      shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]
      "
    >
      {listSitebar.map((element, index) => {
        return (
          <>
            <div
              className={`w-[100%] flex justify-start items-center py-2 gap-6 transition duration-200
                     hover:rounded-[6px] cursor-pointer hover:bg-[#FFEAE9] hover:text-[#EA4B48] pl-7 
                     ${element.pathName == pathname
                  ? `bg-[#FFEAE9] rounded-[6px] text-[#EA4B48]`
                  : `bg-white text-[#7A828A]`
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
      <a className="ml-3 flex gap-2" href={href}>
        {image ? (
          <div className="relative">
            <img
              className="mt-[15px] w-10 h-10 rounded-2xl border-4 "
              src={image}
              alt=""
            />
          </div>
        ) : (
          <div className="mt-[15px] rounded-2xl border-4 pt-2 pb-2 ps-3.5 pe-3.5  bg-red-500">
            <p className="text-1xl text-stone-50">
              {name?.substring(0, 1).toUpperCase()}
            </p>
          </div>
        )}
        <div>
          <div className="mt-[17px] font-medium flex items-center justify-left">
            {name}
          </div>
          <div className="font-small flex items-center justify-left">
            <p className="text-[10px]">
              {email}
            </p>

          </div>
        </div>

      </a>

    </div>
  );
}
