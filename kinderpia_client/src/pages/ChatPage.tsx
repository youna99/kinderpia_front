import ChatContainer from "../components/chat/ChatContainer";
import ChatHeader from "../components/chat/ChatHeader";
import ChatInput from "../components/chat/ChatInput";


// 채팅방 페이지 컴포넌트
export default function ChatPage() {
  return (
    <section className="chatroom">
      <ChatHeader />
      <ChatContainer />
      <ChatInput />
    </section>
  )
}
