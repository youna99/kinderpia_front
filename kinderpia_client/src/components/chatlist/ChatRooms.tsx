import ChatRoom from "./ChatRoom";
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { getChatMessages, getChatRoom } from "../../api/chat";
import { setChatInfo, setMessages } from "../../store/chatSlice";

export default function ChatRooms() {
  const dispatch = useDispatch();
  const { rooms } = useSelector((state: RootState) => state.chatRooms);

  const enterChatroom = async (chatroomId: number) => {
    try {
      // 단일 채팅방 조회
      const res = await getChatRoom(chatroomId);
      if(res.status === 200) {
        dispatch(setChatInfo(res.data))
        // 채팅방의 메세지 조회
        const res2 = await getChatMessages(chatroomId);
        dispatch(setMessages(res2.data))
      }
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
