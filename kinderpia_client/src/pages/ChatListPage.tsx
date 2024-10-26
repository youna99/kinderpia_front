import { useState } from "react"
import NoChatRoom from "../components/domain/chatlist/NoChatRoom";
import ChatRooms from "../components/domain/chatlist/ChatRooms";

export default function ChatlistPage() {
  // 채팅방 참여한 것이 있는 확인
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  return (
    <>
      <h2>Chats</h2>
      {isEmpty ? <NoChatRoom /> : <ChatRooms />}
    </>
  )
}
