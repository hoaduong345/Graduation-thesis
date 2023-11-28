import axios from "axios";
// import { Products } from "../pages/home/User/FilterPage/FiltersPage"
import { users } from "../pages/home/admin/Management/User/User";
export const appConfig = {
  apiUrl: import.meta.env.VITE_BACKEND_USER_URL || "",
};
export const appConfigAuth = {
  apiUrl: import.meta.env.VITE_BACKEND_AUTH_URL || "",
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
  CheckToken = async () => {
    const instance = axios.create({
      withCredentials: true,
    });
    // const reponse = await instance.post(API);
    // console.log(reponse);
    return await instance
      .post(`${appConfigAuth.apiUrl}/1`)
      .then((res) => {
        return res.data;

      })
  };
  CheckRefreshToken = async () => {
    try {
      const instance = axios.create({
        withCredentials: true,
      });
      // const reponse = await instance.post(API);
      // console.log(reponse);
      return await instance
        .post(`${appConfigAuth.apiUrl}/refresh`)
        .then((res) => {
          return res.data;
        })
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 300) {
          console.log("HetHanToken");
          localStorage.removeItem("user");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("nameUser");
          localStorage.removeItem("idUser");
          localStorage.removeItem("avatarUser");
          alert("Phiên đăng nhập đã hết hạn vui lòng đăng nhập lại để tiếp tục!");
          window.location.href = "/";
        }

      }
    }

  };
}

export const userController = new UserController();
