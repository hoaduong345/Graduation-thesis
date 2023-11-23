import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import CancelOrder from "../../layout/asset/TSX/CancelOrder";
import NewOrder from "../../layout/asset/TSX/NewOrder";
import { AllNotification, NotificationModel } from "../../model/Notification";
import { notificationControllers } from "../../controllers/NotificationController";
import CustomToast from "../../helper/Toast/CustomToast";
import { userController } from "../../controllers/UserController";

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
          JSON.stringify(res)
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
    socket.on("requestdelete", (older) => {
      console.log("Received deleted order dataaaaaaaaaaaaaa:", older);
      const urlTaker = older.User.UserImage;

      toast(
        <CustomToast
          image={
            <img
              className="w-12 h-12 rounded-full"
              src={`${
                urlTaker?.length > 0
                  ? urlTaker[0]?.url
                  : "https://media.istockphoto.com/id/1223671392/vi/vec-to/%E1%BA%A3nh-h%E1%BB%93-s%C6%A1-m%E1%BA%B7c-%C4%91%E1%BB%8Bnh-h%C3%ACnh-%C4%91%E1%BA%A1i-di%E1%BB%87n-ch%E1%BB%97-d%C3%A0nh-s%E1%BA%B5n-cho-%E1%BA%A3nh-minh-h%E1%BB%8Da-vect%C6%A1.jpg?s=612x612&w=0&k=20&c=l9x3h9RMD16-z4kNjo3z7DXVEORzkxKCMn2IVwn9liI="
              }`}
              alt="avatar_admin"
            />
          }
          iconSVG={<CancelOrder />}
          name={
            <p className="text-sm font-semibold text-gray-900 ">{older.name}</p>
          }
          content={
            <p className="text-sm font-normal text-red-700">
              Đã gửi yêu cầu hủy hàng
            </p>
          }
        />,
        {
          position: "bottom-left",
          autoClose: 100000,
          closeButton: true,
        }
      );
      // });

      setCountNotificationAdmin((prevState) => ({
        ...prevState,
        countNotification: prevState.countNotification + 1,
      }));
      getAllNotiAdmin();
      setDeletedOrder(older);
    });
    socket.on("newOrder", (newOrder) => {
      console.log("NewOrderr:", newOrder);
      userController.getUserWhereUsername(newOrder.username).then((res) => {
        console.log(
          "🚀 ~ file: Header.tsx:76 ~ userController.getUserWhereUsername ~ res:",
          res
        );
        const UserImageArray = JSON.stringify(res.UserImage);
        const urlTaker = JSON.parse(UserImageArray);

        toast(
          <CustomToast
            image={
              <img
                className="w-12 h-12 rounded-full"
                src={`${
                  urlTaker?.length > 0
                    ? urlTaker[0]?.url
                    : "https://media.istockphoto.com/id/1223671392/vi/vec-to/%E1%BA%A3nh-h%E1%BB%93-s%C6%A1-m%E1%BA%B7c-%C4%91%E1%BB%8Bnh-h%C3%ACnh-%C4%91%E1%BA%A1i-di%E1%BB%87n-ch%E1%BB%97-d%C3%A0nh-s%E1%BA%B5n-cho-%E1%BA%A3nh-minh-h%E1%BB%8Da-vect%C6%A1.jpg?s=612x612&w=0&k=20&c=l9x3h9RMD16-z4kNjo3z7DXVEORzkxKCMn2IVwn9liI="
                }`}
                alt="avatar_admin"
              />
            }
            iconSVG={<NewOrder />}
            name={
              <p className="text-sm font-semibold text-gray-900 ">
                {newOrder.name}
              </p>
            }
            content={
              <p className="text-sm font-normal text-[#739072]">
                Có 1 đơn hàng mới
              </p>
            }
          />,
          {
            position: "bottom-left",
            autoClose: 10000,
            closeButton: true,
          }
        );
      });

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
    // ImgUser,
    getAllNotiAdmin,
  };
}
type NotificationContextType = ReturnType<typeof useNotificationContextAdmin>;

export const NotificationContextAdmin = createContext<NotificationContextType>(
  {} as NotificationContextType
);

export const useNotificationAdmin = () => useContext(NotificationContextAdmin);
