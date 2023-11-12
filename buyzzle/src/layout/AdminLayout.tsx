import { Outlet } from "react-router-dom";
import HeaderAdmin from "../components/Header/HeaderAdmin";
import Footer from "../components/Footer/Footer";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import Notification from "../components/Notification/Notification";

function AdminLayout() {
  const [deletedOrder, setDeletedOrder] = useState(null);
  useEffect(() => {
    const socket = io("http://localhost:5000");
    socket.on("requestdelete", (deletedOrderData) => {
      console.log("Received deleted order data:", deletedOrderData);
      toast.warn("Có yêu cầu huỷ đơn hàng từ người dùng", {
        position: "bottom-left",
        autoClose: 5000,
      });
      <Notification />;
      setDeletedOrder(deletedOrderData);
    });
    socket.on("disconnect", () => {
      console.log(socket.id);
    });
  }, []);

  useEffect(() => {
    const socket = io("http://localhost:5000");
    socket.on("newOrder", (newOrder) => {
      console.log("Received deleted order data:", newOrder);
      toast.info("Có đơn hàng mới từ người dùng", {
        position: "bottom-left",
        autoClose: 5000,
      });
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
