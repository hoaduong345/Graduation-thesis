import React, { useState } from 'react'
import Container from '../../components/container/Container'
import Close from '../../Assets/TSX/Close'
import ArrowDown from '../../Assets/TSX/ArrowDown'
import axios from 'axios'

export default function AddproductsPage() {

    const [products, setProducts] = useState({
        name: '',
        price: 0,
        description: '',
        count: 0,
        images: ''
        // pricesale: 0,
        // discount: 0,
        // soldcount: 0,
        // rate: 0,
        // status: '',
        // date: '',
    })
    const handleSubmit = () => {
        axios.post("http://localhost:5173/buyzzle/product/addproduct", products)
            .then((response) => {
                return response
            }).then((data) => {
                console.log(data)
            }).catch((error) => {
                console.log(error)
            })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProducts({ ...products, [name]: value })
    }
    console.log(products.name)

    return (
        <Container >
            <body className="body-filter container mx-auto">
                <div className='form flex'>
                    {/* content formLeft */}
                    <div className='formLeft w-[55%] '>
                        <h1 className='text-[#1A1A1A] text-3xl font-bold mt-[50px] mb-[28px]'>THÊM SẢN PHẨM</h1>
                        <div className='flex gap-5'>
                            {/* form input addNameProducts  */}
                            <div className='cls-nameProducts w-[55%]'>
                                <p className='text-[#4C4C4C] text-sm font-medium mb-[8px]'>Tiêu Đề Sản Phẩm*</p>
                                {/* input addNameProducts */}
                                <input
                                    className=" focus:outline-none text-[#333333] text-base font-medium
                                     border-[1px] border-[#FFAAAF] rounded-[6px] px-[10px] py-[12px] w-[100%]"
                                    placeholder="Nhập tiêu đề sản phẩm"
                                    name='name'
                                    onChange={handleChange}
                                />
                                {/* end input addNameProducts */}
                                <p className='text-[#4C4C4C] text-sm font-medium mb-[8px] mt-[23px]'>Tag*</p>
                                {/* input addNameProducts */}
                                <div className=" focus:outline-none text-[#7A828A] text-base font-medium 
                                     border-[1px] border-[#FFAAAF] rounded-[6px] px-[10px] py-[7px] w-[100%] flex">
                                    <div className='flex w-[100%] items-center'>
                                        <div className='flex flex-wrap flex-1 w-[90%] gap-5 '>
                                            <button
                                                type="button"
                                                className="transition duration-200 hover:ease-in bg-[#FFF] hover:bg-[#EA4B48] 
                                        focus:outline-none  rounded-[6px] w-[22%] text-center
                                        flex items-center shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]" >
                                                <p className='font-medium text-sm px-5 py-[9px] text-black 	
                                        hover:text-[#FFFFFF] '>ĐL</p>
                                                <Close />
                                            </button>

                                            <button
                                                type="button"
                                                className="transition duration-200 hover:ease-in bg-[#FFF] hover:bg-[#EA4B48] 
                                        focus:outline-none  rounded-[6px] w-[22%] text-center
                                        flex items-center shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]" >
                                                <p className='font-medium text-sm px-5 py-[9px] text-black 	
                                        hover:text-[#FFFFFF] '>ĐL</p>
                                                <Close />
                                            </button>

                                            <button
                                                type="button"
                                                className="transition duration-200 hover:ease-in bg-[#FFF] hover:bg-[#EA4B48] 
                                        focus:outline-none  rounded-[6px] w-[22%] text-center
                                        flex items-center shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]" >
                                                <p className='font-medium text-sm px-5 py-[9px] text-black 	
                                        hover:text-[#FFFFFF] '>ĐL</p>
                                                <Close />
                                            </button>
                                        </div>

                                        <ArrowDown />
                                    </div>
                                </div>
                                {/* end input addNameProducts */}

                                <p className='text-[#4C4C4C] text-sm font-medium mb-[8px] mt-[23px]'>Mô Tả Chi Tiết Sản Phẩm*</p>
                                {/* input addNameProducts */}
                                <textarea className=" focus:outline-none text-[#333333] text-base font-medium 
                                     border-[1px] border-[#FFAAAF] rounded-[6px] px-[10px] py-[7px] w-[100%] flex"
                                    placeholder='Nhập mô tả chi tiết sản phẩm <HTML>'
                                    name='description'
                                    onChange={handleChange}
                                >
                                </textarea>
                                {/* end input addNameProducts */}


                                <p className='text-[#4C4C4C] text-sm font-medium mb-[8px] mt-[23px]'>Giá sản phẩm*</p>
                                {/* input addNameProducts */}
                                <input
                                    className=" focus:outline-none text-[#333333] text-base font-medium
                                     border-[1px] border-[#FFAAAF] rounded-[6px] mb-5 px-[10px] py-[12px] w-[100%]"
                                    placeholder="Nhập giá sản phẩm"
                                    type='number'
                                    name='price'
                                    onChange={handleChange}
                                />
                                {/* end input addNameProducts */}
                            </div>
                            {/* end form input addNameProducts  */}


                            {/* form input addNameProducts  */}
                            <div className='cls-nameProducts w-[40%]'>
                                <p className='text-[#4C4C4C] text-sm font-medium mb-[8px]'>Loại Sản Phẩm</p>

                                {/* Dropdown */}
                                <div className="relative w-[100%] lg:max-w-sm flex border-[1px] border-[#FFAAAF] rounded-[6px] items-center">
                                    <select className="w-[92%] p-2.5 text-gray-500 flex items-center bg-white py-[14px]  outline-none appearance-none focus:border-indigo-600">
                                        <option>ReactJS Dropdown</option>
                                        <option>Laravel 9 with React</option>
                                        <option>React with Tailwind CSS</option>
                                        <option>React With Headless UI</option>
                                    </select>
                                    <ArrowDown />
                                </div>

                                {/* end input addNameProducts */}
                                <p className='text-[#4C4C4C] text-sm font-medium mb-[8px] mt-[23px]'>Tag*</p>
                                {/* input addNameProducts */}
                                <div className=" focus:outline-none text-[#7A828A] text-base font-medium 
                                     border-[1px] border-[#FFAAAF] rounded-[6px] px-[10px] py-[7px] w-[100%] flex">
                                    <div className='flex w-[100%] items-center'>
                                        <div className='flex flex-wrap flex-1 w-[90%] gap-5 '>
                                            <button
                                                type="button"
                                                className="transition duration-200 hover:ease-in bg-[#FFF] hover:bg-[#EA4B48] 
                                        focus:outline-none  rounded-[6px] w-[31%] text-center
                                        flex items-center shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]" >
                                                <p className='font-medium text-sm px-5 py-[9px] text-black 	
                                        hover:text-[#FFFFFF] '>ĐL</p>
                                                <Close />
                                            </button>

                                            <button
                                                type="button"
                                                className="transition duration-200 hover:ease-in bg-[#FFF] hover:bg-[#EA4B48] 
                                        focus:outline-none  rounded-[6px] w-[31%] text-center
                                        flex items-center shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]" >
                                                <p className='font-medium text-sm px-5 py-[9px] text-black 	
                                        hover:text-[#FFFFFF] '>ĐL</p>
                                                <Close />
                                            </button>
                                        </div>

                                        <ArrowDown />
                                    </div>
                                </div>
                                {/* end input addNameProducts */}

                                {/* end input addNameProducts */}
                                <p className='text-[#4C4C4C] text-sm font-medium mb-[8px] mt-[23px]'>Ảnh sản phẩm</p>
                                {/* input addNameProducts */}
                                <div className='px-1 py-[18.5px]'>
                                    <input className="block w-full text-sm text-gray-900  
                                cursor-pointer " id="multiple_files" type="file" multiple 
                                name='images'
                                onChange={handleChange}
                                />
                                </div>
                                {/* end input addNameProducts */}
                                <p className='text-[#4C4C4C] text-sm font-medium mb-[8px] mt-[23px]'>Số lượng sản phẩm*</p>
                                {/* input addNameProducts */}
                                <input
                                    className=" focus:outline-none text-[#333333] text-base font-medium
                                     border-[1px] border-[#FFAAAF] rounded-[6px] mb-5 px-[10px] py-[12px] w-[100%]"
                                    placeholder="Nhập Số lượng sản phẩm"
                                    type='number'
                                    name='count'
                                    onChange={handleChange}
                                />
                                {/* end input addNameProducts */}

                            </div>
                            {/* end form input addNameProducts  */}
                        </div>
                    </div>
                    {/* end content formLeft */}
                    <div className='formRight w-[45%]'>
                        <div className='mt-[50px] mb-[28px]
                          gap-[12px] text-[#FCFCFD] text-base font-extrabold text-center'>
                            <button onClick={handleSubmit} className='bg-[#00B207] rounded-md w-[200px] h-[48px]'>
                                Thêm sản phẩm</button>
                        </div>
                    </div>
                </div>
            </body>
        </Container>
    )
}
