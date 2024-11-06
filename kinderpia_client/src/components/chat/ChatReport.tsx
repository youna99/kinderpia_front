import { useEffect, useRef } from "react";
import { confirmAlert, simpleAlert } from "../../utils/alert";

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
  const reportRef = useRef<HTMLDivElement>(null);
  const handleReport = async () => {
    const confirmed = await confirmAlert(
      "warning",
      "이 유저를 신고하시겠습니까?"
    );
    if (msgId && confirmed) {
      try {
        // const res = await postReports(msgId, "1", msgContent);
        // if (res?.status === 200) {
        //   simpleAlert("success", "신고 완료");
        //   setOpen(false);
        // }
      } catch (error) {
        console.error(error);
      }
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
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchend", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchend", handleClickOutside);
    };
  }, []);

  return (
    <div className="chat-report" ref={reportRef}>
      <ul>
        <li>차단</li>
        <li onClick={handleReport}>신고</li>
        {meetingHeader === user ? <li>내보내기</li> : null}
      </ul>
    </div>
  );
}
