import axios from "axios";
import { FormValues } from "../pages/home/Shipping/RegisterShipper/RegisterShipper";
import { FormLoginValues } from "../pages/home/Shipping/LoginShipper/LoginShipper";
// import { Products } from "../pages/home/User/FilterPage/FiltersPage"
import { users } from "../pages/home/Admin/Management/User/User";
import { userStatus } from "../pages/home/Admin/DetailUser/Components/AccountStatus";
export const appConfig = {
  apiUrl: import.meta.env.VITE_BACKEND_SHIPPING_WITHOUT_BUYZZLE_URL || "",
};

class ShipperController {
  registerShipper = async (FormValues: FormValues) => {
    return await axios
      .post(`${appConfig.apiUrl}/management/register`,FormValues)
      .then((res) => {
        return res.data;
      });
  };
  loginShipper = async (FormValues: FormLoginValues) => {
    return await axios
      .post(`${appConfig.apiUrl}/management/login`,FormValues)
      .then((res) => {
        return res.data;
      });
  };
  getAllShipper = async () => {
    return await axios
      .get(`${appConfig.apiUrl}/management/allshipping`)
      .then((res) => {
        return res.data;
      });
  };
  getShipperWhereUsername = async (username: string | undefined) => {
    return await axios
      .get(`${appConfig.apiUrl}/management/getShipping/${username}`)
      .then((res) => {
        return res.data;
      });
  };

  deleteShipperWhereId = async (id: string | undefined) => {
    return await axios
      .delete(`${appConfig.apiUrl}/management/delete/${id}`)
      .then((res) => {
        return res.data;
      });
  };

}

export const shipperController = new ShipperController();
