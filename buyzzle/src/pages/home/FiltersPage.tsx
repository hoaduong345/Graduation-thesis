import React from "react";
import SitebarFilter from "../../components/Sitebar/SitebarFilter";
import { Images } from "../../Assets/TS";
import Container from "../../components/container/Container";
import MangoLogo from "../../Assets/TSX/MangoLogo";
import FoodLogo from "../../Assets/TSX/FoodLogo";
import FoodLogoo from "../../Assets/TSX/FoodLogoo";
import BookOff from "../../Assets/TSX/BookOff";
import Series from "../../Assets/TSX/Series";
import StepsLogo from "../../Assets/TSX/StepsLogo";

export default function FiltersPage() {
  return (
    <Container>
      <body className="body-filter container mx-auto">
        <div className="flex flex-row justify-between">
          <SitebarFilter />
          {/* content-right-filter */}
          <div className="content-right-filter mt-[34px] h-max basis-9/12 p-4 ">
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
                <div className="content-left w-[48.5%] flex items-center justify-start gap-5 h-[60px]">
                  <p className="text-[#000000] text-sm ml-5 font-semibold">
                    Sắp xếp theo
                  </p>
                  <button
                    type="button"
                    className="transition duration-150 outline outline-2 outline-[#EA4B48]  font-medium
                   rounded-[6px] text-xs py-[6px] px-[13px] text-[#FFFFFF] hover:text-[#FFFFFF] bg-[#FFAAAF]  "
                  >
                    Liên Quan
                  </button>
                  <button
                    type="button"
                    className="transition duration-150 outline outline-2 outline-[#EA4B48] bg-white hover:bg-[#FFAAAF] font-medium
                   rounded-[6px] text-sm py-[6px] px-[13px] hover:text-[#FFFFFF]"
                  >
                    Mới Nhất
                  </button>
                  <button
                    type="button"
                    className="transition duration-150 outline outline-2 outline-[#EA4B48] bg-white hover:bg-[#FFAAAF] font-medium
                   rounded-[6px] text-sm py-[6px] px-[13px] hover:text-[#FFFFFF]"
                  >
                    Bán Chạy
                  </button>
                </div>
                <div className="content-left flex items-center justify-start gap-5 h-[60px]">
                  <p className="text-[#000000] font-semibold text-sm">Giá</p>
                  <button
                    type="button"
                    className="transition duration-150 outline outline-2 outline-[#EA4B48] hover:bg-[#FFAAAF] font-medium
                   rounded-[6px] text-sm py-[6px] px-[13px] hover:text-[#FFFFFF] bg-white"
                  >
                    Thấp Nhất
                  </button>
                  <button
                    type="button"
                    className="transition duration-150 outline outline-2 outline-[#EA4B48] bg-white hover:bg-[#FFAAAF] font-medium
                   rounded-[6px] text-sm py-[6px] px-[13px] hover:text-[#FFFFFF]"
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
          {/* content-right-filter-end */}
        </div>
        <div className="Logo-bottom flex justify-around my-24">
          <StepsLogo />
          <div className="border-[1px] border-[#E6E6E6]" />
          <MangoLogo />
          <div className="border-[1px] border-[#E6E6E6]" />
          <FoodLogo />
          <div className="border-[1px] border-[#E6E6E6]" />
          <FoodLogoo />
          <div className="border-[1px] border-[#E6E6E6]" />
          <BookOff />
          <div className="border-[1px] border-[#E6E6E6]" />
          <Series />
        </div>
      </body>
    </Container>
  );
}
