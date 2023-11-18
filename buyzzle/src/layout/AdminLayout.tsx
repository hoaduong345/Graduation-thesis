import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import Footer from "../components/Footer/Footer";
import HeaderAdmin from "../components/Header/HeaderAdmin";
import { Images } from "../Assets/TS";
import CustomToast from "../Helper/Toast/CustomToast";
import CancelOrder from "./asset/TSX/CancelOrder";
import NewOrder from "./asset/TSX/NewOrder";
import { User } from "../Model/Notification";
import { userController } from "../Controllers/UserController";

function AdminLayout() {
  const [deletedOrder, setDeletedOrder] = useState(null);
  const nameUser = localStorage.getItem("nameUser");
  console.log(
    "🚀 ~ file: AdminLayout.tsx:19 ~ AdminLayout ~ nameUser:",
    nameUser
  );
  const userData = JSON.parse(nameUser!);
  console.log(
    "🚀 ~ file: AdminLayout.tsx:21 ~ AdminLayout ~ username:",
    userData
  );
  useEffect(() => {
    const socket = io("http://localhost:5000");
    socket.on("requestdelete", (newOrder) => {
      console.log("Received deleted order data:", newOrder);
      toast(
        <CustomToast
          image={
            <img
              className="w-12 h-12 rounded-full"
              src={Images.avatar_admin}
              alt="avatar_admin"
            />
          }
          iconSVG={<CancelOrder />}
          name={
            <p className="text-sm font-semibold text-gray-900 ">{userData}</p>
          }
          content={
            <p className="text-sm font-normal text-red-700">
              Đã gửi yêu cầu hủy hàng
            </p>
          }
        />,
        {
          position: "bottom-left",
          autoClose: 100000,
          closeButton: true,
        }
      );
      setDeletedOrder(newOrder);
    });
    socket.on("newOrder", (newOrder) => {
      console.log("Received deleted order data:", newOrder);
      toast(
        <CustomToast
          image={
            <img
              className="w-12 h-12 rounded-full"
              src={Images.avatar_admin}
              alt="avatar_admin"
            />
          }
          iconSVG={<NewOrder />}
          name={
            <p className="text-sm font-semibold text-gray-900 ">{userData}</p>
          }
          content={
            <p className="text-sm font-normal text-[#739072]">
              Có 1 đơn hàng mới
            </p>
          }
        />,
        {
          position: "bottom-left",
          autoClose: 10000,
          closeButton: true,
        }
      );
      setDeletedOrder(newOrder);
    });
    socket.on("disconnect", () => {
      console.log(socket.id);
    });
  }, []);

  // useEffect(() => {
  //   const socket = io("http://localhost:5000");
  //   socket.on("newOrder", (newOrder) => {
  //     console.log("Received deleted order data:", newOrder);
  //     toast(
  //       <CustomToast
  //         image={
  //           <img
  //             className="w-12 h-12 rounded-full"
  //             src={Images.avatar_admin}
  //             alt="avatar_admin"
  //           />
  //         }
  //         iconSVG={<NewOrder />}
  //         name={
  //           <p className="text-sm font-semibold text-gray-900 ">{userData}</p>
  //         }
  //         content={
  //           <p className="text-sm font-normal text-[#739072]">
  //             Có 1 đơn hàng mới
  //           </p>
  //         }
  //       />,
  //       {
  //         position: "bottom-left",
  //         autoClose: 10000,
  //         closeButton: true,
  //       }
  //     );
  //     setDeletedOrder(newOrder);
  //   });
  //   socket.on("disconnect", () => {
  //     console.log(socket.id);
  //   });
  // }, []);
  return (
    <div>
      <HeaderAdmin />
      <Outlet />
      <Footer />
    </div>
  );
}

export default AdminLayout;
