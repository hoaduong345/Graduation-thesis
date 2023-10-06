import React, { useState } from 'react'
import Container from '../../../../components/container/Container'
import Sitebar from '../UserProfile/Sitebar/Sitebar'
import ArrowDown from '../../Admin/Assets/TSX/ArrowDown'
import { Images } from '../../../../Assets/TS'
import QuantityHistory from '../../../../Assets/TSX/QuantityHistory'
import ArrowNext from '../../../../Assets/TSX/ArrowNext'
import ArrowNextHistory from '../../../../Assets/TSX/ArrowNextHistory'
import { IonIcon } from '@ionic/react'
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
export default function OrderHistory() {
    const [open, setOpen] = useState<number>();

    const handleOpen = (value: number) => setOpen(open === value ? 0 : value);
    const [arrowAction, setArrowAction] = useState(false)
    const openModal = () => {
        const modal = document.getElementById('my_modal_3') as HTMLDialogElement | null;
        if (modal) {
            modal.showModal();
        }
    };
    const closeModal = () => {
        const modal = document.getElementById('my_modal_3') as HTMLDialogElement | null;
        if (modal) {
            modal.close();
        }
    };
    return (
        <Container>
            <div className="float-right cursor-pointer max-[1920px]:invisible max-2xl:visible"
                onClick={() => openModal()}>
                <IonIcon className="text-[2rem]" name={'menu'}></IonIcon>
            </div>
            <div className='grid grid-cols-4 gap-4'>
                <div className={`col-span-1 `}>
                    {/* You can open the modal using document.getElementById('ID').showModal() method */}
                    <dialog id="my_modal_3" className="max-2xl:modal ">
                        <div className="relative">
                            <button
                                className="btn btn-sm btn-circle btn-ghost absolute right-1 top-10"
                                onClick={closeModal}>
                                <IonIcon className="text-[1rem]" name={'close'}></IonIcon>
                            </button>
                            <Sitebar />
                        </div>
                    </dialog>
                    <div className="max-2xl:hidden">
                        <Sitebar />
                    </div>
                </div>
                {/* Table history order */}
                <div className="flex-col mt-9 col-span-3 max-2xl:col-span-5">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 ">
                        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8 max-lg:text-xs">
                            <div className=" ">
                                <div className=" w-full text-center text-sm max-lg:text-[11px]  z-20 ">
                                    <div
                                        className="border-b w-full bg-[#FFEAE9] font-medium dark:text-[#4C4C4C]">
                                        <div className=' justify-around w-full flex '>
                                            <div className=" py-4 max-2xl:text-left ">#ID ĐƠN HÀNG</div>
                                            <div className=" py-4">NGÀY TẠO ĐƠN</div>
                                            <div className=" py-4">TỔNG PHÍ</div>
                                            <div className=" py-4">TRẠNG THÁI</div>
                                            <div className=" py-4"></div>
                                        </div>
                                    </div>
                                </div>
                                <Accordion open={open === 1}>
                                    <div className='w-full bg-black' onClick={() => handleOpen(1)}>
                                        <div className='text-sm bg-black ' >
                                            <div className="border-b dark:border-neutral-500 bg-white px-4">
                                                <div className='cursor-pointer flex items-center py-4 w-full justify-start'>
                                                    <div className='w-[5%]'>
                                                        {
                                                            open ? <ArrowDown /> : <ArrowNextHistory />
                                                        }
                                                    </div>
                                                    <div className='w-[24%]'>#1HPTH</div>
                                                    <div className='w-[20%]'>20/10/2023</div>
                                                    <div className='w-[22%]'>₫302.000 (2 Sản Phẩm)</div>
                                                    <div className='w-[22%] ml-1'> Đã giao cho ĐVVC</div>
                                                    <div >Xem</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <AccordionBody>
                                        <table className='w-full'>
                                            <thead
                                                className="border-b bg-[#F2F2F2] dark:text-[#4C4C4C]">
                                                <tr>
                                                    <th className=" px-[50px] py-2 w-[50%] text-left font-normal">Thông tin sản phẩm</th>
                                                    <th className=" px-6 py-2 w-[14%] font-normal">Giá</th>
                                                    <th className=" px-6 py-2 w-[14%] font-normal max-lg:px-4 max-lg:py-2">Số lượng</th>
                                                    <th className=" px-6 py-2 w-[14%] font-normal">Tổng</th>
                                                    <th className=" px-6 py-2 w-[14%] font-normal"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="border-b dark:border-[#E0E0E0] text-center">
                                                    <td className='flex items-center pl-[50px] py-4 text-left gap-3'>
                                                        <img src={Images.imageproduct4} className='w-[50px] h-[50px] 
                                                max-lg:h-[35px]  max-lg:w-[35px]
                                                ' alt="imgProduct" />
                                                        <QuantityHistory />
                                                        <p className='text-[#4C4C4C] text-base font-medium max-lg:text-sm'>+2</p>
                                                        <p className='text-[#4C4C4C] text-base font-medium max-lg:text-sm'>Điện Thoại Samsung s20</p>
                                                    </td>
                                                    <td className="whitespace-nowrap  px-6 py-4">₫30.000 </td>
                                                    <td className="whitespace-nowrap  px-6 py-4">x1</td>
                                                    <td className="whitespace-nowrap  px-6 py-4">₫30.000 </td>
                                                </tr>
                                                <tr className="border-b dark:border-[#E0E0E0] text-center">
                                                    <td className='flex items-center pl-[50px] py-4 text-left gap-3'>
                                                        <img src={Images.imageproduct4} className='w-[50px] h-[50px]
                                                max-lg:h-[35px]  max-lg:w-[35px]
                                                ' alt="imgProduct" />
                                                        <QuantityHistory />
                                                        <p className='text-[#4C4C4C] text-base font-medium max-lg:text-sm'>+2</p>
                                                        <p className='text-[#4C4C4C] text-base font-medium max-lg:text-sm'>Điện Thoại Samsung s20</p>
                                                    </td>
                                                    <td className="whitespace-nowrap  px-6 py-4">₫30.000 </td>
                                                    <td className="whitespace-nowrap  px-6 py-4">x1</td>
                                                    <td className="whitespace-nowrap  px-6 py-4">₫30.000 </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                    </AccordionBody>
                                </Accordion>
                                <Accordion open={open === 2}>
                                    <div className='w-full bg-black' onClick={() => handleOpen(2)}>
                                        <div className='text-sm bg-black ' >
                                            <div className="border-b dark:border-neutral-500 bg-white px-4">
                                                <div className='cursor-pointer flex items-center py-4 w-full justify-start'>
                                                    <div className='w-[5%]'>
                                                        {
                                                            open ? <ArrowDown /> : <ArrowNextHistory />
                                                        }
                                                    </div>
                                                    <div className='w-[24%]'>#1HPTH</div>
                                                    <div className='w-[20%]'>20/10/2023</div>
                                                    <div className='w-[22%]'>₫302.000 (2 Sản Phẩm)</div>
                                                    <div className='w-[22%] ml-1'> Đã giao cho ĐVVC</div>
                                                    <div >Xem</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <AccordionBody>
                                        <table className='w-full'>
                                            <thead
                                                className="border-b bg-[#F2F2F2] dark:text-[#4C4C4C]">
                                                <tr>
                                                    <th className=" px-[50px] py-2 w-[50%] text-left font-normal">Thông tin sản phẩm</th>
                                                    <th className=" px-6 py-2 w-[14%] font-normal">Giá</th>
                                                    <th className=" px-6 py-2 w-[14%] font-normal max-lg:px-4 max-lg:py-2">Số lượng</th>
                                                    <th className=" px-6 py-2 w-[14%] font-normal">Tổng</th>
                                                    <th className=" px-6 py-2 w-[14%] font-normal"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="border-b dark:border-[#E0E0E0] text-center">
                                                    <td className='flex items-center pl-[50px] py-4 text-left gap-3'>
                                                        <img src={Images.imageproduct4} className='w-[50px] h-[50px] 
                                                max-lg:h-[35px]  max-lg:w-[35px]
                                                ' alt="imgProduct" />
                                                        <QuantityHistory />
                                                        <p className='text-[#4C4C4C] text-base font-medium max-lg:text-sm'>+2</p>
                                                        <p className='text-[#4C4C4C] text-base font-medium max-lg:text-sm'>Điện Thoại Samsung s20</p>
                                                    </td>
                                                    <td className="whitespace-nowrap  px-6 py-4">₫30.000 </td>
                                                    <td className="whitespace-nowrap  px-6 py-4">x1</td>
                                                    <td className="whitespace-nowrap  px-6 py-4">₫30.000 </td>
                                                </tr>
                                                <tr className="border-b dark:border-[#E0E0E0] text-center">
                                                    <td className='flex items-center pl-[50px] py-4 text-left gap-3'>
                                                        <img src={Images.imageproduct4} className='w-[50px] h-[50px]
                                                max-lg:h-[35px]  max-lg:w-[35px]
                                                ' alt="imgProduct" />
                                                        <QuantityHistory />
                                                        <p className='text-[#4C4C4C] text-base font-medium max-lg:text-sm'>+2</p>
                                                        <p className='text-[#4C4C4C] text-base font-medium max-lg:text-sm'>Điện Thoại Samsung s20</p>
                                                    </td>
                                                    <td className="whitespace-nowrap  px-6 py-4">₫30.000 </td>
                                                    <td className="whitespace-nowrap  px-6 py-4">x1</td>
                                                    <td className="whitespace-nowrap  px-6 py-4">₫30.000 </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                    </AccordionBody>
                                </Accordion>
                                <Accordion open={open === 3}>
                                    <div className='w-full bg-black' onClick={() => handleOpen(3)}>
                                        <div className='text-sm bg-black ' >
                                            <div className="border-b dark:border-neutral-500 bg-white px-4">
                                                <div className='cursor-pointer flex items-center py-4 w-full justify-start'>
                                                    <div className='w-[5%]'>
                                                        {
                                                            open ? <ArrowDown /> : <ArrowNextHistory />
                                                        }
                                                    </div>
                                                    <div className='w-[24%]'>#1HPTH</div>
                                                    <div className='w-[20%]'>20/10/2023</div>
                                                    <div className='w-[22%]'>₫302.000 (2 Sản Phẩm)</div>
                                                    <div className='w-[22%] ml-1'> Đã giao cho ĐVVC</div>
                                                    <div >Xem</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <AccordionBody>
                                        <table className='w-full'>
                                            <thead
                                                className="border-b bg-[#F2F2F2] dark:text-[#4C4C4C]">
                                                <tr>
                                                    <th className=" px-[50px] py-2 w-[50%] text-left font-normal">Thông tin sản phẩm</th>
                                                    <th className=" px-6 py-2 w-[14%] font-normal">Giá</th>
                                                    <th className=" px-6 py-2 w-[14%] font-normal max-lg:px-4 max-lg:py-2">Số lượng</th>
                                                    <th className=" px-6 py-2 w-[14%] font-normal">Tổng</th>
                                                    <th className=" px-6 py-2 w-[14%] font-normal"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="border-b dark:border-[#E0E0E0] text-center">
                                                    <td className='flex items-center pl-[50px] py-4 text-left gap-3'>
                                                        <img src={Images.imageproduct4} className='w-[50px] h-[50px] 
                                                max-lg:h-[35px]  max-lg:w-[35px]
                                                ' alt="imgProduct" />
                                                        <QuantityHistory />
                                                        <p className='text-[#4C4C4C] text-base font-medium max-lg:text-sm'>+2</p>
                                                        <p className='text-[#4C4C4C] text-base font-medium max-lg:text-sm'>Điện Thoại Samsung s20</p>
                                                    </td>
                                                    <td className="whitespace-nowrap  px-6 py-4">₫30.000 </td>
                                                    <td className="whitespace-nowrap  px-6 py-4">x1</td>
                                                    <td className="whitespace-nowrap  px-6 py-4">₫30.000 </td>
                                                </tr>
                                                <tr className="border-b dark:border-[#E0E0E0] text-center">
                                                    <td className='flex items-center pl-[50px] py-4 text-left gap-3'>
                                                        <img src={Images.imageproduct4} className='w-[50px] h-[50px]
                                                max-lg:h-[35px]  max-lg:w-[35px]
                                                ' alt="imgProduct" />
                                                        <QuantityHistory />
                                                        <p className='text-[#4C4C4C] text-base font-medium max-lg:text-sm'>+2</p>
                                                        <p className='text-[#4C4C4C] text-base font-medium max-lg:text-sm'>Điện Thoại Samsung s20</p>
                                                    </td>
                                                    <td className="whitespace-nowrap  px-6 py-4">₫30.000 </td>
                                                    <td className="whitespace-nowrap  px-6 py-4">x1</td>
                                                    <td className="whitespace-nowrap  px-6 py-4">₫30.000 </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                    </AccordionBody>
                                </Accordion>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container >
    )
}
