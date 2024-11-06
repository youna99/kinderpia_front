import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import ChatMember from "./ChatMember";
import "../../styles/chat/ChatMembersMenu.scss";
import { useEffect } from "react";
import { deleteLeaveMeeting } from "../../api/meeting";
import { setChatRooms, setEmpty, setSelected } from "../../store/chatRoomsSlice";
import { confirmAlert, showAlert, simpleAlert } from "../../utils/alert";
import { extractUserIdFromCookie, getJwtFromCookies } from "../../utils/extractUserIdFromCookie";
import { useNavigate } from "react-router-dom";
import { getChatList } from "../../api/chat";

interface ChatMenuProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}

// 채팅 참여 멤버 컴포넌트(설정과비슷?)
export default function ChatMembersMenu({ setOpen, open }: ChatMenuProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { chatroom } = useSelector((state: RootState) => state.chat);
  const token = getJwtFromCookies();
  const userId = Number(extractUserIdFromCookie());

  useEffect(() => {
    // 멤버 컴포넌트 열리면 채팅방 대화창 스크롤 막기
    const chatroom = document.querySelector(
      ".chatroom"
    ) as HTMLDivElement | null;

    if (chatroom) {
      chatroom.style.overflowY = open ? "hidden" : "auto";
    }

    return () => {
      if (chatroom) {
        chatroom.style.overflowY = "auto";
      }
    };
  }, [open]);

  if (!chatroom) return <div>멤버 정보 불러오는중...</div>;

  const { meetingId, capacity, users } = chatroom;

  const closeMenu = () => {
    setOpen(false);
  };

  const handleeLeaveMeeting = async (meetingId: number) => {
    if (userId === chatroom?.meetingHeader) {
      showAlert("warning", "모임장은 모임을 떠날 수 없습니다.");
      return;
    }

    // 모임 떠날거냐고 물어보는거
    const confirmed = await confirmAlert(
      "warning",
      "이 모임을 떠나시겠습니까?"
    );
    if (confirmed) {
      try {
        const res = await deleteLeaveMeeting(meetingId);
        if (res?.status === 200) {
          // 요청 후 해당되는 대화방을 떠나고(목록에서 삭제), 대화방을 선택해 달라고 하는 UI 보여줘야함
          simpleAlert("success", "모임을 떠났습니다.");
          dispatch(setSelected(false))
          const res2 = await getChatList(token, 1)
          if(res2.status === 200) {
            const chatroomlist = res.data.data.chatroomList;
            dispatch(setChatRooms(chatroomlist));
            dispatch(setEmpty(chatroomlist?.length === 0 || chatroomlist))
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className={`chatmenu-container ${open ? "open" : ""}`}>
      <div className="chatmenu-header">
        <div className="chatmenu-info">
          <span>멤버 보기</span>
          <span className="xi-group"></span>
          <span>{users.length}명 참여중</span>
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
        {userId === chatroom?.meetingHeader ? null : (
          <button onClick={() => handleeLeaveMeeting(meetingId)}>
            <span className="xi-log-out"></span>
            <span>모임 나가기</span>
          </button>
        )}
      </div>
    </div>
  );
}
