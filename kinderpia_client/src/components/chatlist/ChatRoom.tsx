import { chaticons } from '../../assets/chaticon';
import { ChatRoomInfo } from '../../types/chatlist';

interface ChatRoomProp {
  room: ChatRoomInfo;
}

export default function ChatRoom({ room }: ChatRoomProp) {
  // 카테고리마다 다른 아이콘 렌더링해주는 함수
  const getIcon = (category: string) => {
    const icon = chaticons.find((icon) => icon.category === category);
    return icon ? icon.icon() : null;
  };

  return (
    <li className="chatroom-list">
      <figure className="chatroom-icon">{getIcon(room.category)}</figure>
      <div>
        <h4 className="chatroom-title">{room.meeting_title}</h4>
        <div className="chatroom-capacity">
          <span className="xi-group"></span>
          <span>{room.capacity}</span>
          <span>명 참여</span>
        </div>
      </div>
    </li>
  );
}
