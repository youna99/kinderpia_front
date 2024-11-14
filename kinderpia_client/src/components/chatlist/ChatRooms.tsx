import ChatRoom from "./ChatRoom";
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { getChatMessages, getChatRoom } from "../../api/chat";
import { markMessagesAsRead, setChatInfo, setMessages, setMsgPages, setOpen } from "../../store/chatSlice";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { getJwtFromCookies } from "../../utils/extractUserIdFromCookie";
import { setSelected } from "../../store/chatRoomsSlice";
import { ChatRoomInfo } from "../../types/chat";
import { useChatListFetch } from "../../hooks/useChatListFetch";

interface ChatRoomsProps {
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
}

export default function ChatRooms({
  setCurrentPage,
  currentPage,
}: ChatRoomsProps) {
  const [msgPage, setMsgPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [pageParams, setPageParams] = useState<number[]>([]);

  const dispatch = useDispatch();
  const { rooms, chatPages } = useSelector(
    (state: RootState) => state.chatRooms
  );

  const scrollRef = useRef<HTMLUListElement>(null);
  const observerRef = useRef<HTMLDivElement>(null);


  const { fetchChatList } = useChatListFetch(currentPage);

  // 무한 스크롤
  const fetchMoreData = async () => {
    const jwt = getJwtFromCookies();
    if(!jwt) return;
    if (pageParams.includes(currentPage) || isLoading) return;
    setIsLoading(true);
    setPageParams((prev) => [...prev, currentPage]);
    try {
      await fetchChatList(currentPage);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const firstEntry = entries[0];
      if (
        firstEntry.isIntersecting &&
        chatPages.page < chatPages.totalPages &&
        !isLoading
      ) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    });

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [chatPages.page, chatPages.totalPages, isLoading]);

  useEffect(() => {
    fetchMoreData();
  }, [currentPage]);

  // 단일 채팅방 조회 함수
  const enterChatroom = useCallback(
    async (chatroomId: number) => {
      try {
        // 단일 채팅방 조회
        const res = await getChatRoom(chatroomId);
        if (res?.status === 200) {
          const chatInfo: ChatRoomInfo = res.data;
          dispatch(setChatInfo(chatInfo));
          // 채팅방의 메세지 조회
          const res2 = await getChatMessages(chatroomId, msgPage);
          const chatMsgList = [...res2.data.data.chatmsgList].reverse();
          dispatch(setMessages(chatMsgList));
          dispatch(setMsgPages(res2.data.pageInfo))
          dispatch(setSelected(true));
          dispatch(markMessagesAsRead(chatroomId));
          dispatch(setOpen(false));
        }
      } catch (error) {
        console.error(error);
      }
    },
    [dispatch]
  );  

  const chatRoomItems = useMemo(() => {
    return rooms?.map((room) => (
      <ChatRoom
        key={room.chatroomId}
        room={room}
        onClick={() => enterChatroom(room.chatroomId)}
      />
    ));
  }, [rooms, enterChatroom]);

  // const tempEnterChatroom = (chatroomId:number) => {
  //   const chatInfo = tempChatRoomInfo
  //   dispatch(setChatInfo(chatInfo));

  //   const chatMsgList = tempMsgData;

  //   dispatch(setMessages(chatMsgList));
  //   dispatch(setSelected(true));
  //   dispatch(markMessagesAsRead(chatroomId));
  //   dispatch(setOpen(false));
  // }

  return (
    <section className="chatroom-wrapper">
      <h2>Chats</h2>
      <ul ref={scrollRef}>
        {rooms && rooms.length > 0 && chatRoomItems}
      </ul>
      {chatPages.totalPages > 1 && currentPage < chatPages.totalPages && (
        <div ref={observerRef}>더보기....</div>
      )}
    </section>
  );
}
