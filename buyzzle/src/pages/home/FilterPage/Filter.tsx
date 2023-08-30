import React from 'react'
import { Images } from '../../../Assets/TS';
import { Products } from '../FiltersPage';
type Props = {
  product: Products;
};
const Filter = (props: Props) => {
    return (
      <div className="max-w-[210px] flex-col cursor-pointer hover:shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] transition duration-200">
        <div className="relative">
          <img className="object-fill " src={props.product.images} alt="" />
          <p className="absolute top-[5%] left-[3.5%] p-[5px] text-[12px] text-white bg-[#ea4b48] rounded">
            Giảm 50%
          </p>
        </div>

        <div className="p-[10px] border-x-[1px] border-b-[1px] border-[#FFAAAF] ">
          <p className="font-bold text-[16px] max-w-[220px]">
            {props.product.name}
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
            <div className="text-[7px] font-normal bg110k max-w-[51px] text-white text-center p-[3px]">
              {props.product.discount}
            </div>
            <div className="text-[7px]  bg110k max-w-[51px] text-white text-center p-[3px]">
              FREE SHIP
            </div>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-[16px] text-[#865546] font-bold">
              {props.product.price}
            </p>
            <p className="text-[12px] text-[#4c4c4c] font-medium">
              Đã bán
              <span> {props.product.soldCount}</span>
            </p>
          </div>
        </div>
        
      </div>
    );
};

export default Filter