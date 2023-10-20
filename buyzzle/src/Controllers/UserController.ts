import axios from "axios";
import { FormValues } from "../pages/home/Admin/Addproduct/Addproducts";
// import { Products } from "../pages/home/User/FilterPage/FiltersPage"
import { users } from "../pages/home/Admin/Management/User/User";
import { userStatus } from "../pages/home/Admin/DetailUser/Components/AccountStatus";
export const appConfig = {
  apiUrl: import.meta.env.VITE_BACKEND_USER_URL || "",
};

export interface ModelUser {
  id: string;
  email: string;
  username: string;
  // password: string,
  name: string;
  phonenumber: string;
  image: string;
  dateOfBirth: Date;
  sex: boolean;
  UserImage: string[];
  addresstype: string;
  address: string;
  specificaddress: string;
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

  getAllUser = async () => {
    return await axios.get(`${appConfig.apiUrl}/alluser`).then((res) => {
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
  getStatusUser =async (username: string| undefined) => {
    return await axios.get(`${appConfig.apiUrl}/getaccountstatus/${username}`).then((res) => {
      return res.data;
    });
  }

}

export const userController = new UserController();
