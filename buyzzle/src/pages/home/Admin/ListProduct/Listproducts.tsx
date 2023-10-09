import { IonIcon } from "@ionic/react";
import { IconButton } from "@material-tailwind/react";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Search from "../../../../Assets/TSX/Search";
import { imagesController } from "../../../../Controllers/ImagesController";
import { productController } from "../../../../Controllers/ProductsController";
import Container from "../../../../components/container/Container";
import useDebounce from "../../../../useDebounceHook/useDebounce";
import Download from "../Assets/TSX/Download";
import Filter from "../Assets/TSX/Filter";
import PlusSquare from "../Assets/TSX/PlusSquare";
import StatisticalAdmin from "../Assets/TSX/statistical";
import SitebarAdmin from "../Sitebar/Sitebar";
import ListproductMap from "./ListproductMap";
import { Button } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import FilterListproduct from "./Filter/FilterListproduct";
import EmptyPage from "../../../../Helper/Empty/EmptyPage";
export default function ListproductsAdmin() {
   const [products, setProducts] = useState<any>({});
   const [search, setSearch] = useState("");
   const debouncedInputValue = useDebounce(search, 400); // Debounce for 300 milliseconds
   // pagination
   const [currentPage, setCurrentPage] = useState(1);

   useEffect(() => {
      productController
         .getSearchAndPaginationProduct(search, currentPage, 2)
         .then((res) => {
            setProducts(res);
         });
   }, [search, currentPage]);

   useEffect(() => {
      if (debouncedInputValue) {
         getData(debouncedInputValue);
      }
   }, [debouncedInputValue]);

   const getData = (value: any) => {
      productController
         .getSearchAndPaginationProduct(value.toString(), 1, 2)
         .then((res: any) => {
            console.log(res);
            setProducts(res);
         });
   };

   const handleRemove = async (id: number) => {
      await productController
         .remove(id)
         .then((_) => {
            toast.success("Xóa thành công !");
            getData(debouncedInputValue);
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

   const onChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
   };
   const getItemProps = (index: number) =>
      ({
         variant: currentPage === index ? "filled" : "text",
         color: "gray",
         onClick: () => setCurrentPage(index),
      } as any);
   const next = () => {
      if (currentPage === 999) return;

      setCurrentPage(currentPage + 1);
   };

   const prev = () => {
      if (currentPage === 1) return;

      setCurrentPage(currentPage - 1);
   };

   const [isShown, setIsShown] = useState(false);

   const handleClick = () => {
      setIsShown((current) => !current);
   };
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
                           <button
                              className="text-center text-base font-bold text-white 
                  max-xl:text-sm max-lg:text-xs max-[885px]:hidden
                  "
                           >
                              Thêm sản phẩm
                           </button>
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
                                 <button
                                    className="text-center text-base font-bold text-[#EA4B48] 
                    max-xl:font-medium
                    max-lg:text-xs
                    "
                                 >
                                    Thống kê
                                 </button>
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
                                 >
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

                  {isShown && <FilterListproduct />}

                  <div className="w-[100%] mt-6 items-center flex">
                     <div className="w-[10%] text-center">
                        <input
                           id="default-checkbox"
                           type="checkbox"
                           className="w-4 h-4 accent-[#EA4B48] "
                        />
                     </div>
                     <div className="w-[35%] text-center max-lg:w-[40%]">
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
                     <div className="w-[45%] flex justify-between">
                        <h3
                           className="text-[#1A1A1A] text-sm font-semibold leading-4
                max-xl:text-[13px]
                max-lg:w-[35%]
                max-lg:text-[10px]
                "
                        >
                           SỐ LƯỢNG
                        </h3>
                        <h3
                           className="text-[#1A1A1A] text-sm font-semibold leading-4
                max-xl:text-[13px]
                max-lg:invisible
                "
                        >
                           TÌNH TRẠNG
                        </h3>
                        <h3
                           className="text-[#1A1A1A] text-sm font-semibold leading-4
                max-xl:text-[13px]
                max-lg:text-[10px]
                max-[940px]:truncate
                "
                        >
                           SỐ LƯỢNG ĐÃ BÁN
                        </h3>
                        <h3
                           className="text-[#1A1A1A] text-sm font-semibold leading-4
                max-xl:text-[13px]
                max-lg:invisible
                "
                        >
                           ĐÁNH GIÁ
                        </h3>
                     </div>
                  </div>
                  <div>
                     {products?.rows?.length > 0 ? (
                        products?.rows?.map((items: any) => {
                           return (
                              <>
                                 <ListproductMap
                                    HandleXoa={handleRemove}
                                    products={items}
                                 />
                              </>
                           );
                        })
                     ) : (
                        <>
                           <EmptyPage
                              title="Danh sách sản phẩm trống"
                              button="Thêm Ngay"
                           />
                        </>
                     )}
                  </div>
                  {/* <Pagination postPer={postPerPage} totalPosts={products.length} /> */}
                  <div className="pagination">
                     <div className="flex">
                        <Button
                           variant="text"
                           className="flex items-center gap-2"
                           onClick={prev}
                        >
                           <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />{" "}
                           Previous
                        </Button>
                        {[...new Array(products.totalPage)].map(
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
                           className="flex items-center gap-2"
                           onClick={next}
                        >
                           Next
                           <ArrowRightIcon
                              strokeWidth={2}
                              className="h-4 w-4"
                           />
                        </Button>
                     </div>
                  </div>
               </div>
            </div>
         </Container>
      </>
   );
}
