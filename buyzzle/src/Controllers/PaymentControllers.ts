import axios from "axios"
import { CartProduct } from "../Model/CartModel"

const appConfig = {
    apiUrl: import.meta.env.VITE_BACKEND_PAYMENT_URL || ''
}

class PaymentControllers {
    createPayment = async (data: CartProduct) => {
        return await axios.post(`${appConfig.apiUrl}/create-checkout-session`, data)
    }
}

export const paymentControllers = new PaymentControllers