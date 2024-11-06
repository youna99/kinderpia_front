import ChatRoom from "./ChatRoom";
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { getChatMessages, getChatRoom } from "../../api/chat";
import { markMessagesAsRead, setChatInfo, setMessages, setMsgPages } from "../../store/chatSlice";
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

interface ChatRoomsProps {
  fetchChatList: (token: string | null, page: number) => Promise<void>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
}

export default function ChatRooms({
  fetchChatList,
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

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // 무한 스크롤
  const fetchMoreData = async () => {
    const jwt = getJwtFromCookies();
    if (pageParams.includes(currentPage) || isLoading) return;
    setIsLoading(true);
    setPageParams((prev) => [...prev, currentPage]);
    try {
      await fetchChatList(jwt, currentPage);
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
      const jwt = getJwtFromCookies();
      try {
        // 단일 채팅방 조회
        const res = await getChatRoom(jwt, chatroomId);
        console.log(res);
        
        if (res?.status === 200) {
          const chatInfo: ChatRoomInfo = res.data;
          dispatch(setChatInfo(chatInfo));
          // 채팅방의 메세지 조회
          const res2 = await getChatMessages(jwt, chatroomId, msgPage);
          console.log(res2);
          
          const chatMsgList = [...res2.data.data.chatmsgList].reverse();
          dispatch(setMessages(chatMsgList));
          dispatch(setMsgPages(res2.data.pageInfo))
          dispatch(setSelected(true));
          dispatch(markMessagesAsRead(chatroomId));
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

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    const clientX = "touches" in e ? e.touches[0].clientX : e.pageX;
    setIsDragging(true);
    setStartX(clientX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;

    const clientX = "touches" in e ? e.touches[0].clientX : e.pageX;
    const x = clientX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 1;
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  return (
    <section className="chatroom-wrapper">
      <h2>Chats</h2>
      <ul
        ref={scrollRef}
        onMouseDown={handleDragStart}
        onMouseLeave={handleDragEnd}
        onMouseUp={handleDragStart}
        onMouseMove={handleDragMove}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        {rooms && rooms.length > 0 && chatRoomItems}
      </ul>
      {chatPages.totalPages > 1 && currentPage < chatPages.totalPages && (
        <div ref={observerRef}>더보기....</div>
      )}
    </section>
  );
}
