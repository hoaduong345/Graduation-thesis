import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import HeaderShipping from "../components/Header/HeaderShipping";
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
      <HeaderShipping />
      <Outlet />
    </div>
  );
}

export default ShippingLayout;
