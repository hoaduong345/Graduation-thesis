import { useEffect, useState } from "react";
import { createSearchParams, useSearchParams } from "react-router-dom";
import BookOff from "../../../../assets/TSX/BookOff";
import FoodLogo from "../../../../assets/TSX/FoodLogo";
import FoodLogoo from "../../../../assets/TSX/FoodLogoo";
import MangoLogo from "../../../../assets/TSX/MangoLogo";
import Series from "../../../../assets/TSX/Series";
import StepsLogo from "../../../../assets/TSX/StepsLogo";
import { categoryController } from "../../../../controllers/CategoryController";
import { productController } from "../../../../controllers/ProductsController";
import { roundedNumber } from "../../../../helper/Format";
import { subCate } from "../../../../model/CategoryModel";
import { Rate, Row } from "../../../../model/ProductModel";
import SitebarFilter from "../../../../components/Sitebar/SitebarFilter";
import Container from "../../../../components/container/Container";
import SlidesFilter from "../../../../components/home/components/slides/SlidesFilter/SlidesFilter";
import useDebounce from "../../../../useDebounceHook/useDebounce";
import "../../../css/filter.css";
import Filter from "./Filter";
import useThrottle from "@rooks/use-throttle";
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
  soldcount: number; // đã bán
  quantity: number;
  description: string;
  status: string;
  createdAt: string;
  date: string;
  fK_category: Cate;
  ProductImage: ImgOfProduct[];
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
  const [products, setProducts] = useState<Row[]>([]);
  const [stars, setStars] = useState<Rate>();
  const [starsnumber, setStarsnumber] = useState(0);
  // Button FIlterPage
  const [activeBtnLowToHigh, setActiveBtnLowToHigh] = useState(true);
  const [activeBtnHighToLow, setActiveBtnHighToLow] = useState(true);
  const [activeBtnLatestCreationDate, setActiveBtnLatestCreationDate] =
    useState(true);

  // Slider Price SiteBarFilterPages
  const [sliderValues, setSliderValues] = useState<[number, number]>([
    0, 10000000,
  ]);
  const debouncedInputValue = useDebounce(sliderValues, 700); // Debounce for 300 milliseconds
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValue = searchParams.get("keyword");
  console.log(
    "🚀 ~ file: FiltersPage.tsx:88 ~ FiltersPage ~ searchValue:",
    searchValue
  );
  const nameCateValue = searchParams.get("nameCate");
  console.log(
    "🚀 ~ file: FiltersPage.tsx:90 ~ FiltersPage ~ nameCateValue:",
    nameCateValue
  );

  const urlSliderValues = searchParams.get("sliderValues");

  const [subcate, setSubcate] = useState<subCate[]>([]);

  const getCate = (index: number) => {
    categoryController.getCateFilter(nameCateValue?.toString()).then((res) => {
      setSubcate(res);
      console.log(index);
      setProducts(res[index].productId);
    });
  };
  useEffect(() => {
    getCate(NaN);
  }, []);

  useEffect(() => {
    // Kiểm tra nếu giá trị slider thay đổi thì mới cập nhật URL
    if (urlSliderValues) {
      const [min, max] = urlSliderValues.split(",").map(Number);
      setSliderValues([min, max]);
    }
  }, [urlSliderValues]);

  useEffect(() => {
    if (nameCateValue != undefined) {
      setSearchParams(
        createSearchParams({
          nameCate: nameCateValue?.toString()!,
          minPrice: sliderValues[0].toString(),
          maxPrice: sliderValues[1].toString(),
        })
      );
    }
  }, [sliderValues]);

  // useEffect(() => {
  //   getProductInNameCate();
  // }, [nameCateValue?.toString()]);

  // const getProductInNameCate = () => {
  //   productController.getList(nameCateValue?.toString()!).then((res: any) => {
  //     setStars(res.data);
  //     setProducts(res.rows);
  //   });
  // };

  // Điều này giả định rằng bạn có một hàm hoặc cách nào đó để lấy giá trị `averageRating` từ `first`
  useEffect(() => {
    if (stars) {
      setStarsnumber(roundedNumber(stars.averageRating));
    }
  }, [stars]);

  const handleActiveBTNLowToHighClick = () => {
    const filterOptions = {
      key: "asc",
      categoryName: nameCateValue?.toString(),
      keyword: searchValue?.toString(),
    };
    productController
      .getSortProductbyPriceAndDateCreate(filterOptions)
      .then((res: any) => {
        setActiveBtnLowToHigh(false);
        setActiveBtnHighToLow(true);
        setProducts(res.rows);
      });
  };
  const handleActiveBTNHighToLowClick = () => {
    const filterOptions = {
      key: "desc",
      categoryName: nameCateValue?.toString(),
      keyword: searchValue?.toString(),
    };

    productController
      .getSortProductbyPriceAndDateCreate(filterOptions)
      .then((res: any) => {
        setActiveBtnLowToHigh(true);
        setActiveBtnHighToLow(false);
        setProducts(res.rows);
      });
  };
  const handleActiveBTNLatestCreationDate = () => {
    setActiveBtnLatestCreationDate(!activeBtnLatestCreationDate);
    const filterOptions = {
      key: "desc",
      categoryName: nameCateValue?.toString(),
      keyword: searchValue?.toString(),
    };
    productController
      .getSortProductbyPriceAndDateCreate(filterOptions)
      .then((res: any) => {
        setProducts(res.rows);
      });
  };
  const getProductSearch = () => {
    productController
      .getSearchAndPaginationProduct(searchValue?.toString())
      .then((res: any) => {
        setProducts(res.rows);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (searchValue?.toString()) {
      getProductSearch();
    }
  }, [searchValue?.toString()]);

  // Slider Price SiteBarFilterPages
  useEffect(() => {
    if (debouncedInputValue) {
      handleFilter(debouncedInputValue);
    }
  }, [debouncedInputValue]);

  const handleFilter = async (debouncedInputValue: any) => {
    const filterOptions = {
      minPrice: debouncedInputValue[0],
      maxPrice: debouncedInputValue[1],
      categoryName: nameCateValue?.toString(),
      keyword: searchValue?.toString(),
    };

    await productController
      .getFilterProductWithinRangeIDCategory(filterOptions)
      .then((res: any) => {
        setStars(res.data);
        setProducts(res.rows);
      });
  };
  function handleSliderChange(price: [number, number]): void {
    setSliderValues(price);
  }

  const getProductsWhereRating = (rate: any) => {
    productController
      .getProductWhereRatting(rate)
      .then((res: any) => {
        setProducts(res.rows);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [btnHighToLowThrottle] = useThrottle(
    handleActiveBTNHighToLowClick,
    2000
  );
  const [btnLowToHighThrottle] = useThrottle(
    handleActiveBTNLowToHighClick,
    2000
  );
  const [btnLatestCreationDateThrottle] = useThrottle(
    handleActiveBTNLatestCreationDate,
    2000
  );

  return (
    <Container>
      <body className="body-filter container mx-auto">
        <div className="grid grid-cols-4 max-2xl:grid-cols-1">
          <div className="col-span-1 max-2xl:hidden">
            <SitebarFilter
              nameCate={nameCateValue?.toString()}
              valuePrice={sliderValues}
              onQuantityRangeChange={() => console.log("")}
              onPriceRangeChange={(e: any) => handleSliderChange(e)}
              onRateChange={(e: any) => getProductsWhereRating(e)}
              onPurchaseRangeChange={function (value: [number, number]): void {
                throw new Error("Function not implemented.");
              }}
              subcate={subcate}
              setProductSubcate={(index) => getCate(index)}
            />
          </div>
          {/* content-right-filter */}
          <div className="content-right-filter mt-[34px] p-4 col-span-3 max-2xl:col-span-1 max-lg:mt-0 max-lg:p-0">
            <div className="max-lg:hidden">
              {/* <h2 className="txt-filter font-bold text-[#1A1A1A] text-3xl max-xl:text-2xl max-lg:text-xl">
                THƯƠNG HIỆU NỔI TIẾNG:
              </h2> */}
              <div className="banner-filter max-w-[970px]  max-2xl:max-w-[1150px] max-2xl:mx-auto">
                <SlidesFilter />
              </div>
              <div className="bg-[#FFEAE9] h-[60px] rounded-[6px] ">
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
                      onClick={btnLatestCreationDateThrottle}
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
                          ? `transition duration-150 outline outline-2 outline-[#EA4B48] bg-white hover:bg-[#FFAAAF] font-medium
                    rounded-[6px] text-sm py-[6px] px-[13px] hover:text-[#FFFFFF]
                    max-2xl:py-[5px] max-2xl:text-base
                    max-xl:py-[6px] max-xl:px-[12px] max-xl:text-sm`
                          : `transition duration-150 outline outline-2 outline-[#EA4B48] bg-[#FFAAAF] hover:bg-[#FFAAAF] font-medium
                    rounded-[6px] text-sm py-[6px] px-[13px] hover:text-[#FFFFFF] text-white
                    max-2xl:py-[5px] max-2xl:text-base
                    max-xl:py-[6px] max-xl:px-[12px] max-xl:text-sm `
                      }
                      onClick={btnLowToHighThrottle}
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
                      onClick={btnHighToLowThrottle}
                    >
                      Cao Nhất
                    </button>
                  </div>
                </div>
              </div>
              {nameCateValue ? (
                <div className="flex gap-2 mt-3 items-center">
                  <p className="text-lg font-bold">Danh mục: </p>
                  <p className="text-base font-medium text-[#4C4C4C]">
                    ' {nameCateValue} '
                  </p>
                </div>
              ) : (
                <div className="flex gap-2 mt-3 items-center">
                  <p className="text-lg font-bold">Tìm kiếm với từ khóa: </p>
                  <p className="text-base font-medium text-[#4C4C4C]">
                    ' {searchValue} '
                  </p>
                </div>
              )}
              <div className="flex flex-wrap gap-4 ml-[37px] mt-5 max-2xl:ml-0 max-2xl:flex-wrap max-lg:gap-4">
                {products?.map((items) => {
                  return <Filter starsnumber={starsnumber} product={items} />;
                })}
              </div>
            </div>
            {/* content-right-filter-end */}
          </div>
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
