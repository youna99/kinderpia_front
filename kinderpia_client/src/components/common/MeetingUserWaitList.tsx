import React from 'react'


//스타일 호출
import '../../styles/common/MeetingUserWaitList.scss';
import { simpleAlert } from '../../utils/alert';
import { putUserMeetingApprove, putUserMeetingReject } from '../../api/meeting';

//통신 함수 호출

interface MeetingUserWaitListProps {
  profile_img: string;
  nickname: string;
  meetingId: number;
  userId: number;
  onComplete: () => Promise<void>; // 새로운 prop 추가
}

const MeetingUserWaitList: React.FC<MeetingUserWaitListProps> = ({
  profile_img = '../../assets/images/tempIcon1.png',
  nickname = '임시로 작성된 이름!',
  meetingId,
  userId = 10000,
  onComplete
}) => {
  const approveAction = async () => {
    try {
      const result = await putUserMeetingApprove(meetingId, userId);
      if (result) {
        simpleAlert('success', `${nickname} 님을 모임에 초대하였습니다!`, 'center');
        await onComplete(); // 승인 후 목록 새로고침
      }
    } catch (error) {
      console.error('승인 처리 중 에러 발생:', error);
      simpleAlert('error', '승인 처리 중 오류가 발생했습니다.', 'center');
    }
  };

  const rejectAction = async () => {
    try {
      const result = await putUserMeetingReject(meetingId, userId);
      if (result) {
        simpleAlert('success', `${nickname} 님은 당신과 함께하지 않습니다.`, 'center');
        await onComplete(); // 거절 후 목록 새로고침
      }
    } catch (error) {
      console.error('거절 처리 중 에러 발생:', error);
      simpleAlert('error', '거절 처리 중 오류가 발생했습니다.', 'center');
    }
  };


  return (
    <>
      <div className='wait-list-container'>
        <div className='wait-list-user'>
          <img className='wait-list-user-pfImage' alt={'rrrr'} src={'/assets/images/tempIcon1.png'}>
          
          </img>
          <div className='wait-list-user-nickname'>
            {nickname}
          </div>
        </div>
        <div className='wait-list-btns'>
          <div className='wait-list-btns-approve wait-list-btns-btns' onClick={approveAction}>
            승인
          </div>
          <div className='wait-list-btns-reject wait-list-btns-btns' onClick={rejectAction}>
            거절
          </div>
        </div>
      </div>
      <hr/>
    </>
  )
}

export default MeetingUserWaitList