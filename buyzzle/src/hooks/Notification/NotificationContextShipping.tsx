import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { notificationControllers } from "../../controllers/NotificationController";
import CustomToast from "../../helper/Toast/CustomToast";
import { AllNotification, NotificationModel } from "../../model/Notification";
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
          "🚀 ~ file: NotificationContextShipping.tsx:36 ~ .then ~ res:",
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
    socket.on("setstatus", (setstatus) => {
      console.log("Received deleted order data:", setstatus);
      toast(
        <a href={`/shipping/detail/${setstatus.id}`}>
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
          />
        </a>,
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
      setDeletedOrder(setstatus);
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
