/* eslint-disable no-var */

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
import { Cate } from "../../pages/product/AddCategory";
import { ChangeEvent, Fragment, useState, useEffect } from 'react'
import { userController } from "../../Controllers/UserController";

export default function Header() {

  const [idCate, setidCate] = useState<Cate>()
  const user = localStorage.getItem('user');

  
  var username;
  const [name, setName] = useState('');
  const [img, setImg] = useState('');
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user != null) {
      const userData = JSON.parse(user);
      const username = userData.username;
      console.log("USERNAME: " + username);
      userController.getUserWhereUsername(username).then((res) => {
        // setEditUser(res)
        setName(res.name)
        setImg(res.image)
      })
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


  return (
    <>
      <header className="Header">
        <Container>
          <div className="Header-top bg-white">
            <div className="container mx-auto">
              <div className="Header-top-content flex justify-between max-[426px]:text-[8px]">
                <div className="content-left flex py-2">
                  <Map />
                  <span className="text-[#4C4C4C] pl-2">Buon Ma Thuot</span>
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
                   max-xl:py-[1px]
                   "
                  >
                    <div className="mb-2">
                      <Search />
                    </div>
                    <input
                      className=" rounded-lg focus:outline-none text-lg relative pr-7 flex-1 pl-3 max-xl:text-sm
                      max-[426px]:text-[6px]  max-[426px]:p-[0]"
                      placeholder="Tìm kiếm..."
                    />
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
                  <div className="items-center flex pr-11 max-[769px]:pr-[10px]">
                    <Shoppingcart />
                    <div className="absolute">
                      <Ellips />
                      <span className="text-white font-bold absolute top-[-21px] ml-[30px] text-xs max-xl:text-[9px] max-xl:absolute max-xl:mr-[100px]">
                        1
                      </span>
                    </div>
                  </div>
                  <div className="items-center">
                    {user ? (
                      <a className=" flex gap-2" href={href}>
                        <div className="font-medium flex items-center justify-center">
                          {name}
                        </div>
                        {img ? (
                          <div className="relative">
                            <img className="w-10 h-10 rounded-full border-4 " src={img} alt=""/>
                              
                          </div>
                        ) : (
                          <div className=" rounded-full border-4 pt-2 pb-2 ps-3.5 pe-3.5  bg-red-500">
                            <p className="text-1xl text-stone-50">{name.substring(0, 1).toUpperCase()}</p>
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
        </Container >

        <div className="Header-bottom bg-[#FFEAE9] h-[60px]">
          <Container>
            <div className="container mx-auto">
              {/* <ul className="flex justify-between h-[60px] font-bold text-[#1A1A1A]leading-15 items-center leading-[100%]"> */}
              <ul className="flex gap-[3%] h-[60px] font-bold text-[#1A1A1A] leading-15 items-center leading-[100%] max-[426px]:text-[9px]">
                {/* <li>
                  <Link to="/ProductsPage">Gấu Bông Bobbicraft</Link>
                </li> */}
                <li>
                  <Link to={`/FiltersPage/${idCate}`}>Áo Nam</Link>
                </li>
                <li>
                  <Link to="/admin/Addproductspage">Thêm sản phẩm</Link>
                </li>
                <li>
                  <Link to="/admin/chitietproduct">Editproductspage</Link>
                </li>
                <li>
                  <Link to="/admin/ListproductsAdmin">ListproductsAdmin</Link>
                </li>
                <li>
                  <Link to="/UserProfilePage">UserProfilePage</Link>
                </li>
                <li>
                  <Link to="/orderhistory">orderhistory</Link>
                </li>
                <li>
                  <a href="/checkout">check out</a>
                </li>
                {/*  <li>
                  <a href="#">Sữa Baby</a>
                </li>
                <li>
                  <a href="#">Sữa Baby</a>
                </li> */}
              </ul>
            </div>
          </Container>
        </div>
      </header >
    </>
  );
}
