import { Cate } from "../components/home/components/Category"

export interface Voucher {
    data: VoucherModel[]
    totalPage: number
}

export interface VoucherModel {
    id?: number,
    code: string,
    quantity: number,
    startDay: Date,
    endDay: Date,
    categoryId: number
    fK_category?: Cate
}