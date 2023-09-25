import axios from "axios"
import { Products } from "../pages/home/User/FilterPage/FiltersPage"
import { FormValues } from "../pages/home/Admin/Addproduct/Addproducts"
import { async } from "@firebase/util"

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

class ImagesController {
    remove = async (id: number) => {
        return await axios.delete(`${appConfig.apiUrl}/deleteimagesbyproductid/${id}`)
    }
    update = async (id: number, data: FormValues) => {
        return await axios.put(`${appConfig.apiUrl}/updateimagesbyproductid/${id}`, data)
    }
}

export const imagesController = new ImagesController()