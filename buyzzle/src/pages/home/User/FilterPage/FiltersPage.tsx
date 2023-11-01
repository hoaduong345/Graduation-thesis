import { useParams } from "react-router-dom";
import { Images } from "../../../../Assets/TS";
import BookOff from "../../../../Assets/TSX/BookOff";
import FoodLogo from "../../../../Assets/TSX/FoodLogo";
import FoodLogoo from "../../../../Assets/TSX/FoodLogoo";
import MangoLogo from "../../../../Assets/TSX/MangoLogo";
import Series from "../../../../Assets/TSX/Series";
import StepsLogo from "../../../../Assets/TSX/StepsLogo";
import SitebarFilter from "../../../../components/Sitebar/SitebarFilter";
import Container from "../../../../components/container/Container";
import SlidesFilter from "../../../../components/home/components/slides/SlidesFilter/SlidesFilter";
import { useSearch } from "../../../../hooks/Search/SearchContextProvider";
import "../../../css/filter.css";
import Filter from "./Filter";
import Lightbulb from "../../../../Assets/TSX/Light-bulb";
export interface Cate {
   id: number;
   name: string;
}
export interface ImgOfProduct {
   url: string;
}
[];
export interface Products {
   id: number;
   name: string;
   price: number;
   rate: number; // đánh giá
   pricesale: number; // giảm được bao nhiêu đó ( thẻ tag )
   sellingPrice: number; // giá bán
   discount: number; // giảm giá
   soldCount: number; // đã bán
   quantity: number;
   description: string;
   status: string;
   createdAt: string;
   date: string;
   fK_category: Cate;
   ProductImage: ImgOfProduct[];
}
interface TProductResponse {
   currentPage?: number;
   totalpage?: number;
   rows?: Products[];
   createdAt?: string;
   ProductImage?: ImgOfProduct[];
}

export type Props = {
   minPrice: number;
   maxPrice: number;
   onChangeSlider(min: number, max: number): void;
};

export interface PriceRangeFilterPage {
   minPrice: number;
   maxPrice: number;
   // b3. da xac dinh duoc can chuyen gi va nam o dau
   // b4. goi lai ham callbacks va truyen vao truong minh muon chuyen di
   onChangeSlider(min: number, max: number): void;
}
export default function FiltersPage() {
   const { id } = useParams();

   const {
      searchValue,
      handleSliderChange,
      handleActiveBTNLatestCreationDate,
      handleActiveBTNHighToLowClick,
      handleActiveBTNLowToHighClick,
      activeBtnLatestCreationDate,
      activeBtnHighToLow,
      activeBtnLowToHigh,
      starsnumber,
      products,
      sliderValues,
      nameCate,
   } = useSearch();

   return (
      <Container>
         <body className="body-filter container mx-auto">
            <div className="grid grid-cols-4 max-2xl:grid-cols-1">
               <div className="col-span-1 max-2xl:hidden">
                  <SitebarFilter
                     onPurchaseRangeChange={() => console.log("")}
                     onSoldOut={() => console.log("")}
                     oninStock={() => console.log("")}
                     valuePrice={sliderValues}
                     onQuantityRangeChange={() => console.log("")}
                     onPriceRangeChange={(e: any) => handleSliderChange(e)}
                  />
               </div>
               {/* content-right-filter */}
               <div className="content-right-filter mt-[34px] p-4 col-span-3 max-2xl:col-span-1 max-lg:mt-0 max-lg:p-0">
                  {/* banner filter */}
                  <div className="banner-filter max-w-[970px] mb-5 max-2xl:max-w-[1150px] max-2xl:mx-auto">
                     <SlidesFilter />
                  </div>

                  <div className="bg-[#FFEAE9] h-[60px] mt-[18px] rounded-[6px] ">
                     <div className="txt-content flex">
                        <div
                           className="content-left w-[50.5%] flex items-center justify-start gap-5 h-[60px]
                 max-2xl:w-[51.5%] 
                 max-2xl:gap-7
                 max-xl:w-[52%]
                 max-xl:gap-4
                 max-lg:w-[65%]
                "
                        >
                           <p className="text-[#000000] text-sm ml-5 font-semibold max-2xl:text-lg max-lg:">
                              Sắp xếp theo
                           </p>
                           <button
                              type="button"
                              className="transition duration-150 outline outline-2 outline-[#EA4B48]  font-medium
                   rounded-[6px] text-xs py-[6px] px-[13px] text-[#FFFFFF] hover:text-[#FFFFFF] bg-[#FFAAAF] 
                   max-2xl:py-[5px] max-2xl:text-base 
                   max-xl:py-[6px] max-xl:px-[12px] max-xl:text-sm 
                   "
                           >
                              Liên Quan
                           </button>
                           <button
                              type="button"
                              className={
                                 activeBtnLatestCreationDate
                                    ? `transition duration-150 outline outline-2 outline-[#EA4B48] bg-white hover:bg-[#FFAAAF] font-medium
                    rounded-[6px] text-sm py-[6px] px-[13px] hover:text-[#FFFFFF]
                    max-2xl:py-[5px] max-2xl:text-base 
                    max-xl:py-[6px] max-xl:px-[12px] max-xl:text-sm `
                                    : `transition duration-150 outline outline-2 outline-[#EA4B48] bg-[#FFAAAF] hover:bg-[#FFAAAF] font-medium
                        rounded-[6px] text-sm py-[6px] px-[13px] hover:text-[#FFFFFF] text-white
                        max-2xl:py-[5px] max-2xl:text-base
                        max-xl:py-[6px] max-xl:px-[12px] max-xl:text-sm `
                              }
                              onClick={handleActiveBTNLatestCreationDate}
                           >
                              Mới Nhất
                           </button>
                           <button
                              type="button"
                              className="transition duration-150 outline outline-2 outline-[#EA4B48] bg-white hover:bg-[#FFAAAF] font-medium
                   rounded-[6px] text-sm py-[6px] px-[13px] hover:text-[#FFFFFF]
                   max-2xl:py-[5px] max-2xl:text-base 
                   max-xl:py-[6px] max-xl:px-[12px] max-xl:text-sm "
                           >
                              Bán Chạy
                           </button>
                        </div>

                        <div
                           className="content-left flex items-center justify-start gap-5 h-[60px] 
                max-2xl:gap-7
                max-xl:gap-4
                "
                        >
                           <p className="text-[#000000] font-semibold text-sm max-2xl:text-lg">
                              Giá
                           </p>
                           <button
                              type="button"
                              className={
                                 activeBtnLowToHigh
                                    ? `transition duration-150 outline outline-2 outline-[#EA4B48] bg-white hover:bg-[#ffeced] font-medium
                    rounded-[6px] text-sm py-[6px] px-[13px] hover:text-[#FFFFFF]
                    max-2xl:py-[5px] max-2xl:text-base
                    max-xl:py-[6px] max-xl:px-[12px] max-xl:text-sm`
                                    : `transition duration-150 outline outline-2 outline-[#EA4B48] bg-[#FFAAAF] hover:bg-[#FFAAAF] font-medium
                    rounded-[6px] text-sm py-[6px] px-[13px] hover:text-[#FFFFFF] text-white
                    max-2xl:py-[5px] max-2xl:text-base
                    max-xl:py-[6px] max-xl:px-[12px] max-xl:text-sm `
                              }
                              onClick={handleActiveBTNLowToHighClick}
                           >
                              Thấp Nhất
                           </button>
                           <button
                              type="button"
                              className={
                                 activeBtnHighToLow
                                    ? `transition duration-150 outline outline-2 outline-[#EA4B48] bg-white hover:bg-[#FFAAAF] font-medium
                    rounded-[6px] text-sm py-[6px] px-[13px] hover:text-[#FFFFFF]
                    max-2xl:py-[5px] max-2xl:text-base
                    max-xl:py-[6px] max-xl:px-[12px] max-xl:text-sm`
                                    : `transition duration-150 outline outline-2 outline-[#EA4B48] bg-[#FFAAAF] hover:bg-[#FFAAAF] font-medium
                    rounded-[6px] text-sm py-[6px] px-[13px] hover:text-[#FFFFFF] text-white
                    max-2xl:py-[5px] max-2xl:text-base
                    max-xl:py-[6px] max-xl:px-[12px] max-xl:text-sm `
                              }
                              onClick={handleActiveBTNHighToLowClick}
                           >
                              Cao Nhất
                           </button>
                        </div>
                     </div>
                  </div>

                  <div className="text-xl mt-5">
                     {searchValue ? (
                        <div className="flex gap-2 items-center">
                           <Lightbulb />
                           <p className="group text-[#7A828A]">
                              KẾT QUẢ TÌM KIẾM VỚI:{" "}
                           </p>
                           <span className="font-semibold group-hover:text-current">
                              '{searchValue?.toString()}'
                           </span>
                        </div>
                     ) : (
                        <div className="flex gap-2">
                           <p className="group text-[#7A828A]"> DANH MỤC: </p>
                           <span className="font-semibold group-hover:text-current">
                              '{nameCate}'
                           </span>
                        </div>
                     )}
                  </div>

                  <div className="flex flex-wrap gap-4 ml-[37px] mt-5 max-2xl:ml-0 max-2xl:flex-wrap max-lg:gap-4">
                     {products?.map((items) => {
                        return (
                           <Filter starsnumber={starsnumber} product={items} />
                        );
                     })}
                  </div>
                  {/* <div
              style={{ borderTopColor: "transparent" }}
              className="w-16 h-16 border-4 border-red-400  mx-auto border-double rounded-full animate-spin"
            /> */}
                  {/* <div className="pagination">
              <a href="#" className="prev mr-[60px]">
                <ArrowPrev />
              </a>
              <a href="#" className="page">
                1
              </a>
              <a href="#" className="page">
                2
              </a>
              <a href="#" className="page">
                ...
              </a>
              <a href="#" className="page">
                7
              </a>
              <a href="#" className="page">
                8
              </a>
              <a href="#" className="next ml-[60px]">
                <ArrowNext />
              </a>
            </div> */}
               </div>
               {/* content-right-filter-end */}
            </div>

            <div className="Logo-square-bottom border border-[#FFEAE9] flex justify-evenly my-24 w-[100%] py-[60px] ">
               <div className="cursor-pointer">
                  <StepsLogo />
               </div>
               <div className="border-[1px] border-[#E6E6E6] " />
               <div className="cursor-pointer">
                  <MangoLogo />
               </div>

               <div className="border-[1px] border-[#E6E6E6] " />
               <div className="cursor-pointer">
                  <FoodLogo />
               </div>

               <div className="border-[1px] border-[#E6E6E6] " />
               <div className="cursor-pointer">
                  <FoodLogoo />
               </div>

               <div className="border-[1px] border-[#E6E6E6] " />
               <div className="cursor-pointer">
                  <BookOff />
               </div>

               <div className="border-[1px] border-[#E6E6E6] " />
               <div className="cursor-pointer">
                  <Series />
               </div>
            </div>
         </body>
      </Container>
   );
}
