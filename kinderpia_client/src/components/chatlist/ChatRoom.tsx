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
  
    // 입력된 날짜 문자열을 "YYYY-MM-DD HH:MM:SS" 형식으로 파싱
    const [datePart, timePart] = datestring.split('T'); // '2024-11-08'과 '01:22:29' 분리
    const [hours, minutes, seconds] = timePart.split(':').map(Number); // 시간과 분 분리
  
    // 서울 시간 기준으로 변환
    const now = new Date();
    
    // 서울 시간을 직접 계산하는 방식
    const localNow = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));
    
    // 입력된 시간과 현재 시간의 차이 계산
    const inputDate = new Date(`${datePart}T${timePart}`);
    const localInputDate = new Date(inputDate.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));
  
    const diffTime = localNow.getTime() - localInputDate.getTime(); // 시간 차이 계산
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // 일 단위로 변환
  
    // 오전/오후 계산
    const period = hours >= 12 ? '오후' : '오전';
  
    // 12시간제로 포맷팅
    const displayHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');
  
    // 오늘 기준으로 표시
    return `${period} ${displayHours}:${formattedMinutes}`;
    // if (diffDays === 0) {
    // } else if (diffDays === 1) {
    //   // 하루 전인 경우 '어제'로 표시
    //   return '어제';
    // } else {
    //   // 이틀 이상 차이 나는 경우 "00월 00일" 형식으로 표시
    //   const [year, month, day] = datePart.split('-');
    //   return `${month}월 ${day}일`;
    // }
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
