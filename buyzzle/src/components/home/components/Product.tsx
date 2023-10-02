
import { Images } from '../../../Assets/TS'
import { Product } from '../Index'


type Props = {
  product: Product
}
export default function Products(props: Props) {
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

          <div className="flex justify-between items-center">
            <p className="text-[16px] text-[#865546] font-bold">
              {price} vnd
            </p>
            <p className="text-[12px] text-[#4c4c4c] font-normal">
              Đã bán
              <span> {product.soldCount}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}