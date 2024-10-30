import "../../styles/chat/ChatMessage.scss";

interface ChatMessageProp {
  sender: string;
  msg: string;
  time: string;
  image: string;
}

// 채팅방 메시지 컴포넌트 : 내가 보낸 메시지와 타인의 메시지 구분 필요 -> 일단 className 으로 구분
// -> 부모로부터 props 로 전달받기
export default function ChatMessage({
  sender,
  msg,
  time,
  image,
}: ChatMessageProp) {
  return (
    <div className={`message message-${sender === "own" ? "own" : "other"}`}>
      {sender !== "own" ? (
        <figure className="message-profile">
          <img src={image} alt="profile image" />
        </figure>
      ) : null}
      <div className="message-content">
        {sender !== "own" ? (
          <div className="message-sender">{sender}</div>
        ) : null}
        <div className="message-info">
          <span className="message-bubble">{msg}</span>
          <span className="message-time">{time}</span>
        </div>
      </div>
    </div>
  );
}
