import ChatContainer from "../components/chat/ChatContainer";
import ChatInput from "../components/chat/ChatInput";
import ChatTitle from "../components/chat/ChatTitle";

// 채팅방 컴포넌트
export default function ChatPage() {
  return (
    <section className="chatroom">
      <ChatTitle />
      <ChatContainer />
      <ChatInput />
    </section>
  )
}
