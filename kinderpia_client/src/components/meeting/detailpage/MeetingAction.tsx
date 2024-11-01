import React from 'react'

// 타입 호출
import { MeetingData, MeetingUserData } from '../../../types/meeting'

// 컴포넌트 호출
import MeetingActionJoin from './MeetingActionJoin'
import MeetingActionJoined from './MeetingActionJoined'
import MeetingActionWait from './MeetingActionWait'

// 스타일 호출
import '../../../styles/meeting/detailpage/MeetingAction.scss'

interface MeetingActionProps {
  user?: MeetingUserData
  data?: MeetingData
}

const MeetingAction: React.FC<MeetingActionProps> = ({
  user,
  data
}) => {

  const meetingActionJoinReq= ()=>{

  }
  return (
    <div className='meeting-action-container'>
      {!user?.isJoined && <MeetingActionJoin
        data={data}
        onSubmit={meetingActionJoinReq}
      />}
      {user?.isJoined && !user?.ispermitted && <MeetingActionWait />}
      {user?.isJoined && user?.ispermitted && <MeetingActionJoined />}
    </div>
  )
}

export default MeetingAction