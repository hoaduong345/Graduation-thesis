import Container from "../container/Container";
import avatar from "../../Assets/Images/Avtcmt.png";
import { ToastContainer, toast } from "react-toastify";

import { io } from "socket.io-client";
import { useEffect, useState } from "react";

export default function Notification() {
  const [deletedOrder, setDeletedOrder] = useState(null);
  useEffect(() => {
    const socket = io("http://localhost:5000");
    socket.on("requestdelete", (deletedOrderData) => {
      console.log("Received deleted order data:", deletedOrderData);
      toast.success("Có yêu cầu huỷ đơn hàng", {
        position: "bottom-left",
        autoClose: 5000,
      });
      setDeletedOrder(deletedOrderData);
    });
    socket.on("disconnect", () => {
      console.log(socket.id);
    });
  }, []);

  useEffect(() => {
    const socket = io("http://localhost:5000");
    socket.on("setstatus", (statusOrder) => {
      console.log("Received deleted order data:", statusOrder);
      toast.success("Có đơn hàng mới delivery", {
        position: "bottom-left",
        autoClose: 5000,
      });
      setDeletedOrder(statusOrder);
    });
    socket.on("disconnect", () => {
      console.log(socket.id);
    });
  }, []);
  useEffect(() => {
    const socket = io("http://localhost:5000");
    socket.on("newOrder", (newOrder) => {
      console.log("Received deleted order data:", newOrder);
      toast.success("Có đơn hàng mới admin", {
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
    <Container>
      <div className="w-full">
        <details className="dropdown">
          <summary className="m-2 btn">open or close</summary>
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 w-full flex-col">
            <li className=" flex-row">
              <img src={avatar} alt="" className="w-28 h-28" />
              <a href="" className="font-bold">
                {" "}
                Đây là tên
              </a>
              <a>thông báo đây nè</a>
            </li>
          </ul>
        </details>
      </div>
    </Container>
  );
}
