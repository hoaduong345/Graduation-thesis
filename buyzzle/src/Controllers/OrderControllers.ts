import axios from "axios";
import { OrderModel } from "../Model/OrderModel";

const appConfig = {
  apiOrder: import.meta.env.VITE_BACKEND_ORDER_URL || "",
  apiShipping: import.meta.env.VITE_BACKEND_SHIPPING_URL || "",
};

export interface orderModelController {
  page?: number;
  pageSize?: number;
  keyword?: string;
  status?: number | null;
}
class OrderControllers {
  create = async (data: any) => {
    return await axios.post(`${appConfig.apiOrder}`, { order: data });
  };

  getOrderOfUser = async () => {
    return await axios.get(`${appConfig.apiOrder}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      withCredentials: true,
    });
  };

  getDetails = async (id: number): Promise<OrderModel> => {
    return await axios.get(`${appConfig.apiOrder}/${id}`).then((res) => {
      return res.data as OrderModel;
    });
  };

  putRatingAt = async (
    idOrder: number,
    productId: number,
    orderDetailId?: number
  ) => {
    return await axios.put(`${appConfig.apiOrder}/${idOrder}`, {
      productId: productId,
      orderDetailId: orderDetailId,
    });
  };

  setStatus = async (id: number, status: number) => {
    return await axios.post(`${appConfig.apiShipping}/setStatus`, {
      id: id,
      status: status,
    });
  };

  abortOrder = async (id: number) => {
    return await axios.post(`${appConfig.apiShipping}/setStatus`, {
      id: id,
      status: 0,
    });
  };

  getOrderOfShipping = async (data: orderModelController) => {
    return await axios.post(`${appConfig.apiShipping}`, data).then((res) => {
      return res.data;
    });
  };
  getOrderOfAdmin = async (data: orderModelController) => {
    return await axios
      .post(`${appConfig.apiShipping}/manager`, data)
      .then((res) => {
        return res.data;
      });
  };
}

export const orderControllers = new OrderControllers();
