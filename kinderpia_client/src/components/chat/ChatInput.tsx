import React, { useRef } from "react";
import "../../styles/chat/ChatInput.scss";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

// 채팅 입력창 컴포넌트
export default function ChatInput({ onSendMessage }: ChatInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 입력된 메시지 전송
    if (inputRef.current) {
      const message = inputRef.current?.value.trim();
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
        />
        <button className="chatsend-btn" type="submit">
          <span className="xi-arrow-up"></span>
        </button>
      </div>
    </form>
  );
}
