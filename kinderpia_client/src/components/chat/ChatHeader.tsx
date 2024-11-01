import { useNavigate } from "react-router-dom";
import "../../styles/chat/ChatHeader.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useState } from "react";
import ChatMembersMenu from "./ChatMembersMenu";

// 채팅방 헤더 컴포넌트 - 뒤로가기, 채팅방 제목, 채팅방 멤버보기
export default function ChatHeader() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const { chatroom } = useSelector((state: RootState) => state.chat);

  if (!chatroom) return <div>채팅방 정보 불러오는 중</div>;

  const { meetingTitle } = chatroom;

  const openMenu = () => {
    setOpen(true);
  };

  return (
    <div className="chat-header">
      <div className="chat-header__container">
        {/* 뒤로가기 */}
        <div className="chat-header__column">
          {/* <button onClick={() => navigate(-1)}>
            <span className="xi-angle-left"></span>
          </button> */}
        </div>
        {/* 채팅방 제목 */}
        <div className="chat-header__column">
          <h2 className="chat-title">{meetingTitle}</h2>
        </div>
        {/* 채팅방 정보 보기 버튼 */}
        <div className="chat-header__column">
          <button onClick={openMenu}>
            <span className="xi-info-o"></span>
          </button>
        </div>
      </div>
      <ChatMembersMenu setOpen={setOpen} open={open} />
    </div>
  );
}
