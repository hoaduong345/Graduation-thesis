import { Images } from "../../../assets/TS";
import Container from "../../container/Container";
import Category from "../components/Category";

import { ReactNode, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import LogoVoucherBuyzzle from "../../../assets/TSX/LogoVoucherBuyzzle";
import LogoVoucherFreeship from "../../../assets/TSX/LogoVoucherFreeship";
import SanVoucher from "../../../assets/TSX/SanVoucher";
import VoucherBuyzzle from "../../../assets/TSX/VoucherBuyzzle";
import { categoryController } from "../../../controllers/CategoryController";
import { productController } from "../../../controllers/ProductsController";
import {
  ImgOfProduct,
  Products,
} from "../../../pages/home/User/FilterPage/FiltersPage";
import { Cate } from "../components/Category";
import Productss from "../components/Product";
import SlidesHome from "../components/slides/SlidesHome/SlidesHome";
import VoucherHomePage from "../components/Voucher/Voucher";
import { useScroll } from "react-spring";

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

function Index() {
  useScroll();
  const [categoty, setCategory] = useState<Cate[]>([]);
  const [product, setProducts] = useState<Products[]>([]);
  const [page, setPage] = useState(1);
  const getCategory = () => {
    categoryController
      .getAll()
      .then((response) => response.data)
      .then((data) => {
        setCategory(data);
      })
      .catch((err) => console.log(err));
  };

  const getAllProducts = (page: number) => {
    productController
      .getSearchAndPaginationProduct("", page, 2)
      .then((res: Products[]) => {
        setProducts(res);
      });
  };
  useEffect(() => {
    getCategory();
    getAllProducts(page);
  }, []);

  const nextData = () => {
    setPage(page + 1);
    productController
      .getSearchAndPaginationProduct("", page + 1, 2)
      .then((res: Products[]) => {
        setProducts(product.concat(res));
      });
  };

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
          <h1 className="text-2xl font-bold mb-[15px]">Danh mục</h1>
          {/* <div className="flex flex-wrap gap-[35px] justify-center"> */}
          <div className="grid grid-cols-6 gap-[35px] justify-center">
            {categoty.map((e) => {
              return <Category id={e.id} image={e.image} name={e.name} />;
            })}
          </div>
        </div>

        <div className="container">
          <VoucherHomePage />
        </div>
      </Container>

      <Container>
        <div className="container my-[60px]">
          <h1 className="text-2xl font-bold mb-[15px]">Gợi ý sản phẩm </h1>

          <InfiniteScroll
            style={{ overflow: "hidden" }}
            dataLength={product.length}
            next={nextData}
            hasMore={true}
            loader={<></>}
          >
            <div className="flex flex-wrap mb-6 gap-3 max-2xl:ml-0 max-2xl:flex-wrap max-lg:gap-4 ">
              {product?.map((product) => {
                return <Productss product={product} />;
              })}
            </div>
          </InfiniteScroll>
        </div>
      </Container>
    </>
  );
}

export default Index;
