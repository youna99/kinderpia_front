import React, { useEffect, useState } from 'react';
import Joyride, { Step } from 'react-joyride';
import '../../../styles/meeting/detailpage/MeetingInfoDetail.scss';

interface MeetingInfoDetailProps {
  meetingCategory: string;
  meetingTitle: string;
  nickname: string;
  participants: number;
  totalCapacity: number;
  authType: boolean;
  meetingStatus: string;
  people: number;
  profileImg: string;
}

const MeetingInfoDetail: React.FC<MeetingInfoDetailProps> = ({
  meetingCategory,
  meetingTitle,
  nickname,
  participants,
  totalCapacity,
  authType,
  meetingStatus,
  people,
  profileImg,
}) => {
  const [hashText, setHashText] = useState<string>('');
  const [hashText2, setHashText2] = useState<string>('');
  const [run, setRun] = useState(false); // Joyride 상태 관리
  
  const steps: Step[] = [
    {
      target: '#help-info',
      placement: 'bottom',
      content: (
        <div className="joyride-content">
          <p className="joyride-content-title">
            해당 페이지의 <span className="accent">사용법</span>을 소개합니다.
          </p>
          <p>
            건너뛰시려면 왼쪽 하단의
            <br />"<span className="accent">Skip</span>"을 눌러주세요!
          </p>
        </div>
      ),
      disableBeacon: true,
    },
    {
      target: '.meeting-info-detail-container',
      placement: 'bottom',
      content: (
        <div className="joyride-content">
          <p>이 페이지는 모임의 상세 정보를 담고있어요</p>
          <p>
            이 모임이 어떤 정보를 가지고 있는지 간략하게 소개하는 항목입니다.
          </p>
        </div>
      ),
      spotlightClicks: true,
    },
    {
      target: '.meeting-info-desc-container',
      placement: 'bottom',
      content: (
        <div className="joyride-content">
          <p>이 페이지는 모임의 내용을 담고있어요</p>
          <p>
            이 모임의 개설자가 이 모임을 소개하는 항목입니다.
          </p>
        </div>
      ),
      spotlightClicks: true,
    },
    {
      target: '.meeting-info-desc-header-report',
      placement: 'bottom',
      content: (
        <div className="joyride-content">
          <p>이 공간은 사용자가 이 모임에 대해 상호작용할 수 있는 버튼입니다.</p>
          <p>
            모임의 생성자라면 모임글의 수정/삭제/종료,<br/>
            모임의 참여자라면 신고가 가능합니다.
          </p>
        </div>
      ),
      spotlightClicks: true,
    },
    {
      target: '.meeting-wh-container',
      placement: 'bottom',
      content: (
        <div className="joyride-content">
          <p>이 공간은 모임의 일시/장소를 표시합니다.</p>
          <p>
            지도를 통해 대략적인 위치와 시간을 확인할 수 있습니다.<br/>
          </p>
        </div>
      ),
      spotlightClicks: true,
    },
    {
      target: '.meeting-action-container',
      placement: 'bottom',
      content: (
        <div className="joyride-content">
          <p>이 공간은 모임에 대한 참여에 관한 내용입니다.</p>
          <p>
            아직 참가하지 않은 사람은 신청 양식이<br/>
            참가한 사람은 채팅방으로 이동하거나 모임을 떠날 수 있는 버튼이<br/>
            생성자라면 채팅방으로 이동하거나 모임 신청자 목록을 볼 수 있는 버튼이 보여집니다.
          </p>
        </div>
      ),
      spotlightClicks: true,
    }
  ];

  useEffect(() => {
    switch (people / totalCapacity) {
      case 1:
        setHashText2('모집 마감');
        break;
      default:
        setHashText2('모집중');
        break;
    }
  }, [people]);

  useEffect(() => {
    setHashText(authType ? '승인 후 참가 가능' : '누구나 참가 가능');
    switch (meetingStatus) {
      case 'ONGOING':
        setHashText2('모집중');
        break;
      case 'COMPLETED':
        setHashText2('모집 완료');
        break;
      case 'END':
        setHashText2('모임 종료');
        break;
      case 'DELETED':
        setHashText2('모임 삭제');
        break;
      default:
        setHashText2('오류입니다!');
        break;
    }
  }, [authType, meetingCategory, meetingTitle]);

  if (!meetingTitle || !nickname) {
    return (
      <div className="meeting-info-detail-container">데이터 로딩 중...</div>
    );
  }

  return (
    <div className="meeting-info-detail-container">      
      <Joyride
        steps={steps}
        run={run}
        continuous={true}
        showSkipButton={true}
        styles={{
          options: {
            backgroundColor: '#fff', // 배경색
            primaryColor: '#59a4d6', // 주요 색상
            textColor: '#333', // 텍스트 색상
            arrowColor: '#fff', // 화살표 색상
            width: '300px', // 너비 조정
          },
        }}
        callback={(data) => {
          const { status } = data;
          if (status === 'finished' || status === 'skipped') {
            setRun(false);
          }
        }}
      />
      <img 
        className="meeting-info-detail-coverImage"
        src={`/images/tempImage${meetingCategory}.jpg`}
        alt=""
      />
      <div className='meeting-info-detail-top'>
        <button
          type="button"
          id="help-info"
          title="도움말"
          onClick={() => setRun(true)} // 버튼 클릭 시 튜토리얼 시작
        >          
          <i className="xi-info-o help-info-icon"></i>
        </button>
        <span className="meeting-info-detail-top-category">{meetingCategory}</span>
      </div>
      <div className="meeting-info-detail-wrapper">
        <div className="meeting-info-detail-wrapper-title">{meetingTitle}</div>
        <div className="meeting-info-detail-wrapper-human">
          <div className="meeting-info-detail-wrapper-human-writer">
            <img
              src={profileImg || '/images/usericon.png'}
              alt=""
              className="meeting-info-detail-wrapper-human-writer-profileImage"
            />
            <div className="meeting-info-detail-wrapper-human-writer-name">
              {nickname}
            </div>
          </div>
          <div className="meeting-info-detail-wrapper-human-participants">
            <i className="xi-users meeting-info-detail-wrapper-human-participants-icon"></i>
            {totalCapacity === 99 ? '제한 없음' : `${people}/${totalCapacity}`}
          </div>
        </div>
        <div className="meeting-info-detail-wrapper-hash">
          {meetingStatus && <span className="hash-tag">#{hashText2}</span>}
          {hashText && <span className="hash-tag">#{hashText}</span>}
        </div>
      </div>
    </div>
  );
};

export default MeetingInfoDetail;
