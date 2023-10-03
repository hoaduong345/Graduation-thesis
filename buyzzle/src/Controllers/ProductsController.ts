import axios from "axios"
import { FormValues } from "../pages/home/Admin/Addproduct/Addproducts"
import { Products } from "../pages/home/User/FilterPage/FiltersPage"

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

class ProductController {
    getList = async (name: string | undefined, id: number): Promise<Products[]> => {
        return await axios.get(`${appConfig.apiUrl}/allproducts?keyword=${name}&categoryId=${id}`).then((res) => {
            return res.data as Products[]
        })
    }
    getAllProducts = async (): Promise<Products[]> => {
        return await axios.get(`${appConfig.apiUrl}/allproducts`).then((res) => {
            return res.data as Products[]
        })
    }
    getSearchProduct = async (name: string | undefined): Promise<Products[]> => {
        return await axios.get(`${appConfig.apiUrl}/allproducts?keyword=${name}`).then((res) => {
            return res.data as Products[]
        })
    }
    getSearchAndPaginationProduct = async (name: string | undefined, page: number, pageSize: number): Promise<Products[]> => {
        return await axios.get(`${appConfig.apiUrl}/allproducts?keyword=${name}&page=${page}&pageSize=${pageSize}`).then((res) => {
            return res.data as Products[]
        })
    }
    getSortProductbyPrice = async (key: string, id: number): Promise<Products[]> => {
        return await axios.get(`${appConfig.apiUrl}/allproducts?sortByPrice=${key}&categoryId=${id}`).then((res) => {
            return res.data as Products[]
        })
    }
    getSortProductbyDateCreate = async (key: string, id: number): Promise<Products[]> => {
        return await axios.get(`${appConfig.apiUrl}/allproducts?sortByDateCreate=${key}&categoryId=${id}`).then((res) => {
            return res.data as Products[]
        })
    }
    remove = async (id: number) => {
        return await axios.delete(`${appConfig.apiUrl}/deleteproduct/${id}`)
    }
    update = async (id: number, data: FormValues) => {
        return await axios.put(`${appConfig.apiUrl}/updateproduct/${id}`, data)
    }
    getProductSuggest = async (id: number): Promise<Products[]> => {
        return await axios.get(`${appConfig.apiUrl}/recommendedproducts/${id}`).then((res) => {
            return res.data as Products[]
        })
    }
}

export const productController = new ProductController()