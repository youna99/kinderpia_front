import React from 'react';
import { MeetingData, MeetingUserData } from '../../../types/meeting';

//컴포넌트 호출
import MeetingInfoDesc from './MeetingInfoDesc';
import MeetingInfoDetail from './MeetingInfoDetail';
import MeetingWh from './MeetingWh';

import '../../../styles/meeting/detailpage/MeetingInfo.scss';

interface MeetingInfoProps {
  data?: MeetingData;
  user?: MeetingUserData;
  people:number;
  observer : (p: number, add:number ) => void;
}

const MeetingInfo: React.FC<MeetingInfoProps> = ({ data, user, people,observer }) => {
  if (!data) {
    return <div>데이터를 불러오는 중입니다...</div>;
  }

  return (
    <div className="meeting-info-container">
      <MeetingInfoDetail
        meetingCategory={data.meetingCategory}
        meetingTitle={data.meetingTitle}
        nickname={data.nickname}
        participants={data.participants}
        totalCapacity={data.totalCapacity}
        authType={data.authType}
        people={people}
        meetingStatus={data.meetingStatus}
        profileImg={data.profileImg}
      />
      <MeetingInfoDesc
        createdAt={data.createdAt}
        description={data.meetingContent}
        meetingId={data.meetingId}
        user={user}
      />
      <MeetingWh
        detailAddress={data.detailAddress}
        meetingLocation={data.meetingLocation}
        meetingTime={data.meetingTime}
      />
    </div>
  );
};

export default MeetingInfo;
