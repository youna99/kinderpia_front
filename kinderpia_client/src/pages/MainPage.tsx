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
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';

function MainPage() {
  const [placeList, setPlaceList] = useState<PlaceListInfo[]>([]); // 장소 목록 관리
  const [meetingList, setMeetingList] = useState<MettingListInfo[]>([]); // 모임 목록 관리
  const [run, setRun] = useState(false); // Joyride 상태 관리

  // 화면 너비에 따라 placement 결정
  const getPlacement = () => {
    if (window.innerWidth < 1280) {
      return 'top';
    }
    return 'left'; // 큰 화면에서 왼쪽
  };

  const steps: Step[] = [
    {
      title: '도움말',
      target: '#help-info',
      placement: 'left',
      disableBeacon: true,
      content: (
        <div className="joyride-content">
          <p className="joyride-content-title">
            <p>
              해당 도움말은 킨더피아의 <br /> 이용방법을 알려드리는
            </p>
            <span className="accent">튜토리얼</span>입니다.
          </p>
          <p>
            건너뛰시려면 왼쪽 하단의
            <br />"<span className="accent">Skip</span>"을 눌러주세요!
          </p>
        </div>
      ),
    },
    {
      target: '#nav-icon',
      placement: 'left',
      spotlightClicks: true,
      disableBeacon: true,
      content: (
        <div className="joyride-content">
          <p className="joyride-content-title">
            <span className="accent">메뉴 탭</span>입니다.
          </p>
          <p>
            누르시면 모임검색, 장소검색,
            <br /> 회원가입, 로그인, 로그아웃을
            <br /> 이용할수 있습니다.
          </p>
        </div>
      ),
    },
    {
      target: '.nav-list',
      placement: getPlacement(),
      disableBeacon: true,
      content: (
        <div className="joyride-content">
          <p className="joyride-content-title">
            <span className="accent">홈</span> 버튼입니다.
          </p>
          <p>
            홈버튼을 누르면
            <br /> 메인페이지로 이동합니다.
          </p>
        </div>
      ),
    },
    {
      target: '.go-meeting-create',
      placement: getPlacement(),
      disableBeacon: true,
      content: (
        <div className="joyride-content">
          <p className="joyride-content-title">
            <span className="accent">모임</span>을 만듭니다.
          </p>
          <p>
            모임 생성 페이지로 이동하여 <br />
            모임을 직접 만들 수 있습니다.
            <br /> 함께할 친구를 모집해보세요!
          </p>
        </div>
      ),
    },
    {
      target: '.go-chatingroom',
      placement: getPlacement(),
      disableBeacon: true,
      content: (
        <div className="joyride-content">
          <p className="joyride-content-title">
            <span className="accent">채팅목록</span>으로 이동합니다.
          </p>
          <p>
            참여모임 목록을 <br />
            확인할수 있어요!
          </p>
        </div>
      ),
    },
    {
      target: '.go-mypage',
      placement: 'right',
      disableBeacon: true,
      content: (
        <div className="joyride-content">
          <p className="joyride-content-title">
            <span className="accent">마이페이지</span>로 이동합니다.
          </p>
          <p>
            프로필, 닉네임 등 내 정보를 <br />
            확인하고 변경할수 있습니다.
          </p>
        </div>
      ),
    },
    {
      target: '.placelist-container',
      disableBeacon: true,
      content: (
        <div className="joyride-content">
          <p className="joyride-content-title">
            <span className="accent">인기 장소</span> 목록 입니다.
          </p>
          <p>
            더보기를 누르면 <br />더 많은 장소를 볼 수 있습니다.
          </p>
        </div>
      ),
    },
    {
      target: '.meetinglist-container',
      disableBeacon: true,
      content: (
        <div className="joyride-content">
          <p className="joyride-content-title">
            <span className="accent">신규 모임</span> 목록입니다.
          </p>
          <p>
            더보기를 눌러 <br />
            다양한 모임들을 확인해보세요.
          </p>
        </div>
      ),
    },
    {
      target: 'body',
      placement: 'center',
      disableBeacon: true,
      content: (
        <div className="joyride-content">
          <p className="joyride-content-title">
            <span className="accent">튜토리얼이 끝났습니다.</span>
          </p>
          <p>
            킨더피아에서 <br />
            새로운 경험을 해보세요!
          </p>
        </div>
      ),
    },
  ];

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      setRun(false);
    }
  };

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
      <div>
        <Joyride
          steps={steps}
          run={run}
          continuous={true}
          showSkipButton={true}
          styles={{
            options: {
              backgroundColor: '#fff',
              primaryColor: '#59a4d6',
              textColor: '#333',
              arrowColor: '#fff',
              width: '250px',
            },
          }}
          callback={handleJoyrideCallback}
        />
        <span className="tooltip-animation">도움말</span>
        <button
          type="button"
          id="help-info"
          title="도움말"
          onClick={() => setRun(true)}
        >
          <i className="xi-info-o help-info-icon"></i>
        </button>
        <MainBanner />
      </div>
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
                totalReviewCount={place.totalReviewCount}
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
