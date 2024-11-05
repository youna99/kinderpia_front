import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

// 컴포넌트 호출
import CommonButton1 from '../../common/CommonButton1'
import { MeetingData, MeetingUserData } from '../../../types/meeting';
import { deleteLeaveMeeting, putEndMeeting } from '../../../api/meeting';
import { simpleAlert } from '../../../utils/alert';
import MeetingWaitListModal from './MeetingWaitListModal';

interface MeetingActionJoinedProp{
  user?: MeetingUserData;
  data?: MeetingData;
}

const MeetingActionJoined: React.FC<MeetingActionJoinedProp> = ({
  user,
  data,
}) => {
  const navigate = useNavigate();
  const [whoAmI, setWhoAmI] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { meetingId } = useParams<{ meetingId: string }>();

  useEffect(() => {
    if (!user) return;
    if (!data) return;
    if (user.userId === data.userId) {
      setWhoAmI(true);
    }
  }, [whoAmI]);

  const moveToChatRoom = async (): Promise<void> => {
    try {
      alert('채팅방으로 이동합니다')
    } catch (error) {
      console.error('채팅방 이동 중 오류 발생:', error)
    }
  }

  const leaveMeeting = async (): Promise<void> => {
    try {
      const confirmed = window.confirm('정말로 모임을 떠나시겠습니까?')
      if (confirmed) {
        const result = await deleteLeaveMeeting(Number(meetingId));
        if (result) {
          simpleAlert('success','모임에서 떠났습니다! 다음에 봐요', 'center');
          navigate(`/meeting`);
        }
      }
    } catch (error) {
      console.error('모임 탈퇴 중 오류 발생:', error)
    }
  }

  const deleteMeeting = async (): Promise<void> => {
    try {
      const confirmed = window.confirm('정말로 모임을 종료하시겠습니까?')
      if (confirmed) {
        const result = await putEndMeeting(Number(meetingId));
        simpleAlert('success','모임을 종료했습니다! 다음에 봐요', 'center');
        navigate(`/meeting`);
      }
    } catch (error) {
      console.error('모임 종료 중 오류 발생:', error)
    }
  }

  const editMeeting = async (): Promise<void> => {
    try {
      navigate(`/meeting/${meetingId}/edit`);
    } catch (error) {
      console.error('모임 수정 중 오류 발생:', error)
    }
  }
  const openWaitingList = async (): Promise<void> => {
    setIsModalOpen(true);
  };

  return (
    <div className='meeting-action-joined-container'>
      <CommonButton1
        text='채팅방으로 이동하기'
        onClick={moveToChatRoom}
        disabled={false}
        isLoading={false}
      />
      {whoAmI
        ? <>
          <CommonButton1
            text='모임 종료하기'
            onClick={deleteMeeting}
            disabled={false}
            isLoading={false}
          />
          <CommonButton1
            text='모임글 수정하기'
            onClick={editMeeting}
            disabled={false}
            isLoading={false}
          />
          {data?.authType &&
            <CommonButton1
              text='모임신청 대기자 목록'
              onClick={openWaitingList}
              disabled={false}
              isLoading={false}
            />
          }
        </>
        : <CommonButton1
          text='모임 떠나기'
          onClick={leaveMeeting}
          disabled={false}
          isLoading={false}
        />
      }
      
      <MeetingWaitListModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        meetingId={Number(meetingId)}
      />
    </div>
  );
};

export default MeetingActionJoined