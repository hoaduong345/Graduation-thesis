import React, { useEffect, useState } from 'react'
import { Products } from '../../User/FilterPage/FiltersPage'
import Edit from '../Assets/TSX/Edit'
import { Link, useParams } from 'react-router-dom'
import Delete from '../Assets/TSX/Delete'
import axios from 'axios'
import { appConfig } from '../../../../configsEnv'
import { error } from 'console'
import Handle from 'rc-slider/lib/Handles/Handle'
type Props = {
  products: Products
  HandleXoa: (id: number) => void
}
export default function ListproductMap(props: Props) {
  const { products } = props
  const handleRemove = (id: number) => {
    props.HandleXoa(id)
  }
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
          <div className='InforProduct w-[35%] flex items-center'></div>
          <div>
            <img className='w-[70px] h-[70px] rounded-md' src={products.ProductImage[0].url} alt="imageproduct" />
          </div>
          <div className='inforProducts ml-4'>
            <p className='nameProducts  text-[#1A1A1A] text-xs font-semibold leading-4 max-w-[250px] uppercase'>
              {products.name.length > 100 ?
                `${products.name.substring(0, 100)}...` : products.name
              }
            </p>
            <div className='flex mt-1'>
              <p className='category text-[#4C4C4C] text-sm font-medium leading-4'>
                Danh mục: </p>
              <p className='category text-[#4C4C4C] text-sm font-medium leading-4 ml-[2px]'>
                Đồ Gia Dụng , Áo Mưa </p>
            </div>
          </div>
        </div>{/* end InforProduct */}

        <div className='w-[49%] items-center flex'>
          {/* remaining amount ( số lượng còn lại ) */}
          <div className='quantity w-[18%]'>
            <span className='text-[#1A1A1A] text-sm font-semibold ml-3 leading-4'>{products.quantity}</span >
          </div>{/* end  remaining amount ( số lượng còn lại )  */}
          <div className='flex text-center w-[37%] justify-start gap-5'>
            <h3 className='text-[#4C4C4C] font-semibold'>Ẩn</h3>
            {/* Swich */}
            <div className="form-control">
              <input type="checkbox" className="toggle toggle-error" />
            </div>{/* end  Swich */}
            <h3 className='text-[#5D5FEF] font-semibold'>Đăng</h3>
          </div>
          {/* so luong đã bán ra */}
          <div>
            <h3 className='mr-24 font-semibold'>10K</h3>
          </div>{/* end so luong đã bán ra */}
          {/* rating  */}
          <div className='rating '>
            <div className="flex items-center justify-start gap-3 ">
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
        <div className='flex w-[52px] justify-start gap-3'>
          <Link to={`/admin/updateproduct/${props.products.id}`}>
            <Edit />
          </Link>

          <div onClick={() =>
            handleRemove(props.products.id)}>
            <Delete />
          </div>

        </div>
      </div>{/* end infor in card */}

    </>
  );
}
