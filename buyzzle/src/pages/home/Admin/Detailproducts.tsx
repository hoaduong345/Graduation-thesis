import { type } from 'os'
import { useEffect, useState } from 'react'

import axios from 'axios'
import { error } from 'console'
import { Products } from '../User/FilterPage/FiltersPage'
import { useParams } from 'react-router-dom'

export type FormValues = {
    idproduct: number
    name: string;
    price: number;
    description: string;
    count: number;
    images: string;
}

export default function Detailproducts() {    
    const [first, setfirst] = useState<FormValues>()
    const {id} = useParams()
     console.log(id);
     

    useEffect(() => {
        axios.get(`http://localhost:5000/buyzzle/product/chitietproduct/${id}`)
            .then((detail) => {
                return detail
            })
            .then((detail) => {
                setfirst(detail.data)
            }).catch(error => {
                console.log("🚀 ~ file: Detailproducts.tsx:27 ~ .then ~ error:", error)
            })
    }, [])

    return (
        <>
            <h1>Tên sản phẩm: {first?.name}  </h1>
            <h1>Giá:{first?.price}  </h1>
            <h1>Số lượng:{first?.count}  </h1>
            <h1>Mô tả:{first?.description}  </h1>
        </>
    )
}
