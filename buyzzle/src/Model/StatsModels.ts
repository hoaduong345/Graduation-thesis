export interface Statistics {
    totalRevenue: number
    totalQuantitySold: number
    productsInfo: ProductsInfo
    totalRevenueCurrentMonth: number
    revenueGrowthPercentage: number
    totalQuantitySoldCurrentMonth: number
    quantitySoldComparisonPercentage: number
    hotProducts: hotProducts[]
  }
  
  export interface ProductsInfo {
    name: string
    totalQuantityBought: number
    createdAt: string
  }
  
  export interface hotProducts {
    id: number
    orderId: number
    productId: number
    name: any
    image: any
    price: number
    quantity: number
    total: any
    createdAt: string
    updatedAt: string
    deletedAt: any
  }