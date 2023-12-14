import { ProductDetail } from "./ProductModel";

// export interface CartModel {
//   status: boolean;
//   data: CartProduct;
// }
// export interface CartProduct {
//   userId: number;
//   subtotal: number;
//   item: CartItem[];
// }
// export interface CartItem {
//   id?: number;
//   productid: number;
//   quantity: number;
//   cartid: number;
//   product: ProductDetail;
//   total: number;
// }

export interface CartModel {
  status: boolean;
  data: DataCart;
}

export interface DataCart {
  id: number;
  userId: number;
  subtotal: number;
  deletedAt: any;
  item: CartItem[];
}

export interface CartItem {
  id: number;
  productid: number;
  cartid: number;
  atributesId: number;
  quantity: number;
  price: number;
  total: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: any;
  atributes_fk: AtributesFk;
  product: ProductDetail;
}

export interface AtributesFk {
  id: number;
  size: string;
  color: string;
  soluong: number;
  productId: number;
  itemId: any;
  deletedAt: any;
  createdAt: string;
  updatedAt: string;
}
