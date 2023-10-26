import { UserModel } from "./UserModel";

export interface OrderPanigation {
    data: OrderModel[],
    page: number,
    pageSize: number,
    totalPage: number
}
export interface OrderModel {
    id: number,
    iduser: number,
    subtotal: number
    shipping: number,
    discount: number,
    amountTotal: number,
    paymentMethod: string,
    createdAt: Date,
    status: string;
    User: UserModel
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