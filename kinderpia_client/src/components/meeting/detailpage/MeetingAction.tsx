import React from 'react'

// 타입 호출
import { MeetingUserData } from '../../../types/meeting'

// 컴포넌트 호출
import MeetingActionJoin from './MeetingActionJoin'
import MeetingActionJoined from './MeetingActionJoined'
import MeetingActionWait from './MeetingActionWait'

// 스타일 호출
import '../../../styles/meeting/detailpage/MeetingAction.scss'

interface MeetingActionProps {
  data?: MeetingUserData
}

const MeetingAction: React.FC<MeetingActionProps> = ({
  data
}) => {

  const meetingActionJoinReq= ()=>{

  }
  return (
    <div className='meeting-action-container'>
      {!data?.isJoined && <MeetingActionJoin
        onSubmit={meetingActionJoinReq}
      />}
      {data?.isJoined && !data?.ispermitted && <MeetingActionWait />}
      {data?.isJoined && data?.ispermitted && <MeetingActionJoined />}
    </div>
  )
}

export default MeetingAction