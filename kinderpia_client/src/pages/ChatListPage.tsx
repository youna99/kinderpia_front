import { useEffect, useState } from "react";
import ChatRooms from "../components/chatlist/ChatRooms";
import "../styles/chatlist/ChatListPage.scss";
import SelectedChatRoom from "../components/chatlist/SelectedChatRoom";
import UnSelectedChatRoom from "../components/chatlist/UnSelectedChatRoom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import NoChatRoom from "../components/chatlist/NoChatRoom";
import {
  addChatRooms,
  setChatRooms,
  setEmpty,
  setError,
  setLoading,
  setPages,
  setSelected,
} from "../store/chatRoomsSlice";
import { getChatList } from "../api/chat";
import { getJwtFromCookies } from "../utils/extractUserIdFromCookie";
import { ChatRoomListInfo } from "../types/chat";
import useWebSocket from "../hooks/useWebSocket";
import { markMessagesAsRead } from "../store/chatSlice";
import { useChatListFetch } from "../hooks/useChatListFetch";
import { useWebSocketContext } from "../components/common/WebSocketProvider";

export default function ChatlistPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const { rooms, isEmpty, isSelected, chatPages } = useSelector(
    (state: RootState) => state.chatRooms
  );
  const { messages, chatroom } = useSelector((state: RootState) => state.chat);

  const chatroomIds = rooms?.map((room) => room.chatroomId);
  const { fetchChatList } = useChatListFetch(currentPage);
  const {sendMessage} = useWebSocketContext();
  const participatePeopleCounts = rooms?.map(room => room.capacity)
  

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

  // // 비동기 요청
  // useEffect(() => {
  //   const jwt = getJwtFromCookies();
  //   fetchChatList(jwt, currentPage);
  // }, [dispatch, isEmpty]);

  useEffect(() => {
    return () => {
      // 언마운트 시 상태 초기화
      // dispatch(setChatRooms([]));
      dispatch(setSelected(false));
      setCurrentPage(1);
    };
  }, []);

  // useEffect(() => {
  //   const lastMessages = rooms.map((room) => room.lastMessage);
  //   chatroomIds.forEach((chatroomId) => {
  //     // dispatch(markMessagesAsRead(chatroomId))
  //   })
  
  // }, [messages]);

  useEffect(() => {
    
  
    return () => {
      
    }
  }, [isSelected, rooms, participatePeopleCounts])
  

  // 채팅방 목록 조회 함수
  // const fetchChatList = async (token: string | null, page: number) => {
  //   try {
  //     const res = await getChatList(token, page);
  //     console.log(res);
      
  //     if (res?.status === 200) {
  //       const chatroomList: ChatRoomListInfo[] = res.data.data.chatroomList;
  //       if (currentPage === 1) {
  //         dispatch(setChatRooms(chatroomList));
  //       } else {
  //         dispatch(addChatRooms(chatroomList));
  //       }
  //       dispatch(setPages(res.data.pageInfo));
  //       dispatch(setEmpty(chatroomList.length === 0));
  //       dispatch(setError(false));
  //       dispatch(setLoading(false));
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     dispatch(setError(true));
  //     dispatch(setLoading(false));
  //     throw error;
  //   }
  // };
  return (
    <section className="chatlist">
      {isEmpty ? (
        <NoChatRoom />
      ) : (
        <div className="chatlist-wrapper">
          <ChatRooms
            // fetchChatList={fetchChatList}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
          {isSelected ? <SelectedChatRoom sendMessage={sendMessage}/> : <UnSelectedChatRoom />}
        </div>
      )}
    </section>
  );
}
