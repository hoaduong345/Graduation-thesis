import React from 'react'
import ProductManager from '../../../../../Assets/TSX/ProductManager'
import User from '../../../../../Assets/TSX/User'
import HistoryBought from '../../../../../Assets/TSX/HistoryBought'
import Cart from '../../../../../Assets/TSX/Cart'
import HomeSitebar from '../../../Admin/Assets/Icon/homeSitebar'
import Heart from '../../../../../Assets/TSX/Heart'
import Setting from '../../../../../Assets/TSX/Setting'
import Logout from '../../../../../Assets/TSX/Logout'
import axios from 'axios'

export default function Sitebar() {
    const instance = axios.create({
        withCredentials: true,
    })
    // http://localhost:5000/buyzzle/auth/logout
    const API = "http://localhost:5000/buyzzle/auth/logout";
    async function LogOut() {

        try {
            const response = await instance.post(API);
            // localStorage.removeItem('user');
            console.log(response);
            // window.location.href = "/";
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <div className='mt-9 py-5 px-5 h-auto rounded-[6px] bg-white
    shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'>

            <div className='text'>
                <h1 className='text-xl font-bold leading-7 mb-2'>
                    Navigation
                </h1>
            </div>

            {/* ProductManager */}
            <div className=' w-[100%] flex justify-start items-center py-4 gap-3 transition duration-200
     hover:rounded-[6px] cursor-pointer hover:bg-[#FFEAE9] text-[#7A828A] hover:text-[#EA4B48] pl-4'>
                <ProductManager />
                <span className='text-base font-normal '><a href="#">Quản lý sản phẩm</a></span>
            </div>

            {/* User */}
            <div className=' w-[100%] flex justify-start items-center py-4 gap-3 transition duration-200
     hover:rounded-[6px] cursor-pointer hover:bg-[#FFEAE9]  text-[#7A828A] hover:text-[#EA4B48] pl-4'>
                <User />
                <span className='text-base font-normal '><a href="#">Tài khoản</a></span>
            </div>

            {/* HistoryBought */}
            <div className=' w-[100%] flex justify-start items-center py-4 gap-4 transition duration-200
     hover:rounded-[6px] cursor-pointer hover:bg-[#FFEAE9] text-[#7A828A] hover:text-[#EA4B48] pl-[18px]'>
                <HistoryBought />
                <span className='text-base font-normal '><a href="#">Lịch sử mua hàng</a></span>
            </div>

            {/* Cart */}
            <div className=' w-[100%] flex justify-start items-center py-4 gap-3 transition duration-200
     hover:rounded-[6px] cursor-pointer hover:bg-[#FFEAE9] text-[#7A828A] hover:text-[#EA4B48] pl-4'>
                <Cart />
                <span className='text-base font-normal '><a href="#">Giỏ hàng</a></span>
            </div>

            {/* Heart */}
            <div className=' w-[100%] flex justify-start items-center py-4 gap-3 transition duration-200
     hover:rounded-[6px] cursor-pointer hover:bg-[#FFEAE9] text-[#7A828A] hover:text-[#EA4B48] pl-4'>
                <Heart />
                <span className='text-base font-normal '><a href="#">Sản phẩm yêu thích</a></span>
            </div>

            {/* Setting */}
            <div className=' w-[100%] flex justify-start items-center py-4 gap-3 transition duration-200
     hover:rounded-[6px] cursor-pointer hover:bg-[#FFEAE9] text-[#7A828A] hover:text-[#EA4B48] pl-4'>
                <Setting />
                <span className='text-base font-normal '><a href="#">Cài đặt</a></span>
            </div>

            {/* Logout */}
            <button onClick={LogOut} className=' w-[100%] flex justify-start items-center py-4 gap-3 transition duration-200
     hover:rounded-[6px] cursor-pointer hover:bg-[#FFEAE9] text-[#7A828A] hover:text-[#EA4B48] pl-4'>
                <Logout />

                <span className='text-base font-normal '>Đăng xuất</span>

            </button>

        </div>
    )
}
