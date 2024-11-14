import { ChatRoomListInfo } from "../../types/chat";
import "../../styles/chatlist/ChatRoom.scss";
import { getIcon } from "../../utils/getIcon";
import { extractUserIdFromCookie } from "../../utils/extractUserIdFromCookie";
import { ReactComponent as Crown } from "../../assets/crown.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface ChatRoomProp {
  room: ChatRoomListInfo;
  onClick: () => void;
}

export default function ChatRoom({ room, onClick }: ChatRoomProp) {
  const userId = Number(extractUserIdFromCookie());
  const { unreadCounts } = useSelector((state: RootState) => state.chat);
  const unreadCount = unreadCounts[room.chatroomId];

  const formatTime = (datestring: string): string | undefined => {
    if (!datestring) return;

    // 입력된 날짜 문자열을 UTC 기준으로 생성
    const inputDate = new Date(datestring);
  
    const KST_OFFSET = 9 *60;
    const localTime = new Date(inputDate.getTime() + KST_OFFSET * 60 *1000)

    const hours = localTime.getHours();
    const minutes = localTime.getMinutes();
    const period = hours >= 12 ? '오후' : '오전'
    const displayHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');

    return `${period} ${displayHours}:${formattedMinutes}`
  };

  return (
    <li className="chatroom-list" title={room.meetingTitle} onClick={onClick}>
      <div className="chatlist-column">
        <figure className="chatroom-icon">
          {getIcon(room.meetingCategoryName)}
        </figure>
        <div className="chatroom-info">
          <h4 className="chatroom-title">
            <div className="roomheader-icon">
              {userId === room.meetingHeader ? <Crown /> : null}
            </div>
            <div className="room-title">{room.meetingTitle}</div>
            <div className="capacity">
              <i className="xi-group"></i>
              <span className="room-capacity">{room.capacity}</span>
            </div>
          </h4>
          <div className="chatroom-lastmsg">{" " + room.lastMessage}</div>
        </div>
      </div>
      <div className="chatlist-column">
        <div className="lastmsg-time">
          {formatTime(room.lastMessageCreatedAt)}
        </div>
        <div>
          {unreadCount > 0 && (
            <div className="unread-badge">{" " + unreadCount}</div>
          )}
        </div>
      </div>
    </li>
  );
}
