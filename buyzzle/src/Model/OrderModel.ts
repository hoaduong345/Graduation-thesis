export interface OrderPanigation {
  data: OrderModel[];
  page: number;
  pageSize: number;
  totalPage: number;
  totalOrder: number;
  statusCounts: StatusCounts;
  totalOrderShipping: number;
}
export interface StatusCounts {
  orderStatus1: number;
  orderStatus4: number;
  orderStatus0: number;
  orderStatus2: number;
  orderStatus3: number;
  orderStatus10: number;
  orderStatus5: number;
}
export interface OrderModel {
  id: number;
  iduser: number;
  subtotal: number;
  shipping: number;
  discount: number;
  amountTotal: number;
  paymentMethod: string;
  createdAt: Date;
  status: StatusOrder;
  _paymentStatus: string;
  invoice: string;
  note: string;
  name: string;
  address: string;
  phoneNumber: number;
  OrderDetail: OrderItems[];
}
export interface OrderItems {
  id?: number;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  total: number;
  ratingAt?: Date;
}

export enum StatusOrder {
  Comfirm,
  Ordered,
  WaitingCourier, // Giao cho Đơn vị Vận tải (ĐVVT)
  recievedCourier,
  Shipping, //Đang trên đường giao hàng
  Succed, // Giao hàng thành công
}
