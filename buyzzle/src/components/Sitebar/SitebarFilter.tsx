import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import ArrowUp from "../../Assets/TSX/ArrowUp";
import Rate from "./Rate/Rate";

export interface RatingStar {
  checked: boolean;
  rating: number;
}
const arrRating: RatingStar[] = [
  { checked: false, rating: 5 },
  { checked: false, rating: 4 },
  { checked: false, rating: 3 },
  { checked: false, rating: 2 },
  { checked: false, rating: 1 },
];
export default function SitebarFilter() {
  // const [arr, setArr] = useState<RatingStar[]>(arrRating);
  // const hanldChecked = (id:number,checked:boolean)=>{
  //   console.log(checked)
  //   // arr[id].checked = checked;
  //   // setArr(arr)
  // }
  return (
    <body className="body-filter container mx-auto">
      <div className="flex flex-row justify-between">
        <div className="content-left-filter mt-[34px] h-max basis-[22%] p-4 ">
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
            <div className="flex items-center mr-4 mt-4 justify-start gap-3">
              <input
                id="orange-radio"
                type="radio"
                // defaultValue
                name="colored-radio"
                className="w-4 h-4  border-gray-300 accent-[#EA4B48] "
              />
              <p className="text-sm text-[#1A1A1A] hover:text-[#FFAAAF] max-w-max hover:text-[#FFAAAF] max-w-max">
                <a href="#">Áo khoác mù đông & Áo Choàng</a>
              </p>

              <p className="text-sm text-[#808080]">(134)</p>
            </div>
            <div className="flex items-center mr-4 mt-4 justify-start gap-3">
              <input
                id="orange-radio"
                type="radio"
                // defaultValue
                name="colored-radio"
                className="w-4 h-4  border-gray-300 accent-[#EA4B48] "
              />
              <p className="text-sm text-[#1A1A1A] hover:text-[#FFAAAF] max-w-max">
                <a href="#">Thời Trang Nam</a>
              </p>

              <p className="text-sm text-[#808080]">(134)</p>
            </div>
            <div className="flex items-center mr-4 mt-4 justify-start gap-3">
              <input
                id="orange-radio"
                type="radio"
                // defaultValue
                name="colored-radio"
                className="w-4 h-4  border-gray-300 accent-[#EA4B48] "
              />
              <p className="text-sm text-[#1A1A1A] hover:text-[#FFAAAF] max-w-max">
                <a href="#">Áo Khoác Ngoài</a>
              </p>

              <p className="text-sm text-[#808080]">(134)</p>
            </div>
            <div className="flex items-center mr-4 mt-4 justify-start gap-3">
              <input
                id="orange-radio"
                type="radio"
                // defaultValue
                name="colored-radio"
                className="w-4 h-4  border-gray-300 accent-[#EA4B48] "
              />
              <p className="text-sm text-[#1A1A1A] hover:text-[#FFAAAF] max-w-max">
                <a href="#">Thời trang trẻ em</a>
              </p>

              <p className="text-sm text-[#808080]">(134)</p>
            </div>
            <div className="flex items-center mr-4 mt-4 justify-start gap-3">
              <input
                id="orange-radio"
                type="radio"
                // defaultValue
                name="colored-radio"
                className="w-4 h-4  border-gray-300 accent-[#EA4B48] "
              />
              <p className="text-sm text-[#1A1A1A] hover:text-[#FFAAAF] max-w-max">
                <a href="#">Thời Trang Nữ</a>
              </p>

              <p className="text-sm text-[#808080]">(134)</p>
            </div>
            {/* default-radio-1-end */}
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
              min={0}
              max={100}
              trackStyle={{
                backgroundColor: "#EA4B48",
              }}
              handleStyle={{ border: "1px solid red" }}
              // dotStyle={{ backgroundColor: "#EA4B48", outlineColor: "#EA4B48",color:'red',border:'1px solid #EA4B48'}}
              onChange={(e) => console.log(e)}
              range
            />
            <div className="flex mt-[16px] justify-start gap-2">
              <p className="max-w-max">Giá: </p>
              <p className="font-extrabold max-w-max">50đ - 1,500đ</p>
            </div>
          </div>
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
            <div className="mt-3">
              {arrRating.map((i, j) => {
                return (
                  <Rate
                    onChange={(e, v) => {}}
                    rating={i.rating}
                    key={j}
                    checked={i.checked}
                  />
                );
              })}
            </div>
          </div>
          {/* end-rate */}
        </div>{" "}
        {/* content-left-filter */}
        {/* nhap */}
        <div className="content-left-filter mt-[34px] h-max basis-9/12 p-4 bg-black">
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
            <div className="flex items-center mr-4 mt-4 justify-start gap-1">
              <input
                id="orange-radio"
                type="radio"
                // defaultValue
                name="colored-radio"
                className="w-4 h-4  border-gray-300 "
              />
              <span className="text-sm text-[#1A1A1A]">
                Áo khoác mù đông & Áo Choàng
              </span>

              <span className="text-sm text-[#808080]">(134)</span>
            </div>
            <div className="flex items-center mr-4 mt-4 justify-start gap-3">
              <input
                id="orange-radio"
                type="radio"
                // defaultValue
                name="colored-radio"
                className="w-4 h-4  border-gray-300 "
              />
              <span className="text-sm text-[#1A1A1A]">Thời Trang Nam</span>

              <span className="text-sm text-[#808080]">(134)</span>
            </div>
            <div className="flex items-center mr-4 mt-4 justify-start gap-3">
              <input
                id="orange-radio"
                type="radio"
                // defaultValue
                name="colored-radio"
                className="w-4 h-4  border-gray-300 "
              />
              <span className="text-sm text-[#1A1A1A]">Áo Khoác Ngoài</span>

              <span className="text-sm text-[#808080]">(134)</span>
            </div>
            <div className="flex items-center mr-4 mt-4 justify-start gap-3">
              <input
                id="orange-radio"
                type="radio"
                // defaultValue
                name="colored-radio"
                className="w-4 h-4  border-gray-300 "
              />
              <span className="text-sm text-[#1A1A1A]">Thời trang trẻ em</span>

              <span className="text-sm text-[#808080]">(134)</span>
            </div>
            <div className="flex items-center mr-4 mt-4 justify-start gap-3">
              <input
                id="orange-radio"
                type="radio"
                // defaultValue
                name="colored-radio"
                className="w-4 h-4  border-gray-300 "
              />
              <span className="text-sm text-[#1A1A1A]">Thời Trang Nữ</span>

              <span className="text-sm text-[#808080]">(134)</span>
            </div>
            {/* default-radio-1-end */}
          </div>
        </div>
        {/* nhap-end */}
      </div>
    </body>
  );
}
