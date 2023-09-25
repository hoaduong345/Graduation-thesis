import React from 'react'
import HomeSitebar from '../Assets/Icon/homeSitebar'
import Statistical from '../Assets/Icon/Statistical'
import ProductIcon from '../Assets/Icon/ProductIcon'
import EventIcon from '../Assets/Icon/EventIcon'
import Members from '../Assets/Icon/Members'
import SalesIcon from '../Assets/Icon/SalesIcon'
import VouchersIcon from '../Assets/Icon/VouchersIcon'
import SettingsIcon from '../Assets/Icon/SettingsIcon'
import Oder from '../Assets/Icon/Oder'
import MessagesIcon from '../Assets/Icon/MessagesIcon'
import { Images } from '../../../../Assets/TS'
import { Link } from 'react-router-dom'

export default function SitebarAdmin() {
  return (
    <div className='mt-28 py-8 px-5 w-56 h-[587px] rounded-[6px] mb-5
      shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]
      '>

      {/* homeIconSitebar */}
      <div className=' w-[100%] flex justify-start items-center py-2 gap-6 transition duration-200
       hover:rounded-[6px] cursor-pointer hover:bg-[#FFEAE9] hover:text-[#EA4B48] pl-7'>
        <HomeSitebar />
        <span className='text-sm font-normal '><a href="#">Trang Chủ</a></span>
      </div>

      {/* StatisticalIconSitebar ( thống kê ) */}
      <div className=' w-[100%] flex justify-start items-center py-2 gap-6 transition duration-200
       hover:rounded-[6px] cursor-pointer hover:bg-[#FFEAE9] hover:text-[#EA4B48] pl-7'>
        <Statistical />
        <span className='text-sm font-normal '><a href="#">Thống Kê</a></span>
      </div>

      {/* dot */}
      <p className='border-dashed border-t-2 solid #E8E8EA w-[100%]'></p>

      {/* ProductIconIconSitebar */}
      <div className=' w-[100%] flex justify-start items-center py-2 gap-6 transition duration-200
       hover:rounded-[6px] cursor-pointer hover:bg-[#FFEAE9] hover:text-[#EA4B48] pl-7'>
        <ProductIcon />
        <span className='text-sm font-normal '><a href="#">Sản Phẩm</a></span>
      </div>

      {/* EventIconIconSitebar */}
      <div className=' w-[100%] flex justify-start items-center py-2 gap-6 transition duration-200
       hover:rounded-[6px] cursor-pointer hover:bg-[#FFEAE9] hover:text-[#EA4B48] pl-7'>
        <EventIcon />
        <span className='text-sm font-normal '><a href="#">Sự Kiện</a></span>
      </div>

      {/* MembersIconSitebar */}
      <div className=' w-[100%] flex justify-start items-center py-2 gap-6 transition duration-200
       hover:rounded-[6px] cursor-pointer hover:bg-[#FFEAE9] hover:text-[#EA4B48] pl-7'>
        <Members />
        <span className='text-sm font-normal '><a href="#">Thành viên</a></span>
      </div>

      {/* dot */}
      <p className='border-dashed border-t-2 solid #E8E8EA w-[100%]'></p>

      {/* SalesIconSitebar */}
      <div className=' w-[100%] flex justify-start items-center py-2 gap-6 transition duration-200
       hover:rounded-[6px] cursor-pointer hover:bg-[#FFEAE9] hover:text-[#EA4B48] pl-7'>
        <SalesIcon />
        <span className='text-sm font-normal '><Link to="/admin/category">Danh mục</Link></span>
      </div>

      {/* SalesIconSitebar */}
      <div className=' w-[100%] flex justify-start items-center py-2 gap-6 transition duration-200
       hover:rounded-[6px] cursor-pointer hover:bg-[#FFEAE9] hover:text-[#EA4B48] pl-7'>
        <SalesIcon />
        <span className='text-sm font-normal '><a href="#">Khuyến Mãi</a></span>
      </div>

      {/* VouchersIconIconSitebar */}
      <div className=' w-[100%] flex justify-start items-center py-2 gap-6 transition duration-200
       hover:rounded-[6px] cursor-pointer hover:bg-[#FFEAE9] hover:text-[#EA4B48] pl-7'>
        <VouchersIcon />
        <span className='text-sm font-normal '><a href="#">Mã Giảm Giá</a></span>
      </div>

      {/* dot */}
      <p className='border-dashed border-t-2 solid #E8E8EA w-[100%]'></p>

      {/* OderIconSitebar */}
      <div className=' w-[100%] flex justify-start items-center py-2 gap-6 transition duration-200
       hover:rounded-[6px] cursor-pointer hover:bg-[#FFEAE9] hover:text-[#EA4B48] pl-7'>
        <Oder />
        <span className='text-sm font-normal '><a href="#">Đơn Hàng</a></span>
      </div>

      {/* MessagesIconSitebar */}
      <div className=' w-[100%] flex items-center py-2 transition duration-200
       hover:rounded-[6px] cursor-pointer hover:bg-[#FFEAE9] hover:text-[#EA4B48] pl-7'>
        <MessagesIcon />
        <span className='text-sm font-bold text-[#1A1A1A] mx-[23px]'><a href="#">Tin Nhắn</a></span>
        <div className=" inline-flex items-center justify-center w-7 h-6 px-2 py-1 text-xs font-bold text-white
         bg-[#FF6E01] rounded-full">20</div>
      </div>

      {/* SettingsIconSitebar */}
      <div className=' w-[100%] flex justify-start items-center py-2 gap-6 transition duration-200
       hover:rounded-[6px] cursor-pointer hover:bg-[#FFEAE9] hover:text-[#EA4B48] pl-7'>
        <SettingsIcon />
        <span className='text-sm font-normal '><a href="#">Cài đặt</a></span>
      </div>

      <div className='flex mt-14'>
        <img src={Images.avatar_admin} alt="avatar_admin" />
        <div className='flex justify-between items-center w-[80%]'>
          <div className='data ml-4 '>
            <p className='text-[#000000] font-semibold'>Admin</p>
            <p className='text-[#4C4C4C] mr-1'>Admin@gmail.com</p>
          </div>
        </div>
      </div>


    </div>

  )
}
