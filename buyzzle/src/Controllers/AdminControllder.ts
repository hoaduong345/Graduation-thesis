import axios from "axios";
import { FormValues } from "../pages/home/Admin/Management/Admin/Admin";
import { FormValues1 } from "../pages/home/Admin/AdminProfile/Components/ChangePassword";
// import { Products } from "../pages/home/User/FilterPage/FiltersPage"
import { users } from "../pages/home/Admin/Management/User/User";
import { userStatus } from "../pages/home/Admin/DetailUser/Components/AccountStatus";
export const appConfig = {
  apiUrl: import.meta.env.VITE_BACKEND_ADMIN_URL || "",
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
}

class AdminController {
  getAdminWhereUsername = async (username: string | undefined) => {
    return await axios
      .get(`${appConfig.apiUrl}/chitietadmin/${username}`)
      .then((res) => {
        return res.data;
      });
  };
  getAllAdmin = async () => {
    return await axios
    .get(`${appConfig.apiUrl}/getalladmin`)
    .then((res) => {
      return res.data;
    });
  };
  AddAdmin = async (data:FormValues) => {
    return await axios
    .post(`${appConfig.apiUrl}/addadmin`,data)
    .then((res) => {
      return res.data;
    });
  };
  DeleteAdmin = async (id:any) => {
    return await axios
    .delete(`${appConfig.apiUrl}/deleteadmin/${id}`)
    .then((res) => {
      return res.data;
    });
  };
  ChangePasswordAdmin = async (id:any,data:FormValues1)=>{
    return await axios
    .post(`${appConfig.apiUrl}/changepassword/${id}`,data)
    .then((res) => {
      return res.data;
    });
  }

}

export const adminController = new AdminController();
