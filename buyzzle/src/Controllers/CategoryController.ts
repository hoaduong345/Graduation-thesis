import axios from "axios"
import { FormValues } from "../pages/home/Admin/Category/Category"


export const appConfig = {
    apiUrl: import.meta.env.VITE_BACKEND_URL || ''
}

export interface ModelProducts {
    name: string,
    price: number,
    rate: number,
    pricesale: number,
    sellingPrice: number,
    discount: number,
    soldcount: number,
    quantity: number
    description: string,
    status: string,
    productId: number,
    categoryID: number,
};

class CategoryController {
    remove = async (id: number) => {
        return await axios.delete(`${appConfig.apiUrl}/deletecategory/${id}`)
    }
    update = async (id: number, data: FormValues) => {
        return await axios.put(`${appConfig.apiUrl}/updatecategory/${id}`, data)
    }
    getAll = async () => {
        return await axios.get(`${appConfig.apiUrl}/allcategory`)
    }
    create = async (data: FormValues): Promise<FormValues> => {
        return await axios.post(`${appConfig.apiUrl}/addcategory`, data).then((res) => {
            return res.data as FormValues
        })
    }
}

export const categoryController = new CategoryController()