
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { appConfig } from '../../../configsEnv'

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
    const { id } = useParams()
    console.log(id);


    useEffect(() => {
        axios.get(`${appConfig.apiUrl}/chitietproduct/${id}`)
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
