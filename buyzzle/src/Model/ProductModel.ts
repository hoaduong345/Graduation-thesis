export interface ProductDetail {
    id: number
    name: string
    price: number
    rate: any
    pricesale: number
    sellingPrice: number
    discount: number
    soldcount: any
    quantity: number
    description: string
    status: any
    date: string
    createdAt: string
    updatedAt: string
    categoryID: number
    ProductImage: ProductImage[]
}
export interface Rate {
    FlashsaleProducts: FlashsaleProduct[]
    currentPage: number
    totalRatings: number
    productDetail: ProductDetail
    rows: Row[]
    averageRating: number
    Rating: Rating[]
}

export interface FlashsaleProduct {
    id: number
    name: string
    price: number
    rate: any
    pricesale: number
    sellingPrice: number
    discount: number
    soldcount: any
    quantity: number
    description: string
    status: any
    date: string
    createdAt: string
    updatedAt: string
    categoryID: number
}

export interface Row {
    id: number
    name: string
    price: number
    rate: any
    pricesale: number
    sellingPrice: number
    discount: number
    soldcount?: number
    quantity: number
    description: string
    status: any
    date: string
    createdAt: string
    updatedAt: string
    categoryID: number
    ProductImage: ProductImage[]
    fK_category: FKCategory
    Rating: Rating[]
}

export interface ProductImage {
    id: number
    url: string
    idproduct: number
}

export interface FKCategory {
    id: number
    name: string
    date: string
    updatedAt: string
    createdAt: string
    image: string
}

export interface Rating {
    id: number
    idproduct: number
    iduser: number
    ratingValue: number
    comment: string
    createdAt: string
    updatedAt: string
    user: User
    product: Product
}

export interface User {
    username: string
}

export interface Product {
    quantity: number
}
