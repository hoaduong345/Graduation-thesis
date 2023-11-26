import { createContext, useContext, useEffect, useState } from "react";
import { AllNotification, NotificationModel } from "../../model/Notification";
import { notificationControllers } from "../../controllers/NotificationController";
import { toast } from "react-toastify";
import CustomToast from "../../helper/Toast/CustomToast";
import BuyzzleAvt from "../../layout/asset/TSX/BuyzzleAvt";
import NewOrder from "../../layout/asset/TSX/NewOrder";
import { io } from "socket.io-client";

export default function useNotificationContextUser() {
  const [countNotificationUser, setCountNotificationUser] =
    useState<NotificationModel>({} as NotificationModel);

  const [notificationUser, setNotificationUser] = useState<AllNotification[]>(
    []
  );
  const [socketUser, setsocketUser] = useState(null);

  useEffect(() => {
    getCountNoti();
  }, []);
  const getCountNoti = async () => {
    await notificationControllers.getAllNotificationUser().then((res) => {
      console.log(
        "🚀 ~ file: HeaderTopUser.tsx:16 ~ awaitnotificationControllers.getAllNotificationUser ~ res:",
        res
      );
      setCountNotificationUser(res);
    });
  };
  //   ================================================ SOCKET IO NOTIFICATION User ================================================

  useEffect(() => {
    getAllNotiUser();
  }, []);
  const getAllNotiUser = async () => {
    await notificationControllers
      .getAllNotificationUser()
      .then((res) => {
        console.log(
          "🚀 ~ file: NotificationContextShipping.tsx:36 ~ .then ~ res:",
          res
        );
        setNotificationUser(res.allNotification);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const idUser = localStorage.getItem("idUser");
    console.log("🚀 ~ file: MainLayout.tsx:22 ~ useEffect ~ idUser:", idUser);
    if (!idUser) return;
    const socket = io("http://localhost:5000");
    socket.on(`confirmCancelOrder/${idUser}`, (confirmCancelOrder) => {
      toast(
        <a href={`/orderdetail/${confirmCancelOrder.id}`}>
          <CustomToast
            image={<BuyzzleAvt />}
            iconSVG={<NewOrder />}
            name={
              <p className="text-sm font-semibold text-gray-900 ">
                Buyzzle thông báo
              </p>
            }
            content={
              <p className="text-sm font-normal text-[#739072]">
                Yêu cầu hủy đơn của quý khách đã được xác nhận
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
      setsocketUser(confirmCancelOrder);
    });
    socket.on(`deliverysuccessfully/${idUser}`, (deliverysuccessfully) => {
      toast(
        <a href={`/orderdetail/${deliverysuccessfully.id}`}>
          <CustomToast
            image={<BuyzzleAvt />}
            iconSVG={<NewOrder />}
            name={
              <p className="text-sm font-semibold text-gray-900 ">
                Buyzzle thông báo
              </p>
            }
            content={
              <p className="text-sm font-normal text-[#739072]">
                Đã giao hàng thành công
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
      setsocketUser(deliverysuccessfully);
    });
    socket.on("disconnect", () => {
      console.log(socket.id);
    });
  }, [socketUser]);
  return {
    countNotificationUser,
    notificationUser,
    getAllNotiUser,
  };
}
type NotificationContextType = ReturnType<typeof useNotificationContextUser>;

export const NotificationContextUser = createContext<NotificationContextType>(
  {} as NotificationContextType
);

export const useNotificationUser = () => useContext(NotificationContextUser);
