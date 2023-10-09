import React from "react";
import Container from "../../../../../components/container/Container";
import SitebarAdmin from "../../Sitebar/Sitebar";
import Search from "../../../../../Assets/TSX/Search";
import Download from "../../Assets/TSX/Download";

export default function User() {
  return (
    <Container>
      <div className="grid grid-cols-5">
        <div className="col-span-1 max-2xl:hidden">
          <SitebarAdmin />
        </div>

        <div className="content-right-filter mt-[34px] col-span-4 flex flex-col gap-[50px] max-2xl:col-span-5">
          <div>
            <h2
              className="txt-filter font-bold text-[#1A1A1A] text-3xl
                            max-lg:text-xl"
            >
              QUẢN LÝ DANH SÁCH MÃ GIẢM GIÁ
            </h2>
          </div>
          <div className="flex flex-col gap-[35px]">
            <div className="flex gap-[24px]">
              <div
                className="Search-input-headerCenter items-center flex
                                    py-[3px] px-[6px] border-[1px] border-[#FFAAAF] rounded-md"
              >
                <div className="mb-2">
                  <Search />
                </div>
                <input
                  className=" rounded-lg focus:outline-none text-lg relative pr-7 flex-1 pl-3 max-xl:text-sm max-lg:text-sm"
                  placeholder="Tìm kiếm..."
                />
              </div>
              <div className="flex items-center w-[133px] rounded-md h-[46px] hover:bg-[#FFEAE9] transition duration-150 border-[#FFAAAF] border-[1px] justify-evenly cursor-pointer">
                <Download />
                <button className="text-center text-base font-bold text-[#EA4B48] max-lg:text-sm">
                  Xuất excel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
