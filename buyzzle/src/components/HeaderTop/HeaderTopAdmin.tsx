import { useEffect, useState } from "react";
import { notificationControllers } from "../../Controllers/NotificationController";
import { NotificationModel } from "../../Model/Notification";
import NotificationAdmin from "../Notification/NotificationAdmin";
import HeaderTop from "./HeaderTop";

export default function HeaderTopAdmin() {
  const [countNotification, setCountNotification] = useState<NotificationModel>(
    {} as NotificationModel
  );
  useEffect(() => {
    getCountNoti();
  }, []);
  const getCountNoti = async () => {
    await notificationControllers.getAllNotificationAdmin().then((res) => {
      setCountNotification(res);
    });
  };
  return (
    <>
      <HeaderTop
        countNoti={countNotification.countNotification}
        noti={<NotificationAdmin />}
      />
    </>
  );
}
