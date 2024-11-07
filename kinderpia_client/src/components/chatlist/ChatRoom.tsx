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
    if (!room.lastMessageCreatedAt) return;
    // 마지막 메시지 받은 시간
    const date = new Date(datestring);
    // 현재 시간
    const now = new Date();

    const days =
      Math.floor((now.getTime() - date.getTime()) / 1000) / 60 / 60 / 24;

    const [datePart, timePart] = datestring.split("T");
    let [hourString, minutes] = timePart.split(":");

    let hours = Number(hourString);
    const ampm = hours >= 12 ? "오후" : "오전"; // 오전/오후 결정
    hours = hours % 12; // 12시간제로 변환
    hours = hours ? hours : 12; // 0시를 12로 변환

    // hours를 두 자리 문자열로 포맷
    const formattedHours = String(hours).padStart(2, "0");

    const month = date.getMonth() + 1;
    const day = date.getDate();

    if (days < 1) return `${ampm} ${formattedHours}:${minutes}`;

    return `${month}월 ${day}일`;
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
