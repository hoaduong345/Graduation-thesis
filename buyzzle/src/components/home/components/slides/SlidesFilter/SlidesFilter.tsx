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

export default function SlidesFilter() {
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
        <SwiperSlide>
          <img src={Images.banner} alt="" />
        </SwiperSlide>

        <SwiperSlide>
          <img src={Images.banner1} alt="" />
        </SwiperSlide>

        <SwiperSlide>
          <img src={Images.bannerFilter} alt="" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
