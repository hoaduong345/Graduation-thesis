import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Images } from "../../../../Assets/TS";
import BookOff from "../../../../Assets/TSX/BookOff";
import FoodLogo from "../../../../Assets/TSX/FoodLogo";
import FoodLogoo from "../../../../Assets/TSX/FoodLogoo";
import MangoLogo from "../../../../Assets/TSX/MangoLogo";
import Series from "../../../../Assets/TSX/Series";
import StepsLogo from "../../../../Assets/TSX/StepsLogo";
import { productController } from "../../../../Controllers/ProductsController";
import SitebarFilter from "../../../../components/Sitebar/SitebarFilter";
import Container from "../../../../components/container/Container";
import SlidesFilter from "../../../../components/home/components/slides/SlidesFilter/SlidesFilter";
import "../../../css/filter.css";
import Filter from "./Filter";
import useDebounce from "../../../../useDebounceHook/useDebounce";
import { useScroll } from "../../../../hooks/Scroll/useScrollPages";
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
  const [products, setProducts] = useState<Products[]>([]);
  const [activeBtnLowToHigh, setActiveBtnLowToHigh] = useState(true);
  const [activeBtnHighToLow, setActiveBtnHighToLow] = useState(true);
  const [activeBtnLatestCreationDate, setActiveBtnLatestCreationDate] =
    useState(true);
  const [sliderValues, setSliderValues] = useState<[number, number]>([
    0, 10000000,
  ]);

  const debouncedInputValue = useDebounce(sliderValues, 700); // Debounce for 300 milliseconds

  const { id } = useParams();
  const idCate = Number(id);
  console.log("🚀 ~ file: FiltersPage.tsx:48 ~ FiltersPage ~ idCate:", idCate);
  const { pathname } = useLocation();
  const keywordSearch = String(pathname);
  console.log(
    "🚀 ~ file: FiltersPage.tsx:79 ~ FiltersPage ~ text:",
    keywordSearch
  );

  const handleActiveBTNLowToHighClick = () => {
    productController.getSortProductbyPrice("asc", idCate).then((res: any) => {
      console.log(
        "🚀 ~ file: FiltersPage.tsx:57 ~ productController.getSortProductbyPrice ~ res:",
        res
      );
      setActiveBtnLowToHigh(false);
      setActiveBtnHighToLow(true);
      setProducts(res.rows);
    });
  };
  const handleActiveBTNHighToLowClick = () => {
    productController.getSortProductbyPrice("desc", idCate).then((res: any) => {
      console.log(
        "🚀 ~ file: FiltersPage.tsx:57 ~ productController.getSortProductbyPrice ~ res:",
        res
      );
      setActiveBtnLowToHigh(true);
      setActiveBtnHighToLow(false);
      setProducts(res.rows);
    });
  };
  const handleActiveBTNLatestCreationDate = () => {
    setActiveBtnLatestCreationDate(!activeBtnLatestCreationDate);
    productController
      .getSortProductbyDateCreate("desc", idCate)
      .then((res: any) => {
        setProducts(res.rows);
      });
  };

  useEffect(() => {
    getData();
    getSearchDataName();
  }, []);

  const getData = () => {
    productController.getList("", idCate).then((res: any) => {
      console.log(res);
      setProducts(res.rows);
    });
  };
  useEffect(() => {
    handleFilter(debouncedInputValue);
  }, [debouncedInputValue]);

  const handleFilter = async (debouncedInputValue: any) => {
    console.log(debouncedInputValue);

    await productController
      .getFilterProductWithinRange(
        debouncedInputValue[0],
        debouncedInputValue[1],
        idCate
      )
      .then((res: any) => {
        setProducts(res.rows);
      });
  };
  function handleSliderChange(value: [number, number]): void {
    console.log("value", value);
    setSliderValues(value);
  }

  const getSearchDataName = () => {
    productController
      .getSearchAndPaginationProduct(keywordSearch.slice(13).toString())
      .then((res: any) => {
        console.log(res);
        setProducts(res.rows);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <body className="body-filter container mx-auto">
        <div className="grid grid-cols-4 max-2xl:grid-cols-1">
          <div className="col-span-1 max-2xl:hidden">
            <SitebarFilter
              value={sliderValues}
              onSliderChange={handleSliderChange}
            />
          </div>
          {/* content-right-filter */}
          <div className="content-right-filter mt-[34px] p-4 col-span-3 max-2xl:col-span-1 max-lg:mt-0 max-lg:p-0">
            <div className="max-lg:hidden">
              <h2 className="txt-filter font-bold text-[#1A1A1A] text-3xl max-xl:text-2xl max-lg:text-xl">
                THƯƠNG HIỆU NỔI TIẾNG:
              </h2>

              {/* thuong hieu noi tieng */}
              <div className="flex  w-[100%] justify-start gap-10 mt-[34px] max-2xl:justify-around max-lg:hidden">
                <div
                  className="square border border-[#FFAAAF] cursor-pointer px-14 pt-[15px] max-2xl:px-[66px] max-2xl:py-[25px]
              max-xl:px-14 max-xl:my-auto"
                >
                  <img
                    className="max-2xl:w-[150px] max-xl:w-[180px]"
                    src="https://www.freepnglogos.com/uploads/starbucks-logo-png-25.png"
                    width="90"
                    alt="starbucks logo png"
                  />
                </div>
                <div
                  className="square border border-[#FFAAAF] px-14 py-[10px] cursor-pointer max-2xl:px-[70px] max-2xl:py-[25px]
              max-xl:px-16 max-xl:my-auto"
                >
                  <img
                    className="max-2xl:w-[130px] max-xl:w-[160px]"
                    src={Images.unilever}
                    width="90"
                    alt="adidas logo png white images"
                  />
                </div>
                <div
                  className="square border border-[#FFAAAF] px-12 pt-[14px]  cursor-pointer max-2xl:px-2 max-2xl:py-[19px]
               max-xl:px-3 max-xl:my-auto"
                >
                  <img
                    className="max-2xl:w-[250px] max-xl:w-[310px]"
                    src={Images.Puma}
                    width="130"
                    alt="adidas logo png white images"
                  />
                </div>
                <div className="square border border-[#FFAAAF] px-14 pt-[29px]  cursor-pointer ">
                  <img
                    className="max-2xl:w-[180px] max-xl:w-[210px]"
                    src="https://www.freepnglogos.com/uploads/adidas-logo-png-white-images-11.png"
                    width="100"
                    alt="adidas logo png white images"
                  />
                </div>
              </div>
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
            {/* banner filter */}
            <div className="banner-filter max-w-[970px] my-5 max-2xl:max-w-[1150px] max-2xl:mx-auto">
              <SlidesFilter />
            </div>
            <div>
              <p>KẾT QUẢ TÌM KIẾM VỚI: {keywordSearch.slice(13)}</p>
            </div>

            <div className="flex flex-wrap gap-4 ml-[37px] max-2xl:ml-0 max-2xl:flex-wrap max-lg:gap-4">
              {products?.map((items) => {
                return <Filter product={items} />;
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
