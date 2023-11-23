import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { Images } from "../../assets/TS";
import { notificationControllers } from "../../controllers/NotificationController";
import CustomToast from "../../helper/Toast/CustomToast";
import { AllNotification, NotificationModel } from "../../model/Notification";
import CancelOrder from "../../layout/asset/TSX/CancelOrder";
import NewOrder from "../../layout/asset/TSX/NewOrder";

export default function useNotificationContextAdmin() {
  const [countNotificationAdmin, setCountNotificationAdmin] =
    useState<NotificationModel>({} as NotificationModel);

  const [notificationAdmin, setNotificationAdmin] = useState<AllNotification[]>(
    []
  );

  useEffect(() => {
    getCountNoti();
  }, []);
  const getCountNoti = async () => {
    await notificationControllers.getAllNotificationAdmin().then((res) => {
      console.log(
        "🚀 ~ file: NotificationContextAdmin.tsx:24 ~ awaitnotificationControllers.getAllNotificationAdmin ~ res:",
        res
      );
      setCountNotificationAdmin(res);
    });
  };

  const nameUser = localStorage.getItem("nameUser");
  const userData = JSON.parse(nameUser!);

  //   ================================================ SOCKET IO NOTIFICATION ADMIN ================================================
  useEffect(() => {
    getAllNotiAdmin();
  }, []);
  const getAllNotiAdmin = async () => {
    await notificationControllers
      .getAllNotificationAdmin()
      .then((res) => {
        console.log(
          "🚀 ~ file: Notification.tsx:54 ~ awaitnotificationControllers.getAllNotification ~ res:",
          res
        );
        setNotificationAdmin(res.allNotification);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [deletedOrder, setDeletedOrder] = useState(null);
  useEffect(() => {
    const socket = io("http://localhost:5000");
    socket.on("requestdelete", (requestdelete) => {
      console.log("Received deleted order data:", requestdelete);
      toast(
        <a href={`/admin/ordermanagement/${requestdelete.id}`}>
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
          />
        </a>,
        {
          position: "bottom-left",
          autoClose: 100000,
          closeButton: true,
        }
      );
      setCountNotificationAdmin((prevState) => ({
        ...prevState,
        countNotification: prevState.countNotification + 1,
      }));
      getAllNotiAdmin();
      setDeletedOrder(requestdelete);
    });
    socket.on("newOrder", (newOrder) => {
      console.log("Received deleted order data newOrder:", newOrder);
      toast(
        <a href={`/admin/ordermanagement/${newOrder.id}`}>
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
          />
        </a>,
        {
          position: "bottom-left",
          autoClose: 10000,
          closeButton: true,
        }
      );
      setCountNotificationAdmin((prevState) => ({
        ...prevState,
        countNotification: prevState.countNotification + 1,
      }));
      getAllNotiAdmin();
      setDeletedOrder(newOrder);
    });
    socket.on("disconnect", () => {
      console.log(socket.id);
    });
  }, [deletedOrder]);

  return {
    setNotification: setNotificationAdmin,
    // admin
    notificationAdmin,
    countNotificationAdmin,
    getAllNotiAdmin,
  };
}
type NotificationContextType = ReturnType<typeof useNotificationContextAdmin>;

export const NotificationContextAdmin = createContext<NotificationContextType>(
  {} as NotificationContextType
);

export const useNotificationAdmin = () => useContext(NotificationContextAdmin);
