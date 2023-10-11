import { Products } from "./ProductModel"


export interface CartModel {
    status: boolean,
    data: CartProduct,
}
interface CartProduct {
    userId: number,
    subtotal: number,
    item: CartItem[]
}
export interface CartItem {
    productid: number,
    quantity: number,
    cartid: number,
    product: Products
    total: number
}
