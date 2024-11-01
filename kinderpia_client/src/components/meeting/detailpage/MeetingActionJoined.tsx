import React from 'react'
import { useParams } from 'react-router-dom';

// 컴포넌트 호출
import CommonButton1 from '../../common/CommonButton1'

const MeetingActionJoined = () => {
  const { meetingId } = useParams<{ meetingId: string }>();
  
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
      // 모임 탈퇴 로직
      // 예: API 호출이나 상태 업데이트 등
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
      <CommonButton1
        text='모임에서 떠나기'
        onClick={leaveMeeting}
        disabled={false}
        isLoading={false}
      />
    </div>
  )
}

export default MeetingActionJoined