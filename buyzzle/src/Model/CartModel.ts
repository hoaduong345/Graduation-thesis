import { Product } from "./ProductModel"

export interface CartModel {
    status: boolean,
    data: CartProduct,
}
interface CartProduct {
    userId: number,
    subtotal: number,
    item: CartItem[]
}
interface CartItem {

    quantity: number,
    product: Product
}
