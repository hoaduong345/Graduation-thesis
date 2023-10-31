import { useState } from "react";
import { Products } from "../../User/FilterPage/FiltersPage";
import Edit from "../Assets/TSX/Edit";
import { Link } from "react-router-dom";
import Delete from "../Assets/TSX/Delete";
import {
   currentDate,
   numberFormat,
   roundedNumber,
} from "../../../../Helper/Format";
import { stars } from "../../../../Helper/StarRating/Star";
import { Images } from "../../../../Assets/TS";
type Props = {
   products: Products;
   soldOut: boolean;
   HandleXoa: (id: number) => void;
   handleChecked: (checked: boolean, id: number) => void;
   checked: (id: number) => boolean;
};
export default function ListproductMap(props: Props) {
   const { products, handleChecked, checked } = props;

   const handleRemove = (id: number) => {
      props.HandleXoa(id);
   };

   const [isHovering, setIsHovering] = useState(false);

   const handleMouseOver = () => {
      setIsHovering(true);
   };

   const handleMouseOut = () => {
      setIsHovering(false);
   };

   return (
      <>
         {props.soldOut ? (
            <>
               {/* cardItems */}
               <div
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                  className="card-items py-2 rounded-md mt-6 max-xl:pr-2 relative
            shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
               >
                  {/* infor in card */}
                  <div className="w-[100%] flex items-center">
                     {/* checkbox */}
                     <div className=" w-[10%] text-center">
                        <input
                           id="default-checkbox"
                           type="checkbox"
                           checked={checked(products.id)}
                           onChange={(element) =>
                              handleChecked(element.target.checked, products.id)
                           }
                           className="checkbox checkbox-sm items-center"
                        />
                     </div>
                     {/* end checkbox */}

                     {/* InforProduct */}
                     <div className="InforProduct w-[35%] max-[850px]:w-[50%] flex items-center">
                        <div>
                           <img
                              className="w-[70px] h-[70px] object-contain rounded-md"
                              src={products.ProductImage[0].url}
                              alt="imageproduct"
                           />
                        </div>
                        <div className="inforProducts ml-4">
                           <p
                              className="nameProducts text-[#EA4B48] text-xs font-semibold leading-4 max-w-[250px] uppercase
              max-xl:max-w-[150px]
              "
                           >
                              {products.name.length > 100
                                 ? `${products.name.substring(0, 100)}...`
                                 : products.name}
                           </p>
                           <div className="flex gap-1 mt-1">
                              <p className="category text-[#EA4B48] text-sm font-medium leading-4">
                                 Danh mục:{" "}
                              </p>
                              <p className="category text-[#EA4B48] text-sm font-medium leading-4 ml-[2px]">
                                 {products.fK_category.name}{" "}
                              </p>
                           </div>
                        </div>
                     </div>
                     {/* end InforProduct */}
                     <div className="w-[49%] items-center flex">
                        {/* remaining amount ( số lượng còn lại ) */}
                        <div className="quantity w-[18%] max-lg:w-[35%]">
                           <span className="text-[#EA4B48] text-sm font-semibold ml-3 leading-4 max-xl:text-xs max-xl:ml-6  max-lg:ml-20">
                              {products.quantity}
                           </span>
                        </div>
                        {/* end  remaining amount ( số lượng còn lại )  */}
                        <div className="flex text-center w-[37%] justify-start gap-5 max-xl:gap-2 max-xl:ml-6 max-lg:invisible">
                           <h3 className="text-[#4C4C4C] font-semibold max-xl:font-medium max-xl:text-xs">
                              Ẩn
                           </h3>
                           {/* Swich */}
                           <div className="form-control">
                              <input
                                 type="checkbox"
                                 className="toggle toggle-error max-xl:toggle-sm"
                              />
                           </div>
                           {/* end  Swich */}
                           <h3 className="text-[#5D5FEF] font-semibold max-xl:font-medium max-xl:text-xs">
                              Đăng
                           </h3>
                        </div>
                        {/* so luong đã bán ra */}
                        <div>
                           <h3 className="mr-24 font-semibold max-xl:font-medium max-xl:text-xs max-xl:mr-14 max-lg:ml-4 text-[#EA4B48]">
                              10K
                           </h3>
                        </div>
                        {/* end so luong đã bán ra */}
                        {/* rating  */}
                        <div>
                           <div className="flex items-center justify-start gap-2 ">
                              <div className="rating rating-xs">
                                 {stars.map((_, index) => (
                                    <button key={index}>
                                       {/* Sử dụng index để xác định xem sao này có phải sao màu vàng hay không */}
                                       <img
                                          src={
                                             index < products.rate
                                                ? Images.star1
                                                : Images.star2
                                          }
                                          alt=""
                                       />
                                    </button>
                                 ))}
                              </div>
                              <p className="text-[#EA4B48] text-sm">
                                 {roundedNumber(products.rate)}.0
                              </p>
                           </div>
                        </div>
                     </div>
                     <div
                        className="flex w-[52px] justify-start gap-3
          max-xl:gap-2
          "
                     >
                        <Link to={`/admin/updateproduct/${props.products.id}`}>
                           <Edit />
                        </Link>

                        <div onClick={() => handleRemove(props.products.id)}>
                           <Delete />
                        </div>
                     </div>
                  </div>
                  {/* end infor in card */}

                  {isHovering && (
                     <div
                        className="absolute z-10 top-[100%] left-[30%] transition-all duration-700 bg-white
          shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] w-[584px] rounded-md"
                     >
                        <div className="p-7 grid grid-cols-3 gap-4">
                           <div className="col-span-2 flex flex-col gap-2">
                              <div className="flex gap-10">
                                 <div className="flex flex-col gap-2">
                                    <div>
                                       <p className="text-xs font-medium">
                                          Id Sản phẩm:
                                       </p>
                                       <p className="text-xs text-[#4C4C4C]">
                                          {props.products.id}
                                       </p>
                                    </div>
                                    <div>
                                       <p className="text-xs">Tag:</p>
                                       <p className="text-xs text-[#4C4C4C]">
                                          !!!!!!!!!
                                       </p>
                                    </div>
                                    <div>
                                       <p className="text-xs font-medium">
                                          Danh mục sản phẩm:
                                       </p>
                                       <p className="text-xs text-[#4C4C4C]">
                                          {products.fK_category.name}
                                       </p>
                                    </div>
                                 </div>

                                 <div className="flex flex-col gap-2">
                                    <div>
                                       <p className="text-xs font-medium">
                                          Ngày thêm:
                                       </p>
                                       <p className="text-xs text-[#4C4C4C]">
                                          {currentDate(
                                             props.products.createdAt
                                          )}
                                       </p>
                                    </div>
                                    <div>
                                       <p className="text-xs font-medium">
                                          Mã giảm giá:
                                       </p>
                                       <p className="text-xs text-[#4C4C4C]">
                                          !!!!
                                       </p>
                                    </div>
                                    <div>
                                       <p className="text-xs font-medium">
                                          Tình trạng:
                                       </p>
                                       <p className="text-xs text-[#00B207]">
                                          Còn hàng
                                       </p>
                                    </div>
                                 </div>
                              </div>

                              <div>
                                 <p className="text-xs font-medium">
                                    Mô tả sản phẩm:
                                 </p>
                                 <p className="text-xs text-[#4C4C4C] ">
                                    {props.products.description.length > 100
                                       ? `${props.products.description.substring(
                                            0,
                                            100
                                         )}...`
                                       : props.products.description}
                                 </p>
                              </div>
                           </div>

                           <div className="overscroll-auto md:overscroll-contain lg:overscroll-none h-[170px] overflow-x-hidden">
                              <div className="col-span-1 flex flex-col gap-3">
                                 <img
                                    src={products.ProductImage[0].url}
                                    alt=""
                                 />
                                 <div className="grid grid-cols-2 gap-3 items-center">
                                    {products.ProductImage.slice(1, 5).map(
                                       (e) => {
                                          return (
                                             <>
                                                <img
                                                   className="w-[60px] h-[60px]"
                                                   src={e.url}
                                                   alt=""
                                                />
                                             </>
                                          );
                                       }
                                    )}
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  )}
               </div>
            </>
         ) : (
            <>
               {/* cardItems */}
               <div
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                  className="card-items py-2 rounded-md mt-6 max-xl:pr-2 relative
            shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
               >
                  {/* infor in card */}
                  <div className="items-center grid grid-cols-10">
                     {/* checkbox */}
                     <div className="text-center col-span-1">
                        <input
                           id="default-checkbox"
                           type="checkbox"
                           className="checkbox checkbox-sm items-center"
                           checked={checked(products.id)}
                           onChange={(element) =>
                              handleChecked(element.target.checked, products.id)
                           }
                        />
                     </div>
                     {/* end checkbox */}

                     {/* InforProduct */}
                     <div className="InforProduct col-span-3 flex items-center">
                        <div>
                           <img
                              className="w-[70px] h-[70px] object-contain rounded-md"
                              src={products.ProductImage[0].url}
                              alt="imageproduct"
                           />
                        </div>
                        <div className="inforProducts ml-4">
                           <p
                              className="nameProducts text-[#1A1A1A] text-xs font-semibold leading-4 max-w-[250px] uppercase
              max-xl:max-w-[150px]
              "
                           >
                              {products.name.length > 100
                                 ? `${products.name.substring(0, 100)}...`
                                 : products.name}
                           </p>
                           <div className="flex gap-1 mt-1">
                              <p className="category text-[#4C4C4C] text-sm font-medium leading-4">
                                 Danh mục:{" "}
                              </p>
                              <p className="category text-[#4C4C4C] text-sm font-medium leading-4 ml-[2px]">
                                 {products.fK_category.name}{" "}
                              </p>
                           </div>
                        </div>
                     </div>
                     {/* end InforProduct */}

                     <div className="col-span-2 flex justify-center font-semibold max-xl:font-medium max-xl:text-xs max-xl:mr-14 max-lg:ml-4">
                        <p>{numberFormat(products.sellingPrice)}</p>
                     </div>

                     <div className="col-span-1 justify-center flex">
                        {/* remaining amount ( số lượng còn lại ) */}
                        <span className="text-[#1A1A1A] text-sm font-semibold leading-4 max-xl:text-xs max-xl:ml-6  max-lg:ml-20">
                           {products.quantity}
                        </span>
                        {/* end  remaining amount ( số lượng còn lại )  */}

                        {/* so luong đã bán ra */}

                        {/* end so luong đã bán ra */}
                        {/* rating  */}
                     </div>

                     <div className="col-span-1 justify-center flex">
                        <h3 className="font-semibold max-xl:font-medium max-xl:text-xs max-xl:mr-14 max-lg:ml-4">
                           100
                        </h3>
                     </div>

                     <div className="col-span-1 justify-center flex">
                        <div className="flex items-center justify-start gap-2 ">
                           <div className="rating rating-xs">
                              {stars.map((_, index) => (
                                 <button key={index}>
                                    {/* Sử dụng index để xác định xem sao này có phải sao màu vàng hay không */}
                                    <img
                                       src={
                                          index < products.rate
                                             ? Images.star1
                                             : Images.star2
                                       }
                                       alt=""
                                    />
                                 </button>
                              ))}
                           </div>
                           <p className="text-[#EA4B48] text-sm">
                              {roundedNumber(products.rate)}.0
                           </p>
                        </div>
                     </div>

                     <div
                        className="flex justify-center gap-3 max-xl:gap-2
                           col-span-1"
                     >
                        <Link to={`/admin/updateproduct/${props.products.id}`}>
                           <Edit />
                        </Link>

                        <div onClick={() => handleRemove(props.products.id)}>
                           <Delete />
                        </div>
                     </div>
                  </div>
                  {/* end infor in card */}

                  {isHovering && (
                     <div
                        className="absolute z-10 top-[100%] left-[30%] transition-all duration-700 bg-white
          shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] w-[584px] rounded-md"
                     >
                        <div className="p-7 grid grid-cols-3 gap-4">
                           <div className="col-span-2 flex flex-col gap-2">
                              <div className="flex gap-10">
                                 <div className="flex flex-col gap-2">
                                    <div>
                                       <p className="text-xs font-medium">
                                          Id Sản phẩm:
                                       </p>
                                       <p className="text-xs text-[#4C4C4C]">
                                          {props.products.id}
                                       </p>
                                    </div>
                                    <div>
                                       <p className="text-xs">Tag:</p>
                                       <p className="text-xs text-[#4C4C4C]">
                                          !!!!!!!!!
                                       </p>
                                    </div>
                                    <div>
                                       <p className="text-xs font-medium">
                                          Danh mục sản phẩm:
                                       </p>
                                       <p className="text-xs text-[#4C4C4C]">
                                          {products.fK_category.name}
                                       </p>
                                    </div>
                                 </div>

                                 <div className="flex flex-col gap-2">
                                    <div>
                                       <p className="text-xs font-medium">
                                          Ngày thêm:
                                       </p>
                                       <p className="text-xs text-[#4C4C4C]">
                                          {currentDate(
                                             props.products.createdAt
                                          )}
                                       </p>
                                    </div>
                                    <div>
                                       <p className="text-xs font-medium">
                                          Mã giảm giá:
                                       </p>
                                       <p className="text-xs text-[#4C4C4C]">
                                          !!!!
                                       </p>
                                    </div>
                                    <div>
                                       <p className="text-xs font-medium">
                                          Tình trạng:
                                       </p>
                                       <p className="text-xs text-[#00B207]">
                                          Còn hàng
                                       </p>
                                    </div>
                                 </div>
                              </div>

                              <div>
                                 <p className="text-xs font-medium">
                                    Mô tả sản phẩm:
                                 </p>
                                 <p className="text-xs text-[#4C4C4C] ">
                                    {props.products.description.length > 100
                                       ? `${props.products.description.substring(
                                            0,
                                            100
                                         )}...`
                                       : props.products.description}
                                 </p>
                              </div>
                           </div>

                           <div className="overscroll-auto md:overscroll-contain lg:overscroll-none h-[170px] overflow-x-hidden">
                              <div className="col-span-1 flex flex-col gap-3">
                                 <img
                                    src={products.ProductImage[0].url}
                                    alt=""
                                 />
                                 <div className="grid grid-cols-2 gap-3 items-center">
                                    {products.ProductImage.slice(1, 5).map(
                                       (e) => {
                                          return (
                                             <>
                                                <img
                                                   className="w-[60px] h-[60px]"
                                                   src={e.url}
                                                   alt=""
                                                />
                                             </>
                                          );
                                       }
                                    )}
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  )}
               </div>
            </>
         )}
      </>
   );
}
