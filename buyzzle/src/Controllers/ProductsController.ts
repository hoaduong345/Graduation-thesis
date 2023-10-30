import axios from "axios"
import { FormValues } from "../pages/home/Admin/EditProduct/EditProductMap"
import { Products } from "../pages/home/User/FilterPage/FiltersPage"

export const appConfig = {
    apiUrl: import.meta.env.VITE_BACKEND_URL || ''
}

export interface ModelProducts {
    name?: string,
     idCate?:number,
     min?: number,
      max?: number
};
class ProductController {
    getList = async (data:ModelProducts): Promise<Products[]> => {
        return await axios.get(`${appConfig.apiUrl}/allproducts?keyword=${data.name}&categoryId=${data.idCate}&minPrice=${data.min}&maxPrice=${data.max}`).then((res) => {
            return res.data as Products[]
        })
    }
    getProductWithIdCate = async (id:number): Promise<Products[]> => {
        return await axios.get(`${appConfig.apiUrl}/allproducts?categoryId=${id}`).then((res) => {
            return res.data as Products[]
        })
    }
    getNameCate = async ( nameCate:string,min?: number, max?: number): Promise<Products[]> => {
        return await axios.get(`${appConfig.apiUrl}/allproducts?categoryName=${nameCate}&minPrice=${min}&maxPrice=${max}`).then((res) => {
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
    getSearchAndPaginationProduct = async (name?: string | undefined, page?: number, pageSize?: number): Promise<Products[]> => {
        return await axios.get(`${appConfig.apiUrl}/allproducts?keyword=${name}`).then((res) => {
            return res.data as Products[]
        })
    }
    getSortProductbyPrice = async (key: string, idCate:number): Promise<Products[]> => {
        return await axios.get(`${appConfig.apiUrl}/allproducts?sortByPrice=${key}&categoryId=${idCate}`).then((res) => {
            return res.data as Products[]
        })
    }
    getSortProductbyDateCreate = async (key: string, idCate:number): Promise<Products[]> => {
        return await axios.get(`${appConfig.apiUrl}/allproducts?sortByDateCreate=${key}&categoryId=${idCate}`).then((res) => {
            return res.data as Products[]
        })
    }
    getFilterProductWithinRangeIDCategory = async (name?: string | undefined,min?: number, max?: number): Promise<Products[]> => {
        return await axios.get(`${appConfig.apiUrl}/allproducts?keyword=${name}&minPrice=${min}&maxPrice=${max}`).then((res) => {
            return res.data as Products[]
        })
    }
    getFilterProductbyPriceAndQuantityAndPurchaseWithinRangePagination = async (minPrice: number, maxPrice: number, page: number, pageSize: number, minQuantity: number, maxQuantity: number,minPurchase:number,maxPurchase:number): Promise<Products[]> => {
        return await axios.get(`${appConfig.apiUrl}/allproducts?minPrice=${minPrice}&maxPrice=${maxPrice}&page=${page}&pageSize=${pageSize}&minQuantity=${minQuantity}&maxQuantity=${maxQuantity}&minPurchase=${minPurchase}&maxPurchase=${maxPurchase}`).then((res) => {
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
   
    getProductWhereRatting = async (rate: number): Promise<Products[]> => {
        return await axios.get(`${appConfig.apiUrl}/allproducts?rating=${rate}`).then((res) => {
            return res.data as Products[]
        })
    }
}

export const productController = new ProductController()