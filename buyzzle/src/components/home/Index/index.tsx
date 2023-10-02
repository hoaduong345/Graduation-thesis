import { Images } from "../../../Assets/TS";
import Container from "../../container/Container";
import Category from "../components/Category";
import Arrow from "../../../Assets/TSX/arrow";
import Products from "../components/Product";

import SlidesHome from "../components/slides/SlidesHome/SlidesHome";
import Progess from "../components/progess";
import { useEffect, useState } from "react";
import axios from "axios";
import { Cate } from "../../../pages/home/Admin/Category/Category";
import { Link } from "react-router-dom";
import { productController } from "../../../Controllers/ProductsController";
import Productss from "../components/Product";

export type Product = {
  id: number;
  imgSrc: string;
  title: string;
  price: number;
  discount: number;
  soldCount: number;
};

export type FlashSaleList = {
  id: number,
  img: string,
  giamGia: number,
  title: string,
  vote: number,
  price: number,
  daBan: number,
}

function Index() {


  const [categoty, setCategory] = useState<Cate[]>([])
  const [product, setProducts] = useState<Product[]>([])
  const products: Product[] = [
    {
      id: 1,
      imgSrc: Images.spGoiY1,
      title: "Bộ Máy Tính Case PC Chơi Game 1",
      price: 1200000,
      discount: 50,
      soldCount: 33,
    },
    {
      id: 2,
      imgSrc: Images.spGoiY1,
      title: "Bộ Máy Tính Case PC Chơi Game 2",
      price: 500000,
      discount: 5,
      soldCount: 12,
    },
    {
      id: 3,
      imgSrc: Images.spGoiY1,
      title: "Bộ Máy Tính Case PC Chơi Game 3",
      price: 680000,
      discount: 10,
      soldCount: 42,
    },
    {
      id: 4,
      imgSrc: Images.spGoiY1,
      title: "Bộ Máy Tính Case PC Chơi Game 4",
      price: 900000,
      discount: 20,
      soldCount: 55,
    },
    {
      id: 5,
      imgSrc: Images.spGoiY1,
      title: "Bộ Máy Tính Case PC Chơi Game 5",
      price: 1000000,
      discount: 70,
      soldCount: 8,
    },
    {
      id: 6,
      imgSrc: Images.spGoiY1,
      title: "Bộ Máy Tính Case PC Chơi Game 5",
      price: 1000000,
      discount: 70,
      soldCount: 8,
    },
  ];
  const getCategory = () => {
    axios.get('http://localhost:5000/buyzzle/product/allcategory')
      .then(response => response.data
      )
      .then(data => {
        setCategory(data)
      })
      .catch(err => console.log(err))
  }

  const getAllProduct = () => {
    productController.getAllProducts().then((res: any) => {
      setProducts(res.rows)
    })
  }
  useEffect(() => {
    getAllProduct()
  }, [])

  useEffect(() => {
    getCategory()
  }, [])

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
          <h1 className="text-2xl font-bold mb-[15px]">Danh mục:</h1>
          {/* <div className="flex flex-wrap gap-[35px] justify-center"> */}
          <div className="grid grid-cols-6 gap-[35px] justify-center">
            {
              categoty.map(e => {
                return <Category id={e.id} img={e.image} title={e.name} />
              })
            }

            {/* <Category img={Images.Category1} title="Thiết bị điện gia dụng" />
            <Category img={Images.Category2} title="Giày dép da" />
            <Category img={Images.Category3} title="Đồng hồ" />
            <Category img={Images.Category4} title="Máy ảnh" />
            <Category img={Images.Category5} title="Thời trang nam" />
            <Category img={Images.Category6} title="Thiết bị điện tử" />

            <Category img={Images.Category7} title="Phụ kiện trang sức nữ" />
            <Category img={Images.Category8} title="Túi ví nữ" />
            <Category img={Images.Category9} title="Giày dép nữ" />
            <Category img={Images.Category10} title="Sức khỏe" />
            <Category img={Images.Category11} title="Sắc đẹp" />
            <Category img={Images.Category12} title="Nhà cửa đời sống" /> */}
          </div>

        </div>

        <div className="container my-[60px] ">
          <div className="flex justify-center">
            <img src={Images.textMom} alt="" />
          </div>
          <div className="flex justify-center gap-[24px]">
            <div className="max-w-[420px] scale-95 mt-[100px] duration-300 hover:scale-100">
              <img src={Images.imgMom1} alt="" />
            </div>
            <div className="max-w-[420px] scale-95 duration-300 hover:scale-100">
              <img src={Images.imgMom2} alt="" />
            </div>
            <div className="max-w-[420px] scale-95 mt-[100px] duration-300 hover:scale-100">
              <img src={Images.imgMom3} alt="" />
            </div>
          </div>
        </div>

        <div className="container my-[60px]">
          <h1 className="text-2xl font-bold mb-[15px] text-[#ffaaaf]">
            FLASH SALE:{" "}
          </h1>

          <div className="flex flex-wrap gap-[27px] justify-between max-[1025px]:gap-[15px] max-[1025px]:justify-center">
            <div className="max-w-[310px] shadow shadow-[#ffaaaf]">
              <div className="relative figure">
                <img src={Images.flashSale1} alt="" />
                <div className="absolute right-[0] top-[0] py-[13px] px-[8px] bgFlashSale">
                  <p className="text-[16px] text-white text-center ">Giảm</p>
                  <span className="text-[32px] text-[#efd22b]">60%</span>
                </div>
              </div>

              <div className="p-[10px]">
                <p className="font-bold text-[16px] my-[3px] max-w-[268px]">
                  Bộ Máy Tính Case PC Chơi Game
                </p>
                <button>
                  <img src={Images.star1} alt="" />
                </button>
                <button>
                  <img src={Images.star1} alt="" />
                </button>
                <button>
                  <img src={Images.star1} alt="" />
                </button>
                <button>
                  <img src={Images.star1} alt="" />
                </button>
                <button>
                  <img src={Images.star2} alt="" />
                </button>
                <span className="text-[12px]">{4.2}</span>

                <div className="flex gap-[7px]">
                  <div className="text-[7px] font-normal max-w-[61px] coupon text-white p-[3px]">
                    <p>Giảm 1800k</p>
                  </div>
                  <div className="text-[7px] max-w-[61px] coupon text-white p-[3px]">
                    <p>FREE SHIP</p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-[16px] text-[#865546] font-bold">
                    1.300.299 vnd
                  </p>
                </div>
                <div className="max-w-[285px] mt-[20px] relative">
                  <Progess />
                  <img
                    className="absolute top-[-80%]"
                    src={Images.hot}
                    alt=""
                  />
                </div>
              </div>
            </div>

            <div className="max-w-[310px] shadow shadow-[#ffaaaf]">
              <div className="relative figure">
                <img src={Images.flashSale1} alt="" />
                <div className="absolute right-[0] top-[0] py-[13px] px-[8px] bgFlashSale">
                  <p className="text-[16px] text-white text-center ">Giảm</p>
                  <span className="text-[32px] text-[#efd22b]">60%</span>
                </div>
              </div>

              <div className="p-[10px]">
                <p className="font-bold text-[16px] my-[3px] max-w-[268px]">
                  Bộ Máy Tính Case PC Chơi Game
                </p>
                <button>
                  <img src={Images.star1} alt="" />
                </button>
                <button>
                  <img src={Images.star1} alt="" />
                </button>
                <button>
                  <img src={Images.star1} alt="" />
                </button>
                <button>
                  <img src={Images.star1} alt="" />
                </button>
                <button>
                  <img src={Images.star2} alt="" />
                </button>
                <span className="text-[12px]">{4.2}</span>

                <div className="flex gap-[7px]">
                  <div className="text-[7px] font-normal max-w-[61px] coupon text-white p-[3px]">
                    <p>Giảm 1800k</p>
                  </div>
                  <div className="text-[7px] max-w-[61px] coupon text-white p-[3px]">
                    <p>FREE SHIP</p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-[16px] text-[#865546] font-bold">
                    1.300.299 vnd
                  </p>
                </div>
                <div className="max-w-[285px] mt-[20px] relative">
                  <Progess />
                  <img
                    className="absolute top-[-80%]"
                    src={Images.hot}
                    alt=""
                  />
                </div>
              </div>
            </div>

            <div className="max-w-[310px] shadow shadow-[#ffaaaf]">
              <div className="relative figure">
                <img src={Images.flashSale1} alt="" />
                <div className="absolute right-[0] top-[0] py-[13px] px-[8px] bgFlashSale">
                  <p className="text-[16px] text-white text-center ">Giảm</p>
                  <span className="text-[32px] text-[#efd22b]">60%</span>
                </div>
              </div>

              <div className="p-[10px]">
                <p className="font-bold text-[16px] my-[3px] max-w-[268px]">
                  Bộ Máy Tính Case PC Chơi Game
                </p>
                <button>
                  <img src={Images.star1} alt="" />
                </button>
                <button>
                  <img src={Images.star1} alt="" />
                </button>
                <button>
                  <img src={Images.star1} alt="" />
                </button>
                <button>
                  <img src={Images.star1} alt="" />
                </button>
                <button>
                  <img src={Images.star2} alt="" />
                </button>
                <span className="text-[12px]">{4.2}</span>

                <div className="flex gap-[7px]">
                  <div className="text-[7px] font-normal max-w-[61px] coupon text-white p-[3px]">
                    <p>Giảm 1800k</p>
                  </div>
                  <div className="text-[7px] max-w-[61px] coupon text-white p-[3px]">
                    <p>FREE SHIP</p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-[16px] text-[#865546] font-bold">
                    1.300.299 vnd
                  </p>
                </div>
                <div className="max-w-[285px] mt-[20px] relative">
                  <Progess />
                  <img
                    className="absolute top-[-80%]"
                    src={Images.hot}
                    alt=""
                  />
                </div>
              </div>
            </div>

            <div className="max-w-[310px] shadow shadow-[#ffaaaf]">
              <div className="relative figure">
                <img src={Images.flashSale1} alt="" />
                <div className="absolute right-[0] top-[0] py-[13px] px-[8px] bgFlashSale">
                  <p className="text-[16px] text-white text-center ">Giảm</p>
                  <span className="text-[32px] text-[#efd22b]">60%</span>
                </div>
              </div>

              <div className="p-[10px]">
                <p className="font-bold text-[16px] my-[3px] max-w-[268px]">
                  Bộ Máy Tính Case PC Chơi Game
                </p>
                <button>
                  <img src={Images.star1} alt="" />
                </button>
                <button>
                  <img src={Images.star1} alt="" />
                </button>
                <button>
                  <img src={Images.star1} alt="" />
                </button>
                <button>
                  <img src={Images.star1} alt="" />
                </button>
                <button>
                  <img src={Images.star2} alt="" />
                </button>
                <span className="text-[12px]">{4.2}</span>

                <div className="flex gap-[7px]">
                  <div className="text-[7px] font-normal max-w-[61px] coupon text-white p-[3px]">
                    <p>Giảm 1800k</p>
                  </div>
                  <div className="text-[7px] max-w-[61px] coupon text-white p-[3px]">
                    <p>FREE SHIP</p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-[16px] text-[#865546] font-bold">
                    1.300.299 vnd
                  </p>
                </div>
                <div className="max-w-[285px] mt-[20px] relative">
                  <Progess />
                  <img
                    className="absolute top-[-80%]"
                    src={Images.hot}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <div className="w-full mx-auto my-60px] bg-[#ffeae9] ">
        <Container>
          <div className="py-[40px] backGroundImg flex justify-between max-[769px]:flex-col">
            <div className="max-w-[276px] max-[1025px]:hidden">
              <img src={Images.chooseUs1} alt="" />
            </div>
            <div className="max-w[444px]">
              <img src={Images.chooseUs2} alt="" />
            </div>
            <div className="flex-col max-w-[536px] max-[769px]:max-w-[700px]">
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

              <div className="max-w-[155px] text-[16px] bg-[#ffaaaf] flex text-white py-[13px] px-[25px] items-center justify-between rounded-lg">
                <button>Xem ngay</button>
                <Arrow />
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <div className="my-[60px] max-[769px]:hidden">
          <h1 className="text-2xl font-bold mb-[15px]">
            Thương hiệu nổi tiếng:{" "}
          </h1>

          <div className="flex justify-between">
            <div className="max-w-[310px] border-2 border-solid items-center border-[#E0E0E0] pt-[45px] px-[81px]">
              <img src={Images.thuongHieu1} alt="" />
            </div>
            <div className="max-w-[310px] border-2 border-solid border-[#E0E0E0] pt-[30px] px-[18px]">
              <img src={Images.thuongHieu2} alt="" />
            </div>
            <div className="max-w-[310px] border-2 border-solid border-[#E0E0E0] pt-[33px] px-[18px]">
              <img src={Images.puma} alt="" />
            </div>
            <div className="max-w-[310px] border-2 border-solid border-[#E0E0E0] p-[18px]">
              <img src={Images.adidas} alt="" />
            </div>
          </div>
        </div>

        <div className="container my-[60px]">
          <h1 className="text-2xl font-bold mb-[15px]">Gợi ý sản phẩm: </h1>

          <div className="flex flex-wrap gap-3 max-2xl:ml-0 max-2xl:flex-wrap max-lg:gap-4">
            {product.map((product) => {
              return <Productss product={product} />;
            })}
          </div>
        </div>
      </Container>
    </>
  );
}

export default Index;
