import { useEffect, useState } from "react";
import Bell from "../../Assets/TSX/Bell";
import Map from "../../Assets/TSX/Map";
import Notification from "../Notification/NotificationAdmin";
import { NotificationModel } from "../../Model/Notification";
import { notificationControllers } from "../../Controllers/NotificationController";
import NotificationShipping from "../Notification/NotificationShipping";
import HeaderTop from "./HeaderTop";

export default function HeaderTopShipping() {
  const [countNotification, setCountNotification] = useState<NotificationModel>(
    {} as NotificationModel
  );
  useEffect(() => {
    getCountNoti();
  }, []);
  const getCountNoti = async () => {
    await notificationControllers.getAllNotificationShipping().then((res) => {
      setCountNotification(res);
    });
  };
  return (
    <>
      <HeaderTop
        countNoti={countNotification.countNotification}
        noti={<NotificationShipping />}
      />
    </>
  );
}
