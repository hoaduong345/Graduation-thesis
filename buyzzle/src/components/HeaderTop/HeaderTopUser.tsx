import { useEffect, useState } from "react";
import NotificationUser from "../Notification/NotificationUser";
import HeaderTop from "./HeaderTop";
import { NotificationModel } from "../../model/Notification";
import { notificationControllers } from "../../controllers/NotificationController";

export default function HeaderTopUser() {
  const [countNotification, setCountNotification] = useState<NotificationModel>(
    {} as NotificationModel
  );
  useEffect(() => {
    getCountNoti();
  }, []);
  const getCountNoti = async () => {
    await notificationControllers.getAllNotificationUser().then((res) => {
      console.log(
        "🚀 ~ file: HeaderTopUser.tsx:16 ~ awaitnotificationControllers.getAllNotificationUser ~ res:",
        res
      );
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
