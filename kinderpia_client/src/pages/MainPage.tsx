import React, { useEffect, useState } from 'react';
import PlaceList from '../components/common/PlaceList';
import { PlaceListInfo } from '../types/placelist';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../styles/MainPage.scss';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

const dummyPlaceList: PlaceListInfo[] = [
  {
    placeid: 1,
    title: '에버랜드',
    category: '오락 및 여가',
    rating: 4.5,
    priceType: '유료',
    image: 'url',
  },
  {
    placeid: 2,
    title: '롯데월드',
    category: '오락 및 여가',
    rating: 4.3,
    priceType: '유료',
    image: 'url',
  },
  {
    placeid: 3,
    title: '서울숲',
    category: '자연 및 환경',
    rating: 4.7,
    priceType: '무료',
    image: 'url',
  },
  {
    placeid: 4,
    title: '63빌딩',
    category: '체험 및 활동',
    rating: 4.2,
    priceType: '유료',
    image: 'url',
  },
  {
    placeid: 5,
    title: '국립중앙박물관',
    category: '교육 및 문화',
    rating: 4.6,
    priceType: '무료',
    image: 'url',
  },
];

function MainPage() {
  const [placeList, setPlaceList] = useState<PlaceListInfo[]>([]);

  useEffect(() => {
    setPlaceList(dummyPlaceList);
  }, []);

  return (
    <>
      <section className="introduce">소개글</section>
      <section className="placelist-container">
        <div className="headline-container">
          <h2 className="title">인기 장소</h2>
          <div className="more">더보기</div>
        </div>
        <Swiper
          slidesPerView={2.5}
          spaceBetween={30}
          modules={[Pagination]}
          className="swiper"
        >
          {placeList.map((place) => (
            <SwiperSlide key={place.placeid}>
              <PlaceList
                key={place.placeid}
                placeid={place.placeid}
                title={place.title}
                category={place.category}
                rating={place.rating}
                priceType={place.priceType}
                image={place.image}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
}

export default MainPage;
