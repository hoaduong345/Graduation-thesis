export interface Rate {
    averageRating: number,
    Rating: Rating[]
}
export interface Rating {
    id: number
    idproduct: number
    iduser: number
    ratingValue: number
    comment: string
    createdAt: Date
    product: {
        quantity: number
    }
    user: {
        username: string,
    }
};
