import { useEffect, useRef, useState } from "react";
import "../../styles/chat/ChatContainer.scss";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { getChatMessages } from "../../api/chat";
import { getJwtFromCookies } from "../../utils/extractUserIdFromCookie";
import { setMessages } from "../../store/chatSlice";

// 채팅방 메시지 컨테이너 컴포넌트
export default function ChatContainer() {
  // 내가 보낸 메시지, 다른 사람이 보낸 메시지 구분 필요 -> sender 로 하고 나의 메시지는 own 으로 표시
  const dispatch =  useDispatch();
  const { messages, msgPages, chatroom } = useSelector((state: RootState) => state.chat);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageParams, setPageParams] = useState<number[]>([]);

  const endMessageRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endMessageRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages[messages.length - 1]]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const firstEntry = entries[0];
      if(firstEntry.isIntersecting && msgPages.page < msgPages.totalPages) {
        setCurrentPage((prevPage) => prevPage + 1)
      }
    })

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };

  }, [msgPages.page, msgPages.totalPages]);

  useEffect(() => {
     if(currentPage > 1 && chatroom){
      const jwt = getJwtFromCookies()
      fetchMoreData(jwt, chatroom.chatroomId)
     }   
  }, [currentPage])
  
  const fetchMoreData = async (jwt:string|null, chatroomId:number) => {
    if(pageParams.includes(currentPage)) return;
    setPageParams((prev) => [...prev, currentPage]);
    try {
      const res = await getChatMessages(jwt, chatroomId, currentPage)
      const chatMsgList = res.data.data.chatmsgList.reverse();
      dispatch(setMessages([...chatMsgList, ...messages]))
    } catch (error) {
      console.error(error);
    }
  }
  

  return (
    <div className="chat-container">
      {msgPages.totalPages > 1 && currentPage < msgPages.totalPages && (
        <div ref={observerRef}>채팅더보기</div>
      )}
      {messages?.map((message, index) => (
        <ChatMessage messageInfo={message} key={index} />
      ))}
      <div ref={endMessageRef}></div>
    </div>
  );
}
