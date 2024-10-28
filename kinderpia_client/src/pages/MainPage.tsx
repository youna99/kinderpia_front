import React, { useEffect, useState } from 'react';
import PlaceList from '../components/common/PlaceList';
import { PlaceListInfo } from '../types/placelist';
import { MettingListInfo } from '../types/meetinglist';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../styles/MainPage.scss';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import MeetingList from '../components/common/MeetingList';
import { set } from 'react-hook-form';

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

const dummyMeetingList: MettingListInfo[] = [
  {
    title: '에버랜드 같이 가요~!',
    category: '오락 & 여가',
    location: '용산구',
    selectedDate: '2024-10-30',
    selectedTime: '10:00',
    writer: '글쓴이',
    participants: 5,
    meetingStatus: '모집중',
  },
  {
    title: '롯데월드 방문해요!',
    category: '오락 & 여가',
    location: '송파구',
    selectedDate: '2024-11-02',
    selectedTime: '14:00',
    writer: '여행 매니아',
    participants: 8,
    meetingStatus: '인원마감',
  },
  {
    title: '서울숲 피크닉',
    category: '자연 & 환경',
    location: '성동구',
    selectedDate: '2024-11-05',
    selectedTime: '12:00',
    writer: '자연 사랑',
    participants: 6,
    meetingStatus: '모임종료',
  },
  {
    title: '63빌딩 전망대 가요!',
    category: '체험 & 활동',
    location: '영등포구',
    selectedDate: '2024-11-07',
    selectedTime: '15:00',
    writer: '전망러',
    participants: 4,
    meetingStatus: '모집중',
  },
  {
    title: '국립중앙박물관 탐방',
    category: '교육 & 문화',
    location: '용산구',
    selectedDate: '2024-11-10',
    selectedTime: '11:00',
    writer: '문화인',
    participants: 10,
    meetingStatus: '모집중',
  },
];

function MainPage() {
  const [placeList, setPlaceList] = useState<PlaceListInfo[]>([]); // 장소 목록 관리
  const [meetingList, setMeetingList] = useState<MettingListInfo[]>([]); // 모임 목록 관리

  useEffect(() => {
    setPlaceList(dummyPlaceList);
    setMeetingList(dummyMeetingList);
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
      <section>
        <div className="headline-container">
          <h2 className="title">신규 모임</h2>
          <div className="more">더보기</div>
        </div>
        {meetingList.slice(0, 3).map((meeting) => (
          <MeetingList
            title={meeting.title}
            category={meeting.category}
            location={meeting.location}
            selectedDate={meeting.selectedDate}
            selectedTime={meeting.selectedTime}
            writer={meeting.writer}
            participants={meeting.participants}
            meetingStatus={meeting.meetingStatus}
          />
        ))}
      </section>
    </>
  );
}

export default MainPage;
