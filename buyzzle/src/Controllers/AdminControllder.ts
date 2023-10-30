import axios from "axios";
import { FormValues } from "../pages/home/Admin/Addproduct/Addproducts";
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

  

}

export const adminController = new AdminController();
