import { useEffect } from "react";
import ChatContainer from "../components/chat/ChatContainer";
import ChatHeader from "../components/chat/ChatHeader";
import ChatInput from "../components/chat/ChatInput";
import "../styles/chat/ChatPage.scss";
import { useDispatch } from "react-redux";
import { tempChatInfo } from "../data/tempChatroomInfo";
import { ChatRoomInfo } from "../types/chat";
import { setChatInfo } from "../store/chatSlice";
import { setLoading } from "../store/chatRoomsSlice";

// 채팅방 페이지 컴포넌트
export default function ChatPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    // 페이지 마운트 시 스크롤 방지
    document.body.style.overflow = "hidden";

    // 페이지 언마운트 시 스크롤 풀기
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  useEffect(() => {
    // 여기서 소켓 불러오기??

    // 임시 데이터 세팅
    const tempData:ChatRoomInfo  = {...tempChatInfo}
    dispatch(setChatInfo(tempData))
    dispatch(setLoading(false))
  }, [dispatch]);

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
