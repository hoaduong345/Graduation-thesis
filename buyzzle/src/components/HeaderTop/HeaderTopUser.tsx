import { useNotificationUser } from "../../hooks/Notification/NotificationContextUser";
import NotificationUser from "../Notification/NotificationUser";
import HeaderTop from "./HeaderTop";

export default function HeaderTopUser() {
  const { countNotificationUser } = useNotificationUser();

  return (
    <>
      <HeaderTop
        countNoti={
          countNotificationUser ? countNotificationUser.countNotification : 0
        }
        noti={<NotificationUser />}
      />
    </>
  );
}
