import { useSelector } from "react-redux";

import { RootState } from "../../store";

import ChatContainer from "../chat/ChatContainer";
import ChatHeader from "../chat/ChatHeader";
import ChatInput from "../chat/ChatInput";

import "../../styles/chatlist/SelectedChatRoom.scss";

interface ChatRoomProps {
  sendMessage : (chatroomId:number, meessage:string) => void
}

// 채팅방 페이지 컴포넌트
export default function SelectedChatRoom({sendMessage}:ChatRoomProps) {
  const { chatroom } = useSelector((state: RootState) => state.chat);

  const chatroomId = chatroom!.chatroomId;

  const handleSendMessage = (message: string) => {
    if (chatroomId) {
      sendMessage(chatroomId, message);
    }
  };

  return (
    <section className="chatroom">
      <ChatHeader />
      {chatroomId ? (
        <>
          <ChatContainer />
          <ChatInput onSendMessage={handleSendMessage} />
        </>
      ) : null}
    </section>
  );
}
