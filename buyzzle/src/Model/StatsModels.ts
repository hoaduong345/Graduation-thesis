export interface Statistics {
  
  //thong ke doanh thu va so luong san pham da duoc ban dua tren thang hien tai
  totalRevenueCurrentMonth: number
  totalQuantitySoldCurrentMonth: number
  productDetailsCurrentMonth: ProductDetailsCurrentMonth[]
  hotProductsCurrent: HotProductsCurrent[]

  //thong ke doanh thu va so luong san pham da duoc ban trong 7 ngaay
  totalRevenueLast7Days: number
  totalQuantitySoldLast7Days: number
  revenuePercentageLast7Days: string
  hotProductLast7days: HotProductLast7day[]

  //thong ke doanh thu va so luong san pham da duoc ban trong 15 ngaay
  totalRevenueLast15Days: number
  totalQuantitySoldLast15Days: number
  revenuePercentageLast15Days: string
  hotProductLast15days: HotProductLast15day[]

  //thong ke doanh thu va so luong san pham da duoc ban trong 30 ngaay
  totalRevenueLast30Days: number
  totalQuantitySoldLast30Days: number
  revenuePercentageLast30Days: string
  hotProductLast30days: HotProductLast30day[]

  //thong ke doanh thu va so luong san pham da duoc ban trong khoang thoi gian minh nhap vo
  totalRevenueInRange: number
  totalQuantitySoldInRange: number
  revenuePercentageInRange: string
  hotProductsInRange: HotProductsInRange[]

  //thong ke doanh thu va so luong san pham da duoc ban trong ngay hom nay
  totalRevenueToday: number
  totalQuantitySoldToday: number
  revenuePercentageToday: string
  hotProductsInToday: HotProductsInToday[]

}

export interface ProductDetailsCurrentMonth {
  name: string
  totalQuantityBought: number
  createdAt: string
}

export interface HotProductsCurrent {
  id: number
  orderId: number
  productId: number
  name: string
  image?: string
  price: number
  quantity: number
  total?: number
  createdAt: string
  updatedAt: string
  deletedAt: any
}

export interface HotProductLast7day {
  id: number
  orderId: number
  productId: number
  name: string
  image: string
  price: number
  quantity: number
  total: number
  createdAt: string
  updatedAt: string
  deletedAt: any
}

export interface HotProductLast15day {
  id: number
  orderId: number
  productId: number
  name: string
  image: string
  price: number
  quantity: number
  total: number
  createdAt: string
  updatedAt: string
  deletedAt: any
}

export interface HotProductLast30day {
  id: number
  orderId: number
  productId: number
  name: string
  image?: string
  price: number
  quantity: number
  total?: number
  createdAt: string
  updatedAt: string
  deletedAt: any
}

export interface HotProductsInRange {
  id: number
  orderId: number
  productId: number
  name: string
  image: any
  price: number
  quantity: number
  total: any
  createdAt: string
  updatedAt: string
  deletedAt: any
}

export interface HotProductsInToday {
  id: number
  orderId: number
  productId: number
  name: string
  image?: string
  price: number
  quantity: number
  total?: number
  createdAt: string
  updatedAt: string
  deletedAt: any
  productOrder: ProductOrder
}

export interface ProductOrder {
  id: number
  name: string
  soldcount: number
  createdAt: string
}
