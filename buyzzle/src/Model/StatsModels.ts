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

  sortedCategoriesToday: SortedCategoriesToday


}

export interface SortedCategoriesToday {
  yesterday: yesterdaystats[]
  yesterday_1: yesterdaystats_1[]
  yesterday_2: yesterdaystats_2[]
  yesterday_3: yesterdaystats_3[]
  yesterday_4: yesterdaystats_4[]
  yesterday_5: yesterdaystats_5[]
  yesterday_6: yesterdaystats_6[]
}

export interface yesterdaystats {
  category: Category
  totalSoldCount: number
}

export interface Category {
  id: number
  name: string
  date: string
  updatedAt: string
  createdAt: string
  image: string
  deletedAt: any
  products: Product[]
}

export interface Product {
  id: number
  name: string
  price: number
  rate: number
  pricesale: number
  sellingPrice: number
  discount: number
  soldcount: number
  quantity: number
  description: string
  status: any
  date: string
  deletedAt: any
  createdAt: string
  updatedAt: string
  categoryID: number
}


export interface yesterdaystats_1 {
  category: Category_1
  totalSoldCount: number
}

export interface Category_1 {
  id: number
  name: string
  date: string
  updatedAt: string
  createdAt: string
  image: string
  deletedAt: any
  products: Product_1[]
}

export interface Product_1 {
  id: number
  name: string
  price: number
  rate: number
  pricesale: number
  sellingPrice: number
  discount: number
  soldcount: number
  quantity: number
  description: string
  status: any
  date: string
  deletedAt: any
  createdAt: string
  updatedAt: string
  categoryID: number
}


export interface yesterdaystats_2 {
  category: Category_2
  totalSoldCount: number
}

export interface Category_2 {
  id: number
  name: string
  date: string
  updatedAt: string
  createdAt: string
  image: string
  deletedAt: any
  products: Product_2[]
}

export interface Product_2 {
  id: number
  name: string
  price: number
  rate: number
  pricesale: number
  sellingPrice: number
  discount: number
  soldcount: number
  quantity: number
  description: string
  status: any
  date: string
  deletedAt: any
  createdAt: string
  updatedAt: string
  categoryID: number
}


export interface yesterdaystats_3 {
  category: Category_3
  totalSoldCount: number
}

export interface Category_3 {
  id: number
  name: string
  date: string
  updatedAt: string
  createdAt: string
  image: string
  deletedAt: any
  products: Product_3[]
}

export interface Product_3 {
  id: number
  name: string
  price: number
  rate: number
  pricesale: number
  sellingPrice: number
  discount: number
  soldcount: number
  quantity: number
  description: string
  status: any
  date: string
  deletedAt: any
  createdAt: string
  updatedAt: string
  categoryID: number
}



export interface yesterdaystats_4 {
  category: Category_4
  totalSoldCount: number
}

export interface Category_4 {
  id: number
  name: string
  date: string
  updatedAt: string
  createdAt: string
  image: string
  deletedAt: any
  products: Product_4[]
}

export interface Product_4 {
  id: number
  name: string
  price: number
  rate: number
  pricesale: number
  sellingPrice: number
  discount: number
  soldcount: number
  quantity: number
  description: string
  status: any
  date: string
  deletedAt: any
  createdAt: string
  updatedAt: string
  categoryID: number
}


export interface yesterdaystats_5 {
  category: Category_5
  totalSoldCount: number
}

export interface Category_5 {
  id: number
  name: string
  date: string
  updatedAt: string
  createdAt: string
  image: string
  deletedAt: any
  products: Product_5[]
}

export interface Product_5 {
  id: number
  name: string
  price: number
  rate: number
  pricesale: number
  sellingPrice: number
  discount: number
  soldcount: number
  quantity: number
  description: string
  status: any
  date: string
  deletedAt: any
  createdAt: string
  updatedAt: string
  categoryID: number
}



export interface yesterdaystats_6 {
  category: Category_6
  totalSoldCount: number
}

export interface Category_6 {
  id: number
  name: string
  date: string
  updatedAt: string
  createdAt: string
  image: string
  deletedAt: any
  products: Product_6[]
}

export interface Product_6 {
  id: number
  name: string
  price: number
  rate: number
  pricesale: number
  sellingPrice: number
  discount: number
  soldcount: number
  quantity: number
  description: string
  status: any
  date: string
  deletedAt: any
  createdAt: string
  updatedAt: string
  categoryID: number
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