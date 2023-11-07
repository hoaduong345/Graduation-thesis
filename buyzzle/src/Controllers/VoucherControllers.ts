import axios from "axios";
import { Voucher, VoucherModel } from "../Model/VoucherModel";

const appConfig = {
  apiUrl: import.meta.env.VITE_BACKEND_VOUCHER_URL || "",
};

class VoucherControllers {
  get = async (page: number): Promise<Voucher> => {
    return await axios.get(`${appConfig.apiUrl}?page=${page}`).then((res) => {
      return res.data as Voucher;
    });
  };

  add = async (data: VoucherModel): Promise<VoucherModel> => {
    return await axios.post(`${appConfig.apiUrl}`, data).then((res) => {
      return res.data as VoucherModel;
    });
  };

  remove = async (id: number | undefined) => {
    return await axios.delete(`${appConfig.apiUrl}/${id}`);
  };

  update = async (id: number, data: VoucherModel): Promise<VoucherModel> => {
    return await axios.put(`${appConfig.apiUrl}/${id}`, data).then((res) => {
      return res.data as VoucherModel;
    });
  };
  userSavedVoucher = async (id: number): Promise<VoucherModel> => {
    return await axios
      .get(`${appConfig.apiUrl}/savevoucher/${id}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        return res.data as VoucherModel;
      });
  };
  GetUserSavedVoucher = async (id: number): Promise<VoucherModel> => {
    return await axios
      .get(`${appConfig.apiUrl}/getUser/${id}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        return res.data as VoucherModel;
      });
  };
  useVoucherMinusQuantity = async (id: number): Promise<VoucherModel> => {
    return await axios
      .get(`${appConfig.apiUrl}/usevoucher/${id}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        return res.data as VoucherModel;
      });
  };
}
export const voucherControllers = new VoucherControllers();
