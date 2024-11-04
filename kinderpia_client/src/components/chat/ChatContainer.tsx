import { useEffect, useRef, useState } from "react";
import "../../styles/chat/ChatContainer.scss";
import ChatMessage from "./ChatMessage";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface ChatRoomProps {
  chatroomId: number;
}

// 채팅방 메시지 컨테이너 컴포넌트
export default function ChatContainer({ chatroomId }: ChatRoomProps) {
  // 내가 보낸 메시지, 다른 사람이 보낸 메시지 구분 필요 -> sender 로 하고 나의 메시지는 own 으로 표시
  const { messages } = useSelector((state: RootState) => state.chat);

  const endMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endMessageRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages]);

  return (
    <div className="chat-container">
      {
        messages?.map((message, index) => (
          <ChatMessage messageInfo={message} key={index}/>
        ))
      }
      <div ref={endMessageRef}></div>
    </div>
  );
}
