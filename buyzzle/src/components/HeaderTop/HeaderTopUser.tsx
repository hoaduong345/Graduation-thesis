import { useEffect, useState } from "react";
import NotificationUser from "../Notification/NotificationUser";
import HeaderTop from "./HeaderTop";
import { NotificationModel } from "../../Model/Notification";
import { notificationControllers } from "../../Controllers/NotificationController";

export default function HeaderTopUser() {
  const [countNotification, setCountNotification] = useState<NotificationModel>(
    {} as NotificationModel
  );
  useEffect(() => {
    getCountNoti();
  }, []);
  const getCountNoti = async () => {
    await notificationControllers.getAllNotificationUser().then((res) => {
      setCountNotification(res);
    });
  };
  return (
    <>
      <HeaderTop
        countNoti={countNotification.countNotification}
        noti={<NotificationUser />}
      />
    </>
  );
}
