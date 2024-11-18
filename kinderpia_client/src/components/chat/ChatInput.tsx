import React, { useRef } from "react";
import "../../styles/chat/ChatInput.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

// 채팅 입력창 컴포넌트
export default function ChatInput({ onSendMessage }: ChatInputProps) {
  const { chatroom } = useSelector((state: RootState) => state.chat);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 비활성화된 방에는 메시지 전송 불가
    if(!chatroom?.active) return;
    
    // 입력된 메시지 전송
    if (inputRef.current) {
      const message = inputRef.current?.value.trim();
      console.log('message', message);
      
      if (message) {
        onSendMessage(message);
        inputRef.current.value = ""; // 입력창 비우기
      }
    }
  };

  return (
    <form className="chat-form" onSubmit={handleSendMessage}>
      <div className="chat-form__column">
        <input
          type="text"
          autoFocus
          id="chatMessage"
          placeholder="메시지를 입력해주세요"
          ref={inputRef}
          maxLength={500}
          disabled={!chatroom?.active}
        />
        <button className="chatsend-btn" type="submit">
          <i className="xi-arrow-up"></i>
        </button>
      </div>
    </form>
  );
}
