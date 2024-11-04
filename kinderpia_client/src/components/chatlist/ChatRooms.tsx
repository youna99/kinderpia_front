import ChatRoom from "./ChatRoom";
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { getChatMessages, getChatRoom } from "../../api/chat";
import { setChatInfo, setMessages } from "../../store/chatSlice";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { getJwtFromCookies } from "../../utils/extractUserIdFromCookie";
import { setSelected } from "../../store/chatRoomsSlice";
import { ChatRoomInfo } from "../../types/chat";

export default function ChatRooms() {
  const [msgPage, setMsgPage] = useState(1);

  const dispatch = useDispatch();
  const { rooms } = useSelector((state: RootState) => state.chatRooms);
  console.log(rooms);
  

  const scrollRef = useRef<HTMLUListElement>(null);
  const observeRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const enterChatroom = useCallback(
    async (chatroomId: number) => {
      const jwt = getJwtFromCookies();
      try {
        // 단일 채팅방 조회
        const res = await getChatRoom(jwt, chatroomId);
        if (res?.status === 200) {
          console.log('chat enter',res);
          
          const chatInfo: ChatRoomInfo = res.data;
          dispatch(setChatInfo(chatInfo));
          // 채팅방의 메세지 조회
          const res2 = await getChatMessages(jwt, chatroomId, msgPage);
          dispatch(setMessages(res2.data.data.chatmsgList));
          dispatch(setSelected(true));
        }
      } catch (error) {
        console.error(error);
      }
    },
    [dispatch]
  );

  const chatRoomItems = useMemo(() => {
    return rooms.map((room) => (
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
        {rooms.length > 0 && chatRoomItems}
      </ul>
      {rooms.length > 11 && <div ref={observeRef}>더보기....</div>}
    </section>
  );
}
