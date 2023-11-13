import { useState } from "react";
import { Images } from "../../Assets/TS";
import CustomToast from "../../Helper/Toast/CustomToast";

export default function Notification() {
  const [changeButton, setChangeButton] = useState([
    {
      id: 0,
      text: "Tất cả",
      active: true,
    },
    {
      id: 1,
      text: "Đặt hàng",
      active: false,
    },
    {
      id: 2,
      text: "Hủy hàng",
      active: false,
    },
  ]);

  const handleClick = (id: number) => {
    const updatedButtons = changeButton.map((btn) => {
      if (btn.id === id) {
        console.log(
          "🚀 ~ file: OrderManagement.tsx:91 ~ updatedButtons ~ btn.id:",
          btn.id
        );
        return { ...btn, active: true };
      } else {
        return { ...btn, active: false };
      }
    });
    setChangeButton(updatedButtons);
  };
  function getBorderColor(id: number) {
    switch (id) {
      case 0:
        return "#570DF8";
      case 1:
        return "#3DC0F8";
      case 2:
        return "#EA4B48";
      default:
        return "#ccc";
    }
  }
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
          {changeButton.map((btnItems) => {
            return (
              <button
                className={`bg-white items-center w-[80px] rounded-md h-[36px] transition duration-150`}
                style={{
                  backgroundColor: "white ",
                  borderColor: btnItems.active
                    ? getBorderColor(btnItems.id)
                    : "",
                  color: btnItems.active ? getBorderColor(btnItems.id) : "",
                  borderWidth: btnItems.active ? "1px" : "",
                }}
                onClick={() => handleClick(btnItems.id)}
              >
                {btnItems.text}
              </button>
            );
          })}
        </div>
        {/* END BUTTON */}
        <div className="flex flex-col gap-3">
          {/* content order*/}
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
                <p className="text-[#739072] text-xs font-semibold">
                  Đã đặt 1 đơn hàng mới
                </p>
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
          {/* end content order*/}

          {/* content cancel*/}
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
                <p className="text-red-700 text-xs font-semibold">
                  Yêu cầu hủy đơn hàng
                </p>
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
          {/* end content cancel*/}
        </div>
      </div>
    </div>
  );
}
