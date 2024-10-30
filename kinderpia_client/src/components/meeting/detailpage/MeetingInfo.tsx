import React from 'react';
import { MeetingData, MeetingUserData } from '../../../types/meeting';

//컴포넌트 호출
import MeetingInfoDesc from './MeetingInfoDesc';
import MeetingInfoDetail from './MeetingInfoDetail';
import MeetingWh from './MeetingWh';

import '../../../styles/meeting/detailpage/MeetingInfo.scss';

interface MeetingInfoProps{
  data? : MeetingData
  user? : MeetingUserData
}

const MeetingInfo:React.FC<MeetingInfoProps> = ({
  data,
  user
}) => {

  return (
    <div className='meeting-info-container'>
      <MeetingInfoDetail
        category={data?.category}
        title={data?.title}
        writer={data?.writer}
        participants={data?.participants}
        maxParticipants={data?.maxParticipants}
        JoinMethod={data?.JoinMethod}
        meetingStatus={data?.meetingStatus}
      />
      <MeetingInfoDesc
        createdAt={data?.createdAt}
        description={data?.description}
        user={user}
      />
      <MeetingWh
        location={data?.location}
        selectedDate={data?.selectedDate}
        selectedTime={data?.selectedTime}
      />
    </div>
  )
}

export default MeetingInfo