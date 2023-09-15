import { useEffect, useState } from "react";
import "../../../css/filter.css";
import Filter from "./Filter";
import Container from "../../../../components/container/Container";
import SitebarFilter from "../../../../components/Sitebar/SitebarFilter";
import { Images } from "../../../../Assets/TS";
import SlidesFilter from "../../../../components/home/components/slides/SlidesFilter/SlidesFilter";
import ArrowPrev from "../../../../Assets/TSX/ArrowPrev";
import ArrowNext from "../../../../Assets/TSX/ArrowNext";
import StepsLogo from "../../../../Assets/TSX/StepsLogo";
import Series from "../../../../Assets/TSX/Series";
import BookOff from "../../../../Assets/TSX/BookOff";
import FoodLogoo from "../../../../Assets/TSX/FoodLogoo";
import FoodLogo from "../../../../Assets/TSX/FoodLogo";
import MangoLogo from "../../../../Assets/TSX/MangoLogo";
import axios from "axios";

export interface Products {
  id: number;
  name: string;
  price: number;
  rate: number; // đánh giá
  pricesale: number; // giảm được bao nhiêu đó ( thẻ tag )
  sellingPrice: number; // giá bán
  discount: number; // giảm giá
  soldCount: number; // đã bán
  quantity: number;
  description: string;
  status: string;
  date: string;
  images: string;
  imagesList: string;
  ProductImage: {
    url: string
  }[]
}

// const products: Products[] = [];
// // mang hinh anh random 1- images.length
// const images: string[] = [
//   "https://product.hstatic.net/200000722513/product/hinh-2_f829913c3f7144a3a4aa066dc78faec0_master.gif",
//   "https://product.hstatic.net/200000722513/product/thumb_pc_studio_bdeef727e7c54592a4deac435876eed2_master.png",
//   "https://product.hstatic.net/200000722513/product/phantom_i4070_20c63a05c1094b57b86f39edb98dce7b_master.png",
// ];
// for (let i = 0; i < 11; i++) {
//   products.push({
//     id: i + 1,
//     name: `Áo khoác mùa đông  ${i + 1}`,
//     images: images[Math.floor(Math.random() * images.length)],
//     rate: 1,
//     price: 210.0,
//     discount: 20,
//     soldCount: 20,
//   });
// }


export default function FiltersPage() {
  const [products, setProducts] = useState<Products[]>([])

  useEffect(() => {
    axios.get("http://localhost:5000/buyzzle/product/allproducts")
      .then((reposonse) => {
        setProducts(reposonse.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <Container>
      <body className="body-filter container mx-auto">
        <div className="grid grid-cols-4 max-2xl:grid-cols-1">
          <div className="col-span-1 max-2xl:hidden">
            <SitebarFilter onChangeFilters={() => {
            }} />
          </div>
          {/* content-right-filter */}
          <div className="content-right-filter mt-[34px] p-4 col-span-3 max-2xl:col-span-1">
            <h2 className="txt-filter font-bold text-[#1A1A1A] text-3xl" >
              THƯƠNG HIỆU NỔI TIẾNG:
            </h2>

            {/* thuong hieu noi tieng */}
            <div className="flex  w-[100%] justify-start gap-10 mt-[34px] max-2xl:justify-around">
              <div className="square border border-[#FFAAAF] cursor-pointer px-14 pt-[15px]">
                <img
                  src="https://www.freepnglogos.com/uploads/starbucks-logo-png-25.png"
                  width="90"
                  alt="starbucks logo png"
                />
              </div>
              <div className="square border border-[#FFAAAF] px-14 py-[10px] cursor-pointer">
                <img
                  src={Images.unilever}
                  width="90"
                  alt="adidas logo png white images"
                />
              </div>
              <div className="square border border-[#FFAAAF] px-12 pt-[14px]  cursor-pointer">
                <img
                  src={Images.Puma}
                  width="130"
                  alt="adidas logo png white images"
                />
              </div>
              <div className="square border border-[#FFAAAF] px-14 pt-[29px]  cursor-pointer">
                <img
                  src="https://www.freepnglogos.com/uploads/adidas-logo-png-white-images-11.png"
                  width="100"
                  alt="adidas logo png white images"
                />
              </div>
            </div>
            <div className="bg-[#FFEAE9] h-[60px] mt-[18px] rounded-[6px] ">
              <div className="txt-content flex">
                <div className="content-left w-[50.5%] flex items-center justify-start gap-5 h-[60px] max-2xl:w-[52.5%]  max-xl:w-[50.5%]">
                  <p className="text-[#000000] text-sm ml-5 font-semibold">
                    Sắp xếp theo
                  </p>
                  <button
                    type="button"
                    className="transition duration-150 outline outline-2 outline-[#EA4B48]  font-medium
                   rounded-[6px] text-xs py-[6px] px-[13px] text-[#FFFFFF] hover:text-[#FFFFFF] bg-[#FFAAAF]  "
                  >
                    Liên Quan
                  </button>
                  <button
                    type="button"
                    className="transition duration-150 outline outline-2 outline-[#EA4B48] bg-white hover:bg-[#FFAAAF] font-medium
                   rounded-[6px] text-sm py-[6px] px-[13px] hover:text-[#FFFFFF]"
                  >
                    Mới Nhất
                  </button>
                  <button
                    type="button"
                    className="transition duration-150 outline outline-2 outline-[#EA4B48] bg-white hover:bg-[#FFAAAF] font-medium
                   rounded-[6px] text-sm py-[6px] px-[13px] hover:text-[#FFFFFF]"
                  >
                    Bán Chạy
                  </button>
                </div>
                <div className="content-left flex items-center justify-start gap-5 h-[60px]">
                  <p className="text-[#000000] font-semibold text-sm">Giá</p>
                  <button
                    type="button"
                    className="transition duration-150 outline outline-2 outline-[#EA4B48] hover:bg-[#FFAAAF] font-medium
                   rounded-[6px] text-sm py-[6px] px-[13px] hover:text-[#FFFFFF] bg-white"
                  >
                    Thấp Nhất
                  </button>
                  <button
                    type="button"
                    className="transition duration-150 outline outline-2 outline-[#EA4B48] bg-white hover:bg-[#FFAAAF] font-medium
                   rounded-[6px] text-sm py-[6px] px-[13px] hover:text-[#FFFFFF]"
                  >
                    Cao Nhất
                  </button>
                </div>
              </div>
            </div>
            {/* banner filter */}
            <div className="banner-filter max-w-[970px] my-5 max-2xl:max-w-[1150px] max-2xl:mx-auto">
              <SlidesFilter />
            </div>

            <div className="flex flex-wrap mt-[10px] gap-4 w-max-w max-2xl:justify-start max-2xl:mx-[47px]">

              {products.map((items) => {
                // console.log('items', items)
                return (
                  <>
                    <Filter product={items} />
                  </>
                );
              })}
            </div>
            <div
              style={{ borderTopColor: "transparent" }}
              className="w-16 h-16 border-4 border-red-400  mx-auto border-double rounded-full animate-spin"
            />
            <div className="pagination">
              <a href="#" className="prev mr-[60px]">
                <ArrowPrev />
              </a>
              <a href="#" className="page">
                1
              </a>
              <a href="#" className="page">
                2
              </a>
              <a href="#" className="page">
                ...
              </a>
              <a href="#" className="page">
                7
              </a>
              <a href="#" className="page">
                8
              </a>
              <a href="#" className="next ml-[60px]">
                <ArrowNext />
              </a>
            </div>
          </div>
          {/* content-right-filter-end */}
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
