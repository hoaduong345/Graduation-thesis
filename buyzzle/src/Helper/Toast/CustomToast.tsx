import React from "react";
import { toast } from "react-toastify";
import { Images } from "../../Assets/TS";

export default function CustomToast() {
  console.log("first");
  toast.error(
    <div className="flex gap-2 hover:bg-slate-200 hover:rounded-md hover:duration-500 cursor-default">
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
          <p className="text-red-600 text-xs">Có yêu cầu hủy đơn từ: </p>
          <div className="text-xs font-semibold text-black">
            Nguyen Viet Thang
          </div>
        </div>
      </div>
    </div>,
    {
      position: "bottom-left",
      autoClose: 10000,
      closeButton: true,
    }
  );

  return (
    <div className="flex gap-2 hover:bg-slate-200 hover:rounded-md hover:duration-500 cursor-default">
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
          <div className="text-xs font-semibold text-black">
            Nguyen Viet Thang
          </div>
          <p className="text-slate-500 text-xs">Đã đặt 1 đơn hàng mới</p>
        </div>
      </div>
    </div>
  );
}
