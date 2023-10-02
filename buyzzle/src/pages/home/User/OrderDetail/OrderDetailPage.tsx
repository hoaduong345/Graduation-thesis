

import { Images } from "../../../../Assets/TS";
import Location from "../../../../Assets/TSX/Location";
import Container from "../../../../components/container/Container";
import Back from "../../Admin/Assets/TSX/Back";
import Sitebar from "../UserProfile/Sitebar/Sitebar";

export default function OrderDetailPage() {

    return (
        <Container>
            <div className="body-filter container mx-auto">

                <div className='grid grid-cols-4 gap-6'>
                    <div className='col-span-1 max-2xl:hidden'>
                        <Sitebar />
                    </div>

                    <div className="col-span-3 max-2xl:col-span-5">

                        <div className='back h-[57px] my-[46px] '>
                            <div className='flex gap-3 items-center'>
                                <div className='border-[1px] border-[#EA4B48] rounded-md py-4 px-4 max-xl:p-3 max-lg:p-2'>
                                    <Back />
                                </div>
                                <div >
                                    <p className='font-normal text-sm max-xl:text-xs max-lg:text-[10px]' >Quay lại danh sách đơn hàng</p>
                                    <h2 className='uppercase text-[32px] font-bold max-xl:text-[28px] max-lg:text-xl'>Chi tiết đơn hàng</h2>
                                </div>
                            </div>
                        </div>

                        <div className="p-12 shadow border-[#6C6C6C40] rounded-md flex flex-col gap-10 max-lg:p-6">
                            <div className="flex gap-5">
                                <div className="w-[60%] max-lg:w-[55%] border-[#6C6C6C40] border-[1px] rounded-md p-[26px] flex flex-col gap-9">
                                    <div className="flex flex-col gap-3">
                                        <div className="flex gap-1 items-center">
                                            <Location />
                                            <p className="text-[#EA4B48] font-medium text-sm max-[870px]:text-xs">Địa chỉ nhận hàng</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-normal text-[#1A1A1A] max-[870px]:text-xs"><span className="font-bold">Trần Văn Bảo (+84) 92381882 </span> 407 Hoàng Diệu, Phường Thống Nhất, Thành Phố Buôn Ma Thuột, Đắk Lắk</p>

                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        <div className="flex gap-1 items-center">
                                            <Location />
                                            <p className="text-[#EA4B48] font-medium text-sm max-[870px]:text-xs">Ghi chú cho người gửi</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-normal text-[#1A1A1A] max-[870px]:text-xs">Giao vào giờ hành chính từ thứ 2 - 6 </p>

                                        </div>
                                    </div>


                                </div>

                                <div className="w-[40%] max-lg:w-[45%] flex flex-col gap-7 p-[20px] border-[#6C6C6C40] border-[1px] rounded-md">
                                    <div className="">
                                        <div className="flex gap-5 max-xl:gap-3 max-lg:gap-0">
                                            <div>
                                                <p className="text-sm text-[#E0E0E0] max-xl:text-[13px] max-[870px]:text-xs">ID ĐƠN HÀNG</p>
                                                <p className="max-xl:text-sm max-[870px]:text-xs">#A23V</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-[#E0E0E0] max-xl:text-[13px] max-[870px]:text-xs">PHƯƠNG THỨC THANH TOÁN</p>
                                                <p className="max-xl:text-sm max-[870px]:text-xs">Thanh toán khi nhận hàng</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between">
                                        <p className="text-sm text-[#393939] max-[870px]:text-[11px]">Tổng Giá Sản Phẩm: </p>
                                        <p className="text-sm text-[#EA4B48] max-[870px]:text-[11px]">₫216.000</p>
                                    </div>
                                    <div className="flex justify-between border-t-[1px] pt-2">
                                        <p className="text-sm text-[#393939] max-[870px]:text-[11px]">Phí vận chuyển: </p>
                                        <div className="flex gap-1">
                                            <p className="text-sm text-[#EA4B48] max-[870px]:text-[11px]">₫0</p>
                                            <p className="text-[#EA4B48]"> - </p>
                                            <p className="text-sm text-[#FFAAAF] line-through max-[870px]:text-[11px]">₫15.000</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between border-t-[1px] pt-2">
                                        <p className="text-sm text-[#393939] max-[870px]:text-[11px]">Tổng Phí: </p>
                                        <p className="text-xl text-[#EA4B48] font-semibold max-[870px]:text-sm">₫231.000</p>
                                    </div>
                                </div>

                            </div>

                            <ul className="steps">
                                <li className="step step-primary max-lg:text-xs">Đặt hàng</li>
                                <li className="step step-primary max-lg:text-xs">Giao hàng ĐVVC</li>
                                <li className="step max-lg:text-xs">Đang giao hàng</li>
                                <li className="step max-lg:text-xs">Giao hàng thành công</li>
                            </ul>

                            {/* <div>
                                <h2 className="sr-only">Steps</h2>

                                <div className="after:mt-4 after:block after:h-1 after:w-full after:rounded-lg after:bg-gray-200">
                                    <ol className="grid grid-cols-3 text-sm font-medium text-gray-500">
                                        <li className="relative flex justify-start text-blue-600">
                                            <span className="absolute -bottom-[1.75rem] start-0 rounded-full bg-blue-600 text-white">
                                                <svg
                                                    className="h-5 w-5"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </span>

                                            <span className="hidden sm:block"> Details </span>

                                            <svg
                                                className="h-6 w-6 sm:hidden"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                                                />
                                            </svg>
                                        </li>

                                        <li className="relative flex justify-center text-blue-600">
                                            <span className="absolute -bottom-[1.75rem] left-1/2 -translate-x-1/2 rounded-full bg-blue-600 text-white">
                                                <svg
                                                    className="h-5 w-5"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </span>

                                            <span className="hidden sm:block"> Address </span>

                                            <svg
                                                className="mx-auto h-6 w-6 sm:hidden"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                            </svg>
                                        </li>

                                        <li className="relative flex justify-end">
                                            <span className="absolute -bottom-[1.75rem] end-0 rounded-full bg-gray-600 text-white">
                                                <svg
                                                    className="h-5 w-5"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </span>

                                            <span className="hidden sm:block"> Payment </span>

                                            <svg
                                                className="h-6 w-6 sm:hidden"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                                />
                                            </svg>
                                        </li>
                                    </ol>
                                </div>
                            </div> */}

                            <div className="flex flex-col gap-3">
                                <div className="grid grid-cols-4 px-[26px] py-[10px] bg-[#F2F2F2]">
                                    <h4 className="col-span-2 font-normal text-[#1A1A1A] text-sm max-[870px]:text-xs">SẢN PHẨM</h4>
                                    <h4 className="col-span-1 font-normal text-[#1A1A1A] text-sm text-center max-[870px]:text-xs">GIÁ</h4>
                                    <h4 className="col-span-1 font-normal text-[#1A1A1A] text-sm text-center max-[870px]:text-xs">TỔNG</h4>
                                </div>
                                <div className="grid grid-cols-4 px-[26px] py-[16px] items-center bg-[#FFFFFF] shadow">
                                    <div className="col-span-2 text-sm flex gap-4 items-center">
                                        <img src={Images.cateAD} alt="" />
                                        <div>
                                            <p className="text-base text-[#393939] max-[870px]:text-[13px]">Máy tính để bàn</p>
                                            <p className="text-sm text-[#1A1A1A] max-[870px]:text-[13px]">SL: <span className="text-[#4C4C4C]">x2</span></p>
                                        </div>
                                    </div>
                                    <div className="col-span-1 flex gap-2 justify-around items-center">
                                        <p className="font-medium text-[#7A828A] text-sm line-through max-[870px]:text-[13px]">₫56.000</p>
                                        <p className="font-medium text-[#1A1A1A] text-base max-[870px]:text-[13px]">₫36.000</p>
                                    </div>
                                    <div className="col-span-1">
                                        <p className="font-medium text-[#EA4B48] text-base text-center max-[870px]:text-[13px]">₫72.000</p>
                                    </div>
                                </div>




                                <div className="grid grid-cols-4 px-[26px] py-[16px] items-center bg-[#FFFFFF] shadow">
                                    <div className="col-span-2 text-sm flex gap-4 items-center">
                                        <img src={Images.cateAD} alt="" />
                                        <div>
                                            <p className="text-base text-[#393939] max-[870px]:text-[13px]">Máy tính để bàn</p>
                                            <p className="text-sm text-[#1A1A1A] max-[870px]:text-[13px]">SL: <span className="text-[#4C4C4C]">x2</span></p>
                                        </div>
                                    </div>
                                    <div className="col-span-1 flex gap-2 justify-around items-center">
                                        <p className="font-medium text-[#7A828A] text-sm line-through max-[870px]:text-[13px]">₫56.000</p>
                                        <p className="font-medium text-[#1A1A1A] text-base max-[870px]:text-[13px]">₫36.000</p>
                                    </div>
                                    <div className="col-span-1">
                                        <p className="font-medium text-[#EA4B48] text-base text-center max-[870px]:text-[13px]">₫72.000</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 px-[26px] py-[16px] items-center bg-[#FFFFFF] shadow">
                                    <div className="col-span-2 text-sm flex gap-4 items-center">
                                        <img src={Images.cateAD} alt="" />
                                        <div>
                                            <p className="text-base text-[#393939] max-[870px]:text-[13px]">Máy tính để bàn</p>
                                            <p className="text-sm text-[#1A1A1A] max-[870px]:text-[13px]">SL: <span className="text-[#4C4C4C]">x2</span></p>
                                        </div>
                                    </div>
                                    <div className="col-span-1 flex gap-2 justify-around items-center">
                                        <p className="font-medium text-[#7A828A] text-sm line-through max-[870px]:text-[13px]">₫56.000</p>
                                        <p className="font-medium text-[#1A1A1A] text-base max-[870px]:text-[13px]">₫36.000</p>
                                    </div>
                                    <div className="col-span-1">
                                        <p className="font-medium text-[#EA4B48] text-base text-center max-[870px]:text-[13px]">₫72.000</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>


    )
}
