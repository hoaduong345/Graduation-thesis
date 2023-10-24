import axios from "axios"
import { OrderModel } from "../Model/OrderModel"

const appConfig = {
    apiUrl: import.meta.env.VITE_BACKEND_ORDER_URL || ''
}

class OrderControllers {

    create = async (data: any) => {
        return await axios.post(`${appConfig.apiUrl}`, { order: data })
    }

    get = async () => {
        return await axios.get(`${appConfig.apiUrl}`, {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }, withCredentials: true
        })
    }

    getDetails = async (id: number): Promise<OrderModel> => {
        return await axios.get(`${appConfig.apiUrl}/${id}`).then((res) => {
            return res.data as OrderModel
        })
    }
}

export const orderControllers = new OrderControllers