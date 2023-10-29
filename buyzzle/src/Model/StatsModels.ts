export interface Statistics {
  
  //thong ke doanh thu va so luong san pham da duoc ban dua tren thang hien tai
  totalRevenueCurrentMonth: number
  totalQuantityCurrentMonth: number
  purchaseOrShoppingCurrentMonth: number
  revenuePercentageCurrent: string
  productSoldPercentageCurrent: string
  productDetailsCurrentMonth: ProductDetailsCurrentMonth[]
  hotProductsCurrent: HotProductsCurrent[]

  //thong ke doanh thu va so luong san pham da duoc ban trong 7 ngaay
  totalRevenueLast7Days: number
  totalQuantitySoldLast7Days: number
  purchaseOrShoppingLast7Days: number
  revenuePercentageLast7Days: string
  productSoldPercentageLast7Days: string
  hotProductLast7days: HotProductLast7day[]

  //thong ke doanh thu va so luong san pham da duoc ban trong 15 ngaay
  totalRevenueLast15Days: number
  totalQuantitySoldLast15Days: number
  purchaseOrShoppingLast15Days: number
  revenuePercentageLast15Days: string
  productSoldPercentageLast15Days: string
  hotProductLast15days: HotProductLast15day[]

  //thong ke doanh thu va so luong san pham da duoc ban trong 30 ngaay
  totalRevenueLast30Days: number
  totalQuantitySoldLast30Days: number
  purchaseOrShoppingLast30Days: number
  revenuePercentageLast30Days: string
  productSoldPercentageLast30Days: string
  hotProductLast30days: HotProductLast30day[]

  //thong ke doanh thu va so luong san pham da duoc ban trong khoang thoi gian minh nhap vo
  totalRevenueInRange: number
  totalQuantitySoldInRange: number
  purchaseOrShoppingInRange: number
  revenuePercentageInRange: string
  productSoldPercentageInRange: string
  hotProductsInRange: HotProductsInRange[]

  //thong ke doanh thu va so luong san pham da duoc ban trong ngay hom nay
  totalRevenueToday: number
  totalQuantity: number
  purchaseOrShoppingInToday: number
  revenuePercentageToday: string
  productSoldPercentageToday: string
  hotProductsInToday: HotProductsInToday[]

}

export interface ProductDetailsCurrentMonth {
  name: string
  totalQuantityBought: number
  createdAt: string
}

export interface HotProductsCurrent {
  _sum: productHotCurrentSum
  name: string
  productId: number
  total: number
  price:number
  id: number
  quantity: number
}
export interface productHotCurrentSum {
  quantity: number
}
export interface HotProductLast7day {
  _sum: productHotLast7daysSum
  name: string
  productId: number
  total: number
  price:number
  id: number
  quantity: number
}

export interface productHotLast7daysSum {
  quantity: number
}

export interface HotProductLast15day {
  _sum: productHotLast15daysSum
  name: string
  productId: number
  total: number
  price:number
  id: number
  quantity: number
}

export interface productHotLast15daysSum {
  quantity: number
}

export interface HotProductLast30day {
  _sum: productHotLast30daysSum
  name: string
  productId: number
  total: number
  price:number
  id: number
  quantity: number
}

export interface productHotLast30daysSum {
  quantity: number
}

export interface HotProductsInRange {
  _sum: productHotLastInRangeSum
  name: string
  productId: number
  total: number
  price:number
  id: number
  quantity: number
}

export interface productHotLastInRangeSum {
  quantity: number
}

export interface HotProductsInToday {
  _sum: productHotLastTodaySum
  name: string
  productId: number
  total: number
  price:number
  id: number
  quantity: number
}

export interface productHotLastTodaySum {
  quantity: number
}