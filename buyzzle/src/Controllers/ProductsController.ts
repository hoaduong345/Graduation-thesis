import axios from "axios"
import { FormValues } from "../pages/home/Admin/EditProduct/EditProductMap"
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
    getList = async (name: string | undefined, nameCate:string): Promise<Products[]> => {
        return await axios.get(`${appConfig.apiUrl}/allproducts?keyword=${name}&categoryName=${nameCate}`).then((res) => {
            return res.data as Products[]
        })
    }
    getAllProducts = async (): Promise<Products[]> => {
        return await axios.get(`${appConfig.apiUrl}/allproducts`).then((res) => {
            return res.data as Products[]
        })
    }
    getAllProductsSearch = async (name: string | undefined): Promise<Products[]> => {
        return await axios.get(`${appConfig.apiUrl}/allproducts?keyword=${name}`).then((res) => {
            return res.data as Products[]
        })
    }
    getSearchProduct = async (name: string | undefined): Promise<Products[]> => {
        return await axios.get(`${appConfig.apiUrl}/allproducts?keyword=${name}`).then((res) => {
            return res.data as Products[]
        })
    }
    getSearchAndPaginationProduct = async (name?: string | undefined, page?: number, pageSize?: number): Promise<Products[]> => {
        return await axios.get(`${appConfig.apiUrl}/allproducts?keyword=${name}&page=${page}&pageSize=${pageSize}`).then((res) => {
            return res.data as Products[]
        })
    }
    getSortProductbyPrice = async (key: string, nameCate:string): Promise<Products[]> => {
        return await axios.get(`${appConfig.apiUrl}/allproducts?sortByPrice=${key}&categoryName=${nameCate}`).then((res) => {
            return res.data as Products[]
        })
    }
    getSortProductbyDateCreate = async (key: string, nameCate:string): Promise<Products[]> => {
        return await axios.get(`${appConfig.apiUrl}/allproducts?sortByDateCreate=${key}&categoryName=${nameCate}`).then((res) => {
            return res.data as Products[]
        })
    }
    getFilterProductWithinRangeIDCategory = async (min: number, max: number, nameCate:string): Promise<Products[]> => {
        return await axios.get(`${appConfig.apiUrl}/allproducts?minPrice=${min}&maxPrice=${max}&categoryName=${nameCate}`).then((res) => {
            return res.data as Products[]
        })
    }
    getFilterProductbyPriceAndQuantityAndPurchaseWithinRangePagination = async (minPrice: number, maxPrice: number, page: number, pageSize: number, minQuantity: number, maxQuantity: number,minPurchase:number,maxPurchase:number): Promise<Products[]> => {
        return await axios.get(`${appConfig.apiUrl}/allproducts?minPrice=${minPrice}&maxPrice=${maxPrice}&page=${page}&pageSize=${pageSize}&minQuantity=${minQuantity}&maxQuantity=${maxQuantity}&minPurchase=${minPurchase}&maxPurchase=${maxPurchase}`).then((res) => {
            return res.data as Products[]
        })
    }
    // getFilterProductbyQuantityWithinRangePagination = async (minQuantity: number, maxQuantity: number, page: number, pageSize: number): Promise<Products[]> => {
    //     return await axios.get(`${appConfig.apiUrl}/allproducts?minQuantity=${minQuantity}&maxQuantity=${maxQuantity}&page=${page}&pageSize=${pageSize}`).then((res) => {
    //         return res.data as Products[]
    //     })
    // }
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
    getProductSoldOut = async (soldOut: string): Promise<Products[]> => {
        return await axios.get(`${appConfig.apiUrl}/allproducts/${soldOut}`).then((res) => {
            return res.data as Products[]
        })
    }
    getProductAvailability = async (availability:string): Promise<Products[]> => {
        return await axios.get(`${appConfig.apiUrl}/allproducts/${availability}`).then((res) => {
            return res.data as Products[]
        })
    }
    getProductInStockAndSoldOut = async (inStockOrsoldOut?:string): Promise<Products[]> => {
        return await axios.get(`${appConfig.apiUrl}/allproducts?availabilityType=${inStockOrsoldOut}`).then((res) => {
            return res.data as Products[]
        })
    }
   
}

export const productController = new ProductController()