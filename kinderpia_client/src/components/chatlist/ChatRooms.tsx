import ChatRoom from "./ChatRoom";
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { getChatRoom } from "../../api/chat";
import { setChatInfo } from "../../store/chatSlice";

export default function ChatRooms() {
  const dispatch = useDispatch();
  const { rooms } = useSelector((state: RootState) => state.chatRooms);

  const enterChatroom = async (chatroomId: number) => {
    try {
      const res = getChatRoom(chatroomId);
      // dispatch(setChatInfo(res.data))
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="chatroom-wrapper">
      <h2>Chats</h2>
      <ul>
        {rooms.length > 0 &&
          rooms.map((room) => (
            <ChatRoom
              key={room.chatroomId}
              room={room}
              onClick={() => enterChatroom(room.chatroomId)}
            />
          ))}
      </ul>
    </section>
  );
}
