import { useNavigate } from "react-router-dom";
import "../../styles/chat/ChatHeader.scss";

// 채팅방 헤더 컴포넌트 - 뒤로가기, 채팅방 제목, 채팅방 멤버보기
export default function ChatHeader() {
  const navigate = useNavigate();
  return (
    <div className="chat-header">
      {/* 뒤로가기 */}
      <div className="chat-header__column">
        <button onClick={() => navigate(-1)}>
          <span className="xi-angle-left"></span>
        </button>
      </div>
      {/* 채팅방 제목 */}
      <div className="chat-header__column">
        {/* <h2 className="chat-title"></h2> */}
        <h2 className="chat-title">임시 채팅방 제목이다다다다다다다다다</h2>
      </div>
      {/* 채팅방 정보 보기 버튼 */}
      <div className="chat-header__column">
        <button>
          <span className="xi-bars"></span>
        </button>
      </div>
    </div>
  );
}
