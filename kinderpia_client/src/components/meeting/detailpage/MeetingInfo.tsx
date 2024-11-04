import React, { useState } from 'react';
import { MeetingData, MeetingDetailData, MeetingUserData } from '../../../types/meeting';

//컴포넌트 호출
import MeetingInfoDesc from './MeetingInfoDesc';
import MeetingInfoDetail from './MeetingInfoDetail';
import MeetingWh from './MeetingWh';

import '../../../styles/meeting/detailpage/MeetingInfo.scss';

interface MeetingInfoProps {
  data?: MeetingData;
  user?: MeetingUserData;
}

const MeetingInfo: React.FC<MeetingInfoProps> = ({
  data,
  user
}) => {
  if (!data) {
    return <div>데이터를 불러오는 중입니다...</div>;
  }

  return (
    <div className='meeting-info-container'>
      <MeetingInfoDetail
        meetingCategory={data.meetingCategory}
        meetingTitle={data.meetingTitle}
        nickname={data.nickname}
        participants={data.participants}
        totalCapacity={data.totalCapacity}
        authType={data.authType}
        meetingStatus={data.meetingStatus}
      />
      <MeetingInfoDesc
        createdAt={data.createdAt}
        description={data.meetingContent}
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
