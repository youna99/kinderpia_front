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

  // 시간 포맷팅 함수
  const formatDateTime = (time: string): string => {
    const [datePart, timePart] = time.split("T");
    let [hourString, minutes] = timePart.split(":");

    let hours = Number(hourString);
    const ampm = hours >= 12 ? "오후" : "오전"; // 오전/오후 결정
    hours = hours % 12; // 12시간제로 변환
    hours = hours ? hours : 12; // 0시를 12로 변환

    // hours를 두 자리 문자열로 포맷
    const formattedHours = String(hours).padStart(2, "0");

    return `${ampm} ${formattedHours}:${minutes}`;
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
                  senderProfileImg ? senderProfileImg : `/images/userIcon.png`
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
              <span className="message-time">{formatDateTime(createdAt)}</span>
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
