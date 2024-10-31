import ChatRoom from "./ChatRoom";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

export default function ChatRooms() {  
  const { rooms } = useSelector(
    (state: RootState) => state.chatRooms
  );

  return (
    <section className="chatroom-wrapper">
      <h2>Chats</h2>
      <ul>
        {rooms.length > 0 &&
          rooms.map((room, index) => <ChatRoom key={index} room={room} />)}
      </ul>
    </section>
  );
}
