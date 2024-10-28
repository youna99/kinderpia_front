import { useEffect } from "react";
import ChatContainer from "../components/chat/ChatContainer";
import ChatHeader from "../components/chat/ChatHeader";
import ChatInput from "../components/chat/ChatInput";
import "../styles/chat/ChatPage.scss";

// 채팅방 페이지 컴포넌트
export default function ChatPage() {
  useEffect(() => {
    // 페이지 마운트 시 스크롤 방지
    document.body.style.overflow = 'hidden';

    // 페이지 언마운트 시 스크롤 풀기
    return () => {
      document.body.style.overflow = 'unset';
    }
  }, [])

  return (
    <section className="chatroom">
      <div className="inner">
        <ChatHeader />
        <ChatContainer />
        <ChatInput />
      </div>
    </section>
  );
}
