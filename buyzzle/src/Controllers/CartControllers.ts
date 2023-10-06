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
console.log(appConfig.apiUrl)
class CartControllers {
    addCart = async (data: ModelCart): Promise<ModelCart> => {
        return await axios.post(`${appConfig.apiUrl}`, data).then(res => {
            return res.data as ModelCart
        })
    }
}

export const cartControllers = new CartControllers