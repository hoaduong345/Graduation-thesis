import { IonIcon } from "@ionic/react";
import { download, generateCsv } from "export-to-csv"; //Xuat excel
import { ChangeEvent, useEffect, useState } from "react";
import ResponsivePagination from "react-responsive-pagination";
import { toast } from "react-toastify";
import Search from "../../../../Assets/TSX/Search";
import { productController } from "../../../../Controllers/ProductsController";
import { csvConfig } from "../../../../Helper/Export/Excel";
import Container from "../../../../components/container/Container";
import useDebounce from "../../../../useDebounceHook/useDebounce";
import Download from "../Assets/TSX/Download";
import Filter from "../Assets/TSX/Filter";
import PlusSquare from "../Assets/TSX/PlusSquare";
import StatisticalAdmin from "../Assets/TSX/statistical";
import SitebarAdmin from "../Sitebar/Sitebar";
import FilterListproduct from "./Filter/FilterListproduct";
import ListproductMap from "./ListproductMap";
import { Link } from "react-router-dom";

export default function ListproductsAdmin() {
   const [products, setProducts] = useState<any>([]);
   const [productChecked, setProductChecked] = useState<number[]>([]);
   // Xuat excel
   const [search, setSearch] = useState("");
   const debouncedInputValueSearch = useDebounce(search, 400); // Debounce for 300 milliseconds

   // Slider Price SiteBarFilterPages
   const [sliderPriceValues, setSliderPriceValues] = useState<[number, number]>(
      [0, 10000000]
   );
   const debouncedInputValuePrice = useDebounce(sliderPriceValues, 400); // Debounce for 300 milliseconds

   const [sliderQuantityValues, setSliderQuantityValues] = useState<
      [number, number]
   >([0, 10000]);
   const debouncedInputValueQuantity = useDebounce(sliderQuantityValues, 400); // Debounce for 300 milliseconds

   const [sliderPurchaseValues, setSliderPurchaseValues] = useState<
      [number, number]
   >([0, 10000]);
   const debouncedInputValuePurchase = useDebounce(sliderPurchaseValues, 400); // Debounce for 300 milliseconds
   const [rating, setRating] = useState(1);
   const [inStock, setinStock] = useState<any>(false);
   const [soldOut, setSoldOut] = useState<any>(false);
   const [showAllProducts, setShowAllProducts] = useState(false);

   // pagination
   const [currentPage, setCurrentPage] = useState<number>(1);

   useEffect(() => {
      productController
         .getSearchAndPaginationProduct(search, currentPage, 2)
         .then((res) => {
            setProducts(res);
         });
   }, [search, currentPage]);

   useEffect(() => {
      getData(debouncedInputValueSearch);
   }, [debouncedInputValueSearch]);

   const getData = (value: any) => {
      productController
         .getSearchAndPaginationProduct(value.toString(), currentPage, 2)
         .then((res: any) => {
            setProducts(res);
         });
   };

   const handleRemove = async (id: number) => {
      await productController
         .remove(id)
         .then((_) => {
            toast.success("Xóa thành công !");
            getData(debouncedInputValueSearch);
         })
         .catch(() => {
            toast.error("Xóa thất bại !");
         });
   };

   const [open, setOpen] = useState(false);
   const openModal = () => {
      const modal = document.getElementById(
         "my_modal_3"
      ) as HTMLDialogElement | null;
      if (modal) {
         modal.showModal();
         setOpen(!open);
      }
   };
   const closeModal = () => {
      const modal = document.getElementById(
         "my_modal_3"
      ) as HTMLDialogElement | null;
      if (modal) {
         modal.close();
      }
   };
   // console.log(products.rows);

   const onChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
   };

   const [isShown, setIsShown] = useState(false);

   const handleClick = () => {
      setIsShown((current) => !current);
   };

   // Slider Price SiteBarFilterPages and Slider Quantity SiteBarFilterPages
   useEffect(() => {
      handleFilter(
         debouncedInputValuePrice,
         debouncedInputValueQuantity,
         debouncedInputValuePurchase
      );
   }, [
      debouncedInputValuePrice,
      debouncedInputValueQuantity,
      debouncedInputValuePurchase,
   ]);
   const handleFilter = async (
      priceRange: any,
      quantityRange: any,
      purchase: any
   ) => {
      await productController
         .getFilterProductbyPriceAndQuantityAndPurchaseWithinRangePagination(
            priceRange[0],
            priceRange[1],
            currentPage,
            2,
            quantityRange[0],
            quantityRange[1],
            purchase[0],
            purchase[1]
         )
         .then((res: any) => {
            setProducts(res);
         });
   };

   const handleQuantityRangeChange = (quantity: [number, number]) => {
      setSliderQuantityValues(quantity);
      console.log("Quantity Range:", quantity);
   };

   const handlePriceRangeChange = (price: [number, number]) => {
      setSliderPriceValues(price);
      console.log("price Range:", price);
   };

   const handlePurchaseRangeChange = (purchase: [number, number]) => {
      setSliderPurchaseValues(purchase);
      console.log("price Range:", purchase);
   };
   // Hàm gọi API để lấy tất cả sản phẩm
   // const getProductAll = async () => {
   //    await productController
   //       .getSearchAndPaginationProduct("", currentPage, 2)
   //       .then((res) => {
   //          setProducts(res);
   //       })
   //       .catch((err) => console.log(err));
   // };
   // useEffect(() => {
   //    getProductAll();
   // }, []);
   // check con hang API
   const handleClickinStock = () => {
      setinStock(!inStock); // Đảo ngược giá trị của biến inStock
      if (!inStock) {
         checkedinStock();
         setSoldOut(false);
         setShowAllProducts(false); // Đặt hiển thị tất cả sản phẩm thành false
      } else {
         getData(debouncedInputValueSearch);
         setShowAllProducts(true); // Đặt hiển thị tất cả sản phẩm thành true
      }
   };
   const checkedinStock = async () => {
      await productController
         .getProductInStockAndSoldOut("inStock")
         .then((res) => {
            setProducts(res);
            console.log("🚀 ~ file: Listproducts.tsx:197 ~ .then ~ res:", res);
         })
         .catch((err) => console.log(err));
   };
   const handleClickSoldOut = () => {
      setSoldOut(!soldOut); // Đảo ngược giá trị của biến soldOut
      if (!soldOut) {
         checkedSoldOut();
         setinStock(false);
         setShowAllProducts(false); // Đặt hiển thị tất cả sản phẩm thành false
      } else {
         getData(debouncedInputValueSearch);
         setShowAllProducts(true); // Đặt hiển thị tất cả sản phẩm thành true
      }
   };
   // check het hang API
   const checkedSoldOut = async () => {
      await productController
         .getProductInStockAndSoldOut("soldOut")
         .then((res) => {
            setProducts(res);
            console.log("🚀 ~ file: Listproducts.tsx:197 ~ .then ~ res:", res);
         })
         .catch((err) => console.log(err));
   };

   var checkAll: boolean =
      !!products.rows?.length &&
      productChecked.length === products.rows?.length;

   const handleChecked = (checked: boolean, id: number) => {
      if (checked) {
         setProductChecked((prev) => [...prev, id]);
      } else {
         let cloneProduct = [...productChecked];
         let products = cloneProduct.filter((e) => {
            return e !== id;
         });
         setProductChecked(products);
      }
   };

   const checked = (id: number) => {
      const _check = productChecked.findIndex((el) => el == id);
      return _check !== -1;
   };

   const handleCheckedAll = (checkedAll: boolean) => {
      if (checkedAll) {
         if (products.rows) {
            setProductChecked(products.rows);
            products?.row?.map((ele: any) => {
               checked(ele.id);
            });
         }
      } else {
         setProductChecked([]);
      }
   };

   const handleRatingChange= (rate: any) => {
      setRating(rate);
      console.log("Rating111111:", rate);
      getProductsWhereRating(rate);
   };

   const getProductsWhereRating = (rate:any) => {
      productController
        .getProductWhereRatting(rate)
        .then((res: any) => {
          console.log("Ratting fillter" + JSON.stringify(res.rows));
          setProducts(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
   return (
      <>
         <Container>
            <div
               className="float-right cursor-pointer max-[1920px]:invisible max-2xl:visible"
               onClick={() => openModal()}
            >
               <IonIcon className="text-[2rem]" name={"menu"}></IonIcon>
            </div>
            <div className="grid grid-cols-5">
               <div className={`col-span-1`}>
                  {/* You can open the modal using document.getElementById('ID').showModal() method */}
                  <dialog id="my_modal_3" className="max-2xl:modal ">
                     <div className="relative">
                        <button
                           className="btn btn-sm btn-circle btn-ghost absolute right-2 top-[120px]"
                           onClick={closeModal}
                        >
                           ✕
                        </button>
                        <SitebarAdmin />
                     </div>
                  </dialog>
                  <div className="max-2xl:hidden">
                     <SitebarAdmin />
                  </div>
               </div>
               <div className="content-right-filter mt-[34px] col-span-4 max-2xl:col-span-5 ">
                  {/* h2 */}
                  <div>
                     <h2 className="txt-filter font-bold text-[#1A1A1A] text-3xl max-2xl:text-2xl">
                        DANH SÁCH SẢN PHẨM
                     </h2>
                  </div>
                  {/* end h2 */}
                  <div
                     className="grid gap-4 grid-cols-9 mt-12
            max-lg:grid-cols-5 max-lg:gap-0 max-[885px]:grid-cols-12
            "
                  >
                     <div
                        className="col-span-2
              max-lg:col-span-1 
              "
                     >
                        <div
                           className="flex items-center w-[196px] rounded-md h-[46px] bg-[#EA4B48] justify-evenly cursor-pointer
                max-xl:w-[156px]
                max-lg:w-[130px]
                max-xl:h-[40px]
                max-[885px]:h-[35px]
                max-[885px]:w-[40px]"
                        >
                           <PlusSquare />
                           <Link to={"/admin/Addproductspage"}>
                              <button
                                 className="text-center text-base font-bold text-white 
                              max-xl:text-sm max-lg:text-xs max-[885px]:hidden
                              "
                              >
                                 Thêm sản phẩm
                              </button>
                           </Link>
                        </div>
                     </div>

                     <div
                        className="flex gap-3 col-span-7 justify-around ml-20 max-2xl:pl-24
               max-xl:items-center
               max-xl:pl-0
               max-xl:ml-5
               max-lg:col-span-4
               max-[885px]:col-span-11
               max-lg:justify-start
               "
                     >
                        {/* input */}
                        <div className="items-center flex">
                           <div
                              className="Search-input-headerCenter items-center flex
                   py-[3px] px-[6px] border-[1px] border-[#FFAAAF] rounded-md
                   max-2xl:w-[280px]
                   max-xl:h-[40px]
                   max-[885px]:h-[35px]
                   max-xl:w-[250px]
                   max-lg:w-[155px]
                   max-lg:px-0
                   max-[885px]:w-[203px]
                   "
                           >
                              <div className="mb-2  ">
                                 <Search />
                              </div>
                              <input
                                 className=" rounded-lg focus:outline-none text-lg pl-3
                   max-2xl:pr-3
                   max-xl:text-sm
                   max-lg:text-xs
                   max-lg:w-[50%]"
                                 placeholder="Tìm kiếm..."
                                 onChange={onChangeSearchInput}
                              />
                           </div>
                        </div>
                        <div className="flex gap-3">
                           <div>
                              <div
                                 className="flex items-center w-[133px] rounded-md h-[46px] hover:bg-[#FFEAE9]
                   transition duration-150 border-[#FFAAAF] border-[1px] justify-evenly cursor-pointer
                   max-xl:w-[125px]
                   max-xl:h-[40px]
                   max-[885px]:h-[35px]
                   max-[885px]:w-[102px]
                   "
                              >
                                 <StatisticalAdmin />
                                 <Link to={"/admin/statisticsPage"}>
                                    <button
                                       className="text-center text-base font-bold text-[#EA4B48] 
                                    max-xl:font-medium
                                    max-lg:text-xs
                                    "
                                    >
                                       Thống kê
                                    </button>
                                 </Link>
                              </div>
                           </div>

                           <div>
                              <div
                                 className="flex items-center w-[133px] rounded-md h-[46px] hover:bg-[#FFEAE9]
                   transition duration-150 border-[#FFAAAF] border-[1px] justify-evenly cursor-pointer
                   max-xl:w-[125px]
                   max-xl:h-[40px]
                   max-[885px]:h-[35px]
                   max-[885px]:w-[102px]
                   "
                              >
                                 <Download />
                                 <button
                                    className="text-center text-base font-bold text-[#EA4B48]
                    max-xl:font-medium
                    max-lg:text-xs
                    "
                                    onClick={() => {
                                       const csv = generateCsv(csvConfig)(
                                          products.rows
                                       ); // Xuat excel
                                       download(csvConfig)(csv);
                                    }}
                                 >
                                    {" "}
                                    Xuất excel
                                 </button>
                              </div>
                           </div>

                           <div>
                              <div
                                 className={
                                    !isShown
                                       ? `flex items-center w-[112px] rounded-md h-[46px] hover:bg-[#FFEAE9]
                   transition duration-150 border-[#FFAAAF] border-[1px] justify-evenly cursor-pointer
                   max-xl:w-[125px]
                   max-xl:h-[40px]
                   max-[885px]:h-[35px]
                   text-center text-base font-bold text-[#EA4B48] 
                    max-xl:font-medium max-lg:text-xs max-[885px]:w-[102px]`
                                       : `flex items-center w-[112px] rounded-md h-[46px] hover:bg-[#ff776f]
                    transition duration-150 border-[#FFAAAF] border-[1px] justify-evenly cursor-pointer
                    max-xl:w-[125px]
                    max-xl:h-[40px]
                    max-[885px]:h-[35px]
                    bg-[#EA4B48]
                    text-center text-base font-bold text-[#FFFFFF] 
                     max-xl:font-medium max-lg:text-xs max-[885px]:w-[102px]`
                                 }
                                 onClick={() => handleClick()}
                              >
                                 <div
                                    className={
                                       !isShown
                                          ? `stroke-[#EA4B48]`
                                          : `stroke-white `
                                    }
                                 >
                                    <Filter />
                                 </div>
                                 <button>Bộ lọc</button>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  {isShown && (
                     <FilterListproduct
                        valuePurchase={sliderPurchaseValues}
                        valueQuantity={sliderQuantityValues}
                        valuePrice={sliderPriceValues}
                        valueinStock={inStock}
                        valueSoldOut={soldOut}
                        onRateChange={handleRatingChange}
                        onSoldOut={handleClickSoldOut}
                        oninStock={handleClickinStock}
                        onQuantityRangeChange={handleQuantityRangeChange}
                        onPriceRangeChange={handlePriceRangeChange}
                        onPurchaseRangeChange={handlePurchaseRangeChange} />
                  )}

                  <div className="grid grid-cols-10 mt-6 items-center">
                     <div className="col-span-1 text-center">
                        <input
                           id="default-checkbox"
                           type="checkbox"
                           className="checkbox checkbox-sm items-center"
                           checked={checkAll}
                           onChange={(element) =>
                              handleCheckedAll(element.target.checked)
                           }
                        />
                     </div>
                     <div className="col-span-3 text-center max-lg:w-[40%]">
                        <h3
                           className="text-[#1A1A1A] text-sm font-semibold leading-4
                max-xl:text-[13px]
                max-lg:w-[45%]
                max-lg:text-[10px]
                "
                        >
                           THÔNG TIN
                        </h3>
                     </div>
                     <div className="col-span-2 flex justify-center">
                        <h3
                           className="text-[#1A1A1A] text-sm font-semibold leading-4
                max-xl:text-[13px]
                max-lg:w-[35%]
                max-lg:text-[10px]
                "
                        >
                           GIÁ
                        </h3>
                     </div>

                     <div className="col-span-1">
                        <h3
                           className="flex justify-center text-[#1A1A1A] text-sm font-semibold leading-4 
                max-xl:text-[13px]
                max-lg:invisible
                "
                        >
                           SỐ LƯỢNG
                        </h3>
                     </div>

                     <div className="col-span-1">
                        <h3
                           className="flex justify-center text-[#1A1A1A] text-sm font-semibold leading-4
                max-xl:text-[13px]
                max-lg:text-[10px]
                max-[940px]:truncate
                "
                        >
                           KHO
                        </h3>
                     </div>

                     <div className="col-span-1">
                        <h3
                           className="flex justify-center text-[#1A1A1A] text-sm font-semibold leading-4
                max-xl:text-[13px]
                max-lg:invisible
                "
                        >
                           ĐÁNH GIÁ
                        </h3>
                     </div>

                     <div className="col-span-1"></div>
                  </div>
                  <div className="mb-6">
                     {products?.rows?.length > 0 ? (
                        products?.rows?.map((items: any) => {
                           return (
                              <>
                                 <ListproductMap
                                    soldOut={soldOut}
                                    HandleXoa={handleRemove}
                                    products={items}
                                    handleChecked={(
                                       checked: boolean,
                                       id: number
                                    ) => handleChecked(checked, id)}
                                    checked={(id: number) => checked(id)}
                                 />
                              </>
                           );
                        })
                     ) : (
                        <>
                           <p>gio hang trong</p>
                        </>
                     )}
                  </div>
                  <ResponsivePagination
                     current={currentPage}
                     total={products?.totalPage}
                     onPageChange={setCurrentPage}
                     maxWidth={500}
                  />
                  {/* <Pagination postPer={postPerPage} totalPosts={products.length} /> */}
                  {/* <div className="pagination">
                     <div className="flex">
                        <Button
                           variant="text"
                           // className="flex items-center gap-2"
                           className={`${
                              currentPage == 1
                                 ? `hidden`
                                 : `flex items-center gap-2`
                           }`}
                           onClick={prev}
                        >
                           <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />{" "}
                           Previous
                        </Button>
                        {[...new Array(products?.totalPage)].map(
                           (item, index) => {
                              const page = index + 1;
                              console.log(item);
                              return (
                                 <>
                                    <IconButton
                                       className="bg-none"
                                       {...getItemProps(page)}
                                    >
                                       <p className="ml-[-2px] text-sm">
                                          {page}
                                       </p>
                                    </IconButton>
                                 </>
                              );
                           }
                        )}
                        <Button
                           variant="text"
                           className={`${
                              currentPage == products?.totalPage
                                 ? "hidden"
                                 : "flex items-center gap-2"
                           }`}
                           onClick={next}
                        >
                           Next
                           <ArrowRightIcon
                              strokeWidth={2}
                              className="h-4 w-4"
                           />
                        </Button>
                     </div>
                  </div> */}
               </div>
            </div>
         </Container>
      </>
   );
}
