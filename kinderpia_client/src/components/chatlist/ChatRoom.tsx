import { chaticons } from "../../assets/chaticon";
import { ChatRoomListInfo } from "../../types/chat";
import "../../styles/chatlist/ChatRoom.scss";

interface ChatRoomProp {
  room: ChatRoomListInfo;
}

export default function ChatRoom({ room }: ChatRoomProp) {
  // 카테고리마다 다른 아이콘 렌더링해주는 함수
  const getIcon = (meetingCategory: string) => {
    const icon = chaticons.find(
      (icon) => icon.meetingCategory === meetingCategory
    );
    return icon ? icon.icon() : null;
  };

  return (
    <li className="chatroom-list" title={room.meetingTitle}>
      <figure className="chatroom-icon">{getIcon(room.meetingCategory)}</figure>
      <div className="chatroom-info">
        <div className="chatroom-bx">
          <h4 className="chatroom-title">{room.meetingTitle}</h4>
          <div className="chatroom-capacity">
            <span className="xi-group"></span>
            <span>{room.totalCapacity}</span>
          </div>
        </div>
        <div className="chatroom-lastmsg">{room.lastMessage}</div>
      </div>
    </li>
  );
}
