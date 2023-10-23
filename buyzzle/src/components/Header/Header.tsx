/* eslint-disable no-var */

import {
   ChangeEvent,
   KeyboardEvent,
   useContext,
   useEffect,
   useState,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import Bell from "../../Assets/TSX/Bell";
import Chevron_down from "../../Assets/TSX/Chevron-down";
import Ellips from "../../Assets/TSX/Ellips";
import Globe from "../../Assets/TSX/Globe";
import LogoWeb from "../../Assets/TSX/LogoWeb";
import Map from "../../Assets/TSX/Map";
import Search from "../../Assets/TSX/Search";
import Shoppingcart from "../../Assets/TSX/Shopping-cart";
import Headphones from "../../Assets/TSX/headphones";
import { productController } from "../../Controllers/ProductsController";
import { ThemeContext } from "../../hooks/Context/ThemeContextProvider";
import { Products } from "../../pages/home/User/FilterPage/FiltersPage";
import useDebounce from "../../useDebounceHook/useDebounce";
import Container from "../container/Container";
import { userController } from "../../Controllers/UserController";

export default function Header() {
   const [showSuggestions, setShowSuggestions] = useState(false);
   const navigate = useNavigate();
   const [text, setText] = useState("");
   const dataInputHeaderSearch = useContext(ThemeContext);
   const dataSearchBodyIndexFromHeader = useContext(ThemeContext);
   const [productSearch, setProductSearch] = useState<Products[]>([]);
   const debouncedInputValue = useDebounce(dataSearchBodyIndexFromHeader, 500);
   const [isSearch, setIsSearch] = useState(false);

   const user = localStorage.getItem("user");
   const [checkLogin, setCheckLogin] = useState<boolean>(false);

   var username;
   const [name, setName] = useState("");
   const [img, setImg] = useState("");
   useEffect(() => {
      const user = localStorage.getItem("user");
      if (user != null) {
         const userData = JSON.parse(user);
         const username = userData.username;
         console.log("USERNAME: " + username);
         userController.getUserWhereUsername(username).then((res) => {
            // setEditUser(res)
            setName(res.name);
            setCheckLogin(true);
            const UserImageArray = JSON.stringify(res.UserImage);
            const urlTaker = JSON.parse(UserImageArray);
            setImg(urlTaker[0].url);
            console.log("ID: " + img);
         });
      } else {
         console.log("Chua Dang Nhap Dung");
      }
   }, []);

   if (user != null) {
      username = JSON.parse(user).username;
      // img = JSON.parse(user).img;
      // name = JSON.parse(user).name;

      // console.log(name.substring(0, 1));
      // console.log("USER: " + name, img);
   } else {
      console.log("Chua dang nhap");
   }
   const href = `/userprofilepage/${username}`;

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      dataInputHeaderSearch?.onChange(e);
      setShowSuggestions(true);
      setText(e.target.value);
   };
   // Function to hide suggestions
   const hideSuggestions = () => {
      setShowSuggestions(false);
   };
   const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key == "Enter") {
         navigate(`/FiltersPage/${text}`);
         setShowSuggestions(false);
      }
   };
   const getSearhvalue = (value: any) => {
      productController
         .getAllProductsSearch(debouncedInputValue?.data.toString())
         .then((res: any) => {
            setProductSearch(res.rows);
         });
   };

   useEffect(() => {
      getSearhvalue(debouncedInputValue);
      if (dataSearchBodyIndexFromHeader?.data != "") {
         productController
            .getAllProductsSearch(
               dataSearchBodyIndexFromHeader?.data.toString()
            )
            .then((res: any) => {
               setProductSearch(res.rows);
            });
      }
   }, [debouncedInputValue]);
   return (
      <>
         <header className="Header">
            <Container>
               <div className="Header-top bg-white">
                  <div className="container mx-auto">
                     <div className="Header-top-content flex justify-between max-[426px]:text-[8px]">
                        <div className="content-left flex py-2">
                           <Map />
                           <span className="text-[#4C4C4C] pl-2">
                              Buon Ma Thuot
                           </span>
                        </div>

                        <div className="content-right flex items-center gap-2  ">
                           <div className="content-left flex items-center">
                              <Globe />
                              <span className="text-[#4C4C4C] pl-2">EN</span>
                           </div>
                           <div className="content-left flex py-2 gap-2 ">
                              <div className="pt-1">
                                 <Chevron_down />
                              </div>
                              <div className="border-[1px] border-black " />
                              <div className="flex items-center pl-3">
                                 <Bell />
                                 <span className="text-[#4C4C4C] pl-2">
                                    Thong bao
                                 </span>
                              </div>
                              <div className="flex items-center pl-3">
                                 <Headphones />
                                 <span className="text-[#4C4C4C] pl-2">
                                    Ho tro
                                 </span>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </Container>

            <div className="border-2 border-[#E6E6E6]" />
            <Container>
               <div className="Header-center bg-white h-[91px]">
                  <div className="container mx-auto">
                     <div className="flex items-center justify-between">
                        <div className="p-[10px]  max-[426px]:p-[1px]">
                           <Link to="/">
                              <LogoWeb />
                           </Link>
                        </div>
                        {/* input */}
                        <div className="items-center flex flex-1 max-w-[755px] max-2xl:ml-10 max-xl:max-w-[700px] max-xl:ml-5">
                           <div
                              className="Search-input-headerCenter items-center flex w-[90%]
                   py-[6px] px-[6px] border-[2px] border-[#FFAAAF] rounded-lg
                   max-xl:py-[1px]"
                           >
                              <div className="mb-2">
                                 <Search />
                              </div>
                              <input
                                 className=" rounded-lg focus:outline-none text-lg relative pr-7 flex-1 pl-3 max-xl:text-sm
                      max-[426px]:text-[6px]  max-[426px]:p-[0]"
                                 placeholder="Tìm kiếm..."
                                 onKeyDown={handleKeyPress}
                                 onChange={(e) => handleChange(e)}
                                 onBlur={() =>
                                    isSearch ? null : hideSuggestions()
                                 } // Hide suggestions when the input loses focus
                              />
                              {showSuggestions && (
                                 <>
                                    <div className="absolute w-[665px] z-10  bg-white border border-gray-300 rounded mt-2 p-2 top-28">
                                       {/* // tên sản phẩm */}
                                       <div>
                                          <h1 className="text-base font-bold cursor-default p-1 pl-2">
                                             Sản phẩm
                                          </h1>
                                          <div className="grid grid-cols-3 gap-4 py-3 border-dashed border-b-2 solid #E8E8EA w-[98%] mx-auto">
                                             {productSearch
                                                .slice(0, 6)
                                                .map((itemsSearch) => {
                                                   return (
                                                      <>
                                                         <div
                                                            className="flex items-center gap-1 h-12
                                hover:rounded-md duration-200
                                hover:shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
                                                         >
                                                            <div>
                                                               <img
                                                                  src={
                                                                     itemsSearch
                                                                        .ProductImage[0]
                                                                        .url
                                                                  }
                                                                  alt="ProductImage"
                                                                  className="w-14 h-12"
                                                               />
                                                            </div>
                                                            <div
                                                               className="text-base cursor-default p-1 pl-2  font-normal w-full"
                                                               onClick={(e) => {
                                                                  setShowSuggestions(
                                                                     false
                                                                  );

                                                                  navigate(
                                                                     `/Detailproducts/${itemsSearch.id}`
                                                                  );
                                                                  hideSuggestions();
                                                               }}
                                                               onMouseOver={() => {
                                                                  setIsSearch(
                                                                     true
                                                                  );
                                                               }}
                                                               onMouseLeave={() => {
                                                                  setIsSearch(
                                                                     false
                                                                  );
                                                               }}
                                                            >
                                                               <div className="text-[14px] ">
                                                                  {itemsSearch.name &&
                                                                  itemsSearch
                                                                     .name
                                                                     .length >
                                                                     17 ? (
                                                                     `${itemsSearch.name.substring(
                                                                        0,
                                                                        17
                                                                     )}...`
                                                                  ) : itemsSearch.name ? (
                                                                     itemsSearch.name
                                                                  ) : (
                                                                     <p>
                                                                        Không có
                                                                        sản phẩm
                                                                     </p>
                                                                  )}
                                                               </div>
                                                               <p className="text-gray-600 text-xs">
                                                                  SL:{" "}
                                                                  {
                                                                     itemsSearch.quantity
                                                                  }
                                                               </p>
                                                            </div>
                                                         </div>
                                                      </>
                                                   );
                                                })}
                                          </div>
                                       </div>
                                       {/* // danh mục */}
                                       <div>
                                          <h1 className="text-base font-bold cursor-default p-1 pl-2 mt-2">
                                             Từ khóa
                                          </h1>
                                          <p className="text-base cursor-default p-1 pl-2 font-normal">
                                             {text == "" ? "" : `"${text}"`}
                                          </p>
                                          {/* <div className="grid grid-cols-3 gap-4 py-3  w-[98%] mx-auto">
                              {productSearch.slice(0, 6).map((itemsSearch) => {
                                return (
                                  <>
                                    <div
                                      className="flex items-center gap-1 h-12
                                hover:rounded-md duration-200
                                hover:shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
                                    >
                                      <div>
                                        <img
                                          src={itemsSearch.ProductImage[0].url}
                                          alt="ProductImage"
                                          className="w-14 h-12"
                                        />
                                      </div>
                                      <div
                                        className="text-base cursor-default p-1 pl-2  font-normal w-full"
                                        onClick={(e) => {
                                          setShowSuggestions(false);
                                          navigate(
                                            `/Detailproducts/${itemsSearch.id}`
                                          );
                                          hideSuggestions();
                                        }}
                                        onMouseOver={() => {
                                          setIsSearch(true);
                                        }}
                                        onMouseLeave={() => {
                                          setIsSearch(false);
                                        }}
                                      >
                                        <div className="text-[14px] ">
                                          {itemsSearch.name &&
                                          itemsSearch.name.length > 21 ? (
`${itemsSearch.name.substring(
                                              0,
                                              21
                                            )}...`
                                          ) : itemsSearch.name ? (
                                            itemsSearch.name
                                          ) : (
                                            <p>Không có sản phẩm</p>
                                          )}
                                        </div>
                                        <p className="text-gray-600 text-xs">
                                          SL: {itemsSearch.quantity}
                                        </p>
                                      </div>
                                    </div>
                                  </>
                                );
                              })}
                            </div> */}
                                       </div>
                                    </div>
                                 </>
                              )}
                              <div className="flex items-center">
                                 <button
                                    className="btn-search bg-[#FFEAE9] p-[7px] rounded-lg font-bold text-[#1A1A1A] 
                      w-[135px] max-xl:max-w-[70px] max-xl:text-[11px] max-xl:p-[4px] border
                      max-[426px]:text-[6px] max-[426px]:max-w-[40px]  max-[426px]:hidden"
                                 >
                                    Tìm kiếm
                                 </button>
                              </div>
                           </div>
                        </div>
                        {/* <dialog id="my_modal_3" className="max-2xl:modal ">
                  <div className="relative bg-white h-40 w-72">
                    sádsadssadasdsd sádsadssad asdsd sádsadssadasdsds ádsa
                    dssadasdsd
                  </div>
                </dialog> */}

                        <div className="items-center flex relative gap-2">
                           <Link to={"/cart"}>
                              <div className="items-center flex pr-11 max-[769px]:pr-[10px]">
                                 <Shoppingcart />
                                 <div className="absolute">
                                    <Ellips />
                                    <span className="text-white font-bold absolute top-[-21px] ml-[30px] text-xs max-xl:text-[9px] max-xl:absolute max-xl:mr-[100px]">
                                       1
                                    </span>
                                 </div>
                              </div>
                           </Link>
                           <div className="items-center">
                              {checkLogin ? (
                                 <a className=" flex gap-2" href={href}>
                                    <div className="font-medium flex items-center justify-center">
                                       {username}
                                    </div>
                                    {img ? (
                                       <div className="relative">
                                          <img
                                             className="w-10 h-10 rounded-full border-4 "
                                             src={img}
                                             alt=""
                                          />
                                       </div>
                                    ) : (
                                       <div className=" rounded-full border-4 pt-2 pb-2 ps-3.5 pe-3.5  bg-red-500">
                                          <p className="text-1xl text-stone-50">
                                             {name
                                                .substring(0, 1)
                                                .toUpperCase()}
                                          </p>
                                       </div>
                                    )}
                                 </a>
                              ) : (
                                 <div className="flex text-[#1A1A1A] ml-[10px]">
                                    <a href="/login">ĐĂNG NHẬP</a>
                                    <div className="border-[1px] border-[#000000] mx-[20px] " />
                                    <a href="/register">ĐĂNG KÍ</a>
                                 </div>
                              )}
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </Container>

            <div className="Header-bottom bg-[#FFEAE9] h-[60px]">
               <Container>
                  <div className="container mx-auto">
                     <ul className="flex gap-[3%] h-[60px] font-bold text-[#1A1A1A] leading-15 items-center leading-[100%] max-[426px]:text-[9px]">
                        <li>
                           <Link to="/admin/Addproductspage">
                              Thêm sản phẩm Admin
                           </Link>
                        </li>
                        <li>
                           <Link to="/admin/category">categoryAdmin</Link>
                        </li>
                        <li>
                           <Link to="/admin/voucher">voucherAdmin</Link>
                        </li>
                        <li>
                           <Link to="/admin/usersmanager">
                              usersmanagerAdmin
                           </Link>
                        </li>
                        <li>
                           <Link to="/admin/ListproductsAdmin">
                              ListproductsAdmin
                           </Link>
                        </li>
                        <li>
                           <a href="/admin/ordermanagement">ordermanagement</a>
                        </li>
                        <li>
                           <Link to="/orderhistory">orderhistory</Link>
                        </li>
                        <li>
                           <a href="/checkout">check out</a>
                        </li>
                        <li>
                           <a href="/orderdetail">orderdetail</a>
                        </li>
                        {/*  <li>
                  <a href="#">Sữa Baby</a>
                </li> */}
                     </ul>
                  </div>
               </Container>
            </div>
         </header>
      </>
   );
}
