import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { notificationControllers } from "../../Controllers/NotificationController";
import CustomToast from "../../Helper/Toast/CustomToast";
import { AllNotification, NotificationModel } from "../../Model/Notification";
import BuyzzleAvt from "../../layout/asset/TSX/BuyzzleAvt";
import Shipping from "../../layout/asset/TSX/Shipping";

export default function useNotificationContextShippping() {
  const [countNotificationShipping, setCountNotificationShipping] =
    useState<NotificationModel>({} as NotificationModel);

  const [notificationShipping, setNotificationShipping] = useState<
    AllNotification[]
  >([]);
  const [deletedOrder, setDeletedOrder] = useState(null);

  useEffect(() => {
    getCountNoti();
  }, []);
  const getCountNoti = async () => {
    await notificationControllers.getAllNotificationShipping().then((res) => {
      setCountNotificationShipping(res);
    });
  };

  //   ================================================ SOCKET IO NOTIFICATION SHIPPING ================================================
  useEffect(() => {
    getAllNotiShipping();
  }, []);
  const getAllNotiShipping = async () => {
    await notificationControllers
      .getAllNotificationShipping()
      .then((res) => {
        console.log(
          "🚀 ~ file: Notification.tsx:54 ~ awaitnotificationControllers.getAllNotification ~ res:",
          res
        );
        setNotificationShipping(res.allNotification);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
      setCountNotificationShipping((prevState) => ({
        ...prevState,
        countNotification: prevState.countNotification + 1,
      }));
      getAllNotiShipping();
      setDeletedOrder(newOrder);
    });
    socket.on("disconnect", () => {
      console.log(socket.id);
    });
  }, [deletedOrder]);
  return {
    // shipping
    notificationShipping,
    countNotificationShipping,
    getAllNotiShipping,
  };
}
type NotificationContextType = ReturnType<
  typeof useNotificationContextShippping
>;

export const NotificationContextShipping =
  createContext<NotificationContextType>({} as NotificationContextType);

export const useNotificationShipping = () =>
  useContext(NotificationContextShipping);
