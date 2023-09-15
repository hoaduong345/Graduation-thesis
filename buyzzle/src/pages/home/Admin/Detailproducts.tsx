
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { appConfig } from '../../../configsEnv'
import Container from '../../../components/container/Container'
import { Images } from '../../../Assets/TS'
import { numberFormat } from '../../../Helper'

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
            <Container>
                {/* <h1>Tên sản phẩm: {first?.name}  </h1>
                <h1>Giá:{first?.price}  </h1>
                <h1>Số lượng:{first?.count}  </h1>
                <h1>Mô tả:{first?.description}  </h1>
                <img src={first?.ProductImage[0].url} alt="" /> */}

                <div className='flex gap-[24px]'>
                    <div>
                        <button>

                            <img className='bg-red-50' src={Images.chevron} alt="" />
                        </button>
                        <div className='flex flex-col gap-[10px]'>
                            <img className='h-[88px] w-[88px]' src={first?.ProductImage[1].url} alt="" />
                            <img className='h-[88px] w-[88px]' src={first?.ProductImage[2].url} alt="" />
                            <img className='h-[88px] w-[88px]' src={first?.ProductImage[3].url} alt="" />
                            <img className='h-[88px] w-[88px]' src={first?.ProductImage[4].url} alt="" />
                        </div>
                        <img src="" alt="" />
                    </div>

                    <div>
                        <img className='w-[424px] h-[382px]' src={first?.ProductImage[0].url} alt="" />
                    </div>

                    <div>
                        <p className='text-[24px] font-bold'>{first?.name}</p>
                        <div className='flex gap-[20px]'>
                            <p className="text-[24px] text-[rgba(0,0,0,.26)] col-span-1 line-through">
                                {first?.price}đ
                            </p>
                            <p className="text-[36px] text-[#EA4B48] col-span-2 font-bold ">
                                {numberFormat(first?.price - (first?.price * (first?.discount / 100)))}
                            </p>
                            <div className=''>
                                <p className="text-[14px] px-[10px] py-[3px] text-[#EA4B48] bg-[#f9e9e9] rounded">
                                    Giảm {first?.discount}%
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </Container>
        </>
    )
}
