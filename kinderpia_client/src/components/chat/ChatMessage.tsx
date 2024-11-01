import React, { useState } from "react";
import "../../styles/chat/ChatMessage.scss";
import { ChatMessageInfo } from "../../types/chat";

interface MessageInfoProps {
  messageInfo: ChatMessageInfo;
}

// 채팅방 메시지 컴포넌트 : 내가 보낸 메시지와 타인의 메시지 구분 필요 -> 일단 className 으로 구분
// -> 부모로부터 props 로 전달받기
export default function ChatMessage({ messageInfo }: MessageInfoProps) {
  const { senderNickname, senderProfileImg, chatmsgContent, createdAt } =
    messageInfo;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // 웹에서는 우클릭, 모바일에서는 길게 눌러서 신고창 열리게 하기

  // 우클릭
  const handleContextMenu = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLSpanElement>) => {
    const timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 1000);

    return () => clearTimeout(timer);
  };

  return (
    <div
      className={`message message-${
        senderNickname === "own" ? "own" : "other"
      }`}
    >
      {senderNickname !== "own" ? (
        <figure className="message-profile">
          <img src={senderProfileImg} alt="profile image" />
        </figure>
      ) : null}
      <div className="message-content">
        {senderNickname !== "own" ? (
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
          <span className="message-time">{createdAt.toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
}
