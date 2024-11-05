import React from 'react'

// 타입 호출
import { MeetingData, MeetingJoinData, MeetingUserData } from '../../../types/meeting'

// 컴포넌트 호출
import MeetingActionJoin from './MeetingActionJoin'
import MeetingActionJoined from './MeetingActionJoined'
import MeetingActionWait from './MeetingActionWait'

// 스타일 호출
import '../../../styles/meeting/detailpage/MeetingAction.scss'

// 요청 함수 호출
import { postJoinMeeting } from '../../../api/meeting'
interface MeetingActionProps {
  user?: MeetingUserData;
  data?: MeetingData;
}

const MeetingAction: React.FC<MeetingActionProps> = ({
  user,
  data
}) => {
  const meetingActionJoinReq= ( meetingId : number , data :MeetingJoinData)=>{
    const result = postJoinMeeting(
      data,
      meetingId
    )
  }
  return (
    <div className='meeting-action-container'>
      {!user?.joined && 
      <MeetingActionJoin
        data={data}
        onSubmit={meetingActionJoinReq}
      />}
      {user?.joined && !user?.accepted && <MeetingActionWait 
      
      />}
      {user?.joined && user?.accepted && <MeetingActionJoined 
      
      />}
    </div>
  )
}

export default MeetingAction