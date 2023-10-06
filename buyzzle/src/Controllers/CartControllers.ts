import axios from "axios"

const appConfig = {
    apiUrl: import.meta.env.VITE_BACKEND_CART_URL || ''
}

export interface ModelCart {
    productId: number,
    quantity: number,
    price: number,
    total: number
}

class CartControllers {
    addCart = async (data: ModelCart): Promise<ModelCart> => {
        return await axios.post(`${appConfig.apiUrl}`, data)
    }
}

export const cartControllers = new CartControllers