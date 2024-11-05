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
import { simpleAlert } from '../../../utils/alert'
import { useNavigate } from 'react-router-dom'
interface MeetingActionProps {
  user?: MeetingUserData;
  data?: MeetingData;
  onActionComplete?: () => Promise<void>;
}

const MeetingAction: React.FC<MeetingActionProps> = ({
  user,
  data,
  onActionComplete
}) => {
  const navigate = useNavigate();
  
  const meetingActionJoinReq = async (meetingId: number, data: MeetingJoinData) => {
    try {
      const result = await postJoinMeeting(data, meetingId);
      if (result) {
        simpleAlert('success', '가입 신청에 성공했습니다.', 'center');
        // 가입 요청 성공 후 상태 갱신
        await onActionComplete?.();
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='meeting-action-container'>
      {!user?.joined && 
      <MeetingActionJoin
        data={data}
        onSubmit={meetingActionJoinReq}
      />}
      {user?.joined && !user?.accepted && <MeetingActionWait/>}
      {user?.joined && user?.accepted && <MeetingActionJoined  
        data={data}
        user={user}
      />}
    </div>
  )
}

export default MeetingAction;