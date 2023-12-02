// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./stylesFilter.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Images } from "../../../../../assets/TS";
import { useEffect, useState } from "react";
import { BannerModel } from "../../../../../model/BannerModel";
import { bannerController } from "../../../../../controllers/BannerController";




export default function SlidesFilter() {
const [banner, setBanner] = useState<BannerModel[]>([]);

  const getAllBaner = async () => {
    await bannerController.getAll().then((res: any) => {
      setBanner(res);
    });
  };
  
  useEffect(() => {
    getAllBaner();
  }, []);
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {banner?.map((items) => {
          return (
            <>
              <SwiperSlide>
                <img src={items.image} alt="" />
              </SwiperSlide>
            </>
          );
        })}
      </Swiper>
    </>
  );
}
{

}
