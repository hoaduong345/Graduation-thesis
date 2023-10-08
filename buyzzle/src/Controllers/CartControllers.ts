import axios from "axios"

const appConfig = {
    apiUrl: import.meta.env.VITE_BACKEND_CART_URL || ''
}

export interface ModelCart {
    productId: number,
    quantity: number,
}

class CartControllers {
    addCart = async (data: ModelCart): Promise<ModelCart> => {
        return await axios.post(`${appConfig.apiUrl}`, data, {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }, withCredentials: true
        })
    }

    getCart = async (): Promise<ModelCart[]> => {
        return await axios.get(`${appConfig.apiUrl}`, {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }, withCredentials: true
        }).then(res => {
            return res.data as ModelCart[]
        })
    }
}

export const cartControllers = new CartControllers