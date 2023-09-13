import React from 'react'
import Container from '../../../../components/container/Container'
import SitebarAdmin from '../Sitebar/Sitebar'
import PlusSquare from '../Assets/TSX/PlusSquare'
import Search from '../../../../Assets/TSX/Search'
import StatisticalAdmin from '../Assets/TSX/statistical'
import Filter from '../Assets/TSX/Filter'
import Download from '../Assets/TSX/Download'
import { Images } from '../../../../Assets/TS'
import Edit from '../Assets/TSX/Edit'
export default function ListproductsAdmin() {
  return (
    <>
      <Container>

        <div className='grid grid-cols-5'>
          <div className="col-span-1 max-2xl:hidden">
            <SitebarAdmin />
          </div>
          <div className='content-right-filter mt-[34px] col-span-4 max-2xl:col-span-1 '>
            {/* h2 */}
            <div>
              <h2 className="txt-filter font-bold text-[#1A1A1A] text-3xl" >
                DANH SÁCH SẢN PHẨM
              </h2>
            </div>
            {/* end h2 */}
            <div className='grid gap-4 grid-cols-9 mt-12'>
              <div className='col-span-2'>
                <div className='flex items-center w-[196px] rounded-md h-[46px] bg-[#EA4B48] justify-evenly cursor-pointer'>
                  <PlusSquare />
                  <button className='text-center text-base font-bold text-white '>
                    Thêm sản phẩm
                  </button>
                </div>
              </div>
              <div className='flex col-span-7 justify-around ml-20'>
                {/* input */}
                <div className="items-center ">
                  <div
                    className="Search-input-headerCenter items-center flex
                   py-[3px] px-[6px] border-[1px] border-[#FFAAAF] rounded-md">
                    <div className="mb-2">
                      <Search />
                    </div>
                    <input
                      className=" rounded-lg focus:outline-none text-lg relative pr-7 flex-1 pl-3 max-xl:text-sm"
                      placeholder="Tìm kiếm..."
                    />
                  </div>
                </div>

                <div>
                  <div className='flex items-center w-[133px] rounded-md h-[46px] hover:bg-[#FFEAE9] transition duration-150 border-[#FFAAAF] border-[1px] justify-evenly cursor-pointer'>
                    <StatisticalAdmin />
                    <button className='text-center text-base font-bold text-[#EA4B48] '>
                      Thống kê
                    </button>
                  </div>
                </div>

                <div>
                  <div className='flex items-center w-[133px] rounded-md h-[46px] hover:bg-[#FFEAE9] transition duration-150 border-[#FFAAAF] border-[1px] justify-evenly cursor-pointer'>
                    <Download />
                    <button className='text-center text-base font-bold text-[#EA4B48] '>
                      Xuất excel
                    </button>
                  </div>
                </div>

                <div>
                  <div className='flex items-center w-[112px] rounded-md h-[46px] hover:bg-[#FFEAE9] transition duration-150 border-[#FFAAAF] border-[1px] justify-evenly cursor-pointer'>
                    <Filter />
                    <button className='text-center text-base font-bold text-[#EA4B48] '>
                      Bộ lọc
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className='w-[100%] mt-6 items-center flex'>
              <div className='w-[10%] text-center'>
                <input
                  id="default-checkbox"
                  type="checkbox"
                  className="w-4 h-4 accent-[#EA4B48] "
                />
              </div>
              <div className='w-[35%] text-center'>
                <h3 className='text-[#1A1A1A] text-sm font-semibold leading-4'>THÔNG TIN</h3>
              </div>
              <div className='w-[45%] flex justify-between'>
                <h3 className='text-[#1A1A1A] text-sm font-semibold leading-4'>SỐ LƯỢNG</h3>
                <h3 className='text-[#1A1A1A] text-sm font-semibold leading-4'>TÌNH TRẠNG</h3>
                <h3 className='text-[#1A1A1A] text-sm font-semibold leading-4'>SỐ LƯỢNG ĐÃ BÁN</h3>
                <h3 className='text-[#1A1A1A] text-sm font-semibold leading-4'>ĐÁNH GIÁ</h3>
              </div>
            </div>

            {/* cardItems */}
            <div className='card-items py-2 rounded-md mt-6
            shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'>

              {/* infor in card */}
              <div className='w-[100%] flex items-center'>

                {/* checkbox */}
                <div className='checkbox w-[10%] text-center'>

                  <input
                    id="default-checkbox"
                    type="checkbox"
                    className="w-4 h-4 accent-[#EA4B48] " />
                </div>{/* end checkbox */}

                {/* InforProduct */}
                <div className='InforProduct w-[35%] flex items-center'>
                  <img src={Images.imageproduct} alt="imageproduct" />
                  <div className='inforProducts ml-4'>
                    <p className='nameProducts text-[#1A1A1A] text-xs font-semibold leading-4 uppercase'>
                      Áo mưa một mảnh áo mưa dài một người chống bão áo mưa...</p>
                    <div className='flex mt-1'>
                      <p className='category text-[#4C4C4C] text-sm font-medium leading-4'>
                        Danh mục: </p>
                      <p className='category text-[#4C4C4C] text-sm font-medium leading-4 ml-[2px]'>
                        Đồ Gia Dụng , Áo Mưa </p>
                    </div>
                  </div>
                </div>{/* end InforProduct */}

                <div className='w-[49%] items-center flex justify-between'>
                  {/* remaining amount ( số lượng còn lại ) */}
                  <div className='quantity '>
                    <span className='text-[#1A1A1A] text-sm font-semibold ml-5 leading-4'>1340</span >
                  </div>{/* end  remaining amount ( số lượng còn lại )  */}
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
                  {/* so luong đã bán ra */}
                  <div>
                    <h3 className=' font-semibold'>10K</h3>
                  </div>{/* end so luong đã bán ra */}
                  {/* rating  */}
                  <div className='rating '>
                    <div className="flex items-center justify-start gap-3 ">
                      <div className="flex items-center space-x-1 ">

                        <svg
                          className='text-yellow-300 w-4 h-4'
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg
                          className='text-yellow-300 w-4 h-4'
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg
                          className='text-yellow-300 w-4 h-4'
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg
                          className='text-yellow-300 w-4 h-4'
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg
                          className={`w-4 h-4 `}
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>

                      </div>
                      <p>4.0</p>
                    </div>
                  </div>
                </div>

                <Edit />
              </div>{/* end infor in card */}

            </div>{/* end cardItems */}


            {/* cardItems */}
            <div className='card-items py-2 rounded-md mt-6
            shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'>

              {/* infor in card */}
              <div className='w-[100%] flex items-center'>

                {/* checkbox */}
                <div className='checkbox w-[10%] text-center'>

                  <input
                    id="default-checkbox"
                    type="checkbox"
                    className="w-4 h-4 accent-[#EA4B48] " />
                </div>{/* end checkbox */}

                {/* InforProduct */}
                <div className='InforProduct w-[35%] flex items-center'>
                  <img src={Images.imageproduct1} alt="imageproduct" />
                  <div className='inforProducts ml-4'>
                    <p className='nameProducts text-[#1A1A1A] text-xs font-semibold leading-4 uppercase'>
                      Áo mưa một mảnh áo mưa dài một người chống bão áo mưa...</p>
                    <div className='flex mt-1'>
                      <p className='category text-[#4C4C4C] text-sm font-medium leading-4'>
                        Danh mục: </p>
                      <p className='category text-[#4C4C4C] text-sm font-medium leading-4 ml-[2px]'>
                        Đồ Gia Dụng , Áo Mưa </p>
                    </div>
                  </div>
                </div>{/* end InforProduct */}

                <div className='w-[49%] items-center flex justify-between'>
                  {/* remaining amount ( số lượng còn lại ) */}
                  <div className='quantity '>
                    <span className='text-[#1A1A1A] text-sm font-semibold ml-5 leading-4'>1340</span >
                  </div>{/* end  remaining amount ( số lượng còn lại )  */}
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
                  {/* so luong đã bán ra */}
                  <div>
                    <h3 className=' font-semibold'>10K</h3>
                  </div>{/* end so luong đã bán ra */}
                  {/* rating  */}
                  <div className='rating '>
                    <div className="flex items-center justify-start gap-3 ">
                      <div className="flex items-center space-x-1 ">

                        <svg
                          className='text-yellow-300 w-4 h-4'
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg
                          className='text-yellow-300 w-4 h-4'
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg
                          className='text-yellow-300 w-4 h-4'
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg
                          className='text-yellow-300 w-4 h-4'
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg
                          className={`w-4 h-4 `}
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>

                      </div>
                      <p>4.0</p>
                    </div>
                  </div>
                </div>

                <Edit />
              </div>{/* end infor in card */}

            </div>{/* end cardItems */}

            {/* cardItems */}
            <div className='card-items py-2 rounded-md mt-6
            shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'>

              {/* infor in card */}
              <div className='w-[100%] flex items-center'>

                {/* checkbox */}
                <div className='checkbox w-[10%] text-center'>

                  <input
                    id="default-checkbox"
                    type="checkbox"
                    className="w-4 h-4 accent-[#EA4B48] " />
                </div>{/* end checkbox */}

                {/* InforProduct */}
                <div className='InforProduct w-[35%] flex items-center'>
                  <img src={Images.imageproduct2} alt="imageproduct" />
                  <div className='inforProducts ml-4'>
                    <p className='nameProducts text-[#1A1A1A] text-xs font-semibold leading-4 uppercase'>
                      Áo mưa một mảnh áo mưa dài một người chống bão áo mưa...</p>
                    <div className='flex mt-1'>
                      <p className='category text-[#4C4C4C] text-sm font-medium leading-4'>
                        Danh mục: </p>
                      <p className='category text-[#4C4C4C] text-sm font-medium leading-4 ml-[2px]'>
                        Đồ Gia Dụng , Áo Mưa </p>
                    </div>
                  </div>
                </div>{/* end InforProduct */}

                <div className='w-[49%] items-center flex justify-between'>
                  {/* remaining amount ( số lượng còn lại ) */}
                  <div className='quantity '>
                    <span className='text-[#1A1A1A] text-sm font-semibold ml-5 leading-4'>1340</span >
                  </div>{/* end  remaining amount ( số lượng còn lại )  */}
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
                  {/* so luong đã bán ra */}
                  <div>
                    <h3 className=' font-semibold'>10K</h3>
                  </div>{/* end so luong đã bán ra */}
                  {/* rating  */}
                  <div className='rating '>
                    <div className="flex items-center justify-start gap-3 ">
                      <div className="flex items-center space-x-1 ">

                        <svg
                          className='text-yellow-300 w-4 h-4'
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg
                          className='text-yellow-300 w-4 h-4'
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg
                          className='text-yellow-300 w-4 h-4'
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg
                          className='text-yellow-300 w-4 h-4'
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg
                          className={`w-4 h-4 `}
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>

                      </div>
                      <p>4.0</p>
                    </div>
                  </div>
                </div>

                <Edit />
              </div>{/* end infor in card */}

            </div>{/* end cardItems */}

            {/* cardItems */}
            <div className='card-items py-2 rounded-md mt-6
            shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'>

              {/* infor in card */}
              <div className='w-[100%] flex items-center'>

                {/* checkbox */}
                <div className='checkbox w-[10%] text-center'>

                  <input
                    id="default-checkbox"
                    type="checkbox"
                    className="w-4 h-4 accent-[#EA4B48] " />
                </div>{/* end checkbox */}

                {/* InforProduct */}
                <div className='InforProduct w-[35%] flex items-center'>
                  <img src={Images.imageproduct3} alt="imageproduct" />
                  <div className='inforProducts ml-4'>
                    <p className='nameProducts text-[#1A1A1A] text-xs font-semibold leading-4 uppercase'>
                      Áo mưa một mảnh áo mưa dài một người chống bão áo mưa...</p>
                    <div className='flex mt-1'>
                      <p className='category text-[#4C4C4C] text-sm font-medium leading-4'>
                        Danh mục: </p>
                      <p className='category text-[#4C4C4C] text-sm font-medium leading-4 ml-[2px]'>
                        Đồ Gia Dụng , Áo Mưa </p>
                    </div>
                  </div>
                </div>{/* end InforProduct */}

                <div className='w-[49%] items-center flex justify-between'>
                  {/* remaining amount ( số lượng còn lại ) */}
                  <div className='quantity '>
                    <span className='text-[#1A1A1A] text-sm font-semibold ml-5 leading-4'>1340</span >
                  </div>{/* end  remaining amount ( số lượng còn lại )  */}
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
                  {/* so luong đã bán ra */}
                  <div>
                    <h3 className=' font-semibold'>10K</h3>
                  </div>{/* end so luong đã bán ra */}
                  {/* rating  */}
                  <div className='rating '>
                    <div className="flex items-center justify-start gap-3 ">
                      <div className="flex items-center space-x-1 ">

                        <svg
                          className='text-yellow-300 w-4 h-4'
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg
                          className='text-yellow-300 w-4 h-4'
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg
                          className='text-yellow-300 w-4 h-4'
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg
                          className='text-yellow-300 w-4 h-4'
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg
                          className={`w-4 h-4 `}
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>

                      </div>
                      <p>4.0</p>
                    </div>
                  </div>
                </div>

                <Edit />
              </div>{/* end infor in card */}

            </div>{/* end cardItems */}

            {/* cardItems */}
            <div className='card-items py-2 rounded-md mt-6
            shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'>

              {/* infor in card */}
              <div className='w-[100%] flex items-center'>

                {/* checkbox */}
                <div className='checkbox w-[10%] text-center'>

                  <input
                    id="default-checkbox"
                    type="checkbox"
                    className="w-4 h-4 accent-[#EA4B48] " />
                </div>{/* end checkbox */}

                {/* InforProduct */}
                <div className='InforProduct w-[35%] flex items-center'>
                  <img src={Images.imageproduct4} alt="imageproduct" />
                  <div className='inforProducts ml-4'>
                    <p className='nameProducts text-[#1A1A1A] text-xs font-semibold leading-4 uppercase'>
                      Áo mưa một mảnh áo mưa dài một người chống bão áo mưa...</p>
                    <div className='flex mt-1'>
                      <p className='category text-[#4C4C4C] text-sm font-medium leading-4'>
                        Danh mục: </p>
                      <p className='category text-[#4C4C4C] text-sm font-medium leading-4 ml-[2px]'>
                        Đồ Gia Dụng , Áo Mưa </p>
                    </div>
                  </div>
                </div>{/* end InforProduct */}

                <div className='w-[49%] items-center flex justify-between'>
                  {/* remaining amount ( số lượng còn lại ) */}
                  <div className='quantity '>
                    <span className='text-[#1A1A1A] text-sm font-semibold ml-5 leading-4'>1340</span >
                  </div>{/* end  remaining amount ( số lượng còn lại )  */}
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
                  {/* so luong đã bán ra */}
                  <div>
                    <h3 className=' font-semibold'>10K</h3>
                  </div>{/* end so luong đã bán ra */}
                  {/* rating  */}
                  <div className='rating '>
                    <div className="flex items-center justify-start gap-3 ">
                      <div className="flex items-center space-x-1 ">

                        <svg
                          className='text-yellow-300 w-4 h-4'
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg
                          className='text-yellow-300 w-4 h-4'
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg
                          className='text-yellow-300 w-4 h-4'
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg
                          className='text-yellow-300 w-4 h-4'
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg
                          className={`w-4 h-4 `}
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>

                      </div>
                      <p>4.0</p>
                    </div>
                  </div>
                </div>

                <Edit />
              </div>{/* end infor in card */}

            </div>{/* end cardItems */}


          </div>
        </div>
      </Container>
    </>
  )
}
