import { useEffect, useRef, useState } from 'react';
import { confirmAlert, simpleAlert } from '../../utils/alert';
import ReportBox from '../common/ReportBox';
import { postReportBadContent } from '../../api/report';

interface ChatReportProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  meetingHeader: number | undefined;
  user: number;
  msgId: number | undefined;
  msgContent: string;
}

// 채팅 신고 컴포넌트 -> 상대방의 메시지를 누르거나 멤버 목록에서 상대 누르면 나옴
export default function ChatReport({
  setOpen,
  meetingHeader,
  user,
  msgId,
  msgContent,
}: ChatReportProps) {
  const chatMessageId = msgId;
  const reportRef = useRef<HTMLDivElement>(null);
  const [showReportModal, setShowReportModal] = useState(false);

  const handleReport = async (
    reportReasonId: number,
    reportMessageContent: string
  ) => {
    try {
      const result = await postReportBadContent({
        chatMessageId,
        reportReasonId,
        reportMessageContent,
      });

      setShowReportModal(false);
      setOpen(false);
      await simpleAlert('success', '신고 완료');
    } catch (error) {
      // console.error('신고 처리 중 오류 발생:');
      alert('이미 신고한 메시지입니다.');
      setShowReportModal(false);
      setOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (reportRef.current && !reportRef.current.contains(e.target as Node)) {
        // 모달 닫히는 로직 추가
        setOpen(false);
      }
    };

    // 모달이 열려있는 상태인지 확인 필요
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchend', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchend', handleClickOutside);
    };
  }, []);

  return (
    <div className="chat-report" ref={reportRef}>
      <ul>
        {/* <li>차단</li> */}
        <li onClick={() => setShowReportModal(true)}>신고</li>
        {/* {meetingHeader === user ? <li>내보내기</li> : null} */}
      </ul>
      {showReportModal && (
        <ReportBox
          onClose={() => setShowReportModal(false)}
          onSubmit={handleReport}
          targetId={Number(chatMessageId)}
        />
      )}
    </div>
  );
}
