import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import CustomToast from "../Helper/Toast/CustomToast";
import HeaderShipping from "../components/Header/HeaderShipping";
import BuyzzleAvt from "./asset/TSX/BuyzzleAvt";
import Shipping from "./asset/TSX/Shipping";
function ShippingLayout() {
  // Socket Noti Admin -> Shipping ==========
  const [deletedOrder, setDeletedOrder] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:5000");
    socket.on("setstatus", (newOrder) => {
      console.log("Received deleted order data:", newOrder);
      toast(
        <CustomToast
          image={<BuyzzleAvt />}
          iconSVG={<Shipping />}
          name={
            <p className="text-sm font-semibold text-gray-900 ">
              Buyzzle thông báo
            </p>
          }
          content={
            <p className="text-sm font-normal text-[#739072]">
              Có đơn hàng mới từ chúng tôi
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
