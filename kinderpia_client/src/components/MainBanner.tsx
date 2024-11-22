import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Autoplay } from 'swiper/modules';
import { Link, To, useNavigate } from 'react-router-dom';
import { getJwtFromCookies } from '../utils/extractUserIdFromCookie';

export const MainBanner = () => {
  const navigate = useNavigate();

  const handleBannerClick = (path: To) => {
    const jwt = getJwtFromCookies();
    if (jwt) {
      navigate('/');
    } else {
      navigate(path);
    }
  };

  return (
    <section className="introduce">
      <Swiper
        pagination={{
          clickable: true,
          type: 'fraction',
        }}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide onClick={() => handleBannerClick('/user/login')}>
          <img src="/images/banner1.png" alt="" className="banner-img" />
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
        <SwiperSlide onClick={() => handleBannerClick('/user/login')}>
          <img src="/images/banner5.png" alt="" className="banner-img" />
        </SwiperSlide>
      </Swiper>
    </section>
  );
};
