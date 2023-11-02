import axios from "axios"
import { OrderModel } from "../Model/OrderModel"

const appConfig = {
    apiUrl: import.meta.env.VITE_BACKEND_ORDER_URL || ''
}

class OrderControllers {

    create = async (data: any) => {
        return await axios.post(`${appConfig.apiUrl}`, { order: data })
    }

    getUser = async () => {
        return await axios.get(`${appConfig.apiUrl}`, {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }, withCredentials: true
        })
    }

    getAdmin = async (page: number) => {
        return await axios.get(`${appConfig.apiUrl}/admin/listOrder?page=${page}`).then((res) => {
            return res.data
        })
    }

    getDetails = async (id: number): Promise<OrderModel> => {
        return await axios.get(`${appConfig.apiUrl}/${id}`).then((res) => {
            return res.data as OrderModel
        })
    }

    putRatingAt = async (idOrder: number, productId: number, orderDetailId?: number) => {
        return await axios.put(`${appConfig.apiUrl}/${idOrder}`, { productId: productId, orderDetailId: orderDetailId })
    }
}

export const orderControllers = new OrderControllers