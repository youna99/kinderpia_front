import { ChatRoomListInfo } from "../../types/chat";
import "../../styles/chatlist/ChatRoom.scss";
import { getIcon } from "../../utils/getIcon";

interface ChatRoomProp {
  room: ChatRoomListInfo;
  onClick: () => void;
}

export default function ChatRoom({ room, onClick }: ChatRoomProp) {
  return (
    <li className="chatroom-list" title={room.meetingTitle} onClick={onClick}>
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
