import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import ArrowUp from "../../Assets/TSX/ArrowUp";
import Rate from "./Rate/Rate";
import { Images } from "../../Assets/TS";
import Checkbox from "./Checkbox/Checkbox";
import ButtonSuggestt from "./ButtonSuggest/ButtonSuggest";
import { title } from "process";
import { useState } from "react";
import {
  PriceRangeFilterPage,
  Products,
} from "../../pages/home/User/FilterPage/FiltersPage";
import { numberFormat } from "../../Helper/Format";
import { productController } from "../../Controllers/ProductsController";
import { Row } from "../../Model/ProductModel";

// rati star
export interface RatingStar {
  checked: boolean;
  rating: number;

  onChangeFilter?(rating: number): void;
}

const arrRating: RatingStar[] = [
  { checked: false, rating: 5 },
  { checked: false, rating: 4 },
  { checked: false, rating: 3 },
  { checked: false, rating: 2 },
  { checked: false, rating: 1 },
];

// check box
export interface CheckboxCategory {
  checkedCB: boolean;
  title: string;
  quantity: number;
  // b3. da xac dinh duoc can chuyen gi va nam o dau
  // b4. goi lai ham callbacks va truyen vao truong minh muon chuyen di
  onChangeFilter?(tittle: string): void;
}

const arrCBCategory: CheckboxCategory[] = [
  { checkedCB: false, title: "Áo khoác mùa đông", quantity: 132 },
  { checkedCB: false, title: "Thời Trang Nam", quantity: 12 },
  { checkedCB: false, title: "Áo Khoác Ngoài", quantity: 13 },
  { checkedCB: false, title: "Thời trang trẻ em", quantity: 32 },
  { checkedCB: false, title: "Thời Trang Nữ", quantity: 232 },
];

export interface ButtonSuggest {
  name: string;
}
const arrBtnSug: ButtonSuggest[] = [
  {
    name: "Áo Cổ điển",
  },
];
arrBtnSug.push(
  {
    name: "Áo Bra",
  },
  {
    name: "Áo",
  },
  {
    name: "Áo Cổ điển",
  }
);


export interface SliderComponentProps {
  onPriceRangeChange: (value: [number, number]) => void;
  onQuantityRangeChange: (value: [number, number]) => void;
  onRateChange: (value: number) => void;
  onPurchaseRangeChange: (value: [number, number]) => void;
  oninStock: (availability: boolean) => void;
  onSoldOut: (soldOut: boolean) => void;

  valueSoldOut?: boolean;
  valueinStock?: boolean;
  valuePrice?: [number, number];
  valuePurchase?: [number, number];
  valueQuantity?: [number, number];
}

export default function SitebarFilter({
  valuePrice,
  onPriceRangeChange,
  onRateChange,
}: SliderComponentProps) {
  const [rangeValue, setRangeValue] = useState([5000, 300000]);
  const handleSliderChange = (price: [number, number]) => {
    // console.log("sdssdsd", price);
    setRangeValue(price);
    onPriceRangeChange(price);
  };

  const [rating, setRating] = useState(1);
  const handleRateChange = (rate: number) => {
    console.log("Rating:", rate);
    setRating(rate);
    onRateChange(rate);
  };


  return (
    <>
      <div className="content-left-filter mt-[34px] h-max p-4 ">
        <div className="flex items-center justify-between">
          <h2 className="txt-filter font-bold text-[#1A1A1A] text-[20px]">
            BỘ LỌC TÌM KIẾM
          </h2>
          <a href="#">
            <ArrowUp />
          </a>
        </div>
        <div className="mt-[20px]">
          <h4 className="font-bold">Theo Danh Mục</h4>
          {/* default-radio-1 */}
          {arrCBCategory.map((item, index) => {
            return (
              <Checkbox
                checkedCB={item.checkedCB}
                quantity={item.quantity}
                title={item.title}
                key={index}
              // b6. xac dinh ben Components con da truyen duoc roi va qua ben cho cha goi ra thang con va nhan lai.
              // onChangeFilter={(title) => {
              //   console.log("SiteFilterPages: " + title);
              //   props.onChangeFilters?.(title);
              // }}
              />
            );
          })}

          {/* default-radio-1-endsd */}
        </div>
        <div className="border-[1px] border-[#E6E6E6] my-[22px]" />

        <div className="flex items-center justify-between">
          <h2 className="txt-filter font-bold text-[#1A1A1A] text-[20px]">
            Giá
          </h2>
          <a href="#">
            <ArrowUp />
          </a>
        </div>
        <div className="slider">
          <Slider
            min={1000}
            max={1000000}
            step={1}
            pushable={false}
            value={rangeValue}
            trackStyle={{
              backgroundColor: "#EA4B48",
            }}
            handleStyle={{ border: "1px solid red" }}
            // dotStyle={{ backgroundColor: "#EA4B48", outlineColor: "#EA4B48",color:'red',border:'1px solid #EA4B48'}}
            onChange={(e: any) => handleSliderChange(e)}
            // value={rangeValue}
            // onChange={() => onSliderChange}
            range
          // onChange={(e) => {
          //   // b5. khi co duoc xong ham callBacks ben phia cha, thi ben con se truyen vao ( luu y "?." khi dung lai props.Callbacks)
          //   props.onChangeSlider?.(props.minPrice, props.maxPrice);
          // }}
          />
          <div className="flex mt-[20px] justify-start gap-2 ">
            <p className="max-w-max">Giá: </p>
            <p className="font-extrabold max-w-max ">
              {numberFormat(rangeValue[0])} - {numberFormat(rangeValue[1])}
            </p>
          </div>
        </div>

        {/* border 1px  */}
        <div className="border-[1px] border-[#E6E6E6] my-[22px]" />
        <div className="flex items-center justify-between">
          <h2 className="txt-filter font-bold text-[#1A1A1A] text-[20px]">
            Đánh giá
          </h2>
          <a href="#">
            <ArrowUp />
          </a>
        </div>
        <div className="rate flex">
          <div className="mt-3" >
            {arrRating.map((item, index, ) => {
              return (
                <Rate
                  checked={item.checked}
                  rating={item.rating}
                  key={index}
                  onChangeFilter={(rating) => {
                    const ratingNum: number = Number(rating);
                    handleRateChange(ratingNum)
                    onRateChange(ratingNum)
                  }}
                />
              );
            })}
          </div>
        </div>
        {/* end-rate */}
        <div className="border-[1px] border-[#E6E6E6] my-[22px]" />
        <div className="flex items-center justify-between">
          <h2 className="txt-filter font-bold text-[#1A1A1A] text-[20px]">
            Từ khóa khác
          </h2>
          <a href="#">
            <ArrowUp />
          </a>
        </div>
        <div className="keyWord flex flex-wrap gap-1 mt-[20px] ">
          {arrBtnSug.map((item, index) => {
            return <ButtonSuggestt btnSug={item} key={index} />;
          })}
        </div>
        <div className="btn-deleteFilter font-extrabold flex items-center justify-center mt-[38px]">
          <button
            type="button"
            className=" text-white bg-[#EA4B48] hover:bg-red-400 rounded-lg px-6 py-3 w-[95%] "
          >
            XÓA BỘ LỌC
          </button>
        </div>
        <a href="#">
          <img
            className="mt-[12px] cursor-pointer opacity-100 hover:opacity-80 transition duration-200 hover:ease-in"
            src={Images.Advertise}
            alt="Advertise"
          />
        </a>
      </div>{" "}
      {/* content-left-filter */}
    </>
  );
}