import ChatRoom from "./ChatRoom";
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { getChatMessages, getChatRoom } from "../../api/chat";
import { setChatInfo, setMessages } from "../../store/chatSlice";
import React, { useCallback, useMemo, useRef, useState } from "react";

export default function ChatRooms() {
  const dispatch = useDispatch();
  const { rooms } = useSelector((state: RootState) => state.chatRooms);

  const scrollRef = useRef<HTMLUListElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const enterChatroom = useCallback(
    async (chatroomId: number) => {
      try {
        // 단일 채팅방 조회
        const res = await getChatRoom(chatroomId);
        if (res.status === 200) {
          dispatch(setChatInfo(res.data));
          // 채팅방의 메세지 조회
          const res2 = await getChatMessages(chatroomId);
          dispatch(setMessages(res2.data));
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
    </section>
  );
}
