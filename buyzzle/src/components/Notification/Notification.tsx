import { useState } from "react";
import { Images } from "../../Assets/TS";

export default function Notification() {
  const [btnOrder, setBtnOrder] = useState(false);
  const [btnCancel, setBtnCancel] = useState(false);

  const handleClickOrder = () => {
    setBtnOrder(true);
    setBtnCancel(false);
  };
  const handleClickCancel = () => {
    setBtnOrder(false);
    setBtnCancel(true);
  };

  return (
    <div className="header-view top-full absolute w-[350px] invisible">
      <div
        className="bg-white p-4
      shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
      >
        <p className="font-extrabold text-xl text-[#EA4B48] ">Thông báo</p>
        <div className=" border-b-[1px] mt-2"></div>
        {/* BUTTON */}
        <div className="flex my-3 gap-2">
          <div
            className={
              !btnOrder
                ? `flex items-center w-[80px] rounded-md h-[36px] hover:bg-[#FFEAE9]
                   transition duration-150 border-[#FFAAAF] border-[1px] justify-evenly cursor-pointer
                   max-xl:w-[125px]
                   max-xl:h-[40px]
                   max-[885px]:h-[35px]
                   text-center text-sm font-medium text-[#EA4B48] 
                    max-xl:font-medium max-lg:text-xs max-[885px]:w-[102px]`
                : `flex items-center w-[80px] rounded-md h-[36px]  hover:bg-[#ff776f] 
                  transition duration-150 border-[#FFAAAF] border-[1px] justify-evenly cursor-pointer
                  max-xl:w-[125px]
                  max-xl:h-[40px]
                  max-[885px]:h-[35px]
                  bg-[#EA4B48]
                  text-center text-sm font-medium text-[#fff] 
                   max-xl:font-medium max-lg:text-xs max-[885px]:w-[102px]`
            }
            onClick={() => handleClickOrder()}
          >
            <button>Đặt hàng</button>
          </div>
          <div
            className={
              !btnCancel
                ? `flex items-center w-[80px] rounded-md h-[36px] hover:bg-[#FFEAE9]
                   transition duration-150 border-[#FFAAAF] border-[1px] justify-evenly cursor-pointer
                   max-xl:w-[125px]
                   max-xl:h-[40px]
                   max-[885px]:h-[35px]
                   text-center text-sm font-medium text-[#EA4B48] 
                    max-xl:font-medium max-lg:text-xs max-[885px]:w-[102px]`
                : `flex items-center w-[80px] rounded-md h-[36px]  hover:bg-[#ff776f] 
                  transition duration-150 border-[#FFAAAF] border-[1px] justify-evenly cursor-pointer
                  max-xl:w-[125px]
                  max-xl:h-[40px]
                  max-[885px]:h-[35px]
                  bg-[#EA4B48]
                  text-center text-sm font-medium text-[#fff] 
                   max-xl:font-medium max-lg:text-xs max-[885px]:w-[102px]`
            }
            onClick={() => handleClickCancel()}
          >
            <button>Hủy hàng</button>
          </div>
        </div>
        {/* END BUTTON */}
        {/* content */}
        <div className="flex gap-7 hover:bg-slate-200 hover:rounded-md hover:duration-500 cursor-default">
          <div className="items-center flex gap-3">
            <div className="p-1">
              <img
                src={Images.avatar_admin}
                alt="avatar_admin"
                width={45}
                height={45}
              />
            </div>
            <div>
              <div className="text-sm font-semibold text-black">
                Nguyen Viet Thang
              </div>
              <p className="text-slate-500 text-xs">Đã đặt 1 đơn hàng mới</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1 my-2">
            <span className="text-slate-500 text-xs inline-flex items-center rounded">
              <svg
                className="w-2 h-2 me-1.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
              </svg>
              2 phút trước
            </span>
            <div className="rounded-full border-[5px] w-0 border-[#2E89FF] justify-end"></div>
          </div>
        </div>
        {/* end content */}
      </div>
    </div>
  );
}
