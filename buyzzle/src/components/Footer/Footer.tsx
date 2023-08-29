import React from "react";
import "./Footer.css";
import BuyzzyFooterLogo from "../../Assets/TSX/BuyzzyFooterLogo";
import IconJCB from "../../Assets/TSX/IconJCB";
import Cham from "../../Assets/TSX/Cham";
import Express from "../../Assets/TSX/Express";
import { Images } from "../../Assets/TS";
import FacebookSquare from "../../Assets/TSX/facebook-square";
import SquareInstagram from "../../Assets/TSX/square-instagram";
import SquareWhatsapp from "../../Assets/TSX/square-whatsapp";
import Container from "../container/Container";

export default function Footer() {
  return (
    <footer className="footer-bg h-[512px]">
      
        <div>
          <div>
            <div className="bg-[#FFEAE9] h-[5px]"></div>
            <div className="bg-[#333] h-[3px]"></div>
          </div>
          <div className="flex justify-center mt-[35px]">
            <div>
              <BuyzzyFooterLogo />
              <div className="border-b-[3px] border-black mt-2" />
            </div>
          </div>
          <Container>
          <div className="relative">
            <div className="container mx-auto">
              <div className="txt-content flex w-[100%] mt-7 font-extrabold text-[#525252] text-base">
                <div className="w-[20%] ">
                  <span>THANH TOÁN</span>
                  <div className="flex flex-wrap gap-2 w-[50%] mt-4">
                    <IconJCB />
                    <Cham />
                    <img
                      src="https://www.freepnglogos.com/uploads/visa-logo-png-image-4.png"
                      width="52px"
                      alt="visa logo png image"
                    />
                    <Express />
                  </div>
                </div>
                <div className="w-[20%]">
                  <span>ĐƠN VỊ VẬN CHUYỂN</span>
                  <div className="flex flex-wrap gap-3 w-[80%] mt-4">
                    <img
                      src={Images.Ahamove}
                      alt="Ahamove"
                      width={60}
                      height={30}
                    />{" "}
                    <img
                      src={Images.Ahamove}
                      alt="Ahamove"
                      width={60}
                      height={30}
                    />{" "}
                    <img
                      src={Images.Ahamove}
                      alt="Ahamove"
                      width={60}
                      height={30}
                    />{" "}
                    <img
                      src={Images.Ahamove}
                      alt="Ahamove"
                      width={60}
                      height={30}
                    />
                    <img
                      src={Images.Ahamove}
                      alt="Ahamove"
                      width={60}
                      height={30}
                    />
                    <img
                      src={Images.Ahamove}
                      alt="Ahamove"
                      width={60}
                      height={30}
                    />
                    <img
                      src={Images.Ahamove}
                      alt="Ahamove"
                      width={60}
                      height={30}
                    />
                    <img
                      src={Images.Ahamove}
                      alt="Ahamove"
                      width={60}
                      height={30}
                    />
                    <img
                      src={Images.Ahamove}
                      alt="Ahamove"
                      width={60}
                      height={30}
                    />{" "}
                    <img
                      src={Images.Ahamove}
                      alt="Ahamove"
                      width={60}
                      height={30}
                    />{" "}
                  </div>
                </div>
                <div className="w-[20%]">
                  <span>VỀ BUYZZLE</span>
                  <div className="content-Buyzzle flex flex-col font-extralight leading-7 mt-2 ">
                    <p className="hover:text-[#FFAAAF] max-w-max">
                      <a href="#">Giới Thiệu Về Buyzzle</a>
                    </p>

                    <p className="hover:text-[#FFAAAF] max-w-max">
                      <a href="#">Tuyển Dụng</a>
                    </p>

                    <p className="hover:text-[#FFAAAF] max-w-max">
                      <a href="#">Điều Khoảng Buyzzle</a>
                    </p>

                    <p className="hover:text-[#FFAAAF] max-w-max">
                      <a href="#">Chính Hãng</a>
                    </p>

                    <p className="hover:text-[#FFAAAF] max-w-max">
                      <a href="#">Kênh người bán</a>
                    </p>

                    <p className="hover:text-[#FFAAAF] max-w-max">
                      <a href="#">Flash Sales</a>
                    </p>

                    <p className="hover:text-[#FFAAAF] max-w-max">
                      <a href="#">Chương Trình Tiếp Thị Liên Kết</a>
                    </p>

                    <p className="hover:text-[#FFAAAF] max-w-max">
                      <a href="#">Liên Hệ Với Truyền Thông</a>
                    </p>
                  </div>
                </div>
                <div className="w-[20%]">
                  <span>THEO DÕI CHÚNG TÔI TRÊN </span>
                  <div className="followUs flex flex-col gap-5 mt-5 justify-evenly ">
                    <div className="flex">
                      <FacebookSquare />
                      <p className=" ml-5 hover:text-[#FFAAAF]">
                        <a href="#">Nguyen Viet Thang</a>
                      </p>
                    </div>
                    <div className="flex">
                      <SquareInstagram />
                      <p className=" ml-5 hover:text-[#FFAAAF]">
                        <a href="#">Nguyen Viet Thang</a>
                      </p>
                    </div>

                    <div className="flex">
                      <SquareWhatsapp />
                      <p className=" ml-5 hover:text-[#FFAAAF]">
                        <a href="#">Nguyen Viet Thang</a>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-[20%]">
                  <span>NỀN TẢNG HỖ TRỢ</span>
                  <div className="flex flex-wrap gap-5 mt-5">
                    <a href="#">
                      <img
                        src={Images.DownWithAppStore}
                        alt="DownWithAppStore"
                      />
                    </a>
                    <a href="#">
                      <img src={Images.DownWithCHplay} alt="DownWithAppStore" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </Container>
        </div>
    </footer>
  );
}
