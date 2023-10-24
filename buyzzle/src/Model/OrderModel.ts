export interface OrderModel {
    id: number,
    iduser: number,
    subtotal: number
    shipping: number,
    discount: number,
    amountTotal: number,
    createdAt: string,
    status: string;
    OrderDetail: OrderItems[]
}
export interface OrderItems {
    productId: number,
    name: string,
    price: number,
    quantity: number,
    image: string
    total: number
}