import React, { useState } from "react";
import Container from "../../../../components/container/Container";
import { Images } from "../../../../Assets/TS";
import Plus from "../../../../Assets/TSX/Plus";
import Minus from "../../../../Assets/TSX/Minus";
import Delete from "../../Admin/Assets/TSX/Delete";
import Voucher from "../../../../Assets/TSX/Voucher";
import SearchVoucher from "../../../../Assets/TSX/SearchVoucher";
import ArrowUp from "../../Admin/Assets/TSX/ArrowUp";
import Buyzzle from "../../../../Assets/TSX/Buyzzle";

export default function Cart() {
  const [quantity, setQuantity] = useState(1);

  const minus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const plus = () => {
    setQuantity(quantity + 1);
  };

  return (
    <Container>
      <div>
        <div
          className="bg-white h-[91px] mt-[50px] rounded-md items-center flex
                shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
        >
          <div className="w-[5%] text-center leading-none	">
            <input
              type="checkbox"
              className="checkbox checkbox-sm items-center"
            />
          </div>
          <div className="w-[40%]">
            <p className="text-[#1A1A1A] text-base font-medium">Sản Phẩm</p>
          </div>
          <div className="w-[18%]">
            <p className="text-[#1A1A1A] text-base font-medium">Đơn giá</p>
          </div>
          <div className="w-[13%]">
            <p className="text-[#1A1A1A] text-base font-medium">Số Lượng </p>
          </div>
          <div className="w-[14%]">
            <p className="text-[#1A1A1A] text-base font-medium">Số Tiền</p>
          </div>
          <div>
            <p className="text-[#1A1A1A] text-base font-medium">Thao Tác</p>
          </div>
        </div>
        <div>
          {/* listView Cart */}
          <div className="overscroll-auto md:overscroll-contain lg:overscroll-none h-[630px] overflow-x-hidden mt-[72px]">
            <div
              className="bg-white h-auto  rounded-md items-center flex py-[40px]
                shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
            >
              <div className="w-[5%] text-center leading-none	">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm items-center"
                />
              </div>
              {/* Thông tin sản phẩm */}
              <div className="flex w-[40%]">
                <img
                  src={Images.product}
                  className="w-[112px] h-[112px]"
                  alt="product"
                />
                <div>
                  <p className="text-[#1A1A1A] text-base font-medium mx-3">
                    Ly giữ nhiệt cao cấp Tyeso V2 900ml cốc nước giữ nhiệt thể
                    thaow-[5%]w-[5%]w-[5%]w-[5%]w-[5%]
                  </p>
                  <div className="bg-[#f9e9e9] rounded-[30px] max-w-max mx-3 mt-3">
                    <p className="text-[#EA4B48] px-[10px] py-1">Giảm 23%</p>
                  </div>
                </div>
              </div>
              {/* end Thông tin sản phẩm */}

              {/* Đơn giá */}
              <div className="w-[18.2%]">
                <div className="flex gap-2 items-center">
                  {/* Số tiền đầu */}
                  <p className="text-[#7A828A] text-xs line-through leading-none	">
                    60.000
                  </p>{" "}
                  {/* end Số tiền đầu */}
                  {/* Số tiền sau giảm giá */}
                  <p className="text-[#EA4B48] text-xl">30.000</p>
                  {/* end Số tiền sau giảm giá */}
                </div>
              </div>
              {/* end Đơn giá */}

              {/* Tăng giảm số lượng */}
              <div className=" flex items-center w-[13.7%]">
                {/* Giảm số lượng */}
                <div
                  className="border-[2px] border-[#FFAAAF] rounded-md bg-white px-[5px] py-[3px]"
                  onClick={minus}
                >
                  <Minus />
                </div>
                {/* end Giảm số lượng */}
                {/* Số lượng */}
                <div>
                  <p className="text-base mx-2 font-medium">{quantity}</p>
                </div>
                {/* end Số lượng */}
                {/* Tăng số lượng */}
                <div
                  className="border-[2px] border-[#FFAAAF] rounded-md bg-white px-[5px] py-[3px]"
                  onClick={plus}
                >
                  <Plus />
                </div>
                {/* end Tăng số lượng */}
              </div>
              {/* end Tăng giảm số lượng */}

              {/* Số tiền phải trả */}
              <div className="w-[13.7%]">
                <p className="text-[#EA4B48] text-xl">30.000</p>
                {/* end Số tiền sau giảm giá */}
              </div>
              {/* end Số tiền phải trả */}

              {/* Xóa */}
              <div
                className="rounded-full
                    shadow-[rgba(108,_108,_108,_0.25)_0px_0px_4px_0px]"
              >
                <div className="p-3">
                  <Delete />
                </div>
              </div>
            </div>
            <div
              className="bg-white h-auto rounded-md items-center flex py-[40px]
                shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
            >
              <div className="w-[5%] text-center leading-none	">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm items-center"
                />
              </div>
              {/* Thông tin sản phẩm */}
              <div className="flex w-[40%]">
                <img
                  src={Images.product}
                  className="w-[112px] h-[112px]"
                  alt="product"
                />
                <div>
                  <p className="text-[#1A1A1A] text-base font-medium mx-3">
                    Ly giữ nhiệt cao cấp Tyeso V2 900ml cốc nước giữ nhiệt thể
                    thaow-[5%]w-[5%]w-[5%]w-[5%]w-[5%]
                  </p>
                  <div className="bg-[#f9e9e9] rounded-[30px] max-w-max mx-3 mt-3">
                    <p className="text-[#EA4B48] px-[10px] py-1">Giảm 23%</p>
                  </div>
                </div>
              </div>
              {/* end Thông tin sản phẩm */}

              {/* Đơn giá */}
              <div className="w-[18.2%]">
                <div className="flex">
                  {/* Số tiền đầu */}
                  <p className="text-[#7A828A] text-xs line-through leading-none	">
                    60.000
                  </p>{" "}
                  {/* end Số tiền đầu */}
                  {/* Số tiền sau giảm giá */}
                  <p className="text-[#EA4B48] text-xl">30.000</p>
                  {/* end Số tiền sau giảm giá */}
                </div>
              </div>
              {/* end Đơn giá */}

              {/* Tăng giảm số lượng */}
              <div className=" flex items-center w-[13.7%]">
                {/* Giảm số lượng */}
                <div className="border-[2px] border-[#FFAAAF] rounded-md bg-white px-[5px] py-[3px]">
                  <Minus />
                </div>
                {/* end Giảm số lượng */}
                {/* Số lượng */}
                <div>
                  <p className="text-base mx-2 font-medium">5</p>
                </div>
                {/* end Số lượng */}
                {/* Tăng số lượng */}
                <div className="border-[2px] border-[#FFAAAF] rounded-md bg-white px-[5px] py-[3px]">
                  <Plus />
                </div>
                {/* end Tăng số lượng */}
              </div>
              {/* end Tăng giảm số lượng */}

              {/* Số tiền phải trả */}
              <div className="w-[13.7%]">
                <p className="text-[#EA4B48] text-xl">30.000</p>
                {/* end Số tiền sau giảm giá */}
              </div>
              {/* end Số tiền phải trả */}

              {/* Xóa */}
              <div
                className="rounded-full
                    shadow-[rgba(108,_108,_108,_0.25)_0px_0px_4px_0px]"
              >
                <div className="p-3">
                  <Delete />
                </div>
              </div>
            </div>
            <div
              className="bg-white h-auto rounded-md items-center flex py-[40px]
                shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
            >
              <div className="w-[5%] text-center leading-none	">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm items-center"
                />
              </div>
              {/* Thông tin sản phẩm */}
              <div className="flex w-[40%]">
                <img
                  src={Images.product}
                  className="w-[112px] h-[112px]"
                  alt="product"
                />
                <div>
                  <p className="text-[#1A1A1A] text-base font-medium mx-3">
                    Ly giữ nhiệt cao cấp Tyeso V2 900ml cốc nước giữ nhiệt thể
                    thaow-[5%]w-[5%]w-[5%]w-[5%]w-[5%]
                  </p>
                  <div className="bg-[#f9e9e9] rounded-[30px] max-w-max mx-3 mt-3">
                    <p className="text-[#EA4B48] px-[10px] py-1">Giảm 23%</p>
                  </div>
                </div>
              </div>
              {/* end Thông tin sản phẩm */}

              {/* Đơn giá */}
              <div className="w-[18.2%]">
                <div className="flex">
                  {/* Số tiền đầu */}
                  <p className="text-[#7A828A] text-xs line-through leading-none	">
                    60.000
                  </p>{" "}
                  {/* end Số tiền đầu */}
                  {/* Số tiền sau giảm giá */}
                  <p className="text-[#EA4B48] text-xl">30.000</p>
                  {/* end Số tiền sau giảm giá */}
                </div>
              </div>
              {/* end Đơn giá */}

              {/* Tăng giảm số lượng */}
              <div className=" flex items-center w-[13.7%]">
                {/* Giảm số lượng */}
                <div className="border-[2px] border-[#FFAAAF] rounded-md bg-white px-[5px] py-[3px]">
                  <Minus />
                </div>
                {/* end Giảm số lượng */}
                {/* Số lượng */}
                <div>
                  <p className="text-base mx-2 font-medium">5</p>
                </div>
                {/* end Số lượng */}
                {/* Tăng số lượng */}
                <div className="border-[2px] border-[#FFAAAF] rounded-md bg-white px-[5px] py-[3px]">
                  <Plus />
                </div>
                {/* end Tăng số lượng */}
              </div>
              {/* end Tăng giảm số lượng */}

              {/* Số tiền phải trả */}
              <div className="w-[13.7%]">
                <p className="text-[#EA4B48] text-xl">30.000</p>
                {/* end Số tiền sau giảm giá */}
              </div>
              {/* end Số tiền phải trả */}

              {/* Xóa */}
              <div
                className="rounded-full
                    shadow-[rgba(108,_108,_108,_0.25)_0px_0px_4px_0px]"
              >
                <div className="p-3">
                  <Delete />
                </div>
              </div>
            </div>
            <div
              className="bg-white h-auto rounded-md items-center flex py-[40px]
                shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
            >
              <div className="w-[5%] text-center leading-none	">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm items-center"
                />
              </div>
              {/* Thông tin sản phẩm */}
              <div className="flex w-[40%]">
                <img
                  src={Images.product}
                  className="w-[112px] h-[112px]"
                  alt="product"
                />
                <div>
                  <p className="text-[#1A1A1A] text-base font-medium mx-3">
                    Ly giữ nhiệt cao cấp Tyeso V2 900ml cốc nước giữ nhiệt thể
                    thaow-[5%]w-[5%]w-[5%]w-[5%]w-[5%]
                  </p>
                  <div className="bg-[#f9e9e9] rounded-[30px] max-w-max mx-3 mt-3">
                    <p className="text-[#EA4B48] px-[10px] py-1">Giảm 23%</p>
                  </div>
                </div>
              </div>
              {/* end Thông tin sản phẩm */}

              {/* Đơn giá */}
              <div className="w-[18.2%]">
                <div className="flex">
                  {/* Số tiền đầu */}
                  <p className="text-[#7A828A] text-xs line-through leading-none	">
                    60.000
                  </p>{" "}
                  {/* end Số tiền đầu */}
                  {/* Số tiền sau giảm giá */}
                  <p className="text-[#EA4B48] text-xl">30.000</p>
                  {/* end Số tiền sau giảm giá */}
                </div>
              </div>
              {/* end Đơn giá */}

              {/* Tăng giảm số lượng */}
              <div className=" flex items-center w-[13.7%]">
                {/* Giảm số lượng */}
                <div className="border-[2px] border-[#FFAAAF] rounded-md bg-white px-[5px] py-[3px]">
                  <Minus />
                </div>
                {/* end Giảm số lượng */}
                {/* Số lượng */}
                <div>
                  <p className="text-base mx-2 font-medium">5</p>
                </div>
                {/* end Số lượng */}
                {/* Tăng số lượng */}
                <div className="border-[2px] border-[#FFAAAF] rounded-md bg-white px-[5px] py-[3px]">
                  <Plus />
                </div>
                {/* end Tăng số lượng */}
              </div>
              {/* end Tăng giảm số lượng */}

              {/* Số tiền phải trả */}
              <div className="w-[13.7%]">
                <p className="text-[#EA4B48] text-xl">30.000</p>
                {/* end Số tiền sau giảm giá */}
              </div>
              {/* end Số tiền phải trả */}

              {/* Xóa */}
              <div
                className="rounded-full
                    shadow-[rgba(108,_108,_108,_0.25)_0px_0px_4px_0px]"
              >
                <div className="p-3">
                  <Delete />
                </div>
              </div>
            </div>
            <div
              className="bg-white h-auto rounded-md items-center flex py-[40px]
                shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
            >
              <div className="w-[5%] text-center leading-none	">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm items-center"
                />
              </div>
              {/* Thông tin sản phẩm */}
              <div className="flex w-[40%]">
                <img
                  src={Images.product}
                  className="w-[112px] h-[112px]"
                  alt="product"
                />
                <div>
                  <p className="text-[#1A1A1A] text-base font-medium mx-3">
                    Ly giữ nhiệt cao cấp Tyeso V2 900ml cốc nước giữ nhiệt thể
                    thaow-[5%]w-[5%]w-[5%]w-[5%]w-[5%]
                  </p>
                  <div className="bg-[#f9e9e9] rounded-[30px] max-w-max mx-3 mt-3">
                    <p className="text-[#EA4B48] px-[10px] py-1">Giảm 23%</p>
                  </div>
                </div>
              </div>
              {/* end Thông tin sản phẩm */}

              {/* Đơn giá */}
              <div className="w-[18.2%]">
                <div className="flex">
                  {/* Số tiền đầu */}
                  <p className="text-[#7A828A] text-xs line-through leading-none	">
                    60.000
                  </p>{" "}
                  {/* end Số tiền đầu */}
                  {/* Số tiền sau giảm giá */}
                  <p className="text-[#EA4B48] text-xl">30.000</p>
                  {/* end Số tiền sau giảm giá */}
                </div>
              </div>
              {/* end Đơn giá */}

              {/* Tăng giảm số lượng */}
              <div className=" flex items-center w-[13.7%]">
                {/* Giảm số lượng */}
                <div className="border-[2px] border-[#FFAAAF] rounded-md bg-white px-[5px] py-[3px]">
                  <Minus />
                </div>
                {/* end Giảm số lượng */}
                {/* Số lượng */}
                <div>
                  <p className="text-base mx-2 font-medium">5</p>
                </div>
                {/* end Số lượng */}
                {/* Tăng số lượng */}
                <div className="border-[2px] border-[#FFAAAF] rounded-md bg-white px-[5px] py-[3px]">
                  <Plus />
                </div>
                {/* end Tăng số lượng */}
              </div>
              {/* end Tăng giảm số lượng */}

              {/* Số tiền phải trả */}
              <div className="w-[13.7%]">
                <p className="text-[#EA4B48] text-xl">30.000</p>
                {/* end Số tiền sau giảm giá */}
              </div>
              {/* end Số tiền phải trả */}

              {/* Xóa */}
              <div
                className="rounded-full
                    shadow-[rgba(108,_108,_108,_0.25)_0px_0px_4px_0px]"
              >
                <div className="p-3">
                  <Delete />
                </div>
              </div>
            </div>
          </div>
          {/* end listView Cart */}

          {/* fixed */}
          <div
            className="bg-white mt-[50px] items-center
                shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
          >
            {/* Input voucher */}
            <div className=" border-b-[1px] border-[#E0E0E0] w-[100%] mx-auto">
              <div className="flex items-center justify-end p-4">
                <div className="mr-3">
                  <Voucher />
                </div>
                <div className="flex items-center justify-between rounded-[6px] border-[1px] border-[#FFAAAF]">
                  <input
                    className="focus:outline-none text-[#333333] text-base placeholder-[#7A828A]
                                 px-[10px] rounded-[6px] py-[12px] w-[287px]"
                    placeholder="Nhập mã voucher"
                  />
                  <div className="pr-2">
                    <SearchVoucher />
                  </div>
                </div>
              </div>
            </div>
            {/* end Input voucher */}

            <div className="w-[100%] flex items-center justify-between">
              <div className="p-4 flex items-center w-[35%]">
                <div className="w-[15%] text-center leading-none	">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm items-center"
                  />
                </div>
                <div className="flex w-[40%] text-[#1A1A1A] text-base">
                  <div>Chọn Tất Cả</div>
                  {/* Tổng số lượng được tick chọn trong giỏ hàng */}
                  <div className="mx-2 gap-2">(231443)</div>
                  {/* end Tổng số lượng được tick chọn trong giỏ hàng */}
                </div>
                {/* Xóa */}
                <div
                  className="rounded-full shadow-[rgba(108,_108,_108,_0.25)_0px_0px_4px_0px]
                        "
                >
                  <div className="p-3">
                    <Delete />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between w-[55%] p-4">
                {/* Tổng số sản phẩm thanh toán  */}
                <div>
                  <p>Tổng thanh toán (323 sản phẩm):</p>
                </div>{" "}
                {/* end Tổng số sản phẩm thanh toán  */}
                {/* Tiền */}
                <div className="flex items-center gap-2">
                  <div>
                    <p className="text-[#EA4B48] text-3xl">₫180.000</p>
                    {/* end Tiền những sản phẩm đã chọn */}
                    <div className="flex">
                      <p>Tiết kiệm : </p>
                      {/* Tiết kiệm */}
                      <p className="ml-2 text-[#EA4B48]">đ30k</p>
                      {/* Tiết kiệm */}
                    </div>
                  </div>
                  <ArrowUp />
                </div>
                <button
                  className="justify-center gap-3 items-center text-lg font-bold text-white w-[287px]
                             rounded-md h-[58px] hover:bg-[#ff6d65] flex 
                                transition duration-150 bg-[#EA4B48] cursor-pointer"
                >
                  <Buyzzle />
                  <p>Mua ngay</p>
                </button>
              </div>
            </div>
          </div>
          {/* end fixed */}
        </div>
      </div>
    </Container>
  );
}
