import { useSelector } from "react-redux";
import { RootState } from "../../store";
import ChatMember from "./ChatMember";
import "../../styles/chat/ChatMembersMenu.scss";
import { useEffect } from "react";
import { postLeaveMeeting } from "../../api/meeting";
import { setSelected } from "../../store/chatRoomsSlice";
import { confirmAlert, simpleAlert } from "../../utils/alert";

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
      // chatroom.style.overflowY = open ? "hidden" : "auto";
    }

    return () => {
      if (chatroom) {
        // chatroom.style.overflowY = "auto";
      } 
    };
  }, [open]);

  if (!chatroom) return <div>멤버 정보 불러오는중...</div>;

  const { meetingId, capacity, users } = chatroom;

  const closeMenu = () => {
    setOpen(false);
  };

  const handleeLeaveMeeting = async (meetingId:number) => {
    // 모임 떠날거냐고 물어보는거
    const confirmed = await confirmAlert('warning', '이 모임을 떠나시겠습니까?')
    if(confirmed) {
      try {
        const res = await postLeaveMeeting(meetingId)
        if(res?.status === 200){
          // 요청 후 해당되는 대화방을 떠나고(목록에서 삭제), 대화방을 선택해 달라고 하는 UI 보여줘야함
          await simpleAlert('success', '모임을 떠났습니다.');
          setSelected(false);
        }
      } catch (error) {
        console.error(error);
      }
    } 
  };

  return (
    <div className={`chatmenu-container ${open? 'open' : ''}`}>
      <div className="chatmenu-header">
        <div className="chatmenu-info">
          <span>멤버 보기</span>
          <span className="xi-group"></span>
          <span>{capacity}명 참여중</span>
        </div>
        <div className="chatmenu-headerbtn">
          <button onClick={closeMenu}>
            <span className="xi-close"></span>
          </button>
        </div>
      </div>
      <ul className="chatmenu-memberlists">
        {users.map((user) => (
          <ChatMember key={user.userId} member={user} />
        ))}
      </ul>
      <div className="chatmenu-footer">
        <button onClick={() => handleeLeaveMeeting(meetingId)}>
          <span className="xi-log-out"></span>
          <span>모임 나가기</span>
        </button>
      </div>
    </div>
  );
}
