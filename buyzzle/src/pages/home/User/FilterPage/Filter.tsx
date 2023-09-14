import { useEffect, useState } from 'react'
import { Products } from './FiltersPage';
import { Images } from '../../../../Assets/TS';
import { Link } from 'react-router-dom';
type Props = {
  product: Products;
};
const Filter = (props: Props) => {
  const { product } = props
  // console.log(JSON.parse(product.images));

  // console.log("🚀 ~ file: Filter.tsx:10 ~ Filter ~ product:", product.images)
  const [images, setImages] = useState<string[]>([])
  useEffect(() => {
    if (product.images[0]) {
      // const daataImage = JSON.parse(product.images[0])
      const ar = JSON.parse((product.images)) as string[]
      setImages(ar)

    }

  }, [])
  console.log(images.map((item) => console.log(item)))

  return (
    <Link to={`/Detailproducts/${product.idproduct}`} >
      <div
        className="max-w-[210px] flex-col cursor-pointer
       hover:shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] transition duration-200
       max-xl:max-w-[180px]">
        <div className="relative figure">

          <img className="h-[207px] w-[100%]" alt="" src={images[0]} />


          <p className="absolute top-[5%] left-[3.5%] p-[5px] text-[12px] text-white bg-[#ea4b48] rounded">
            Giảm 50%
          </p>
        </div>

        <div className="p-[10px] border-x-[1px] border-b-[1px] border-[#FFAAAF] ">
          <p className="font-bold text-[16px] max-xl:text-[15px] break-words">{product.name}</p>

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
            <div className="text-[7px] font-normal bg110k max-w-[51px] text-white text-center p-[3px]">
              {product.discount}
            </div>
            <div className="text-[7px]  bg110k max-w-[51px] text-white text-center p-[3px]">
              FREE SHIP
            </div>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-[16px] text-[#865546] font-bold">
              {product.price}đ
            </p>
            <p className="text-[12px] text-[#4c4c4c] font-medium">
              Đã bán
              <span> {product.soldCount}</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Filter