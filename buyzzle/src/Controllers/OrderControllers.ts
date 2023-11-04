import axios from "axios"
import { OrderModel } from "../Model/OrderModel"

const appConfig = {
    apiOrder: import.meta.env.VITE_BACKEND_ORDER_URL || '',
    apiShipping: import.meta.env.VITE_BACKEND_SHIPPING_URL || '',
}

class OrderControllers {

    create = async (data: any) => {
        return await axios.post(`${appConfig.apiOrder}`, { order: data })
    }

    getUser = async () => {
        return await axios.get(`${appConfig.apiOrder}`, {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }, withCredentials: true
        })
    }

    getAdmin = async (page: number) => {
        return await axios.get(`${appConfig.apiOrder}/admin/listOrder?page=${page}`).then((res) => {
            return res.data
        })
    }

    getDetails = async (id: number): Promise<OrderModel> => {
        return await axios.get(`${appConfig.apiOrder}/${id}`).then((res) => {
            return res.data as OrderModel
        })
    }

    putRatingAt = async (idOrder: number, productId: number, orderDetailId?: number) => {
        return await axios.put(`${appConfig.apiOrder}/${idOrder}`, { productId: productId, orderDetailId: orderDetailId })
    }


    setStatus = async (id: number, status: number) => {
        return await axios.post(`${appConfig.apiShipping}`, { id: id, status: status })
    }

    getShipping = async (page: number) => {
        return await axios.get(`${appConfig.apiShipping}?page=${page}`).then((res) => {
            return res.data
        })
    }
}

export const orderControllers = new OrderControllers