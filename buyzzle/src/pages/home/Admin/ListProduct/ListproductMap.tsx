import React from 'react'
import { Products } from '../../User/FilterPage/FiltersPage'
import Edit from '../Assets/TSX/Edit'
import { Link } from 'react-router-dom'
type Props = {
  products: Products
}
export default function ListproductMap(props: Props) {
  const { products } = props
  return (
    <>
      {/* cardItems */}
      <div className='card-items py-2 rounded-md mt-6
            shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'>

        {/* infor in card */}
        <div className='w-[100%] flex items-center'>

          {/* checkbox */}
          <div className=' w-[10%] text-center'>

            <input
              id="default-checkbox"
              type="checkbox"
              className="w-4 h-4 accent-[#EA4B48] " />
          </div>{/* end checkbox */}

          {/* InforProduct */}
          <div className='InforProduct w-[35%] flex items-center'>
            <img className='w-[70px] h-[70px] rounded-md' src={products.ProductImage[0].url} alt="imageproduct" />
            <div className='inforProducts ml-4'>
              <p className='nameProducts text-[#1A1A1A] text-xs font-semibold leading-4 uppercase'>
                {products.name}</p>
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
              <span className='text-[#1A1A1A] text-sm font-semibold ml-5 leading-4'>{products.quantity}</span >
            </div>{/* end  remaining amount ( số lượng còn lại )  */}
            <div className='flex text-center  w-16 justify-start gap-5'>
              <h3 className='text-[#4C4C4C] font-semibold'>Ẩn</h3>
              {/* Swich */}
              <div className="form-control">
                <input type="checkbox" className="toggle toggle-error" />
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
                {/* <div className="flex items-center space-x-1 ">

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

                </div> */}
                <div className="rating rating-xs">
                  <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                  <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                  <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                  <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                  <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                </div>
                <p>4.0</p>
              </div>
            </div>
          </div>
          <Link to={`/admin/updateproduct/${props.products.id}`}>
            <Edit />
          </Link>
        </div>{/* end infor in card */}

      </div>{/* end cardItems */}
    </>
  )
}
