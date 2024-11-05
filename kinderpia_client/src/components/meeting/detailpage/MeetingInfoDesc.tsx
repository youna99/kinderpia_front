import React, { useEffect, useState } from 'react'
import { MeetingUserData } from '../../../types/meeting';
import ReportBox from '../../common/ReportBox';

import '../../../styles/meeting/detailpage/MeetingInfoDesc.scss';
import { postReportBadContent } from '../../../api/report';
import { simpleAlert } from '../../../utils/alert';

interface MeetingInfoDescProps{
  meetingId? : number;
  createdAt? : string;
  description? : string;
  user? : MeetingUserData
}

const MeetingInfoDesc:React.FC<MeetingInfoDescProps> = ({
  meetingId,
  createdAt,
  description,
  user
}) => {
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportToggle, setReportToggle] = useState(true);
  
  useEffect(()=>{
    if(!user?.reported){
      return ;
    }

    setReportToggle(user?.reported);
  },[reportToggle])

  const handleReport = async (reportReasonId: number, reportMessageContent: string) => {
    try {
      // API 호출 로직
      console.log('신고 사유:', reportReasonId);
      console.log('상세 내용:', reportMessageContent);
      console.log('모임 ID:', meetingId);
      const userId = user?.userId
  
      if(!userId){
        simpleAlert('info', '로그인을 먼저 해주세요!', 'center');
        return;
      }
  
      const result = postReportBadContent({
        meetingId,
        reportReasonId,
        reportMessageContent
      });
  
      console.log(result);
      
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
          { reportToggle 
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
          targetId={Number(meetingId)}
        />
      )}
    </div>
  )
}

export default MeetingInfoDesc;