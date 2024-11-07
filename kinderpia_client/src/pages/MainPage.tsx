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
import { getPlaces } from '../api/placelist';
import { getMeetingListOpen } from '../api/meetinglist';
import '../styles/MainPage.scss';
import { MainBanner } from '../components/MainBanner';
import { formatDetailDate } from '../utils/formatDate';

function MainPage() {
  const [placeList, setPlaceList] = useState<PlaceListInfo[]>([]); // 장소 목록 관리
  const [meetingList, setMeetingList] = useState<MettingListInfo[]>([]); // 모임 목록 관리

  // GET) 장소목록데이터 가져오기
  const getPlaceList = async () => {
    try {
      const data = await getPlaces({
        // sort: 'star',
        page: 0,
        size: 8,
      });
      console.log(`place data>>>>`, data.data.content);

      setPlaceList(data.data.content);
    } catch (error) {
      console.log('장소목록 가져오는 중 에러 발생!: ', error);
    }
  };

  // GET) 모임목록데이터 가져오기
  const getMeetingList = async () => {
    try {
      const data = await getMeetingListOpen({
        // sort: 'open',
        // page: 1,
        // size: 3,
      });
      console.log('meetingdata >>>>', data.data.dataList);

      setMeetingList(data.data.dataList);
    } catch (error) {
      console.log('모임목록 가져오는 중 에러 발생!', error);
    }
  };

  useEffect(() => {
    getPlaceList();
    getMeetingList();
  }, []);

  return (
    <section id="main">
      <MainBanner />
      <section className="placelist-container">
        <div className="headline-container">
          <div className="title-container">
            <h2 className="title">인기 장소</h2>
            <p className="add">아이들과 함께 특별한 하루를 만들어보세요!</p>
          </div>
          <Link to={'/place'}>
            <div className="more">더보기</div>
          </Link>
        </div>
        <Swiper
          slidesPerView={2.5}
          spaceBetween={10}
          modules={[Pagination]}
          navigation={true}
          breakpoints={{
            640: {
              slidesPerView: 5,
              spaceBetween: 30,
            },
          }}
          className="swiper"
        >
          {placeList.map((place) => (
            <SwiperSlide key={place.placeId}>
              <PlaceList
                key={place.placeId}
                placeId={place.placeId}
                placeName={place.placeName}
                placeCtgName={place.placeCtgName}
                averageStar={place.averageStar}
                paid={place.paid}
                placeImg={place.placeImg}
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
          {meetingList.length === 0 ? (
            <p className="no-meeting">모임이 없습니다.</p>
          ) : (
            meetingList
              .slice(0, 4)
              .map((meeting) => (
                <MeetingList
                  key={meeting.meetingId}
                  meetingId={meeting.meetingId}
                  meetingTitle={meeting.meetingTitle}
                  meetingCategory={meeting.meetingCategory}
                  createdAt={meeting.createdAt}
                  district={meeting.district}
                  meetingLocation={meeting.meetingLocation}
                  meetingTime={formatDetailDate(meeting.meetingTime)}
                  nickname={meeting.nickname}
                  capacity={meeting.capacity}
                  totalCapacity={meeting.totalCapacity}
                  meetingStatus={meeting.meetingStatus}
                  profileImg={meeting.profileImg}
                />
              ))
          )}
        </div>
      </section>
    </section>
  );
}

export default MainPage;
