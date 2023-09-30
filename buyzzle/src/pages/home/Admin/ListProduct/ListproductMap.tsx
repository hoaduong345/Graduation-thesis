import { useState } from 'react'
import { Products } from '../../User/FilterPage/FiltersPage'
import Edit from '../Assets/TSX/Edit'
import { Link } from 'react-router-dom'
import Delete from '../Assets/TSX/Delete'
type Props = {
  products: Products
  HandleXoa: (id: number) => void
}
export default function ListproductMap(props: Props) {
  const { products } = props
  const handleRemove = (id: number) => {
    props.HandleXoa(id)
  }

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <>
      {/* cardItems */}
      <div
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut} className='card-items py-2 rounded-md mt-6 max-xl:pr-2 relative
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
            <div>
              <img className='w-[70px] h-[70px] rounded-md' src={products.ProductImage[0].url} alt="imageproduct" />
            </div>
            <div className='inforProducts ml-4'>
              <p className='nameProducts text-[#1A1A1A] text-xs font-semibold leading-4 max-w-[250px] uppercase
              max-xl:max-w-[150px]
              '>
                {
                  products.name.length > 100 ?
                    `${products.name.substring(0, 100)}...` : products.name
                }
              </p>
              <div className='flex gap-1 mt-1'>
                <p className='category text-[#4C4C4C] text-sm font-medium leading-4'>
                  Danh mục: </p>
                <p className='category text-[#4C4C4C] text-sm font-medium leading-4 ml-[2px]'>
                  {products.fK_category.name} </p>
              </div>
            </div>
          </div>{/* end InforProduct */}
          <div className='w-[49%] items-center flex'>
            {/* remaining amount ( số lượng còn lại ) */}
            <div className='quantity w-[18%] max-lg:w-[35%]'>
              <span className='text-[#1A1A1A] text-sm font-semibold ml-3 leading-4 max-xl:text-xs max-xl:ml-6  max-lg:ml-20'>{products.quantity}</span >
            </div>{/* end  remaining amount ( số lượng còn lại )  */}
            <div className='flex text-center w-[37%] justify-start gap-5 max-xl:gap-2 max-xl:ml-6 max-lg:invisible'>
              <h3 className='text-[#4C4C4C] font-semibold max-xl:font-medium max-xl:text-xs'>Ẩn</h3>
              {/* Swich */}
              <div className="form-control">
                <input type="checkbox" className="toggle toggle-error max-xl:toggle-sm" />
              </div>{/* end  Swich */}
              <h3 className='text-[#5D5FEF] font-semibold max-xl:font-medium max-xl:text-xs'>Đăng</h3>
            </div>
            {/* so luong đã bán ra */}
            <div>
              <h3 className='mr-24 font-semibold max-xl:font-medium max-xl:text-xs max-xl:mr-14 max-lg:ml-4'>10K</h3>
            </div>{/* end so luong đã bán ra */}
            {/* rating  */}
            <div className='rating max-2xl:ml-5 max-xl:ml-1 max-lg:invisible'>
              <div className="flex items-center justify-start gap-3 max-xl:gap-1 ">
                <div className="rating rating-xs">
                  <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                  <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                  <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                  <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                  <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                </div>
                <p className='max-xl:text-xs'>4.0</p>
              </div>
            </div>
          </div>
          <div className='flex w-[52px] justify-start gap-3
          max-xl:gap-2
          '>
            <Link to={`/admin/updateproduct/${props.products.id}`}>
              <Edit />
            </Link>

            <div onClick={() =>
              handleRemove(props.products.id)}>
              <Delete />
            </div>

          </div>
        </div>{/* end infor in card */}

        {isHovering && (
          <div className='absolute z-10 bottom-0 left-[30%] transition-all duration-700 bg-white
          shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] w-[584px] rounded-md'>
            <div className='p-7 grid grid-cols-3 gap-4'>
              <div className='col-span-2 flex flex-col gap-2'>


                <div className='flex gap-10'>
                  <div className='flex flex-col gap-2'>
                    <div>
                      <p className='text-xs'>Id Sản phẩm:</p>
                      <p className='text-xs text-[#4C4C4C]'>{props.products.id}</p>
                    </div>
                    <div>
                      <p className='text-xs'>Tag:</p>
                      <p className='text-xs text-[#4C4C4C]'>!!!!!!!!!</p>
                    </div>
                    <div>
                      <p className='text-xs'>Danh mục sản phẩm:</p>
                      <p className='text-xs text-[#4C4C4C]'>{products.fK_category.name}</p>
                    </div>

                  </div>

                  <div className='flex flex-col gap-2'>
                    <div>
                      <p className='text-xs'>Ngày thêm:</p>
                      <p className='text-xs text-[#4C4C4C]'>{props.products.createdAt}</p>
                    </div>
                    <div>
                      <p className='text-xs'>Mã giảm giá:</p>
                      <p className='text-xs text-[#4C4C4C]'>!!!!</p>
                    </div>
                    <div>
                      <p className='text-xs'>Tình trạng:</p>
                      <p className='text-xs text-[#00B207]'>Còn hàng</p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className='text-xs'>Mô tả sản phẩm:</p>
                  <p className='text-xs text-[#4C4C4C]'><h1> {props.products.description} </h1></p>
                </div>


              </div>

              <div className='col-span-1 flex flex-col gap-3'>
                {
                  products.ProductImage.map(e => {
                    return (
                      <>
                        <div className='flex gap-3 items-center'>
                          <img className='w-12' src={e.url} alt="" />
                          <div>
                            <p className='text-xs text-[#4C4C4C]'>Phân loại: <span className='text-[#000000] text-xs font-medium'>!!!!</span></p>
                            <p className='text-xs text-[#4C4C4C]'>Giá: <span className='text-[#000000] text-xs font-medium'>{products.price}đ</span></p>
                            <p className='text-xs text-[#4C4C4C]'>Giá: <span className='text-[#000000] text-xs font-medium'>{products.quantity}</span></p>
                          </div>
                        </div>

                      </>
                    )
                  })
                }
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
