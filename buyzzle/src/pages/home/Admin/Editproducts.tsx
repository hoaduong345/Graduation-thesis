import React from 'react'
import Container from '../../../components/container/Container'
import Back from './Assets/TSX/Back'
import ArrowDown from '../../../Assets/TSX/ArrowDown'
import UploadIMG from './Assets/TSX/UploadIMG'
import { Images } from '../../../Assets/TS'

export default function Editproducts() {
    return (
        <Container>
            <body className="body-filter container mx-auto">
                {/* back */}
                <div className='back h-[57px] mt-[46px] '>
                    <div className='flex gap-3 items-center'>
                        <div className='border-[1px] border-[#EA4B48] rounded-md py-4 px-4'>
                            <Back />
                        </div>
                        <div >
                            <p className='font-normal text-sm'>Quay lại danh sách sản phẩm</p>
                            <h2 className='uppercase text-[32px] font-bold'>Sửa Sản Phẩm</h2>
                        </div>
                    </div>
                </div>{/* end back */}

                <div className='mt-11 '>
                    <div className='grid grid-cols-2 gap-6'>


                        <div>
                            {/* Mô Tả Sản Phẩm */}
                            <div>
                                <span className='text-[#000] text-2xl font-normal '>Mô Tả Sản Phẩm</span>
                                {/* card */}
                                <div className='card w-[100%] h-[442px] py-6 px-6 mt-2
                            shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'>
                                    <p className='text-[#4C4C4C] text-sm font-semibold mb-[8px]'>Tên Sản Phẩm*</p>
                                    {/* input addNameProducts */}
                                    <input
                                        className=" focus:outline-none text-[#333333] text-base font-medium placeholder-[#7A828A]
                                     border-[1px] border-[#FFAAAF] rounded-[6px] px-[10px] py-[12px] w-[100%]"
                                        placeholder="Nhập tiêu đề sản phẩm"
                                        name='name'
                                    // onChange={handleChange}
                                    />
                                    {/* end input addNameProducts */}

                                    <p className='text-[#4C4C4C] text-sm font-semibold mb-[8px] mt-[23px]'>Mô Tả Chi Tiết Sản Phẩm*</p>
                                    {/* input addNameProducts */}
                                    <textarea className=" focus:outline-none text-[#333333] text-base font-medium 
                                     border-[1px] border-[#FFAAAF] rounded-[6px] px-[10px] py-[7px] w-[100%] h-[251px] "
                                        placeholder='Nhập mô tả chi tiết sản phẩm <HTML>'
                                        name='description'
                                    // onChange={handleChange}
                                    >
                                    </textarea>
                                    {/* end input addNameProducts */}
                                </div>
                            </div>
                            {/* Danh Mục Sản Phẩm */}
                            <div className='mt-7'>
                                <span className='text-[#000] text-2xl font-normal '>Danh Mục Sản Phẩm</span>
                                {/* card */}
                                <div className='card w-[100%] py-6 px-6 mt-2
                            shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'>
                                    <p className='text-[#4C4C4C] text-sm font-semibold mb-[8px]'>Danh Mục Sản Phẩm*</p>
                                    {/* Dropdown */}
                                    <div className=" w-[100%] flex border-[1px] border-[#FFAAAF] rounded-[6px] items-center">
                                        <select className="w-[100%] p-2.5 text-gray-500 bg-white py-[14px] outline-none ">
                                            <option>Thiết bị điện da dụng</option>
                                            <option>Giày dép da</option>
                                            <option>Máy ảnh</option>
                                            <option>Thời trang nam</option>
                                            <option>Thiết bị điện tử</option>
                                            <option>Nhà cửa đời sống</option>
                                            <option>Sắc đẹp</option>
                                        </select>
                                    </div>
                                    {/* end input addNameProducts */}

                                    <p className='text-[#4C4C4C] text-sm font-semibold mb-[8px] mt-[23px]'>Tag*</p>
                                    {/* Dropdown */}
                                    <div className=" w-[100%] flex border-[1px] border-[#FFAAAF] rounded-[6px] items-center">
                                        <select className="w-[100%] p-2.5 text-gray-500 bg-white py-[14px] outline-none ">
                                            <option>key-word tìm kiếm / key-word tìm kiếm 1</option>
                                            <option>key-word tìm kiếm 2 / key-word tìm kiếm 3</option>
                                        </select>
                                    </div>
                                    {/* end input addNameProducts */}
                                </div>
                            </div>
                        </div>

                        <div>
                            {/* Ảnh sản phẩm */}
                            <div>
                                <span className='text-[#000] text-2xl font-normal'>Ảnh Sản Phẩm</span>
                                {/* card */}
                                <div className='card w-[100%] py-4 px-9 mt-2 flex items-center
                            shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'>
                                    {/* form upload img */}
                                    <form className='max-w-max items-center'>
                                        <label htmlFor="myfile">
                                            <div className='outline-dashed outline-2 outline-offset-2 outline-[#EA4B48] py-7 px-9 cursor-pointer'>
                                                <input type="file" id="myfile" name="myfile" multiple className='hidden ' />
                                                <UploadIMG />
                                                <div id="myfile" className='text-center mt-2'>
                                                    <p className='text-[#5D5FEF] text-center font-bold'>Click to upload
                                                        <p className='text-[#1A1A1A] font-normal text-sm tracking-widest'>or drag and drop</p></p>
                                                </div>
                                            </div>
                                        </label>
                                    </form>{/* end form upload img */}
                                    <div className='justify-center flex flex-1'>
                                        <div className='inline-grid grid-cols-3 gap-4'>
                                            <div>
                                                <img src={Images.imageproduct6} alt="imageproduct6" width={80} height={80} />
                                            </div>

                                            <div>
                                                <img src={Images.imageproduct5} alt="imageproduct6" width={80} height={80} />
                                            </div>

                                            <div>
                                                <img src={Images.imageproduct4} alt="imageproduct6" width={80} height={80} />
                                            </div>

                                            <div>
                                                <img src={Images.imageproduct3} alt="imageproduct6" width={80} height={80} />
                                            </div>

                                            <div>
                                                <img src={Images.imageproduct2} alt="imageproduct6" width={80} height={80} />
                                            </div>

                                            <div>
                                                <img src={Images.imageproduct1} alt="imageproduct6" width={80} height={80} />
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Giá và số lượng sản phẩm */}
                            <div className='mt-7'>
                                <span className='text-[#000] text-2xl font-normal '>Giá & Số Lượng</span>
                                {/* card */}
                                <div className='card w-[100%] py-6 px-6 mt-2
                            shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'>
                                    <p className='text-[#4C4C4C] text-sm font-semibold mb-[8px]'>Giá Sản phẩm*</p>
                                    <div className='flex justify-between items-center border-[1px] border-[#FFAAAF]
                                             rounded-[6px] px-[15px] py-[12px]'>
                                        <input
                                            className="focus:outline-none text-[#333333] text-base font-medium placeholder-[#7A828A] w-[100%]"
                                            placeholder="000.000"
                                            type='number'
                                        />
                                        <p className='text-[#7A828A] font-bold ml-4'>VNĐ</p>
                                    </div>
                                    <p className='text-[#4C4C4C] text-sm font-semibold mb-[8px] mt-[23px]'>Số Lượng Sản Phẩm*</p>
                                    <input
                                        className="focus:outline-none text-[#333333] text-base font-medium placeholder-[#7A828A] w-[100%]
                                        border-[1px] border-[#FFAAAF] rounded-[6px] px-[15px] py-[12px]"
                                        placeholder="000.000"
                                        type='number'
                                    />
                                </div>
                            </div>
                            {/* tình trạng sản phẩm */}
                            <div className='mt-7'>
                                <span className='text-[#000] text-2xl font-normal'>Tình trạng sản phẩm</span>
                                {/* card */}
                                <div className='card w-[100%] py-4 px-9 mt-2
                            shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'>
                                    <p className='text-[#4C4C4C] text-sm font-semibold mb-[18px]'>Tình trạng sản phẩm*</p>
                                    <div className='flex text-center'>
                                        <h3 className='text-[#4C4C4C] font-semibold'>Ẩn</h3>
                                        {/* Swich */}
                                        <div className='Switch'>
                                            <input
                                                className="mx-3 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-[#EA4B48] after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                                                type="checkbox"
                                                role="switch"
                                                id="flexSwitchCheckDefault" />
                                        </div>{/* end  Swich */}
                                        <h3 className='text-[#5D5FEF] font-semibold'>Đăng</h3>
                                    </div>

                                </div>
                            </div>

                            {/* button */}
                            <div className='flex w-[50%] justify-between mt-6'>
                                <div className='flex items-center w-[133px] rounded-md h-[46px] hover:bg-[#FFEAE9] transition duration-150 border-[#EA4B48] border-[1px] justify-evenly cursor-pointer'>
                                    <button className='text-center text-base font-bold text-[#1A1A1A] '>
                                        Hủy bỏ
                                    </button>
                                </div>

                                <div className='flex items-center w-[150px] rounded-md h-[46px] bg-[#EA4B48] hover:bg-[#ff6d65]  transition duration-150 justify-evenly cursor-pointer'>
                                    <button className='text-center text-base font-bold text-[#FFFFFF] '>
                                        Cập nhật
                                    </button>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </body>
        </Container>
    )
}
