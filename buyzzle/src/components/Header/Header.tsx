
import { Link } from "react-router-dom";
import Map from "../../Assets/TSX/Map";
import Globe from "../../Assets/TSX/Globe";
import Chevron_down from "../../Assets/TSX/Chevron-down";
import Bell from "../../Assets/TSX/Bell";
import Headphones from "../../Assets/TSX/headphones";
import LogoWeb from "../../Assets/TSX/LogoWeb";
import Search from "../../Assets/TSX/Search";
import Shoppingcart from "../../Assets/TSX/Shopping-cart";
import Ellips from "../../Assets/TSX/Ellips";
import Container from "../container/Container";

export default function Header() {
  return (
    <>
      <header className="Header">
        <Container>
          <div className="Header-top bg-white">
            <div className="container mx-auto">
              <div className="Header-top-content flex justify-between">
                <div className="content-left flex py-2">
                  <Map />
                  <span className="text-[#4C4C4C] pl-2">Buon Ma Thuot</span>
                </div>

                <div className="content-right flex items-center gap-2 ">
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
                      <span className="text-[#4C4C4C] pl-2">Thong bao</span>
                    </div>
                    <div className="flex items-center pl-3">
                      <Headphones />
                      <span className="text-[#4C4C4C] pl-2">Ho tro</span>
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
                <div className="p-[10px] ">
                  <Link to="/">
                    <LogoWeb />
                  </Link>
                </div>
                {/* input */}
                <div className="items-center flex flex-1 max-w-[755px] max-2xl:ml-10 max-xl:max-w-[700px] max-xl:ml-5">
                  <div
                    className="Search-input-headerCenter items-center flex w-[90%]
                   py-[6px] px-[6px] border-[2px] border-[#FFAAAF] rounded-lg
                   max-xl:py-[1px]
                   "
                  >
                    <div className="mb-2">
                      <Search />
                    </div>
                    <input
                      className=" rounded-lg focus:outline-none text-lg relative pr-7 flex-1 pl-3 max-xl:text-sm"
                      placeholder="Tìm kiếm..."
                    />
                    <div className="flex items-center">
                      <button
                        className="btn-search bg-[#FFEAE9] p-[7px] rounded-lg font-bold text-[#1A1A1A] 
                      w-[135px] max-xl:max-w-[70px] max-xl:text-[11px] max-xl:p-[4px] border"
                      >
                        Tìm kiếm
                      </button>
                    </div>
                  </div>
                </div>

                <div className="items-center flex relative gap-2">
                  <div className="items-center flex pr-11">
                    <Shoppingcart />
                    <div className="absolute">
                      <Ellips />
                      <span className="text-white font-bold absolute top-[-21px] ml-[30px] text-xs max-xl:text-[9px] max-xl:absolute max-xl:mr-[100px]">
                        1
                      </span>
                    </div>
                  </div>
                  <div className="items-center">
                    <div className="flex text-[#1A1A1A] ml-[10px]">
                      <a href="#">ĐĂNG NHẬP</a>
                      <div className="border-[1px] border-[#000000] mx-[20px] " />
                      <a href="#">ĐĂNG KÍ</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>

        <div className="Header-bottom bg-[#FFEAE9] h-[60px]">
          <Container>
            <div className="container mx-auto">
              <ul className="flex justify-between h-[60px] font-bold text-[#1A1A1A]leading-15 items-center leading-[100%]">
                <li>
                  <Link to="/ProductsPage">Gấu Bông Bobbicraft</Link>
                </li>
                <li>
                  <Link to="/FiltersPage">Áo Nam</Link>
                </li>
                <li>
                  <Link to="/Addproductspage">Thêm sản phẩm</Link>
                </li>
                <li>
                  <Link to="/Editproductspage">Editproductspage</Link>
                </li>
                <li>
                  <Link to="/ListproductsAdmin">ListproductsAdmin</Link>
                </li>
                <li>
                  <Link to="/">Sữa Bab</Link>
                </li>
                <li>
                  <Link to="/Detailproducts">Detailproducts</Link>
                </li>
                <li>
                  <a href="#">Sữa Baby</a>
                </li>
                <li>
                  <a href="#">Sữa Baby</a>
                </li>
                <li>
                  <a href="#">Sữa Baby</a>
                </li>
              </ul>
            </div>
          </Container>
        </div>
      </header>
    </>
  );
}
