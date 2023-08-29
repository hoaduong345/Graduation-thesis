import React from "react";
import SitebarFilter from "../../components/Sitebar/SitebarFilter";
import { Images } from "../../Assets/TS";

export default function FiltersPage() {
  return (
    <body className="body-filter container mx-auto">
      <div className="flex flex-row justify-between">
        <SitebarFilter />
        {/* nhap */}
        <div className="content-left-filter mt-[34px] h-max basis-9/12 p-4 ">
          <h2 className="txt-filter font-bold text-[#1A1A1A] text-[20px]">
            THƯƠNG HIỆU NỔI TIẾNG:
          </h2>

          {/* thuong hieu noi tieng */}
          <div className="flex  w-[100%] justify-start gap-10 mt-[34px] ">
            <div className="square border border-[#FFAAAF] py-[20.4px] px-[50.3px] cursor-pointer ">
              <img
                src="https://www.freepnglogos.com/uploads/starbucks-logo-png-25.png"
                width="150"
                alt="starbucks logo png"
              />
            </div>
            <div className="square border border-[#FFAAAF] py-[20.4px] px-[50.3px] cursor-pointer">
              <img
                src={Images.unilever}
                width="150"
                alt="adidas logo png white images"
              />
            </div>
            <div className="square border border-[#FFAAAF] py-[20.4px] px-[50.3px] cursor-pointer">
              <img
                src={Images.Puma}
                width="210"
                alt="adidas logo png white images"
              />
            </div>
            <div className="square border border-[#FFAAAF] py-[20.4px] px-[50.3px] cursor-pointer">
              <img
                src="https://www.freepnglogos.com/uploads/adidas-logo-png-white-images-11.png"
                width="210"
                alt="adidas logo png white images"
              />
            </div>
          </div>
          <div className="bg-[#FFEAE9] h-[60px] mt-[18px] rounded-[6px]">
            <div className="txt-content flex">
              <div className="content-left w-[47.4%] flex items-center justify-start gap-2 h-[60px]">
                <p className="text-[#000000] ml-5 font-semibold">
                  Sắp xếp theo
                </p>
                <button
                  type="button"
                  className="transition duration-150 outline outline-2 outline-[#EA4B48]  font-medium
                   rounded-[6px] text-sm px-5 py-2.5 mx-2 my-2 text-[#FFFFFF] hover:text-[#FFFFFF] bg-[#FFAAAF]  "
                >
                  Liên Quan
                </button>
                <button
                  type="button"
                  className="transition duration-150 outline outline-2 outline-[#EA4B48] bg-white hover:bg-[#FFAAAF] font-medium
                   rounded-[6px] text-sm px-5 py-2.5 mx-2 my-2 hover:text-[#FFFFFF]"
                >
                  Mới Nhất
                </button>
                <button
                  type="button"
                  className="transition duration-150 outline outline-2 outline-[#EA4B48] bg-white hover:bg-[#FFAAAF] font-medium
                   rounded-[6px] text-sm px-5 py-2.5 mx-2 my-2 hover:text-[#FFFFFF]"
                >
                  Bán Chạy
                </button>
              </div>
              <div className="content-left flex items-center justify-start gap-2 h-[60px]">
                <p className="text-[#000000] font-semibold">Giá</p>
                <button
                  type="button"
                  className="transition duration-150 outline outline-2 outline-[#EA4B48] hover:bg-[#FFAAAF] font-medium
                   rounded-[6px] text-sm px-5 py-2.5 mx-2 my-2 hover:text-[#FFFFFF] bg-white"
                >
                  Thấp Nhất
                </button>
                <button
                  type="button"
                  className="transition duration-150 outline outline-2 outline-[#EA4B48] bg-white hover:bg-[#FFAAAF] font-medium
                   rounded-[6px] text-sm px-5 py-2.5 mx-2 my-2 hover:text-[#FFFFFF]"
                >
                  Cao Nhất
                </button>
              </div>
            </div>
          </div>
          {/* banner filter */}
          <div className="banner filter max-w-max mt-[20px]">
            <img
              className="object-cover w-[100%]"
              src={Images.bannerFilter}
              alt="bannerFilter"
            />
          </div>
        </div>
        {/* nhap-end */}
      </div>
    </body>
  );
}
