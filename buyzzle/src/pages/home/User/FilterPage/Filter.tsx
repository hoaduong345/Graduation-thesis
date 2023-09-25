import { Products } from './FiltersPage';
import { Images } from '../../../../Assets/TS';
import { Link } from 'react-router-dom';
import { numberFormat } from '../../../../Helper';
type Props = {
  product: Products;
};
const Filter = (props: Props) => {

  const { product } = props
  console.log("🚀 ~ file: Filter.tsx:21 ~ Filter ~ product.ProductImage:", product.ProductImage)

  return (
    <Link to={`/Detailproducts/${product.id}`} >
      <div
        className="w-[210px] h-[311px] flex-col cursor-pointer
       hover:shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] transition duration-200
       max-xl:max-w-[180px]">
        <div className="relative figure">
          {
            product.ProductImage.length == 0
              ? (
                <>
                  <p>No Images</p>
                  <p className="absolute top-[5%] left-[3.5%] p-[5px] text-[12px] hidden text-white bg-[#ea4b48] rounded">
                    Giảm {product.discount}%
                  </p>
                </>
              ) : (
                <>
                  <img className="h-[207px] w-[100%]" alt="" src={product.ProductImage[0].url} />
                  <p className="absolute top-[5%] left-[3.5%] p-[5px] text-[12px] text-white bg-[#ea4b48] rounded">
                    Giảm {product.discount}%
                  </p>
                </>
              )
          }
        </div>

        <div className="p-[10px] border-x-[1px] border-b-[1px] border-[#FFAAAF] ">

          <p className="font-bold text-[16px] max-xl:text-[15px] break-words truncate">{product.name}</p>

          <div className="flex gap-[7px]">
            <div className="text-[7px] font-normal bg110k bg-red-500 max-w-[151px] text-white text-center p-[3px]">
              Giảm {numberFormat(product.price * (product.discount / 100))}k
            </div>
            <div className="text-[7px]  bg110k max-w-[51px] bg-red-500 text-white text-center p-[3px]">
              FREE SHIP
            </div>
          </div>

          <div className="grid grid-cols-3 items-center gap-3">
            <p className="text-xs text-[rgba(0,0,0,.26)] col-span-1 line-through">
              {product.price}đ
            </p>
            <p className="text-[16px] text-[#865546] col-span-2 font-bold ">
              {numberFormat(product.price - (product.price * (product.discount / 100)))}
            </p>

          </div>

          <div className='flex'>

            <button>
              <img src={Images.star1} alt="" />
            </button>
            <button>
              <img src={Images.star1} alt="" />
            </button>
            <button>
              <img src={Images.star1} alt="" />
            </button>
            <button>
              <img src={Images.star1} alt="" />
            </button>
            <button>
              <img src={Images.star2} alt="" />
            </button>


            <span className="text-[12px] mr-[30px] ml-[4px]">{4.2}</span>


            <p className="text-[12px] items-center text-[#4c4c4c] truncate font-medium">
              Đã bán
              <span> 300</span>
            </p>
          </div>


        </div>
      </div>
    </Link>
  );
};

export default Filter