import { notificationControllers } from "../../../controllers/NotificationController";

export const handleSeenNoti = async (id: number) => {
  await notificationControllers
    .getSeenNotification(id)
    .then((_) => {})
    .catch((err) => {
      console.log(err);
    });
};
