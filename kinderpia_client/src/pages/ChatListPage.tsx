import { useEffect, useState } from "react";
import ChatRooms from "../components/chatlist/ChatRooms";
import "../styles/chatlist/ChatListPage.scss";
import SelectedChatRoom from "../components/chatlist/SelectedChatRoom";
import UnSelectedChatRoom from "../components/chatlist/UnSelectedChatRoom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import NoChatRoom from "../components/chatlist/NoChatRoom";
import {
  setChatRooms,
  setEmpty,
  setError,
  setLoading,
  setSelected,
} from "../store/chatRoomsSlice";
import { getChatList } from "../api/chat";
import { getJwtFromCookies } from "../utils/extractUserIdFromCookie";
import { ChatRoomInfo, ChatRoomListInfo } from "../types/chat";

export default function ChatlistPage() {
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
  const { isEmpty, isSelected } = useSelector(
    (state: RootState) => state.chatRooms
  );
  const { chatroom, messages } = useSelector((state: RootState) => state.chat);
  const chatroomId = chatroom?.chatroomId;

  useEffect(() => {
    const upBtn = document.querySelector(".up-btn") as HTMLButtonElement | null;
    // 페이지 마운트 시 스크롤 방지, 위로가기 버튼 없애기
    document.body.style.overflow = "hidden";

    if (upBtn) {
      upBtn.classList.add("hidden");
      upBtn.style.display = "none";
    }

    // 페이지 언마운트 시 스크롤 풀기, 위로가기 버튼 살리기
    return () => {
      document.body.style.overflow = "unset";
      if (upBtn) {
        upBtn.classList.remove("hidden");
        upBtn.style.display = "flex";
      }
    };
  }, []);

  // 비동기 요청
  useEffect(() => {
    const jwt = getJwtFromCookies();
    fetchChatList(jwt, page);
  }, [dispatch, isEmpty, isSelected, chatroomId, messages, page]);

  useEffect(() => {
    
  
    return () => {
      dispatch(setSelected(false))
    }
  }, [])
  

  // 채팅방 목록 조회 함수
  const fetchChatList = async (token: string | null, page: number) => {
    try {
      const res = await getChatList(token, page);
      if (res?.status === 200) {
        console.log(res);
        
        const chatroomList: ChatRoomListInfo[] = res.data.data.chatroomList.map(
          (room: ChatRoomInfo) => ({
            chatroomId: room.chatroomId,
            meetingId: room.meetingId,
            meetingTitle: room.meetingTitle,
            lastMessage: room.lastMessage,
            meetingCategory: room.meetingCategoryName,
            totalCapacity: room.capacity,
            isActive: room.active,
          })
        );
        dispatch(setChatRooms(chatroomList));
        dispatch(setEmpty(chatroomList.length === 0));
        dispatch(setError(false));
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.error(error);
      dispatch(setError(true));
      dispatch(setLoading(false));
      throw error;
    }
  };

  return (
    <section className="chatlist">
      {isEmpty ? (
        <NoChatRoom />
      ) : (
        <div className="chatlist-wrapper">
          <ChatRooms />
          {isSelected ? <SelectedChatRoom /> : <UnSelectedChatRoom />}
        </div>
      )}
    </section>
  );
}
