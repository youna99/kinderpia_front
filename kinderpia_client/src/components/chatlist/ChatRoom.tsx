import { ChatRoomListInfo } from "../../types/chat";
import "../../styles/chatlist/ChatRoom.scss";
import { getIcon } from "../../utils/getIcon";
import { extractUserIdFromCookie } from "../../utils/extractUserIdFromCookie";
import { ReactComponent as Crown } from "../../assets/crown.svg";

interface ChatRoomProp {
  room: ChatRoomListInfo;
  onClick: () => void;
}

export default function ChatRoom({ room, onClick }: ChatRoomProp) {
  const userId = Number(extractUserIdFromCookie());

  return (
    <li className="chatroom-list" title={room.meetingTitle} onClick={onClick}>
      <figure className="chatroom-icon">{getIcon(room.meetingCategoryName)}</figure>
      <div className="chatroom-info">
        <div className="chatroom-bx">
          <h4 className="chatroom-title">
            {userId === room.meetingHeader ? <Crown /> : null}
            <span>{room.meetingTitle}</span>
          </h4>
          <div className="chatroom-capacity">
            <span className="xi-group"></span>
            <span>{room.capacity}</span>
          </div>
        </div>
        <div className="chatroom-lastmsg">{room.lastMessage}</div>
      </div>
    </li>
  );
}
