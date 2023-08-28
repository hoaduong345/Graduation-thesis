import React from "react";
import Map from "../../Assets/Map";
import Globe from "../../Assets/Globe";
import Chevron_down from "../../Assets/Chevron-down";
import Bell from "../../Assets/Bell";
import Headphones from "../../Assets/headphones";


export default function HeaderTop() {
  return (
    <>
      <header className="Header">
        <div className="Header-top bg-white">
          <div className="container mx-auto">
            <div className="Header-top-content flex justify-between">
              <div className="content-left flex py-2">
                <Map />
                <span className="text-[#4C4C4C] pl-2">Buon Ma Thuot</span>
              </div>

              <div className="content-right flex items-center gap-2 ">
                <div className="content-left flex items-center">
                  <Globe />
                  <span className="text-[#4C4C4C] pl-2">EN</span>
                </div>
                <div className="content-left flex py-2 gap-2 ">
                  <div className="pt-1">
                    <Chevron_down />
                  </div>
                  <div className="border-[1px] border-black " />
                  <div className="flex items-center pl-3">
                    <Bell />
                    <span className="text-[#4C4C4C] pl-2">Thong bao</span>
                  </div>
                  <div className="flex items-center pl-3">
                    <Headphones />
                    <span className="text-[#4C4C4C] pl-2">Ho tro</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-2 border-[#E6E6E6]" />

        

        
      </header>
    </>
  );
}
