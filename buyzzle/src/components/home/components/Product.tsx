import { type } from "os";
import { Images } from "../../../Assets/TS";
import { Product } from "../Index";
import { Products } from "../../../pages/home/User/FilterPage/FiltersPage";
import { numberFormat } from "../../../Helper";
import { Link } from "react-router-dom";




type Props = {
  product: Product
}
export default function Productss(props: Props) {
  const { product } = props
  const discountedPrice = product.price * (product.discount / 100)
  const price = product.price - discountedPrice

  return (
    <>
      <div className="max-w-[250px] flex-col mb-[10px] cursor-pointer hover:shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] transition duration-200">
        <div className="relative figure">
          <img src={product.imgSrc} alt="" />
          <p className="absolute top-[5%] left-[3.5%] p-[5px] text-[12px] text-white bg-[#ea4b48] rounded">
            Giảm {product.discount}%
          </p>
        </div>

        <div className="p-[10px] border-x-[1px] border-b-[1px] border-[#FFAAAF]">
          <p className="font-bold text-[16px] max-w-[220px]">
            {product.title}
          </p>

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
          <span className="text-[12px]">{4.2}</span>

          <div className="flex gap-[7px]">
            <div className="text-[7px] font-normal coupon max-w-[56px] text-white text-center p-[3px]">
              Giảm {discountedPrice}k
            </div>
            <div className="text-[7px]  coupon max-w-[51px] text-white text-center p-[3px]">
              FREE SHIP
            </div>
          </div>

          <div
            className="p-[10px] border-x-[1px] border-b-[1px] border-[#FFAAAF] 
        max-2xl:max-h-max 
        max-lg:h-[180px]
        "
          >
            <p
              className="font-bold text-base max-xl:text-[15px] break-words truncate
          max-2xl:text-[15px]
          max-lg:text-2xl
          max-lg:mt-4
          "
            >
              {product.name}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
