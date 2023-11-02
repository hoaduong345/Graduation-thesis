import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Images } from "../../../../../Assets/TS";
import Container from "../../../../../components/container/Container";
import { appConfig } from "../../../../../configsEnv";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { Button, IconButton } from "@material-tailwind/react";
import { toast } from "react-toastify";
import ArrowDown from "../../../../../Assets/TSX/ArrowDown";
import ArrowUp from "../../../../../Assets/TSX/ArrowUp";
import Minus from "../../../../../Assets/TSX/Minus";
import Plus from "../../../../../Assets/TSX/Plus";
import {
  ModelCart,
  cartControllers,
} from "../../../../../Controllers/CartControllers";
import { productController } from "../../../../../Controllers/ProductsController";
import { RatingAndCommentController } from "../../../../../Controllers/Rating&Comment";
import { numberFormat, roundedNumber } from "../../../../../Helper/Format";
import { stars } from "../../../../../Helper/StarRating/Star";
import { Rate, Ratee, Rating, Row } from "../../../../../Model/ProductModel";
import RateDetailCMT from "../../../../../components/Sitebar/Rate/RateDetailCMT";
import { useCart } from "../../../../../hooks/Cart/CartContextProvider";
import { ThemeContext } from "../../../../../hooks/Context/ThemeContextProvider";
import { useScroll } from "../../../../../hooks/Scroll/useScrollPages";
import Cart from "../../../Admin/Assets/TSX/Cart";
import FB from "../../../Admin/Assets/TSX/FB";
import Insta from "../../../Admin/Assets/TSX/Insta";
import LoveProduct from "../../../Admin/Assets/TSX/LoveProduct";
import SaveLink from "../../../Admin/Assets/TSX/SaveLink";
import Share from "../../../Admin/Assets/TSX/Share";
import TW from "../../../Admin/Assets/TSX/TW";
import DetailRecommandProduct from "./DetailRecommandProduct";
import { Products } from "../../FilterPage/FiltersPage";
import RatingMap from "../RatingAndComments/RatingMap";


export interface ImgOfProduct {
  url: string;
}
[];

export type FormValues = {
  idproduct: number;
  name: string;
  price: number;
  description: string;
  discount: number;
  quantity: number;
  count: number;
  ProductImage: ImgOfProduct[];
  id: number;
  iduser: number;
  ratingValue: number;
  comment: string;
  createdAt: Date;
  product: {
    quantity: number;
  };
  user: {
    username: string;
  };
};
export type Product = {
  id: number;
  imgSrc: string;
  title: string;
  price: number;
  discount: number;
  soldCount: number;
};
export interface RatingStarDetail {
  checked: boolean;
  rating: number;
  onChangeFilter?(rating: number): void;
}
const arrRating: RatingStarDetail[] = [
  { checked: false, rating: 5 },
  { checked: false, rating: 4 },
  { checked: false, rating: 3 },
  { checked: false, rating: 2 },
  { checked: false, rating: 1 },
];
export interface EditImage {
  url: string;
  id: number;
}
export default function DetailsProduct() {
  const { carts, addProduct } = useCart();
  console.log(
    "🚀 ~ file: DetailsProduct.tsx:112 ~ DetailsProduct ~ carts 123:",
    carts
  );

  const [first, setfirst] = useState<Rate | undefined>(undefined);
  const [selectedRating, setSelectedRating] = useState(0);
  const [editImages, setEditImages] = useState<EditImage[]>([]);
  const [rateAndcomment, setRateAndcomment] = useState<Ratee>();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("descriptions"); // Mặc định là tab "App"

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };
  // Điều này giả định rằng bạn có một hàm hoặc cách nào đó để lấy giá trị `averageRating` từ `first`
  useEffect(() => {
    if (first) {
      setSelectedRating(roundedNumber(first.averageRating));
    }
  }, [first]);
  const [quantity, setQuantity] = useState(1);
  const [recommandProduct, setRecommandProduct] = useState<Row[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [url, setUrl] = useState<string[]>([]);

  const { id } = useParams();
  console.log(id);

  const getDetailProduct = async () => {
    await axios
      .get(`${appConfig.apiUrl}/chitietproduct/${id}`)
      .then((detail) => {
        return detail;
      })
      .then((detail) => {
        // setEditImages(detail.data);
        setfirst(detail.data);
      })
      .catch((error) => {
        console.log("🚀 ~ file: Detailproducts.tsx:63 ~ .then ~ error:", error);
      });
  };
  //
  useEffect(() => {
    getDetailProduct();
    useScroll();
    RecommandProductDetailPage(Number(id));
  }, [id]);

  useEffect(() => {
    if (!id) return;
    getComment(Number(id));
    getDetailProduct();
    RecommandProductDetailPage(Number(id));
  }, [currentPage]);

  const plusQuantity = () => {
    setQuantity(quantity + 1);
  };
  const minusQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const getCommentWhereRating = (idproduct: any, rating: any) => {
    RatingAndCommentController
      .getCommentWhereRating(idproduct, rating)
      .then((res: any) => {
        setRateAndcomment(res);
        console.log("CCCCCCCCCCCCCCCCCCCCCCc:" + JSON.stringify(rateAndcomment));
      }).catch((err) => {
        console.log(err);
      });

  }
  const HandleGetCommentWhereRating = (rating: any) => {
    const idproduct = id;
    console.log("IDDDDDDDDDDDD:" + id);
    getCommentWhereRating(idproduct, rating);
  }

  const RecommandProductDetailPage = (id: number) => {
    console.log(
      "🚀 ~ file: Detailproducts.tsx:76 ~ RecommandProductDetailPage ~ id:",
      id
    );
    productController
      .getProductSuggest(id)
      .then((res: any) => {
        getComment(id);
        setRecommandProduct(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getComment = (id: number) => {
    console.log("🚀 ~ file: DetailsProduct.tsx:176 ~ getComment ~ id:", id);
    RatingAndCommentController.getRatingAndComment(id, currentPage, 2).then(
      (res: any) => {
        setRateAndcomment(res);
      }
    );
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
  //Sửa đánh giá
  const handleEditProductRating = async (
    id: string,
    data: Rating,
    idRating: number
  ) => {
    await RatingAndCommentController.EditRatingAndComment(idRating, data)
      .then(async (res) => {
        toast.success("Đánh giá thành công !");
        const _rateAndComment = rateAndcomment?.Rating.map((item) => {
          if (item.id === res.data?.id) {
            return {
              ...item,
              comment: res.data?.comment,
              ratingValue: res.data?.ratingValue,
            };
          }
          return item;
        });
        setRateAndcomment((prevRateAndcomment: any) => {
          const newRateAndcomment = {
            ...prevRateAndcomment,
            Rating: _rateAndComment,
          };
          return newRateAndcomment;
        });
        getDetailProduct();
      })
      .catch(() => {
        toast.error("Đánh giá thất bại !");
      });
    console.log("Sửa bình luận!");
  };
  useEffect(() => {
    handleRemoveRating(Number(id));
  }, [first]);
  //Xóa comment
  const handleRemoveRating = (id: number) => {
    console.log(
      "🚀 ~ file: DetailsProduct.tsx:235 ~ handleRemoveRating ~ id:",
      id
    );
    RatingAndCommentController.RemoveRatingAndComment(id).then((_) => {
      if (rateAndcomment) {
        const removedRatings = rateAndcomment.Rating.filter(
          (rating) => rating.id !== id
        );
        setRateAndcomment({
          ...rateAndcomment,
          Rating: removedRatings,
        });
        getDetailProduct();
        // RecommandProductDetailPage(id);
      }
    });
    // getDetailProduct()
    RecommandProductDetailPage(id);
  };

  console.log(
    "🚀 ~ file: DetailsProduct.tsx:550 ~ DetailsProduct ~ first?.totalRatings:",
    rateAndcomment?.totalRatings
  );

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  return (
    <>
      <Container>
        <body className="body-detail container mx-auto">
          <div className="grid gap-4 grid-cols-10 mt-24">
            <div className="col-span-4">
              {/* <img
                className="w-[533px] h-[388px] object-cover"
                src={first?.productDetail?.ProductImage[selectedImageIndex].url}
                alt=""
              /> */}
              {first?.productDetail && (
                <div>
                  <img
                    className="w-[533px] h-[388px] object-cover"
                    src={
                      first?.productDetail?.ProductImage?.[selectedImageIndex]
                        ?.url
                    }
                    alt=""
                  />
                </div>
              )}
            </div>
            <div>
              <div>
                <div className="col-span-2 grid grid-rows-4 grid-flow-col gap-3 relative ">
                  <div
                    className="cursor-pointer absolute border-[1px] left-[20%] 
                                    px-4 py-2 w-11 opacity-50 bg-[#CACACD] border-[#EA4B48] rounded-md top-[-17px] 
                                    "
                    onClick={() => handleImageClick(selectedImageIndex - 1)}
                  >
                    <ArrowUp />
                  </div>
                  {/* {
                    // first?.ProductImage.filter( e)
                    first?.productDetail.ProductImage.slice(1, 5).map(
                      (e, index) => {
                        return (
                          <img
                            key={index}
                            className="h-[88px] w-[88px]"
                            src={e.url}
                            alt=""
                            onClick={() => handleImageClick(index + 1)}
                          />
                        );
                      }
                    )
                  } */}
                  {first?.productDetail &&
                    first.productDetail.ProductImage &&
                    first.productDetail.ProductImage.slice(1, 5).map(
                      (e, index) => {
                        return (
                          <img
                            key={index}
                            className="h-[88px] w-[88px]"
                            src={e.url}
                            alt=""
                            onClick={() => handleImageClick(index + 1)}
                          />
                        );
                      }
                    )}

                  {/* {first?.productDetail && first.productDetail.ProductImage
                    ? first.productDetail.ProductImage.slice(1, 5).map(
                        (e, index) => {
                          return (
                            <img
                              key={index}
                              className="h-[88px] w-[88px]"
                              src={e.url}
                              alt=""
                              onClick={() => handleImageClick(index + 1)}
                            />
                          );
                        }
                      )
                    : null} */}
                  <div
                    className="cursor-pointer absolute border-[1px] left-[20%] 
                              px-4 pb-[7.5px] pt-[8px] w-11 opacity-50 bg-[#CACACD] border-[#EA4B48] rounded-md bottom-[-17px] 
                                    "
                  >
                    <ArrowDown />
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="col-span-4">
              <img
                className="w-[533px] h-[388px] object-cover"
                src={first?.productDetail.ProductImage[selectedImageIndex]?.url}
                alt=""
              />
              <div>
                <div>
                  <div className="col-span-2 grid grid-rows-4 grid-flow-col gap-3 relative ">
                    <div
                      className="cursor-pointer absolute border-[1px] left-[20%] px-4 py-2 w-11 opacity-50 bg-[#CACACD] border-[#EA4B48] rounded-md top-[-17px] "
                      onClick={() => handleImageClick(selectedImageIndex - 1)}
                    >
                      <ArrowUp />
                    </div>
                    {first?.productDetail.ProductImage.slice(1, 5).map(
                      (e, index) => (
                        <img
                          key={index}
                          className="h-[88px] w-[88px]"
                          src={e.url}
                          alt=""
                          onClick={() => handleImageClick(index + 1)}
                        />
                      )
                    )}
                    <div
                      className="cursor-pointer absolute border-[1px] left-[20%] px-4 pb-[7.5px] pt-[8px] w-11 opacity-50 bg-[#CACACD] border-[#EA4B48] rounded-md bottom-[-17px]"
                      onClick={() => handleImageClick(selectedImageIndex + 1)}
                    >
                      <ArrowDown />
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            <div className="col-span-5 ">
              <p className="text-[32px] text-[#393939] font-medium leading-9">
                {/* {first?.productDetail.name} */}
                {first?.productDetail ? (
                  <p className="text-[32px] text-[#393939] font-medium leading-9">
                    {first.productDetail.name}
                  </p>
                ) : null}
              </p>
              {/* Thống kê */}
              <div className="grid grid-cols-4 mt-8">
                <div className="flex col-span-1 gap-4">
                  {/* <p className="text-[#1A1A1A] text-base">(100)</p> */}
                  {/* rating  */}
                  <div>
                    <div className="flex items-center justify-start gap-2 ">
                      <div className="rating rating-xs">
                        {stars.map((_, index) => (
                          <button key={index}>
                            {/* Sử dụng index để xác định xem sao này có phải sao màu vàng hay không */}
                            <img
                              src={
                                index < selectedRating
                                  ? Images.star1
                                  : Images.star2
                              }
                              alt=""
                            />
                          </button>
                        ))}
                      </div>
                      <p className="text-[#EA4B48] text-sm">
                        {roundedNumber(selectedRating)}.0
                      </p>
                    </div>
                  </div>
                  <div className="border-r-2 border-[#E0E0E0]"></div>
                </div>
                <div className="flex ml-1 gap-2">
                  <div>
                    <p className="text-[#1A1A1A] text-base">
                      {/* {first?.Rating.length} */}
                      {first?.Rating ? (
                        <p className="text-[#1A1A1A] text-base">
                          {first.Rating.length}
                        </p>
                      ) : null}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#4C4C4C] text-sm mt-[2px] mr-1">
                      Đánh giá
                    </p>
                  </div>
                  <div className="border-r-2 border-[#E0E0E0]"></div>
                </div>

                {/* <div className="flex col-span-1 ml-[-38px] gap-2 items-center">
                  <div>
                    <p className="text-[#1A1A1A] text-base">
                      {first?.productDetail.soldcount > 0
                        ? first?.productDetail.soldcount
                        : 0}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#4C4C4C] text-sm">Đã bán</p>
                  </div>
                </div> */}
                {first?.productDetail ? (
                  <div className="flex col-span-1 ml-[-38px] gap-2 items-center">
                    {first.productDetail.soldcount > 0 ? (
                      <>
                        <div>
                          <p className="text-[#1A1A1A] text-base">
                            {first.productDetail.soldcount}
                          </p>
                        </div>
                        <div>
                          <p className="text-[#4C4C4C] text-sm">Đã bán</p>
                        </div>
                      </>
                    ) : null}
                  </div>
                ) : null}
              </div>
              {/* end Thống kê */}
              {/* bachground price */}
              <div className="w-[100%] bg-[#F8F8F8] rounded-md mt-6 px-6 py-[14px]">
                <div className="flex justify-between">
                  <div>
                    {/* <div className="items-center flex">
                      <p className="text-[36px] text-[#EA4B48] font-bold ">
                        {numberFormat(
                          first?.productDetail.price! -
                            first?.productDetail.price! *
(first?.productDetail.discount! / 100)
                        )}
                      </p>
                      <p className="text-sm font-normal ml-3 text-[#7A828A] line-through">
                        {numberFormat(first?.productDetail.price!)}đ
                      </p>
                    </div> */}
                    {first?.productDetail ? (
                      <div className="items-center flex">
                        <p className="text-[36px] text-[#EA4B48] font-bold ">
                          {numberFormat(
                            first?.productDetail.price! -
                            first?.productDetail.price! *
                            (first?.productDetail.discount! / 100)
                          )}
                        </p>
                        <p className="text-sm font-normal ml-3 text-[#7A828A] line-through">
                          {numberFormat(first.productDetail.price)}đ
                        </p>
                      </div>
                    ) : null}
                    {/* <div className="bg-[#f9e9e9] rounded-[30px] max-w-max mt-[5px]">
                      <p className="text-[#EA4B48] px-[10px] py-1">
                        Giảm {first?.productDetail.discount}%
                      </p>
                    </div> */}
                    {first?.productDetail ? (
                      <div className="bg-[#f9e9e9] rounded-[30px] max-w-max mt-[5px]">
                        <p className="text-[#EA4B48] px-[10px] py-1">
                          Giảm {first.productDetail.discount}%
                        </p>
                      </div>
                    ) : null}
                  </div>
                  {/* Tăng giảm số lượng */}
                  <div className=" flex items-center ">
                    {/* Giảm số lượng */}
                    <div
                      className="border-[2px] border-[#FFAAAF] rounded-md bg-white px-[5px] py-[3px]"
                      onClick={minusQuantity}
                    >
                      <Minus />
                    </div>
                    {/* end Giảm số lượng */}
                    {/* Số lượng */}
                    <div>
                      <p className="text-base mx-2 font-medium">{quantity}</p>
                    </div>
                    {/* end Số lượng */}
                    {/* Tăng số lượng */}
                    <div
                      className="border-[2px] border-[#FFAAAF] rounded-md bg-white px-[5px] py-[3px]"
                      onClick={plusQuantity}
                    >
                      <Plus />
                    </div>
                    {/* end Tăng số lượng */}
                  </div>
                  {/* end Tăng giảm số lượng */}
                </div>
              </div>{" "}
              {/* bachground price */}
              {/* icon */}
              <div className="w-[100%] flex mt-9 px-5 items-center justify-between">
                <div className="flex gap-2">
                  <FB />
                  <TW />
                  <Insta />
                  <SaveLink />
                </div>
                <div>
                  <Share />
                </div>
              </div>
              {/* end icon */}
              {/* Mua ngay */}
              <div className="w-[100%] flex mt-9 px-5 items-center gap-6">
                <div>
                  <LoveProduct />
                </div>
                <div className="flex items-center w-[268px] rounded-md h-[58px] hover:bg-[#FFEAE9] transition duration-150 border-[#FFAAAF] border-[1px] justify-evenly cursor-pointer">
                  <button
                    onClick={() => {
                      // addCart({
                      //   id: Number(id),
                      //   productId: Number(id),
                      //   quantity: quantity,
                      // })

                      addProduct(Number(id), quantity);
                    }}
                    className="text-center text-base font-bold text-[#4C4C4C] "
                  >
                    Thêm Vào Giỏ Hàng
                  </button>
                  <Cart />
                </div>
                <div
                  className=" flex items-center w-[268px] rounded-md h-[58px] hover:bg-[#ff6d65]
                                transition duration-150 bg-[#EA4B48] justify-evenly cursor-pointer"
                >
                  <button className="text-center text-base font-bold text-white ">
                    Mua ngay
                  </button>
                </div>
              </div>
              {/* end Mua ngay */}
            </div>
          </div>
          {/* Sản phẩm của shop */}
          <div className="grid grid-cols-3 mt-24">
            <div className="col-span-1 ">
              <p className="text-[#4C4C4C] text-xl font-semibold mb-4">
                SẢN PHẨM CỦA SHOP
              </p>
              <img src={Images.BannerQC} alt="BannerQC" />
            </div>
            <div className="mt-11 col-span-2 ">
              <div className="flex flex-wrap gap-3 ">
                {recommandProduct.slice(0, 8).map((items) => {
                  console.log(
                    "🚀 ~ file: Detailproducts.tsx:247 ~ recommandProduct?.rows?.map ~ itemsssss:",
                    items
                  );
                  return (
                    <>
                      <DetailRecommandProduct productRecommand={items} />
                    </>
                  );
                })}
              </div>
            </div>
          </div>
          {/* end Sản phẩm của shop */}
        </body>
      </Container>
      <Container>
        {/* Chi tiết và đánh giá */}
        <div className="justify-center gap-6 flex mt-10">
          <div>
            <a
              className={`text-[#1A1A1A] uppercase text-base cursor-pointer${activeTab === "descriptions"
                ? "active cursor-pointer font-semibold border-b-[1px] border-[#1A1A1A]"
                : ""
                }`}
              onClick={() => handleTabClick("descriptions")}
              role="tab"
              aria-selected={activeTab === "descriptions" ? "true" : "false"}
              aria-controls="descriptions"
            >
              <span className="ml-1">Chi tiết sản phẩm</span>
            </a>
          </div>
          <div>
            <a
              className={`text-[#1A1A1A] uppercase text-base cursor-pointer${activeTab === "Rating"
                ? "active cursor-pointer font-semibold border-b-[1px] border-[#1A1A1A]"
                : ""
                }`}
              onClick={() => handleTabClick("Rating")}
              role="tab"
              aria-selected={activeTab === "Rating" ? "true" : "false"}
              aria-controls="Rating"
            >
              <span className="ml-1">Đánh giá</span>
            </a>
          </div>
        </div>
      </Container>
      <div className="border-[1px] border-[#E0E0E0] mt-[-2px]"></div>
      <Container>
        <div data-tab-content className="p-5">
          <div
            className={` ${activeTab === "descriptions" ? "visible" : "hidden"
              }`}
            id="descriptions"
            role="tabpanel"
          >
            <div
              className="px-[113px] py-[78px] text-sm break-all"
              dangerouslySetInnerHTML={{
                __html: first?.productDetail?.description as any,
              }}
            ></div>
          </div>
          <div
            className={` ${activeTab === "Rating" ? "visible" : "hidden"}`}
            id="Rating"
            role="tabpanel"
          >
            {/* <Rating /> */}
            <div className="mt-5 ">
              <div className="grid gap-4 grid-cols-3">
                {/* Left Comment */}
                <div className="col-span-2 ">
                  <div>
                    <RatingMap
                      handleEditProductRating={handleEditProductRating}
                      rateAndcomment={rateAndcomment!}
                      editImages={editImages!}
                      handleRemoveRating={handleRemoveRating}
                    />
                  </div>
                  { }
                  <div className="pagination">
                    <div className="flex">
                      <Button
                        variant="text"
                        // className="flex items-center gap-2"
                        className={`${currentPage == 1
                          ? `hidden`
                          : `flex items-center gap-2`
                          }`}
                        onClick={prev}
                      >
                        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />{" "}
                        Previous
                      </Button>
                      {[...new Array(rateAndcomment?.totalRatings)].map(
                        (item, index) => {
                          const page = index + 1;
                          console.log(item);
                          return (
                            <>
                              <IconButton
                                className="bg-none"
                                {...getItemProps(page)}
                              >
                                <p className="ml-[-2px] text-sm">{page}</p>
                              </IconButton>
                            </>
                          );
                        }
                      )}
                      <Button
                        variant="text"
                        className={`${currentPage == rateAndcomment?.totalRatings
                          ? "hidden"
                          : "flex items-center gap-2"
                          }`}
                        onClick={next}
                      >
                        Next
                        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  {/* ///////////////////////////////////////////////////// */}
                </div>
                {/* end Left Comment */}
                {/* Right rating */}
                <div>
                  <div
                    className="col-span-1 w-[312px] h-auto p-4 float-right
                        shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
                  >
                    <div className="py-5">
                      <p className="text-[#1A1A1A] text-xl text-center font-medium">
                        Tìm Kiếm
                      </p>
                      <div className="rate flex justify-center mt-3">
                        <div className="mt-3">
                          {arrRating.map((item, index) => {
                            return (
                              <RateDetailCMT
                                key={index}
                                checked={item.checked}
                                rating={item.rating}
                                onChangeFilter={(rating) => {
                                  console.log("Ratting:" + rating)
                                  HandleGetCommentWhereRating(rating);
                                }}
                              />
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* end Right rating */}
              </div>
            </div>
          </div>
        </div>
      </Container>
      <div className="border-[2px] mt-[70px] border-[#EA4B48]"></div>
      <Container>
        <div className="container my-[60px]">
          <h1 className="text-2xl font-bold mb-[15px]">Gợi ý sản phẩm: </h1>
          <div className="mt-11 col-span-2 ">
            <div className="flex flex-wrap gap-3 ">
              {recommandProduct.map((items) => {
                console.log(
                  "🚀 ~ file: Detailproducts.tsx:247 ~ recommandProduct?.rows?.map ~ itemsssss:",
                  items
                );
                return (
                  <>
                    <DetailRecommandProduct productRecommand={items} />
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}