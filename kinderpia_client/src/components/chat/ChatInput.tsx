import { useRef } from "react";
import "../../styles/chat/ChatInput.scss";

// 채팅 입력창 컴포넌트
export default function ChatInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form className="chat-form">
      <div className="chat-form__column">
        <input
          type="text"
          autoFocus
          id="chatMessage"
          placeholder="메시지를 입력해주세요"
          ref={inputRef}
        />
        <button className="chatsend-btn">
          <span className="xi-send"></span>
        </button>
      </div>
    </form>
  );
}
