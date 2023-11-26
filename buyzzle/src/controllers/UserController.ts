import axios from "axios";
// import { Products } from "../pages/home/User/FilterPage/FiltersPage"
import { users } from "../pages/home/admin/Management/User/User";
export const appConfig = {
  apiUrl: import.meta.env.VITE_BACKEND_USER_URL || "",
};
export interface userModel {
  page?: number;
  pageSize?: number;
  keyword?: string;
}

class UserController {
  getUserWhereUsername = async (username: string | undefined) => {
    return await axios
      .get(`${appConfig.apiUrl}/chitietuser/${username}`)
      .then((res) => {
        return res.data;
      });
  };

  getUserWhereUsername2 = async (username: string | undefined) => {
    return await axios
      .get(`${appConfig.apiUrl}/getpaymentaddress/${username}`)
      .then((res) => {
        return res.data;
      });
  };

  getAllUser = async (data: userModel) => {
    return await axios.post(`${appConfig.apiUrl}/alluser`, data).then((res) => {
      return res.data as users[];
    });
  };
  deleteUser = async (id: number) => {
    return await axios
      .delete(`${appConfig.apiUrl}/deleteregister/${id}`)
      .then((res) => {
        return res.data;
      });
  };
  getStatusUser = async (username: string | undefined) => {
    return await axios
      .get(`${appConfig.apiUrl}/getaccountstatus/${username}`)
      .then((res) => {
        return res.data;
      });
  };
}

export const userController = new UserController();
