import React from 'react'

export default function Sitebar() {
    return (
        <div className='mt-28 py-8 px-5 w-56 h-[587px] rounded-[6px] mb-5
    shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]
    '>

            {/* homeIconSitebar */}
            <div className=' w-[100%] flex justify-start items-center py-2 gap-6 transition duration-200
     hover:rounded-[6px] cursor-pointer hover:bg-[#FFEAE9] hover:text-[#EA4B48] pl-7'>

                <span className='text-sm font-normal '><a href="#">Trang Chủ</a></span>
            </div>

            {/* StatisticalIconSitebar ( thống kê ) */}
            <div className=' w-[100%] flex justify-start items-center py-2 gap-6 transition duration-200
     hover:rounded-[6px] cursor-pointer hover:bg-[#FFEAE9] hover:text-[#EA4B48] pl-7'>
                <span className='text-sm font-normal '><a href="#">Thống Kê</a></span>
            </div>

            {/* dot */}
            <p className='border-dashed border-t-2 solid #E8E8EA w-[100%]'></p>

            {/* ProductIconIconSitebar */}
            <div className=' w-[100%] flex justify-start items-center py-2 gap-6 transition duration-200
     hover:rounded-[6px] cursor-pointer hover:bg-[#FFEAE9] hover:text-[#EA4B48] pl-7'>
                <span className='text-sm font-normal '><a href="#">Sản Phẩm</a></span>
            </div>

            {/* EventIconIconSitebar */}
            <div className=' w-[100%] flex justify-start items-center py-2 gap-6 transition duration-200
     hover:rounded-[6px] cursor-pointer hover:bg-[#FFEAE9] hover:text-[#EA4B48] pl-7'>
                <span className='text-sm font-normal '><a href="#">Sự Kiện</a></span>
            </div>

            {/* MembersIconSitebar */}
            <div className=' w-[100%] flex justify-start items-center py-2 gap-6 transition duration-200
     hover:rounded-[6px] cursor-pointer hover:bg-[#FFEAE9] hover:text-[#EA4B48] pl-7'>
                <span className='text-sm font-normal '><a href="#">Thành viên</a></span>
            </div>

            {/* dot */}
            <p className='border-dashed border-t-2 solid #E8E8EA w-[100%]'></p>

            {/* SalesIconSitebar */}
            <div className=' w-[100%] flex justify-start items-center py-2 gap-6 transition duration-200
     hover:rounded-[6px] cursor-pointer hover:bg-[#FFEAE9] hover:text-[#EA4B48] pl-7'>
                <span className='text-sm font-normal '><a href="#">Khuyến Mãi</a></span>
            </div>

            {/* VouchersIconIconSitebar */}
            <div className=' w-[100%] flex justify-start items-center py-2 gap-6 transition duration-200
     hover:rounded-[6px] cursor-pointer hover:bg-[#FFEAE9] hover:text-[#EA4B48] pl-7'>
                <span className='text-sm font-normal '><a href="#">Mã Giảm Giá</a></span>
            </div>

            {/* dot */}
            <p className='border-dashed border-t-2 solid #E8E8EA w-[100%]'></p>

            {/* OderIconSitebar */}
            <div className=' w-[100%] flex justify-start items-center py-2 gap-6 transition duration-200
     hover:rounded-[6px] cursor-pointer hover:bg-[#FFEAE9] hover:text-[#EA4B48] pl-7'>
                <span className='text-sm font-normal '><a href="#">Đơn Hàng</a></span>
            </div>

            {/* MessagesIconSitebar */}
            <div className=' w-[100%] flex items-center py-2 transition duration-200
     hover:rounded-[6px] cursor-pointer hover:bg-[#FFEAE9] hover:text-[#EA4B48] pl-7'>
                <span className='text-sm font-bold text-[#1A1A1A] mx-[23px]'><a href="#">Tin Nhắn</a></span>
                <div className=" inline-flex items-center justify-center w-7 h-6 px-2 py-1 text-xs font-bold text-white
       bg-[#FF6E01] rounded-full">20</div>
            </div>

            {/* SettingsIconSitebar */}
            <div className=' w-[100%] flex justify-start items-center py-2 gap-6 transition duration-200
     hover:rounded-[6px] cursor-pointer hover:bg-[#FFEAE9] hover:text-[#EA4B48] pl-7'>
                <span className='text-sm font-normal '><a href="#">Cài đặt</a></span>
            </div>

        </div>
    )
}
