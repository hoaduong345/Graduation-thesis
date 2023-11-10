import { Images } from "../../../Assets/TS";
import Container from "../../container/Container";
import Category from "../components/Category";

import axios from "axios";
import { ReactNode, useEffect, useState } from "react";
import { Link, createSearchParams, useSearchParams } from "react-router-dom";
import LogoVoucherBuyzzle from "../../../Assets/TSX/LogoVoucherBuyzzle";
import LogoVoucherFreeship from "../../../Assets/TSX/LogoVoucherFreeship";
import SanVoucher from "../../../Assets/TSX/SanVoucher";
import VoucherBuyzzle from "../../../Assets/TSX/VoucherBuyzzle";
import { productController } from "../../../Controllers/ProductsController";
import { Row } from "../../../Model/ProductModel";
import { useScroll } from "../../../hooks/Scroll/useScrollPages";
import { ImgOfProduct } from "../../../pages/home/User/FilterPage/FiltersPage";
import { Cate } from "../components/Category";
import Productss from "../components/Product";
import SlidesHome from "../components/slides/SlidesHome/SlidesHome";
import useDebounce from "../../../useDebounceHook/useDebounce";

export type Product = {
  id: number;
  imgSrc: string;
  name: string;
  price: number;
  discount: number;
  soldCount: number;
  ProductImage: ImgOfProduct[];
};

export type FlashSaleList = {
  id: number;
  img: string;
  giamGia: number;
  title: string;
  vote: number;
  price: number;
  daBan: number;
};

interface VoucherBanner {
  pathName: string;
  icon: ReactNode;
  title: string;
}

const listVoucherBanner: VoucherBanner[] = [
  {
    pathName: "/voucher",
    icon: <LogoVoucherBuyzzle />,
    title: "BUYZZLE",
  },
  {
    pathName: "",
    icon: <LogoVoucherFreeship />,
    title: "FREESHIP",
  },
];

function Index() {
  useScroll();
  const [categoty, setCategory] = useState<Cate[]>([]);
  const [product, setProducts] = useState<Row[]>([]);

  const getCategory = () => {
    axios
      .get("http://localhost:5000/buyzzle/product/allcategory")
      .then((response) => response.data)
      .then((data) => {
        console.log("🚀 ~ file: index.tsx:50 ~ .then ~ data:", data);
        setCategory(data);
      })
      .catch((err) => console.log(err));
  };

  const getAllProducts = () => {
    productController.getAllProducts().then((res: any) => {
      console.log(
        "🚀 ~ file: index.tsx:58 ~ productController.getAllProducts ~ res:",
        res
      );
      setProducts(res.rows);
    });
  };
  useEffect(() => {
    getCategory();
    getAllProducts();
  }, []);

  return (
    <>
      <Container>
        <div className="container mt-[50px]">
          <div className="flex justify-between max-xl:flex-wrap">
            <div className="max-w-[872px] max-xl:mx-auto max-xl:mb-[20px] max-[1023px]:hidden">
              <SlidesHome />
            </div>

            <div className="flex-col max-w-[421px] max-xl:mx-auto">
              <img
                className="mb-[18px] w-full"
                src="https://lzd-img-global.slatic.net/g/icms/images/ims-web/8f54ec75-a209-4a10-acf8-22bf81ed64cb.jpg_2200x2200q90.jpg_.webp"
                alt=""
              />

              <div className="flex justify-between max-w-[421px] max-[556px]:hidden">
                <img className="object-cover" src={Images.banner3} alt="" />
                <img className="object-cover" src={Images.banner4} alt="" />
              </div>
            </div>
          </div>
        </div>

        <div className="container my-[60px]">
          <h1 className="text-2xl font-bold mb-[15px]">Danh mục:</h1>
          {/* <div className="flex flex-wrap gap-[35px] justify-center"> */}
          <div className="grid grid-cols-6 gap-[35px] justify-center">
            {categoty.map((e) => {
              return <Category id={e.id} image={e.image} name={e.name} />;
            })}
          </div>
        </div>

        <div className="container mt-[90px]">
          <div className="flex justify-center mb-10">
            <SanVoucher />
          </div>

          <div className="flex justify-center gap-[24px]">
            {listVoucherBanner.map((e) => {
              return (
                <>
                  <Link
                    to={e.pathName}
                    className="max-w-[420px] scale-95 duration-300 hover:scale-100 relative"
                  >
                    <VoucherBuyzzle />
                    <div className="absolute left-[7%] top-[29%]">
                      <div className="flex flex-col gap-1 items-center">
                        <p className="font-bold text-2xl text-[#4C4C4C]">
                          VOUCHER
                        </p>
                        <p className="font-bold text-[32px] text-[#4C4C4C]">
                          {e.title}
                        </p>
                      </div>
                    </div>
                    <div className="absolute bottom-[13%] right-[5%]">
                      {e.icon}
                    </div>
                  </Link>
                </>
              );
            })}
          </div>
        </div>
      </Container>

      <div className="w-full mx-auto my-[60px] bg-[#ffeae9] ">
        <Container>
          <div className="py-[40px] backGroundImg flex justify-between max-[769px]:flex-col">
            <div className="max-w-[276px] max-[1025px]:hidden">
              <img src={Images.chooseUs1} alt="" />
            </div>
            <div className="max-w[444px]">
              <img src={Images.chooseUs2} alt="" />
            </div>
            <div className="flex flex-col justify-center max-w-[536px] max-[769px]:max-w-[700px]">
              <div className="max-w-[317px] pb-[26px]">
                <span className="text-[40px] font-bold">
                  100% sản phẩm <span className="text-[#00b207]">xanh</span>{" "}
                  sạch
                </span>
              </div>

              <div className="flex justify-between gap-[12px] items-center max-w-[536px]">
                <div className="max-w-[40px]">
                  <img src={Images.chooseUs3} alt="" />
                </div>

                <div className="text-[18px] font-bold max-w-[500px]">
                  <p>
                    Tuần Sản Phẩm Xanh: Mua Sắm Thả Ga - Giảm Giá Lên Đến 50%!
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center max-w-[536px] pb-[26px]">
                <div className="max-w-[40px]"></div>

                <div className="text-[14px] max-w-[500px]">
                  <p>
                    Giảm giá lên đến 50%: Khám phá bộ sưu tập đa dạng với giá
                    cực kỳ hấp dẫn. Thêm sức khỏe vào giỏ hàng của bạn mà không
                    làm trống túi tiền!
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center max-w-[536px]">
                <div className="max-w-[40px]">
                  <img src={Images.chooseUs3} alt="" />
                </div>

                <div className="text-[18px] font-bold max-w-[500px]">
                  <p>
                    Săn Sale Tuần Sản Phẩm Xanh: Mua Rau Sạch, Tiết Kiệm Lớn!"
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center max-w-[536px] pb-[26px]">
                <div className="max-w-[40px]"></div>

                <div className="text-[14px] max-w-[500px]">
                  <p>
                    Mua sắm thuận tiện: Dễ dàng đặt hàng trực tuyến và giao hàng
                    tận cửa, để bạn tập trung vào việc nấu nướng ngon lành.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <div className="container mt-[60px] ">
          <div className="flex justify-between p-[40px] max-lg:flex-wrap shadow max-[426px]:hidden">
            <div className="flex gap-[16px] items-center justify-center max-lg:mb-[20px] max-lg:w-1/2">
              <img src={Images.car} alt="" />
              <span>Giao hàng miễn phí</span>
            </div>
            <div className="flex gap-[16px] items-center justify-center max-lg:mb-[20px] max-lg:w-1/2">
              <img src={Images.headphones} alt="" />
              <span>Nhận phản hồi 24/7</span>
            </div>
            <div className="flex gap-[16px] items-center justify-center max-lg:w-1/2">
              <img src={Images.shopping} alt="" />
              <span>Mua sắm an toàn 100%</span>
            </div>
            <div className="flex gap-[16px] items-center justify-center max-lg:w-1/2">
              <img src={Images.Group} alt="" />
              <span>Hoàn trả hàng</span>
            </div>
          </div>
        </div>

        <div className="container my-[60px]">
          <h1 className="text-2xl font-bold mb-[15px]">Gợi ý sản phẩm: </h1>

          <div className="flex flex-wrap gap-3 max-2xl:ml-0 max-2xl:flex-wrap max-lg:gap-4">
            {product?.map((product) => {
              return <Productss product={product} />;
            })}
          </div>
        </div>
      </Container>
    </>
  );
}

export default Index;
