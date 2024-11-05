import React, { useEffect, useState } from 'react'
import '../../../styles/meeting/detailpage/MeetingInfoDetail.scss';

interface MeetingInfoDetailProps {
  meetingCategory: string; 
  meetingTitle: string;   
  nickname: string;     
  participants: number;   
  totalCapacity: number;  
  authType: boolean;       
  meetingStatus: string;
}

const MeetingInfoDetail: React.FC<MeetingInfoDetailProps> = ({
  meetingCategory,
  meetingTitle,
  nickname,
  participants,
  totalCapacity,
  authType,
  meetingStatus,
}) => {
  const [hashText, setHashText] = useState<string>('');
  const [hashText2, setHashText2] = useState<string>('');
  
  useEffect(() => {
    setHashText(authType ? '승인 후 참가 가능' : '누구나 참가 가능');
    switch(meetingStatus){
      case 'ONGOING' : setHashText2('모집중'); break;
      case 'COMPLETED' : setHashText2('인원 마감'); break;
      case 'END' : setHashText2('모임 종료'); break;
      case 'DELETED' : setHashText2('모임 삭제'); break;
      default : setHashText2('오류입니다!'); break;
    }

  }, [authType, meetingCategory, meetingTitle]);

  if (!meetingTitle || !nickname) {
    return <div className='meeting-info-detail-container'>데이터 로딩 중...</div>;
  }

  return (
    <div className='meeting-info-detail-container'>
      <div className='meeting-info-detail-coverImage'>
      </div>
      <span className='meeting-info-detail-category'>
        {meetingCategory}
      </span>
      <div className='meeting-info-detail-wrapper'>
        <div className='meeting-info-detail-wrapper-title'>
          {meetingTitle}
        </div>
        <div className='meeting-info-detail-wrapper-human'>
          <div className='meeting-info-detail-wrapper-human-writer'>
            <div className='meeting-info-detail-wrapper-human-writer-profileImage'>
            </div>
            <div className='meeting-info-detail-wrapper-human-writer-name'>
              {nickname}
            </div>
          </div>
          <div className='meeting-info-detail-wrapper-human-participants'>
            <span className="xi-users meeting-info-detail-wrapper-human-participants-icon"></span>
            { totalCapacity === 99? '제한 없음': `${participants}/${totalCapacity}`}
          </div>
        </div>
        <div className='meeting-info-detail-wrapper-hash'>
          {meetingStatus && <span className="hash-tag">#{hashText2}</span>}
          {hashText && <span className="hash-tag">#{hashText}</span>}
        </div>
      </div>
    </div>
  );
};

export default MeetingInfoDetail;