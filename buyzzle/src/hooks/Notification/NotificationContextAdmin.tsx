import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import CancelOrder from "../../layout/asset/TSX/CancelOrder";
import NewOrder from "../../layout/asset/TSX/NewOrder";
import { AllNotification, NotificationModel } from "../../model/Notification";
import { notificationControllers } from "../../controllers/NotificationController";
import CustomToast from "../../helper/Toast/CustomToast";
import { userController } from "../../controllers/UserController";
import AvtDefautl from "./assets/AvtDefautl";

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
      console.log("Received deleted order dataaaaaaaaaaaaaa:", requestdelete);
      const urlTaker = requestdelete.User.UserImage;

      toast(
        <a href={`/admin/ordermanagement/${requestdelete.id}`}>
          <CustomToast
            image={
              <>
                {urlTaker?.length > 0 ? (
                  <img
                    className="w-12 h-12 rounded-full"
                    src={`${urlTaker[0]?.url}`}
                    alt="avatar_admin"
                  />
                ) : (
                  <AvtDefautl />
                )}
              </>
            }
            iconSVG={<CancelOrder />}
            name={
              <p className="text-sm font-semibold text-gray-900 ">
                {requestdelete.name}
              </p>
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
      console.log("NewOrderr:", newOrder);
      userController
        .getUserWhereUsername(newOrder.user.username)
        .then((res) => {
          console.log(
            "🚀 ~ file: Header.tsx:76 ~ userController.getUserWhereUsername ~ res:",
            res
          );
          const UserImageArray = JSON.stringify(res.UserImage);
          const urlTaker = JSON.parse(UserImageArray);

          toast(
            <a href={`/admin/ordermanagement/${newOrder.order.id}`}>
              <CustomToast
                image={
                  <>
                    {urlTaker?.length > 0 ? (
                      <img
                        className="w-12 h-12 rounded-full"
                        src={`${urlTaker[0]?.url}`}
                        alt="avatar_admin"
                      />
                    ) : (
                      <AvtDefautl />
                    )}
                  </>
                }
                iconSVG={<NewOrder />}
                name={
                  <p className="text-sm font-semibold text-gray-900 ">
                    {newOrder.user.name}
                  </p>
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
