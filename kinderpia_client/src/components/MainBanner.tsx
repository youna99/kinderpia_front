import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';

export const MainBanner = () => {
  return (
    <section className="introduce">
      <Swiper
        pagination={{
          clickable: true,
          type: 'fraction',
        }}
        navigation={true}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Link to={'/user/login'}>
            <img src="/images/banner1.png" alt="" className="banner-img" />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to={'/place'}>
            <img src="/images/banner2.png" alt="" className="banner-img" />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to={'/meeting'}>
            <img src="/images/banner3.png" alt="" className="banner-img" />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to={'/place'}>
            <img src="/images/banner4.png" alt="" className="banner-img" />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to={'/user/login'}>
            <img src="/images/banner5.png" alt="" className="banner-img" />
          </Link>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};
