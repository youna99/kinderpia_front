import React, { useState } from 'react'
import { MeetingUserData } from '../../../types/meeting';
import ReportBox from '../../common/ReportBox';

import '../../../styles/meeting/detailpage/MeetingInfoDesc.scss';

interface MeetingInfoDescProps{
  meetingId? : number;
  createdAt? : string;
  description? : string;
  user? : MeetingUserData
}

const MeetingInfoDesc:React.FC<MeetingInfoDescProps> = ({
  meetingId=1,
  createdAt,
  description,
  user
}) => {
  const [showReportModal, setShowReportModal] = useState(false);

  const handleReport = async (reason: string, message: string) => {
    try {
      // API 호출 로직
      console.log('신고 사유:', reason);
      console.log('상세 내용:', message);
      console.log('모임 ID:', meetingId);
      
      // API 호출 성공 후
      alert('신고가 접수되었습니다.');
      setShowReportModal(false);
    } catch (error) {
      console.error('신고 처리 중 오류 발생:', error);
      alert('신고 처리 중 오류가 발생했습니다.');
    }
  };

  const handleReportClick = () => {
    setShowReportModal(true);
  };
  
  return (
    <div className='meeting-info-desc-container'>
      <div className='meeting-info-desc-header'>
        <label className='meeting-info-desc-header-title'>모임 내용</label>
        <div className='meeting-info-desc-header-report'>
          { user?.isReport 
            ? <div className="reported-text">신고된 게시물입니다.</div> 
            : <div 
                className="report-button"
                onClick={handleReportClick}
                role="button"
                tabIndex={0}
              >
                🚨 신고하기
              </div>
          }
        </div>
      </div>
      <hr/>
      <div className='meeting-info-desc-body'>
        <div className='meeting-info-desc-body-createdAt'>{createdAt}</div>
        <div className='meeting-info-desc-body-content'>{description}</div>
      </div>

      {showReportModal && (
        <ReportBox
          onClose={() => setShowReportModal(false)}
          onSubmit={handleReport}
          targetId={String(meetingId)}
        />
      )}
    </div>
  )
}

export default MeetingInfoDesc;