import { ChatRoomInfo } from "../../../types/chatlist";

interface ChatRoomProp {
  room: ChatRoomInfo;
}

export default function ChatRoom({ room }: ChatRoomProp) {
  return (
    <li>
      <figure className="chatroom-icon">
        <img src="" alt="" />
      </figure>
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
