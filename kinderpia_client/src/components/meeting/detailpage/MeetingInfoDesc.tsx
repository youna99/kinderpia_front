import React, { useEffect, useState } from 'react';
import { MeetingData, MeetingUserData } from '../../../types/meeting';
import ReportBox from '../../common/ReportBox';

import '../../../styles/meeting/detailpage/MeetingInfoDesc.scss';
import { postReportBadContent } from '../../../api/report';
import { confirmAlert, simpleAlert } from '../../../utils/alert';
import { putCompleteMeeting, putDeleteMeeting } from '../../../api/meeting';
import { useNavigate } from 'react-router-dom';

interface MeetingInfoDescProps {
  meetingId?: number;
  data? : MeetingData;
  user?: MeetingUserData;
}

const MeetingInfoDesc: React.FC<MeetingInfoDescProps> = ({
  meetingId,
  data,
  user,
}) => {
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportToggle, setReportToggle] = useState(false);
  const [meetingDate, setMeetingData] = useState('');
  const [amIWriter , setAmIWriter] =useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!user) return;
    if (!data) return;
    if (user.userId === data.userId) {
      setAmIWriter(true);
    }
  }, [amIWriter]);

  useEffect(() => {
    if (!user?.reported) {
      return;
    }
    setReportToggle(user?.reported);
  }, []);

  useEffect(() => {
    const formatDate = (dateString: string) => {
      const date = new Date(dateString);

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');

      return `${year}-${month}-${day} ${hours}:${minutes}`;
    };
    setMeetingData(formatDate( data?.createdAt || '') );
  }, [data?.createdAt]);

  const deleteMeeting = async (): Promise<void> => {
    try {
      const confirmed = await confirmAlert(
        "question",
        "정말로 모임을 삭제하시겠습니까?",
        "모임에 모인 사람들이 흩어지게 될거에요"
      );
      if (confirmed) {
        const result = await putDeleteMeeting(Number(meetingId));
        if (result) {
          simpleAlert("success", "모임을 삭제했습니다! 다음에 봐요", "center");
          navigate(`/meeting`);
        }
      }
    } catch (error) {
      console.error("모임 삭제 중 오류 발생:", error);
    }
  };

  const editMeeting = async (): Promise<void> => {
    try {
      const confirmed = await confirmAlert(
        "question",
        "모임 게시글 수정페이지로 이동하시시겠습니까?",
      )
      if(confirmed){
        navigate(`/meeting/${meetingId}/edit`);
      }
    } catch (error) {
      console.error("모임 수정 중 오류 발생:", error);
    }
  };

  const endMeeting = async (): Promise<void> => {
    try {
      const confirmed = await confirmAlert(
        "question",
        "정말로 모임을 마감 하시겠습니까?",
        "더이상 사람들이 참여할 수 없게 됩니다."
      );
      if (confirmed) {
        const result = await putCompleteMeeting(Number(meetingId));
        if (result) {
          simpleAlert("success", "모임을 종료했습니다! 다음에 봐요", "center");
          navigate(`/meeting`);
        }
      }
    } catch (error) {
      console.error("모임 종료 중 오류 발생:", error);
    }
  };

  const handleReport = async (
    reportReasonId: number,
    reportMessageContent: string
  ) => {
    try {
      const userId = user?.userId;

      if (!userId) {
        simpleAlert('info', '로그인을 먼저 해주세요!', 'center');
        return;
      }

      const result = await postReportBadContent({
        meetingId,
        reportReasonId,
        reportMessageContent,
      });

      console.log(result);

      setShowReportModal(false);
      // 신고 처리 후 reportToggle 상태 업데이트
      setReportToggle(true);
      await simpleAlert('success', '신고 완료');
    } catch (error) {
      console.error('신고 처리 중 오류 발생:', error);
      alert('신고 처리 중 오류가 발생했습니다.');
    }
  };

  const handleReportClick = () => {
    setShowReportModal(true);
  };
  if(!data){
    return null;
  }

  return (
    <div className="meeting-info-desc-container">
      <div className="meeting-info-desc-header">
        <label className="meeting-info-desc-header-title">모임 내용</label>
        <div className="meeting-info-desc-header-report">
          {amIWriter ? (
            <div className='meeting-info-desc-header-report-btngroup'>
              <button onClick={editMeeting}>모임 수정</button>
              <button onClick={deleteMeeting}>모임 삭제</button>
              <button onClick={endMeeting}>모임 종료</button>
            </div>
          ) : (
            reportToggle ? (
              <div className="reported-text">신고된 게시물입니다.</div>
            ) : (
              <div
                className="report-button"
                onClick={handleReportClick}
                role="button"
                tabIndex={0}
              >
                🚨 신고하기
              </div>
            )
          )}
        </div>
      </div>
      <hr />
      <div className="meeting-info-desc-body">
        <div className="meeting-info-desc-body-createdAt">{meetingDate}
        </div>
        <div className="meeting-info-desc-body-content">{data.meetingContent}</div>
      </div>
      {showReportModal && (
        <ReportBox
          onClose={() => setShowReportModal(false)}
          onSubmit={handleReport}
          targetId={Number(meetingId)}
        />
      )}
    </div>
  );
};

export default MeetingInfoDesc;
