import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import Footer from "../components/Footer/Footer";
import HeaderAdmin from "../components/Header/HeaderAdmin";
import { Images } from "../Assets/TS";

function AdminLayout() {
  const [deletedOrder, setDeletedOrder] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:5000");
    socket.on("requestdelete", (newOrder) => {
      console.log("Received deleted order data:", newOrder);
      toast.warn(
        <div>
          <img src={Images.avatar_admin} alt="Custom Toast" />
          <button onClick={() => alert("Button Clicked")}>Custom Button</button>
        </div>,
        {
          position: "bottom-left",
          autoClose: 5000,
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
