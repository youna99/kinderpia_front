import React, { useEffect, useState } from 'react';

//스타일 호출
import '../../../styles/meeting/detailpage/MeetingWaitListModal.scss';

//컴포넌트 호출
import MeetingUserWaitList from '../../common/MeetingUserWaitList';

// 데이터 호출
import { getMeetingUserWaitList } from '../../../api/meeting';

interface MeetingWaitListModalProps {
  isOpen: boolean;
  onClose: () => void;
  meetingId: number;
}

interface UserLists {
  userId: number;
  profile_img: string;
  nickname: string;
}

// MeetingWaitListModal.tsx
const MeetingWaitListModal: React.FC<MeetingWaitListModalProps> = ({
  isOpen,
  onClose,
  meetingId,
}) => {
  const [userLists, setUserLists] = useState<UserLists[]>([]);

  // 대기자 목록을 새로 불러오는 함수
  const refreshWaitList = async () => {
    try {
      const result = await getMeetingUserWaitList(meetingId);
      setUserLists(result.data);
    } catch (error) {
      console.error('대기자 목록 조회 중 에러 발생:', error);
    }
  };

  // 초기 데이터 로드
  useEffect(() => {
    if (isOpen) {
      refreshWaitList();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>대기자 목록</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-body">
          {userLists.map((item) => (
            <MeetingUserWaitList
              key={item.userId}
              profile_img={item.profile_img}
              nickname={item.nickname}
              meetingId={meetingId}
              userId={item.userId}
              onComplete={refreshWaitList} // 리프레시 함수 전달
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MeetingWaitListModal;
