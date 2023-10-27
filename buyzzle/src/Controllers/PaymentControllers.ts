import axios from "axios"
import { StripePayment } from "../pages/home/User/CheckoutPage/PaymentBtn"

const appConfig = {
    apiUrl: import.meta.env.VITE_BACKEND_PAYMENT_URL || ''
}

class PaymentControllers {
    createPayment = async (data: StripePayment) => {
        return await axios.post(`${appConfig.apiUrl}/create-checkout-session`, data)
    }
}

export const paymentControllers = new PaymentControllers