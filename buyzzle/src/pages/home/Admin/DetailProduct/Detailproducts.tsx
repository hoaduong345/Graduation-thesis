
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { appConfig } from '../../../../configsEnv'
import Container from '../../../../components/container/Container'
import { Images } from '../../../../Assets/TS'
import { numberFormat } from '../../../../Helper'
import ArrowUp from '../Assets/TSX/ArrowUp'
import ArrowDown from '../Assets/TSX/ArrowDown'
import FB from '../Assets/TSX/FB'
import TW from '../Assets/TSX/TW'
import Insta from '../Assets/TSX/Insta'
import SaveLink from '../Assets/TSX/SaveLink'
import Share from '../Assets/TSX/Share'
import LoveProduct from '../Assets/TSX/LoveProduct'
import Cart from '../Assets/TSX/Cart'
import Detail from './Detail'
import Rating from './Rating'
import Products from '../../../../components/home/components/Product'
import ArrowPrev from '../../../../Assets/TSX/ArrowPrev'
import ArrowNext from '../../../../Assets/TSX/ArrowNext'
import Minus from '../../../../Assets/TSX/Minus'
import Plus from '../../../../Assets/TSX/Plus'

export type FormValues = {
    idproduct: number
    name: string;
    price: number;
    description: string;
    count: number;
    images: string;
    ProductImage: string;
    discount: number;
}
export type Product = {
    id: number;
    imgSrc: string;
    title: string;
    price: number;
    discount: number;
    soldCount: number;
};
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
            })
    }, [])



    const products: Product[] = [
        {
            id: 1,
            imgSrc: Images.spGoiY1,
            title: "Bộ Máy Tính Case PC Chơi Game 1",
            price: 1200000,
            discount: 50,
            soldCount: 33,
        },
        {
            id: 2,
            imgSrc: Images.spGoiY1,
            title: "Bộ Máy Tính Case PC Chơi Game 2",
            price: 500000,
            discount: 5,
            soldCount: 12,
        },
        {
            id: 3,
            imgSrc: Images.spGoiY1,
            title: "Bộ Máy Tính Case PC Chơi Game 3",
            price: 680000,
            discount: 10,
            soldCount: 42,
        },
        {
            id: 4,
            imgSrc: Images.spGoiY1,
            title: "Bộ Máy Tính Case PC Chơi Game 4",
            price: 900000,
            discount: 20,
            soldCount: 55,
        },
        {
            id: 5,
            imgSrc: Images.spGoiY1,
            title: "Bộ Máy Tính Case PC Chơi Game 5",
            price: 1000000,
            discount: 70,
            soldCount: 8,
        },
        {
            id: 6,
            imgSrc: Images.spGoiY1,
            title: "Bộ Máy Tính Case PC Chơi Games 5",
            price: 1000000,
            discount: 70,
            soldCount: 8,
        },
    ];

    return (
        <>
            <Container>
                <body className='body-detail container mx-auto'>
                    <div className='grid gap-4 grid-cols-10 mt-24'>
                        <div className='col-span-4'>
                            <img className='w-auto h-[388px]' src={first?.ProductImage[0].url} alt="" />
                        </div>
                        <div>
                            <div>
                                <div className='col-span-2 grid grid-rows-4 grid-flow-col gap-3 relative '>
                                    <div className='cursor-pointer absolute border-[1px] left-[13%] 
                                    p-1 w-14 opacity-50 bg-[#CACACD] border-[#EA4B48] rounded-md top-[-17px] 
                                    '>
                                        <div className='ml-3'>
                                            <ArrowUp />
                                        </div>
                                    </div>
                                    {
                                        // first?.ProductImage.filter( e)
                                        first?.ProductImage.slice(1, 5).map(e => {
                                            return <img className='h-[88px] w-[88px]' src={e.url} alt="" />
                                        })
                                    }
                                    <div className='cursor-pointer absolute border-[1px] left-[13%] 
                                    p-1 w-14 opacity-50 bg-[#CACACD] border-[#EA4B48] rounded-md bottom-[-17px] 
                                    '>
                                        <div className='ml-3'>
                                            <ArrowDown />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-span-5 '>
                            <p className='text-[32px] text-[#393939] font-medium leading-9'>{first?.name}</p>
                            {/* Thống kê */}
                            <div className='grid grid-cols-4 mt-8'>
                                <div className='flex col-span-1 gap-4'>
                                    <p className='text-[#1A1A1A] text-base'>(100)</p>
                                    {/* rating  */}
                                    <div className='rating '>
                                        <div className="flex items-center justify-start gap-1 ">
                                            <div className="rating rating-xs">
                                                <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                                                <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                                                <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                                                <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                                                <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                                            </div>
                                            <p className='text-[#EA4B48] text-sm'>4.0</p>
                                        </div>
                                    </div>
                                    <div className='border-r-2 border-[#E0E0E0]'></div>
                                </div>
                                <div className='flex ml-1 gap-2'>
                                    <div >
                                        <p className='underline text-[#1A1A1A] text-base'>500</p>
                                    </div>
                                    <div>
                                        <p className='text-[#4C4C4C] text-sm mt-[2px] mr-1'>Đánh giá</p>
                                    </div>
                                    <div className='border-r-2 border-[#E0E0E0]'></div>
                                </div>

                                <div className='flex col-span-1 ml-[-38px] gap-2 items-center'>
                                    <div >
                                        <p className='underline text-[#1A1A1A] text-base'>1k</p>
                                    </div>
                                    <div>
                                        <p className='text-[#4C4C4C] text-sm'>Đã bán</p>
                                    </div>
                                </div>
                            </div>{/* end Thống kê */}
                            {/* bachground price */}
                            <div className='w-[100%] bg-[#F8F8F8] rounded-md mt-6 px-6 py-[14px]'>
                                <div className='flex justify-between'>
                                    <div>
                                        <div className='items-center flex'>
                                            <p className="text-[36px] text-[#EA4B48] font-bold ">
                                                {numberFormat(first?.price - (first?.price * (first?.discount / 100)))}
                                            </p>
                                            <p className="text-sm font-normal ml-3 text-[#7A828A] line-through">
                                                {first?.price}đ
                                            </p>
                                        </div>
                                        <div className='bg-[#f9e9e9] rounded-[30px] max-w-max mt-[5px]'>
                                            <p className="text-[#EA4B48] px-[10px] py-1">
                                                Giảm {first?.discount}%
                                            </p>
                                        </div>
                                    </div>
                                    {/* Tăng giảm số lượng */}
                                    <div className=' flex items-center '>
                                        {/* Giảm số lượng */}
                                        <div className='border-[2px] border-[#FFAAAF] rounded-md bg-white px-[5px] py-[3px]'>
                                            <Minus />
                                        </div>{/* end Giảm số lượng */}
                                        {/* Số lượng */}
                                        <div>
                                            <p className='text-base mx-2 font-medium'>5</p>
                                        </div>{/* end Số lượng */}
                                        {/* Tăng số lượng */}
                                        <div className='border-[2px] border-[#FFAAAF] rounded-md bg-white px-[5px] py-[3px]'>
                                            <Plus />
                                        </div>
                                        {/* end Tăng số lượng */}
                                    </div>{/* end Tăng giảm số lượng */}
                                </div>
                            </div> {/* bachground price */}
                            {/* icon */}
                            <div className='w-[100%] flex mt-9 px-5 items-center justify-between'>
                                <div className='flex gap-2'>
                                    <FB />
                                    <TW />
                                    <Insta />
                                    <SaveLink />
                                </div>
                                <div>
                                    <Share />
                                </div>
                            </div>{/* end icon */}
                            {/* Mua ngay */}
                            <div className='w-[100%] flex mt-9 px-5 items-center gap-6'>
                                <LoveProduct />
                                <div className=' flex items-center w-[312px] rounded-md h-[58px] hover:bg-[#ff6d65]
                                transition duration-150 bg-[#EA4B48] justify-evenly cursor-pointer'>
                                    <button className='text-center text-base font-bold text-white '>
                                        Mua ngay
                                    </button>
                                </div>
                                <div className='flex items-center w-[224px] rounded-md h-[58px] hover:bg-[#FFEAE9] transition duration-150 border-[#FFAAAF] border-[1px] justify-evenly cursor-pointer'>
                                    <button className='text-center text-base font-bold text-[#4C4C4C] '>
                                        Thêm Vào Giỏ Hàng
                                    </button>
                                    <Cart />
                                </div>
                            </div>{/* end Mua ngay */}
                        </div>
                    </div>
                    {/* Sản phẩm của shop */}
                    <div className='grid grid-cols-3 mt-24'>
                        <div className='col-span-1 '>
                            <p className='text-[#4C4C4C] text-xl font-semibold mb-4'>SẢN PHẨM CỦA SHOP</p>
                            <img src={Images.BannerQC} alt="BannerQC" />
                        </div>
                        <div className='mt-11 col-span-2 '>
                            <div className="flex flex-wrap gap-3 ">
                                <div
                                    className="w-[210px] h-[311px] flex-col cursor-pointer
       hover:shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] transition duration-200
       max-xl:max-w-[180px]">
                                    <div className="relative figure">

                                        <img className="h-[207px] w-[100%]" alt="" src={Images.imgProduct} />


                                        <p className="absolute top-[5%] left-[3.5%] p-[5px] text-[12px] text-white bg-[#ea4b48] rounded">
                                            Giảm 10%
                                        </p>
                                    </div>

                                    <div className="p-[10px] border-x-[1px] border-b-[1px] border-[#FFAAAF] ">

                                        <p className="font-bold text-[16px] max-xl:text-[15px] break-words truncate">COMBO HỘP 18 GIẤY THƯỢNG HẠNG HOT TREND 2023 </p>

                                        <div className="flex gap-[7px]">
                                            <div className="text-[7px] font-normal bg110k bg-red-500 max-w-[151px] text-white text-center p-[3px]">
                                                Giảm 1999k
                                            </div>
                                            <div className="text-[7px]  bg110k max-w-[51px] bg-red-500 text-white text-center p-[3px]">
                                                FREE SHIP
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-3 items-center gap-3">
                                            <p className="text-xs text-[rgba(0,0,0,.26)] col-span-1 line-through">
                                                29999999đ
                                            </p>
                                            <p className="text-[16px] text-[#865546] col-span-2 font-bold ">
                                                1231231232
                                            </p>
                                        </div>
                                        <div className='flex'>
                                            <button>
                                                <img src={Images.star1} alt="" />
                                            </button>
                                            <button>
                                                <img src={Images.star1} alt="" />
                                            </button>
                                            <button>
                                                <img src={Images.star1} alt="" />
                                            </button>
                                            <button>
                                                <img src={Images.star1} alt="" />
                                            </button>
                                            <button>
                                                <img src={Images.star2} alt="" />
                                            </button>


                                            <span className="text-[12px] mr-[30px] ml-[4px]">{4.2}</span>


                                            <p className="text-[12px] items-center text-[#4c4c4c] truncate font-medium">
                                                Đã bán
                                                <span> 300</span>
                                            </p>
                                        </div>


                                    </div>
                                </div>
                                <div
                                    className="w-[210px] h-[311px] flex-col cursor-pointer
       hover:shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] transition duration-200
       max-xl:max-w-[180px]">
                                    <div className="relative figure">

                                        <img className="h-[207px] w-[100%]" alt="" src={Images.imgProduct} />


                                        <p className="absolute top-[5%] left-[3.5%] p-[5px] text-[12px] text-white bg-[#ea4b48] rounded">
                                            Giảm 10%
                                        </p>
                                    </div>

                                    <div className="p-[10px] border-x-[1px] border-b-[1px] border-[#FFAAAF] ">

                                        <p className="font-bold text-[16px] max-xl:text-[15px] break-words truncate">COMBO HỘP 18 GIẤY THƯỢNG HẠNG HOT TREND 2023 </p>

                                        <div className="flex gap-[7px]">
                                            <div className="text-[7px] font-normal bg110k bg-red-500 max-w-[151px] text-white text-center p-[3px]">
                                                Giảm 1999k
                                            </div>
                                            <div className="text-[7px]  bg110k max-w-[51px] bg-red-500 text-white text-center p-[3px]">
                                                FREE SHIP
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-3 items-center gap-3">
                                            <p className="text-xs text-[rgba(0,0,0,.26)] col-span-1 line-through">
                                                29999999đ
                                            </p>
                                            <p className="text-[16px] text-[#865546] col-span-2 font-bold ">
                                                1231231232
                                            </p>
                                        </div>
                                        <div className='flex'>
                                            <button>
                                                <img src={Images.star1} alt="" />
                                            </button>
                                            <button>
                                                <img src={Images.star1} alt="" />
                                            </button>
                                            <button>
                                                <img src={Images.star1} alt="" />
                                            </button>
                                            <button>
                                                <img src={Images.star1} alt="" />
                                            </button>
                                            <button>
                                                <img src={Images.star2} alt="" />
                                            </button>


                                            <span className="text-[12px] mr-[30px] ml-[4px]">{4.2}</span>


                                            <p className="text-[12px] items-center text-[#4c4c4c] truncate font-medium">
                                                Đã bán
                                                <span> 300</span>
                                            </p>
                                        </div>


                                    </div>
                                </div>
                                <div
                                    className="w-[210px] h-[311px] flex-col cursor-pointer
       hover:shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] transition duration-200
       max-xl:max-w-[180px]">
                                    <div className="relative figure">

                                        <img className="h-[207px] w-[100%]" alt="" src={Images.imgProduct} />


                                        <p className="absolute top-[5%] left-[3.5%] p-[5px] text-[12px] text-white bg-[#ea4b48] rounded">
                                            Giảm 10%
                                        </p>
                                    </div>

                                    <div className="p-[10px] border-x-[1px] border-b-[1px] border-[#FFAAAF] ">

                                        <p className="font-bold text-[16px] max-xl:text-[15px] break-words truncate">COMBO HỘP 18 GIẤY THƯỢNG HẠNG HOT TREND 2023 </p>

                                        <div className="flex gap-[7px]">
                                            <div className="text-[7px] font-normal bg110k bg-red-500 max-w-[151px] text-white text-center p-[3px]">
                                                Giảm 1999k
                                            </div>
                                            <div className="text-[7px]  bg110k max-w-[51px] bg-red-500 text-white text-center p-[3px]">
                                                FREE SHIP
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-3 items-center gap-3">
                                            <p className="text-xs text-[rgba(0,0,0,.26)] col-span-1 line-through">
                                                29999999đ
                                            </p>
                                            <p className="text-[16px] text-[#865546] col-span-2 font-bold ">
                                                1231231232
                                            </p>
                                        </div>
                                        <div className='flex'>
                                            <button>
                                                <img src={Images.star1} alt="" />
                                            </button>
                                            <button>
                                                <img src={Images.star1} alt="" />
                                            </button>
                                            <button>
                                                <img src={Images.star1} alt="" />
                                            </button>
                                            <button>
                                                <img src={Images.star1} alt="" />
                                            </button>
                                            <button>
                                                <img src={Images.star2} alt="" />
                                            </button>


                                            <span className="text-[12px] mr-[30px] ml-[4px]">{4.2}</span>


                                            <p className="text-[12px] items-center text-[#4c4c4c] truncate font-medium">
                                                Đã bán
                                                <span> 300</span>
                                            </p>
                                        </div>


                                    </div>
                                </div>
                                <div
                                    className="w-[210px] h-[311px] flex-col cursor-pointer
       hover:shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] transition duration-200
       max-xl:max-w-[180px]">
                                    <div className="relative figure">

                                        <img className="h-[207px] w-[100%]" alt="" src={Images.imgProduct} />


                                        <p className="absolute top-[5%] left-[3.5%] p-[5px] text-[12px] text-white bg-[#ea4b48] rounded">
                                            Giảm 10%
                                        </p>
                                    </div>

                                    <div className="p-[10px] border-x-[1px] border-b-[1px] border-[#FFAAAF] ">

                                        <p className="font-bold text-[16px] max-xl:text-[15px] break-words truncate">COMBO HỘP 18 GIẤY THƯỢNG HẠNG HOT TREND 2023 </p>

                                        <div className="flex gap-[7px]">
                                            <div className="text-[7px] font-normal bg110k bg-red-500 max-w-[151px] text-white text-center p-[3px]">
                                                Giảm 1999k
                                            </div>
                                            <div className="text-[7px]  bg110k max-w-[51px] bg-red-500 text-white text-center p-[3px]">
                                                FREE SHIP
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-3 items-center gap-3">
                                            <p className="text-xs text-[rgba(0,0,0,.26)] col-span-1 line-through">
                                                29999999đ
                                            </p>
                                            <p className="text-[16px] text-[#865546] col-span-2 font-bold ">
                                                1231231232
                                            </p>
                                        </div>
                                        <div className='flex'>
                                            <button>
                                                <img src={Images.star1} alt="" />
                                            </button>
                                            <button>
                                                <img src={Images.star1} alt="" />
                                            </button>
                                            <button>
                                                <img src={Images.star1} alt="" />
                                            </button>
                                            <button>
                                                <img src={Images.star1} alt="" />
                                            </button>
                                            <button>
                                                <img src={Images.star2} alt="" />
                                            </button>


                                            <span className="text-[12px] mr-[30px] ml-[4px]">{4.2}</span>


                                            <p className="text-[12px] items-center text-[#4c4c4c] truncate font-medium">
                                                Đã bán
                                                <span> 300</span>
                                            </p>
                                        </div>


                                    </div>
                                </div>
                                <div
                                    className="w-[210px] h-[311px] flex-col cursor-pointer
       hover:shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] transition duration-200
       max-xl:max-w-[180px]">
                                    <div className="relative figure">

                                        <img className="h-[207px] w-[100%]" alt="" src={Images.imgProduct} />


                                        <p className="absolute top-[5%] left-[3.5%] p-[5px] text-[12px] text-white bg-[#ea4b48] rounded">
                                            Giảm 10%
                                        </p>
                                    </div>

                                    <div className="p-[10px] border-x-[1px] border-b-[1px] border-[#FFAAAF] ">

                                        <p className="font-bold text-[16px] max-xl:text-[15px] break-words truncate">COMBO HỘP 18 GIẤY THƯỢNG HẠNG HOT TREND 2023 </p>

                                        <div className="flex gap-[7px]">
                                            <div className="text-[7px] font-normal bg110k bg-red-500 max-w-[151px] text-white text-center p-[3px]">
                                                Giảm 1999k
                                            </div>
                                            <div className="text-[7px]  bg110k max-w-[51px] bg-red-500 text-white text-center p-[3px]">
                                                FREE SHIP
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-3 items-center gap-3">
                                            <p className="text-xs text-[rgba(0,0,0,.26)] col-span-1 line-through">
                                                29999999đ
                                            </p>
                                            <p className="text-[16px] text-[#865546] col-span-2 font-bold ">
                                                1231231232
                                            </p>
                                        </div>
                                        <div className='flex'>
                                            <button>
                                                <img src={Images.star1} alt="" />
                                            </button>
                                            <button>
                                                <img src={Images.star1} alt="" />
                                            </button>
                                            <button>
                                                <img src={Images.star1} alt="" />
                                            </button>
                                            <button>
                                                <img src={Images.star1} alt="" />
                                            </button>
                                            <button>
                                                <img src={Images.star2} alt="" />
                                            </button>


                                            <span className="text-[12px] mr-[30px] ml-[4px]">{4.2}</span>


                                            <p className="text-[12px] items-center text-[#4c4c4c] truncate font-medium">
                                                Đã bán
                                                <span> 300</span>
                                            </p>
                                        </div>


                                    </div>
                                </div>
                                <div
                                    className="w-[210px] h-[311px] flex-col cursor-pointer
       hover:shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] transition duration-200
       max-xl:max-w-[180px]">
                                    <div className="relative figure">

                                        <img className="h-[207px] w-[100%]" alt="" src={Images.imgProduct} />


                                        <p className="absolute top-[5%] left-[3.5%] p-[5px] text-[12px] text-white bg-[#ea4b48] rounded">
                                            Giảm 10%
                                        </p>
                                    </div>

                                    <div className="p-[10px] border-x-[1px] border-b-[1px] border-[#FFAAAF] ">

                                        <p className="font-bold text-[16px] max-xl:text-[15px] break-words truncate">COMBO HỘP 18 GIẤY THƯỢNG HẠNG HOT TREND 2023 </p>

                                        <div className="flex gap-[7px]">
                                            <div className="text-[7px] font-normal bg110k bg-red-500 max-w-[151px] text-white text-center p-[3px]">
                                                Giảm 1999k
                                            </div>
                                            <div className="text-[7px]  bg110k max-w-[51px] bg-red-500 text-white text-center p-[3px]">
                                                FREE SHIP
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-3 items-center gap-3">
                                            <p className="text-xs text-[rgba(0,0,0,.26)] col-span-1 line-through">
                                                29999999đ
                                            </p>
                                            <p className="text-[16px] text-[#865546] col-span-2 font-bold ">
                                                1231231232
                                            </p>
                                        </div>
                                        <div className='flex'>
                                            <button>
                                                <img src={Images.star1} alt="" />
                                            </button>
                                            <button>
                                                <img src={Images.star1} alt="" />
                                            </button>
                                            <button>
                                                <img src={Images.star1} alt="" />
                                            </button>
                                            <button>
                                                <img src={Images.star1} alt="" />
                                            </button>
                                            <button>
                                                <img src={Images.star2} alt="" />
                                            </button>


                                            <span className="text-[12px] mr-[30px] ml-[4px]">{4.2}</span>


                                            <p className="text-[12px] items-center text-[#4c4c4c] truncate font-medium">
                                                Đã bán
                                                <span> 300</span>
                                            </p>
                                        </div>


                                    </div>
                                </div>
                                <div
                                    className="w-[210px] h-[311px] flex-col cursor-pointer
       hover:shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] transition duration-200
       max-xl:max-w-[180px]">
                                    <div className="relative figure">

                                        <img className="h-[207px] w-[100%]" alt="" src={Images.imgProduct} />


                                        <p className="absolute top-[5%] left-[3.5%] p-[5px] text-[12px] text-white bg-[#ea4b48] rounded">
                                            Giảm 10%
                                        </p>
                                    </div>

                                    <div className="p-[10px] border-x-[1px] border-b-[1px] border-[#FFAAAF] ">

                                        <p className="font-bold text-[16px] max-xl:text-[15px] break-words truncate">COMBO HỘP 18 GIẤY THƯỢNG HẠNG HOT TREND 2023 </p>

                                        <div className="flex gap-[7px]">
                                            <div className="text-[7px] font-normal bg110k bg-red-500 max-w-[151px] text-white text-center p-[3px]">
                                                Giảm 1999k
                                            </div>
                                            <div className="text-[7px]  bg110k max-w-[51px] bg-red-500 text-white text-center p-[3px]">
                                                FREE SHIP
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-3 items-center gap-3">
                                            <p className="text-xs text-[rgba(0,0,0,.26)] col-span-1 line-through">
                                                29999999đ
                                            </p>
                                            <p className="text-[16px] text-[#865546] col-span-2 font-bold ">
                                                1231231232
                                            </p>
                                        </div>
                                        <div className='flex'>
                                            <button>
                                                <img src={Images.star1} alt="" />
                                            </button>
                                            <button>
                                                <img src={Images.star1} alt="" />
                                            </button>
                                            <button>
                                                <img src={Images.star1} alt="" />
                                            </button>
                                            <button>
                                                <img src={Images.star1} alt="" />
                                            </button>
                                            <button>
                                                <img src={Images.star2} alt="" />
                                            </button>


                                            <span className="text-[12px] mr-[30px] ml-[4px]">{4.2}</span>


                                            <p className="text-[12px] items-center text-[#4c4c4c] truncate font-medium">
                                                Đã bán
                                                <span> 300</span>
                                            </p>
                                        </div>


                                    </div>
                                </div>
                                <div
                                    className="w-[210px] h-[311px] flex-col cursor-pointer
       hover:shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] transition duration-200
       max-xl:max-w-[180px]">
                                    <div className="relative figure">

                                        <img className="h-[207px] w-[100%]" alt="" src={Images.imgProduct} />


                                        <p className="absolute top-[5%] left-[3.5%] p-[5px] text-[12px] text-white bg-[#ea4b48] rounded">
                                            Giảm 10%
                                        </p>
                                    </div>

                                    <div className="p-[10px] border-x-[1px] border-b-[1px] border-[#FFAAAF] ">

                                        <p className="font-bold text-[16px] max-xl:text-[15px] break-words truncate">COMBO HỘP 18 GIẤY THƯỢNG HẠNG HOT TREND 2023 </p>

                                        <div className="flex gap-[7px]">
                                            <div className="text-[7px] font-normal bg110k bg-red-500 max-w-[151px] text-white text-center p-[3px]">
                                                Giảm 1999k
                                            </div>
                                            <div className="text-[7px]  bg110k max-w-[51px] bg-red-500 text-white text-center p-[3px]">
                                                FREE SHIP
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-3 items-center gap-3">
                                            <p className="text-xs text-[rgba(0,0,0,.26)] col-span-1 line-through">
                                                29999999đ
                                            </p>
                                            <p className="text-[16px] text-[#865546] col-span-2 font-bold ">
                                                1231231232
                                            </p>
                                        </div>
                                        <div className='flex'>
                                            <button>
                                                <img src={Images.star1} alt="" />
                                            </button>
                                            <button>
                                                <img src={Images.star1} alt="" />
                                            </button>
                                            <button>
                                                <img src={Images.star1} alt="" />
                                            </button>
                                            <button>
                                                <img src={Images.star1} alt="" />
                                            </button>
                                            <button>
                                                <img src={Images.star2} alt="" />
                                            </button>


                                            <span className="text-[12px] mr-[30px] ml-[4px]">{4.2}</span>


                                            <p className="text-[12px] items-center text-[#4c4c4c] truncate font-medium">
                                                Đã bán
                                                <span> 300</span>
                                            </p>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>{/* end Sản phẩm của shop */}

                    {/* Chi tiết và đánh giá */}
                    <div className='mt-[70px]'>
                        <div className='flex w-[100%] justify-center'>
                            <p className='text-[#1A1A1A] text-base font-medium mr-9 uppercase'><a href="#">Chi tiết sản phẩm</a></p>
                            <p className='text-[#1A1A1A] text-base font-medium uppercase'><a href="#">Đánh giá</a></p>
                        </div>
                    </div>{/* end Chi tiết và đánh giá */}
                </body >
            </Container>
            <div className='border-[1px] border-[#E0E0E0]'></div>
            <Container>
                <div
                    className='px-[113px] py-[78px] text-[20px] break-all'
                    dangerouslySetInnerHTML={{ __html: first?.description }}
                >
                </div>

                {/* <Detail /> */}
                <Rating />
            </Container>
            <div className='border-[2px] mt-[70pxs] border-[#EA4B48]'></div>
            <Container>
                <div className="container my-[60px]">
                    <h1 className="text-2xl font-bold mb-[15px]">Gợi ý sản phẩm: </h1>

                    <div className="flex flex-wrap justify-between">
                        {products.map((product) => {
                            return <Products product={product} />;
                        })}
                    </div>
                </div>
                <div className="pagination">
                    <a href="#" className="prev mr-[60px]">
                        <ArrowPrev />
                    </a>
                    <a href="#" className="page">
                        1
                    </a>
                    <a href="#" className="page">
                        2
                    </a>
                    <a href="#" className="page">
                        ...
                    </a>
                    <a href="#" className="page">
                        7
                    </a>
                    <a href="#" className="page">
                        8
                    </a>
                    <a href="#" className="next ml-[60px]">
                        <ArrowNext />
                    </a>
                </div>
            </Container>


        </>
    )
}
