export interface Voucher {
    data: VoucherModel[]
    totalPage: number
}
export interface VoucherModel {
    id: number,
    code: string,
    quantity: number,
    startDay: Date,
    endDay: Date,
    discount: number
}