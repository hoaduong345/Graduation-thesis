export interface Rate {
    averageRating: number
    Rating: Rating[]
    productDetail: ProductDetail
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

export interface ProductImage {
    id: number
    url: string
    idproduct: number
}
