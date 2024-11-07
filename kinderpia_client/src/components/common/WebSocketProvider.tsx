import React, { ReactNode, useContext, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useChatListFetch } from "../../hooks/useChatListFetch";
import useWebSocket from "../../hooks/useWebSocket";

interface WebSocketContextType {
  sendMessage: (chatroomId: number, message: string) => void;
}

const WebSocketContext = React.createContext<WebSocketContextType | undefined>(
  undefined
);

export const useWebSocketContext = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("error!");
  }
  return context;
};

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
  const { sendMessage } = useWebSocket(chatroomIds, chatroom?.chatroomId);

  return (
    <WebSocketContext.Provider value={{ sendMessage }}>{children}</WebSocketContext.Provider>
  );
}
