import { ReactNode, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useChatListFetch } from "../../hooks/useChatListFetch";
import useWebSocket from "../../hooks/useWebSocket";

interface WebSocketProveProps {
  children: ReactNode;
}

export default function WebSocketProvider({ children }: WebSocketProveProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const { rooms, isEmpty, isSelected, chatPages } = useSelector(
    (state: RootState) => state.chatRooms
  );
  const { messages, chatroom } = useSelector((state: RootState) => state.chat);
  const chatroomIds = rooms?.map((room) => room.chatroomId);
  useChatListFetch(currentPage);
  useWebSocket(chatroomIds, chatroom?.chatroomId);

  return <>{children}</>;
}
