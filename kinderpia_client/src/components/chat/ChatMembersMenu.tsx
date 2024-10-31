import { useSelector } from "react-redux";
import { RootState } from "../../store";
import ChatMember from "./ChatMember";
import "../../styles/chat/ChatMembersMenu.scss";
import { useEffect } from "react";

interface ChatMenuProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open : boolean;
}

// 채팅 참여 멤버 컴포넌트(설정과비슷?)
export default function ChatMembersMenu({ setOpen, open }: ChatMenuProps) {
  const { chatroom } = useSelector((state: RootState) => state.chat);
  console.log(open);
  

  useEffect(() => {
    // 멤버 컴포넌트 열리면 채팅방 대화창 스크롤 막기
    const chatroom = document.querySelector(
      ".chatroom"
    ) as HTMLDivElement | null;

    if (chatroom) {
      chatroom.style.overflowY = "hidden";
    }

    return () => {
      if (chatroom) {
        chatroom.style.overflowY = "auto";
      } 
    };
  }, []);

  if (!chatroom) return <div>멤버 정보 불러오는중...</div>;

  const { chatroomId, meetingId, totalCapacity, isActive, member } = chatroom;

  const closeMenu = () => {
    setOpen(false);
  };

  const leaveMeeting = () => {
    console.log("이 모임을 나갈테야");
    // 모임 떠나기 api 요청 하기(/api/meeting/leave)
    // 요청 후 대화방 선택해 달라고 하는 UI 보여줘야함
  };

  return (
    <div className={`chatmenu-container ${open? 'open' : ''}`}>
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
