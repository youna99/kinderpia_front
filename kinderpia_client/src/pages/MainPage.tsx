import React, { useEffect, useState } from 'react';
import PlaceList from '../components/common/PlaceList';
import MeetingList from '../components/common/MeetingList';
import { PlaceListInfo } from '../types/placelist';
import { MettingListInfo } from '../types/meetinglist';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';
import { getPlace } from '../api/placelist';
import { getMeeting } from '../api/meetinglist';
import '../styles/MainPage.scss';

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
    meetingid: 1,
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
    meetingid: 2,
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
    meetingid: 3,
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
    meetingid: 4,
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
    meetingid: 5,
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

  // GET) 장소목록데이터 가져오기
  const getPlaceList = async () => {
    try {
      const data = await getPlace({
        sort: 'star',
        page: 1,
        limit: 5,
      });
      setPlaceList(data);
    } catch (error) {
      console.log('장소목록 가져오는 중 에러 발생!: ', error);
    }
  };

  // GET) 모임목록데이터 가져오기
  const getMeetingList = async () => {
    try {
      const data = await getMeeting({
        sort: 'default',
        page: 1,
        limit: 3,
        keyword: '',
      });
      setMeetingList(data);
    } catch (error) {
      console.log('모임목록 가져오는 중 에러 발생!', error);
    }
  };

  useEffect(() => {
    setPlaceList(dummyPlaceList);
    setMeetingList(dummyMeetingList);
    // getPlaceList();
    // getMeetingList();
  }, []);

  return (
    <section className="main">
      <section className="introduce">소개글</section>
      <section className="placelist-container">
        <div className="headline-container">
          <div className="title-container">
            <h2 className="title">인기 장소</h2>
            <p className="add">아이들과 함께 특별한 하루를 만들어보세요!</p>
          </div>
          <div className="more">더보기</div>
        </div>
        <Swiper
          slidesPerView={2.5}
          spaceBetween={30}
          modules={[Pagination]}
          navigation={true}
          breakpoints={{
            640: {
              slidesPerView: 5,
              spaceBetween: 10,
            },
          }}
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
      <section className="meetinglist-container">
        <div className="headline-container">
          <div className="title-container">
            <h2 className="title">신규 모임</h2>
            <p className="add">
              다양한 가족들과 함께하는 특별한 시간, 지금 시작해 보세요!
            </p>
          </div>
          <Link to={'/meeting'}>
            <div className="more">더보기</div>
          </Link>
        </div>
        <div className="meetingcard">
          {meetingList.slice(0, 4).map((meeting) => (
            <MeetingList
              key={meeting.meetingid}
              meetingid={meeting.meetingid}
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
        </div>
      </section>
    </section>
  );
}

export default MainPage;
