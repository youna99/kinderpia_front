import { useSelector } from "react-redux";
import { RootState } from "../../store";
import ChatMember from "./ChatMember";
import "../../styles/chat/ChatMembersMenu.scss";

interface ChatMenuProps {
  setOpen : React.Dispatch<React.SetStateAction<boolean>>
}

// 채팅 참여 멤버 컴포넌트(설정과비슷?)
export default function ChatMemebersMenu({setOpen} : ChatMenuProps) {
  const { chatroom } = useSelector((state: RootState) => state.chat);

  if (!chatroom) return <div>멤버 정보 불러오는중...</div>;

  const { chatroomId, meetingId, totalCapacity, isActive, member } = chatroom;

  const closeMenu = () => {
    setOpen(false);
  }

  const leaveMeeting = () => {
    console.log('이 모임을 나갈테야');
    
  }

  return (
    <div className="chatmenu-container">
      <div className="chatmenu-header">
        <div className="chatmenu-info">
          <span>멤버 보기</span>
          <span className="xi-group"></span>
          <span>{totalCapacity}명 참여중</span>
        </div>
        <div className="chatmenu-headerbtn">
          <button onClick={closeMenu}>
            <span className="xi-close"></span>
          </button>
        </div>
      </div>
      <ul className="chatmenu-memberlists">
        {member.map((member) => (
          <ChatMember key={member.memberId} member={member} />
        ))}
      </ul>
      <div className="chatmenu-footer">
        <button onClick={leaveMeeting}>
          <span className="xi-log-out"></span>
          <span>모임 나가기</span>
        </button>
      </div>
    </div>
  );
}
