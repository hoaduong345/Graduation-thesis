
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Images } from '../../../../Assets/TS';

export default function Slides() {
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
          <img src={Images.bannerHome} alt="" />

        </SwiperSlide>
        <SwiperSlide>
          <img src={Images.bannerHome} alt="" />

        </SwiperSlide>
        <SwiperSlide>
          <img src={Images.bannerHome} alt="" />

        </SwiperSlide>
      </Swiper>
    </>
  );
}
