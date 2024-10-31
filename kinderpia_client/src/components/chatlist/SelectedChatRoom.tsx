import { useEffect } from "react";
import ChatContainer from "../chat/ChatContainer";
import ChatHeader from "../chat/ChatHeader";
import ChatInput from "../chat/ChatInput";
import { useDispatch } from "react-redux";
import { tempChatInfo } from "../../data/tempChatroomInfo";
import { ChatRoomInfo } from "../../types/chat";
import { setChatInfo } from "../../store/chatSlice";
import { setLoading } from "../../store/chatRoomsSlice";
import "../../styles/chatlist/SelectedChatRoom.scss";

// 채팅방 페이지 컴포넌트
export default function SelectedChatRoom() {
  const dispatch = useDispatch();
  // 임시 채팅방 아이디
  const chatroomId = 2;

  useEffect(() => {
    // 여기서 소켓 불러오기??

    // 임시 데이터 세팅
    const tempData: ChatRoomInfo = { ...tempChatInfo };
    dispatch(setChatInfo(tempData));
    dispatch(setLoading(false));
  }, [dispatch]);

  return (
    <section className="chatroom">
      <ChatHeader />
      <ChatContainer chatroomId={chatroomId} />
      <ChatInput />
    </section>
  );
}
