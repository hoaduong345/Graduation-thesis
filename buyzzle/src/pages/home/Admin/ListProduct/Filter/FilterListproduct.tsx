import Slider from "rc-slider";
import DeleteWhite from "../../Assets/TSX/DeleteWhite";
import {
  RatingStar,
  SliderComponentProps,
} from "../../../../../components/Sitebar/SitebarFilter";
import FilterRateMap from "./FilterRateMap";
import { useState } from "react";
import { numberFormat } from "../../../../../Helper";

const arrRating: RatingStar[] = [
  { checked: false, rating: 5 },
  { checked: false, rating: 4 },
  { checked: false, rating: 3 },
  { checked: false, rating: 2 },
  { checked: false, rating: 1 },
];

export default function FilterListproduct({
  valuePrice: value,
  onPriceRangeChange,
  onQuantityRangeChange,
}: SliderComponentProps) {
  const [price, setPrice] = useState(false);
  const [purchase, setPurchase] = useState(false);
  const [quantity, setPQuantity] = useState(false);
  const [rangePriceValue, setRangePriceValue] = useState([50000, 300000]);
  const [rangeQuantityValue, setRangeQuantityValue] = useState([50, 300]);
  const handleSliderChangePrice = (price: [number, number]) => {
    console.log(
      "🚀 ~ file: FilterListproduct.tsx:29 ~ handleSliderChangePrice ~ price:",
      price
    );
    setRangePriceValue(price);
    onPriceRangeChange(price);
  };
  const handleSliderChangeQuantity = (quantity: [number, number]) => {
    console.log(
      "🚀 ~ file: FilterListproduct.tsx:34 ~ handleSliderChangeQuantity ~ quantity:",
      quantity
    );
    setRangeQuantityValue(quantity);
    onQuantityRangeChange(quantity);
  };
  return (
    <div
      className="p-7 shadow mt-3 flex flex-col gap-9 relative 
        transition-all duration-500 ease-in"
    >
      <div className="grid grid-cols-3 gap-11">
        <div className="col-span-1 flex flex-col gap-6">
          <input
            checked={price}
            onClick={() => setPrice(!price)}
            id="default-checkbox"
            type="checkbox"
            className="w-4 h-4 accent-[#EA4B48]  max-lg:w-[14px] max-lg:h-[14px]"
          />
          <div className="slider">
            <p
              className={`text-center text-lg max-xl:text-base max-lg:text-sm 
                           ${price ? `text-[#1A1A1A]` : `text-[#8c8c8c]`} `}
            >
              Giá
            </p>
            <div className="slider">
              <Slider
                min={1000}
                max={1000000}
                step={1}
                pushable={false}
                value={rangePriceValue}
                trackStyle={{
                  backgroundColor: "#EA4B48",
                }}
                handleStyle={{ border: "1px solid red" }}
                onChange={(e: any) => handleSliderChangePrice(e)}
                range
              />
              <div className="flex mt-[20px] justify-start gap-2 ">
                <p
                  className={`max-w-max text-sm max-xl:text-[13px]
                               ${price ? `text-[#4D4D4D]` : `text-[#a5a5a5]`} `}
                >
                  Giá:{" "}
                </p>
                <p
                  className={`font-medium max-w-max text-sm max-xl:text-[13px]
                               ${price ? `text-[#1A1A1A]` : `text-[#8c8c8c]`} `}
                >
                  {numberFormat(rangePriceValue[0])} -{" "}
                  {numberFormat(rangePriceValue[1])}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-[#4C4C4C] text-sm font-medium max-xl:text-[13px]">
              Danh Mục Sản Phẩm Hot
            </p>
            <div className=" w-[100%] flex border-[1px] border-[#FFAAAF] rounded-[6px] items-center">
              <select
                className="w-[100%] px-3 text-gray-500 bg-white py-[14px] outline-none rounded-md
                                max-xl:text-[13px]  max-xl:py-3"
              >
                <option>Chọn Danh Mục</option>
              </select>
            </div>
          </div>
        </div>

        <div className="col-span-1 flex flex-col gap-6">
          <input
            checked={purchase}
            onClick={() => setPurchase(!purchase)}
            id="default-checkbox"
            type="checkbox"
            className="w-4 h-4 accent-[#EA4B48] max-lg:w-[14px] max-lg:h-[14px]"
          />

          <div className="slider">
            <p
              className={`text-center text-lg max-xl:text-base max-lg:text-sm  
                           ${purchase ? `text-[#1A1A1A]` : `text-[#8c8c8c]`} `}
            >
              Lượng Mua
            </p>
            <Slider
              min={0}
              max={100}
              trackStyle={{
                backgroundColor: "#EA4B48",
              }}
              handleStyle={{ border: "1px solid red" }}
              onChange={(e) => console.log(e)}
              range
            />
            <div className="flex justify-start gap-2">
              <p
                className={`max-w-max text-sm max-xl:text-[13px]
                              ${
                                purchase ? `text-[#4D4D4D]` : `text-[#a5a5a5]`
                              }  `}
              >
                SP:{" "}
              </p>
              <p
                className={`font-medium max-w-max text-sm max-xl:text-[13px]
                               ${
                                 purchase ? `text-[#1A1A1A]` : `text-[#8c8c8c]`
                               } `}
              >
                100 - 1000
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <p className="text-[#4C4C4C] text-sm font-medium max-xl:text-[13px]">
              Tình Trạng Sản Phẩm
            </p>
            <div className="flex gap-11 max-[900px]:gap-2 flex-wrap">
              <div className="flex gap-2 items-center">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  className="w-4 h-4 accent-[#EA4B48] max-xl:w-[14px] max-xl:h-[14px] max-[900px]:w-3 max-[900px]:h-3"
                />
                <p className="text-sm font-bold text-[#00B207] max-xl:text-[13px] max-[900px]:text-xs">
                  Còn Hàng
                </p>
              </div>

              <div className="flex gap-2 items-center">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  className="w-4 h-4 accent-[#EA4B48] max-xl:w-[14px] max-xl:h-[14px] max-[900px]:w-3 max-[900px]:h-3"
                />
                <p className="text-sm font-bold text-[#EA4B48] max-xl:text-[13px]">
                  Hết Hàng
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1 flex flex-col gap-6">
          <input
            checked={quantity}
            onClick={() => setPQuantity(!quantity)}
            id="default-checkbox"
            type="checkbox"
            className="w-4 h-4 accent-[#EA4B48] max-lg:w-[14px] max-lg:h-[14px]"
          />

          <div className="slider">
            <p
              className={`text-center text-lg max-xl:text-base max-lg:text-sm 
                           ${quantity ? `text-[#1A1A1A]` : `text-[#8c8c8c]`} `}
            >
              Số Lượng SP Kho
            </p>
            <div className="slider">
              <Slider
                min={1}
                max={1000}
                step={1}
                pushable={false}
                value={rangeQuantityValue}
                trackStyle={{
                  backgroundColor: "#EA4B48",
                }}
                handleStyle={{ border: "1px solid red" }}
                onChange={(e: any) => handleSliderChangeQuantity(e)}
                range
              />
              <div className="flex mt-[20px] justify-start gap-2 ">
                <p
                  className={`max-w-max text-sm max-xl:text-[13px]
                               ${
                                 quantity ? `text-[#4D4D4D]` : `text-[#a5a5a5]`
                               } `}
                >
                  Giá:{" "}
                </p>
                <p
                  className={`font-medium max-w-max text-sm max-xl:text-[13px]
                               ${
                                 quantity ? `text-[#1A1A1A]` : `text-[#8c8c8c]`
                               } `}
                >
                  {rangeQuantityValue[0]} - {rangeQuantityValue[1]}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-[21px] max-[900px]:mt-[30px]">
            <button
              className="bg-[#EA4B48] text-white p-4 justify-center
                         rounded-md flex gap-3 items-center w-full text-base font-bold
                         max-xl:p-[10px] max-xl:text-sm max-[900px]:text-xs max-[900px]:p-[8px]"
            >
              Xóa Bộ Lọc
              <DeleteWhite />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-1">
        {arrRating.map((e) => {
          return <FilterRateMap rating={e.rating} checked={e.checked} />;
        })}
      </div>
    </div>
  );
}
