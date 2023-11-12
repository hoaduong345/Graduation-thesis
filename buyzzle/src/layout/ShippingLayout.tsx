import { Outlet } from "react-router-dom";
import HeaderAdmin from "../components/Header/HeaderAdmin";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
function ShippingLayout() {
  // Socket Noti Admin -> Shipping ==========
  const [deletedOrder, setDeletedOrder] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:5000");
    socket.on("setstatus", (newOrder) => {
      console.log("Received deleted order data:", newOrder);
      toast.info("Có đơn hàng mới từ admin", {
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
    </div>
  );
}

export default ShippingLayout;
