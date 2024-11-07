import React, { useState } from "react";
import "../../styles/chat/ChatMessage.scss";
import { ChatMessageInfo } from "../../types/chat";
import { extractUserIdFromCookie } from "../../utils/extractUserIdFromCookie";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { ReactComponent as Crown } from "../../assets/crown.svg";
import ChatReport from "./ChatReport";

interface MessageInfoProps {
  messageInfo: ChatMessageInfo;
}

// 채팅방 메시지 컴포넌트 : 내가 보낸 메시지와 타인의 메시지 구분 필요 -> 일단 className 으로 구분
// -> 부모로부터 props 로 전달받기
export default function ChatMessage({ messageInfo }: MessageInfoProps) {
  const {
    senderId,
    senderNickname,
    senderProfileImg,
    chatmsgContent,
    createdAt,
    messageType,
    chatmsgId,
  } = messageInfo;
  const { chatroom } = useSelector((state: RootState) => state.chat);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const userId = extractUserIdFromCookie();

  // 나머지 렌더링 로직
  // 웹에서는 우클릭, 모바일에서는 길게 눌러서 신고창 열리게 하기
  // 우클릭
  const handleContextMenu = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    if (senderId !== Number(userId)) {
      setIsModalOpen(true);
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLSpanElement>) => {
    const timer = setTimeout(() => {
      if (senderId !== Number(userId)) {
        setIsModalOpen(true);
      }
    }, 1000);

    return () => clearTimeout(timer);
  };

  const formatTime = (datestring: string): string | undefined => {
    if (!datestring) return;
  
    // 입력된 날짜 문자열을 "YYYY-MM-DD HH:MM:SS" 형식으로 파싱
    const [datePart, timePart] = datestring.split('T'); // '2024-11-08'과 '01:22:29' 분리
    const [hours, minutes, seconds] = timePart.split(':').map(Number); // 시간과 분 분리
  
    // 서울 시간 기준으로 변환
    const now = new Date();
    
    // 서울 시간을 직접 계산하는 방식
    const localNow = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));
    
    // 입력된 시간과 현재 시간의 차이 계산
    const inputDate = new Date(`${datePart}T${timePart}`);
    const localInputDate = new Date(inputDate.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));
  
    const diffTime = localNow.getTime() - localInputDate.getTime(); // 시간 차이 계산
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // 일 단위로 변환
  
    // 오전/오후 계산
    const period = hours >= 12 ? '오후' : '오전';
  
    // 12시간제로 포맷팅
    const displayHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');
  
    // 오늘 기준으로 표시
    if (diffDays === 0) {
      return `${period} ${displayHours}:${formattedMinutes}`;
    } else if (diffDays === 1) {
      // 하루 전인 경우 '어제'로 표시
      return '어제';
    } else {
      // 이틀 이상 차이 나는 경우 "00월 00일" 형식으로 표시
      const [year, month, day] = datePart.split('-');
      return `${month}월 ${day}일`;
    }
  };

  // senderId 로 확인해서 자신인지 아닌지 확인
  return (
    <>
      {messageType === "CHAT" && senderId ? (
        <div
          className={`message message-${
            senderId === Number(userId) ? "own" : "other"
          }`}
        >
          {senderId !== Number(userId) ? (
            <figure className="message-profile">
              {senderId === chatroom?.meetingHeader ? <Crown /> : null}
              <img
                src={
                  senderProfileImg ? senderProfileImg : `/images/usericon.png`
                }
                alt="profile image"
              />
            </figure>
          ) : null}
          <div className="message-content">
            {senderId !== Number(userId) ? (
              <div className="message-sender">{senderNickname}</div>
            ) : null}
            <div className="message-info">
              <span
                className="message-bubble"
                onContextMenu={handleContextMenu}
                onTouchStart={handleTouchStart}
              >
                {chatmsgContent}
              </span>
              <span className="message-time">{formatTime(createdAt)}</span>
              {isModalOpen ? (
                <ChatReport
                  setOpen={setIsModalOpen}
                  meetingHeader={chatroom?.meetingHeader}
                  user={Number(userId)}
                  msgId={chatmsgId}
                  msgContent={chatmsgContent}
                />
              ) : null}
            </div>
          </div>
        </div>
      ) : (
        <div className="message message-system">{chatmsgContent}</div>
      )}
    </>
  );
}
