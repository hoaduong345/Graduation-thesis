export interface Products {
    id: number;
    name: string;
    price: number;
    rate: number;
    pricesale: number;
    sellingPrice: number;
    discount: number;
    soldCount: number;
    quantity: number;
    description: string;
    status: string;
    date: string;
    fK_category: Cate;
    ProductImage: ImgOfProduct[];
}

interface Cate {
    id: number;
    name: string;
}
export interface ImgOfProduct {
    url: string;
}[];