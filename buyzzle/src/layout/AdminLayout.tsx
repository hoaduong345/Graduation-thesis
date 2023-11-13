import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import Footer from "../components/Footer/Footer";
import HeaderAdmin from "../components/Header/HeaderAdmin";
import { Images } from "../Assets/TS";
import CustomToast from "../Helper/Toast/CustomToast";

function AdminLayout() {
  const [deletedOrder, setDeletedOrder] = useState(null);

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
          iconSVG={
            <span className="absolute bottom-0 right-0 inline-flex items-center justify-center w-6 h-6 bg-red-600 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
                fill="white"
              >
                <path d="M367.2 412.5L99.5 144.8C77.1 176.1 64 214.5 64 256c0 106 86 192 192 192c41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3C434.9 335.9 448 297.5 448 256c0-106-86-192-192-192c-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z" />
              </svg>
            </span>
          }
          name={
            <p className="text-sm font-semibold text-gray-900 ">
              Nguyen Viet Thang
            </p>
          }
          content={
            <p className="text-sm font-normal text-red-700">
              Đã gửi yêu cầu hủy hàng
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

  useEffect(() => {
    const socket = io("http://localhost:5000");
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
          iconSVG={
            <span className="absolute bottom-0 right-0 inline-flex items-center justify-center w-6 h-6 bg-blue-600 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 448 512"
                fill="white"
              >
                <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
              </svg>
            </span>
          }
          name={
            <p className="text-sm font-semibold text-gray-900 ">
              Nguyen Viet Thang
            </p>
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
  return (
    <div>
      <HeaderAdmin />
      <Outlet />
      <Footer />
    </div>
  );
}

export default AdminLayout;
