/* eslint-disable no-var */
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import {
  Link,
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import LogoWeb from "../../assets/TSX/LogoWeb";
import Search from "../../assets/TSX/Search";
import { productController } from "../../controllers/ProductsController";
import { userController } from "../../controllers/UserController";
import { Products } from "../../pages/home/User/FilterPage/FiltersPage";
import useDebounce from "../../useDebounceHook/useDebounce";
import CartCount from "../Context/CartCount/CartCount";
import Container from "../container/Container";
import HeaderTopUser from "../HeaderTop/HeaderTopUser";
import axios from "axios";
import { useCookies } from 'react-cookie';
import { Controller, useForm } from "react-hook-form";
import DialogLogin from "../../helper/Dialog/DialogLogin";
import { LoginForm } from "../../pages/home/User/DetailProduct/DetailProductPage/DetailsProduct";

export default function Header() {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const [text, setText] = useState("");

  const [productSearch, setProductSearch] = useState<Products[]>([]);
  const [isSearch, setIsSearch] = useState(false);

  const user = localStorage.getItem("user");
  const [checkLogin, setCheckLogin] = useState<boolean>(false);

  // using UseSearchParams
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValue = searchParams.get("keyword");

  const debouncedSearchParams = useDebounce(text, 500);
  // Slider Price SiteBarFilterPages
  const [sliderValues, setSliderValues] = useState<[number, number]>([
    0, 10000000,
  ]);
  const urlSliderValues = searchParams.get("sliderValues");
  useEffect(() => {
    // Kiểm tra nếu giá trị slider thay đổi thì mới cập nhật URL
    if (urlSliderValues) {
      const [min, max] = urlSliderValues.split(",").map(Number);
      setSliderValues([min, max]);
    }
  }, [urlSliderValues]);

  const getSearhvalue = async () => {
    await productController.getAllProductsSearch(text).then((res: any) => {
      setProductSearch(res.rows);
    });
  };

  useEffect(() => {
    if (text != "") {
      getSearhvalue();
      setSearchParams(
        createSearchParams({
          keyword: text,
          // min: sliderValues[0].toString(),
          // max: sliderValues[1].toString(),
        })
      );
    }
  }, [debouncedSearchParams]);
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
        console.log(
          "🚀 ~ file: Header.tsx:76 ~ userController.getUserWhereUsername ~ res:",
          res
        );
        // setEditUser(res)
        setName(res.name);
        localStorage.setItem("nameUser", JSON.stringify(res.name));

        setCheckLogin(true);
        const UserImageArray = JSON.stringify(res.UserImage);
        const urlTaker = JSON.parse(UserImageArray);
        setImg(urlTaker[0].url);
        console.log("ID: " + img);
        localStorage.setItem("avatarUser", JSON.stringify(urlTaker[0].url));
      });
    } else {
      console.log("Chua Dang Nhap Dung");
    }
  }, []);

  if (user != null) {
    username = JSON.parse(user).username;
  } else {
    console.log("Chua dang nhap");
  }
  const href = `/userprofilepage/${username}`;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setShowSuggestions(true);
    setText(e.target.value);
  };
  // Function to hide suggestions
  const hideSuggestions = () => {
    setShowSuggestions(false);
  };
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      navigate({
        pathname: `/FiltersPage/`,
        search: createSearchParams({
          keyword: searchValue?.toString()!,
          minPrice: sliderValues[0].toString(),
          maxPrice: sliderValues[1].toString(),
        }).toString(),
      });
      setShowSuggestions(false);
    }
  };

  const CheckToken = async () => {
    userController.CheckToken().then((res) => {
      console.log(JSON.stringify(res));
    });
  }
  const CheckRefreshToken = async () => {

    userController.CheckRefreshToken().then((res) => {
      console.log("VVVVVVVVVVVVVVVVVv" + JSON.stringify(res));

    });



  }
  // const muti = () => {
  //   CheckToken();
  //   CheckRefreshToken();
  //   console.log("AOTHATDAY");
  // }
  const [Logined, setLogined] = useState<boolean>();
  const CheckLogin = async () => {
    const user = localStorage.getItem("user");
    if (user == null) {
      setLogined(false);
      openModal(idAddAdmin)
    } else {
      setLogined(true);
      CheckToken();
      CheckRefreshToken();
      console.log("AOTHATDAY");
    }

  }
  const muti = () => {
    CheckToken();
    CheckRefreshToken();

  }
  const CheckLogin1 = () => {
    CheckLogin();
  }
  const {
    control,
    handleSubmit,
    clearErrors,
    reset,
    register,
    formState: { errors },
  } = useForm<LoginForm>({
    mode: "all",
  });
  const param = useParams();
  const idAddAdmin = "AddAdmin";
  const Login = async (data: LoginForm) => {
    console.log("LoginData:" + data)
    userController.Login(data).then((res) => {
      console.log("LoginTHanhCong:" + JSON.stringify(res.username))
      const username = res.username;
      const accessToken = res.accessToken;
      console.log(accessToken);
      const UserData = { username };
      const Token = { accessToken };
      localStorage.setItem("idUser", JSON.stringify(res.id));
      localStorage.setItem("user", JSON.stringify(UserData));
      localStorage.setItem("accessToken", JSON.stringify(Token));
      // const id = param.id;
      setTimeout(() => {
        window.location.href = `/Detailproducts/${param.id}`;
      }, 2000);
    })
  }
  const openModal = (id: string) => {
    const modal = document.getElementById(id) as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
    }
  };
  const closeModal2 = async (id: string) => {
    const modal = document.getElementById(id) as HTMLDialogElement | null;
    if (modal) {
      modal.close();
    }
  };
  const saveModal = (id: string, data: LoginForm) => {
    Login(data);
    reset({
      email: "",
      password: "",
    });
    const modal = document.getElementById(id) as HTMLDialogElement | null;
    if (modal) {
      modal.close();
    }
    console.log("Data:" + JSON.stringify(data));
  };
  return (
    <>
      <header className="Header">
        <Container>
          <div className="my-1">
            <HeaderTopUser />
          </div>
        </Container>
        <div>
          <DialogLogin
            id={idAddAdmin}
            onClose={() => closeModal2(idAddAdmin)}
            onSave={handleSubmit((data: any) => {
              saveModal(idAddAdmin, data);
            })}
            title="Đăng Nhập"
            body={
              <>
                <div className="grid grid-cols-5 gap-8">
                  <div className="col-span-3 ">
                    <div className="flex gap-3  ">
                      <div className="flex flex-col gap-5 max-lg:gap-2">
                        <div className="h-[90px] w-[455px]">
                          <Controller
                            name="email"
                            control={control}
                            rules={{
                              required: {
                                value: true,
                                message: "Không để trống",
                              },
                              minLength: {
                                value: 4,
                                message: "Ít nhất 4 ký tự",
                              },
                              // maxLength: {
                              //   value: ,
                              //   message:
                              //     "Nhiều nhất 25 kí tự",
                              // },
                              validate: {
                                // Kiểm tra email có đúng định dạng không
                                validEmail: (value) =>
                                  /^[A-Z0-9._%±]+@[A-Z0-9.-]+.[A-Z]{2,}$/i.test(
                                    value
                                  ) || "Email không hợp lệ",
                              },
                            }}
                            render={({ field }) => (
                              <>
                                <label className="text-sm font-medium max-xl:text-xs max-lg:text-[10px]">
                                  Email
                                </label>
                                <input
                                  className={`focus:outline-none border-[1px] text-[#333333] text-base placeholder-[#7A828A]
                                             rounded-[6px] px-[10px] py-[12px] w-[100%] mt-0
                                             max-xl:text-xs max-lg:text-[10px] border-[#EA4B48]
                                            `}
                                  placeholder="Nhập vào email của bạn"
                                  value={field.value}
                                  onChange={(e) => {
                                    const reg = /[!#$%^&]/;
                                    const value = e.target.value;
                                    field.onChange(value.replace(reg, ""));
                                  }}
                                  name="email"
                                />
                                {errors.email && (
                                  <p className="text-[11px] text-red-700 mt-0">
                                    {errors.email.message}
                                  </p>
                                )}
                              </>
                            )}
                          />
                        </div>
                      </div>

                    </div>
                    <div className="flex gap-3  ">
                      <div className="flex flex-col gap-5 max-lg:gap-2">
                        <div className="h-[90px] w-[455px]">
                          <Controller
                            name="password"
                            control={control}
                            rules={{
                              required: {
                                value: true,
                                message: "Không để trống",
                              },
                              minLength: {
                                value: 4,
                                message: "Ít nhất 4 ký tự",
                              },
                              maxLength: {
                                value: 25,
                                message: "Nhiều nhất 25 kí tự",
                              },
                            }}
                            render={({ field }) => (
                              <>
                                <label className="text-sm font-medium max-xl:text-xs max-lg:text-[10px]">
                                  Mật khẩu
                                </label>
                                <input
                                  className={`focus:outline-none border-[1px] text-[#333333] text-base placeholder-[#7A828A]
                                             rounded-[6px] px-[10px] py-[12px] w-[100%] mt-0
                                             max-xl:text-xs max-lg:text-[10px] border-[#EA4B48]
                                            `}
                                  type="password"
                                  placeholder="Nhập vào mật khẩu"
                                  value={field.value}
                                  onChange={(e) => {
                                    const reg = /[!@#$%^&]/;
                                    const value = e.target.value;
                                    field.onChange(value.replace(reg, ""));
                                  }}
                                  name="password"
                                />
                                {errors.password && (
                                  <p className="text-[11px] text-red-700 mt-0">
                                    {errors.password.message}
                                  </p>
                                )}
                              </>
                            )}
                          />
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </>
            }
          />

        </div>
        <div className="border-2 border-[#E6E6E6]" />
        <Container>
          <div className="Header-center bg-white h-[91px]">
            <div className="container mx-auto">
              <div className="flex items-center justify-between">
                <div className="p-[10px]  max-[426px]:p-[1px]">
                  <a href="/" onClick={CheckToken}>
                    <LogoWeb />
                  </a>
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
                      onBlur={() => (isSearch ? null : hideSuggestions())} // Hide suggestions when the input loses focus
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
                                            itemsSearch.name.length > 17 ? (
                                            `${itemsSearch.name.substring(
                                              0,
                                              17
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

                <div className="items-center flex relative gap-2">
                  <a onClick={CheckLogin}>
                    {Logined ? (
                      <CartCount />
                    ) : (
                      <></>
                    )

                    }

                  </a>

                  <div className="items-center">
                    {checkLogin ? (
                      <a className=" flex gap-2" href={href} onClick={muti}>
                        <div className="font-medium flex items-center justify-center">
                          {name}
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
                              {name.substring(0, 1).toUpperCase()}
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
                  <Link to="/admin/Addproductspage">Thêm sản phẩm Admin</Link>
                </li>
                <li>
                  <Link to="/admin/category">categoryAdmin</Link>
                </li>
                <li>
                  <Link to="/admin/voucher">voucherAdmin</Link>
                </li>
                <li>
                  <Link to="/admin/usersmanager">usersmanagerAdmin</Link>
                </li>
                <li>
                  <a href="/admin/statisticsPage">thongke</a>
                </li>
                <li>
                  <Link to="/admin/ListproductsAdmin">ListproductsAdmin</Link>
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
