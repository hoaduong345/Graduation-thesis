import axios from "axios"
import { CategoryModal } from "../Model/CategoryModel"

export const appConfig = {
    apiUrl: import.meta.env.VITE_BACKEND_URL || '',
    apiCategories: import.meta.env.VITE_BACKEND_CATEGORIES_URL || ''
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
    update = async (id: number, data: CategoryModal) => {
        return await axios.put(`${appConfig.apiUrl}/updatecategory/${id}`, data)
    }
    getAll = async () => {
        return await axios.get(`${appConfig.apiUrl}/allcategory`)
    }
    create = async (data: CategoryModal): Promise<CategoryModal> => {
        return await axios.post(`${appConfig.apiUrl}/addcategory`, data).then((res) => {
            return res.data as CategoryModal
        })
    }

    createSubcateLv1 = async (cateID: number, name: string) => {
        const data = {
            categoryId: cateID,
            name: name
        }
        return await axios.post(`${appConfig.apiCategories}`, data)
    }

    getAllCate = async () => {
        return await axios.get(`${appConfig.apiCategories}`)
    }
}

export const categoryController = new CategoryController()