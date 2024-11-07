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
    const date = new Date(time); // 입력된 시간을 Date 객체로 변환
    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // 오전/오후 사용
      timeZone: "Asia/Seoul", // 한국 시간대
    };

    const formattedTime = new Intl.DateTimeFormat("ko-KR", options).format(
      date
    );
    return formattedTime;
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
