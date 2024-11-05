import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

// 컴포넌트 호출
import CommonButton1 from '../../common/CommonButton1'
import { MeetingData, MeetingUserData } from '../../../types/meeting';

interface MeetingActionJoinedProp{
  user?: MeetingUserData;
  data?: MeetingData;
}

const MeetingActionJoined:React.FC<MeetingActionJoinedProp> = ({
  user,
  data,
}) => {

  const [ whoAmI, setWhoAmI ]= useState(true);
  const { meetingId } = useParams<{ meetingId: string }>();
  
  useEffect(()=>{
    if(!user)
      return;
    if(!data)
      return;
    if(user.userId === data.userId){
      setWhoAmI(true);
    }
  },[whoAmI])

  const moveToChatRoom = async (): Promise<void> => {
    try {
      // 채팅방 이동 로직
      alert('채팅방으로 이동합니다' + meetingId)
      // 실제로는 여기에 채팅방 이동 관련 비동기 로직이 들어갈 것 같습니다
    } catch (error) {
      console.error('채팅방 이동 중 오류 발생:', error)
    }
  }

  const leaveMeeting = async (): Promise<void> => {
    try {
      const confirmed = window.confirm('정말로 모임을 떠나시겠습니까?' + meetingId)
      if (confirmed) {
        // 실제로는 여기에 모임 탈퇴 관련 API 호출 등이 들어갈 것 같습니다
        await new Promise(resolve => setTimeout(resolve, 1000)) // 예시용 딜레이
      }
    } catch (error) {
      console.error('모임 탈퇴 중 오류 발생:', error)
    }
  }

  return (
    <div className='meeting-action-joined-container'>
      <CommonButton1
        text='채팅방으로 이동하기'
        onClick={moveToChatRoom}
        disabled={false}
        isLoading={false}
      />
      {
        whoAmI
      ?
      <>
        <CommonButton1
          text='모임 삭제하기'
          onClick={leaveMeeting}
          disabled={false}
          isLoading={false}
        />
        <CommonButton1
          text='모임글 수정하기'
          onClick={leaveMeeting}
          disabled={false}
          isLoading={false}
        />
      </>
      :<CommonButton1
          text='모임 떠나기'
          onClick={leaveMeeting}
          disabled={false}
          isLoading={false}
        />
      }
      
    </div>
  )
}

export default MeetingActionJoined