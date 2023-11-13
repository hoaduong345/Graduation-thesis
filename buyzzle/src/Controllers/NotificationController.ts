import axios from "axios";
import { NotificationModel } from "../Model/Notification";

const appConfig = {
  apiShipping: import.meta.env.VITE_BACKEND_SHIPPING_URL || "",
};

class NotificationControllers {
  getAllNotification = async (): Promise<NotificationModel> => {
    return await axios
      .get(`${appConfig.apiShipping}/notification`)
      .then((res) => {
        return res.data as NotificationModel;
      });
  };
  getFilterNotification = async (
    status: number
  ): Promise<NotificationModel> => {
    return await axios
      .post(`${appConfig.apiShipping}/filter`, { status: status })
      .then((res) => {
        return res.data as NotificationModel;
      });
  };
  getSeenNotification = async (id: number): Promise<NotificationModel> => {
    return await axios
      .put(`${appConfig.apiShipping}/markasread`, { id: id })
      .then((res) => {
        return res.data as NotificationModel;
      });
  };
}
export const notificationControllers = new NotificationControllers();
