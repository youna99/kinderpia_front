import "../../styles/chat/ChatMessage.scss";

interface ChatMessageProp {
  sender: string;
}

// 채팅방 메시지 컴포넌트 : 내가 보낸 메시지와 타인의 메시지 구분 필요 -> 일단 className 으로 구분
// -> 부모로부터 props 로 전달받기
export default function ChatMessage({ sender }: ChatMessageProp) {
  return (
    <div className={`message message-${sender}`}>
      {sender === "other" ? (
        <figure className="message-profile">
          <img />
        </figure>
      ) : null}
      <div className="message-content">
        <div className="message-info">
          <span className="message-bubble"></span>
          <span className="message-time"></span>
        </div>
      </div>
    </div>
  );
}
