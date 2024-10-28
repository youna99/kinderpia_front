import "../../styles/chat/ChatContainer.scss";
import ChatMessage from "./ChatMessage";

// 채팅방 메시지 컨테이너 컴포넌트
export default function ChatContainer() {
  // 내가 보낸 메시지, 다른 사람이 보낸 메시지 구분 필요 -> sender 로 하고 나의 메시지는 own 으로 표시
  // 메시지 -> msg, 메시지 시간 -> time, 프사 -> img, 닉네임 -> sender

  return (
    <div className="chat-container">
      <ChatMessage
        sender="슈슈슈슈퍼노바"
        msg="사건은 다가와 아오에 거세게 다가와 아오에 감히 건드리지 못할걸 누구든 말야 지금 내안에선 슈슈슈슈퍼노바 노바 하이퍼 캔스탑 스텔라 원초 그걸 찾아 아파트아파트 아파트아파트 아파트"
        time="09:11"
        img="https://dain302.github.io/kokoa-clone-2022/photo/cherrycookie.jpg"
      />
      <ChatMessage sender="own" msg="hello" time="09:11" img="dkdkdkdk" />
    </div>
  );
}
