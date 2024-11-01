import { ChatMessageInfo, ChatRoomInfo } from "../types/chat";
import { requestHeader } from "./requestHeader";

interface ChatListResponse {
  status: number;
  data: ChatRoomInfo[];
}

interface ChatRoomResponse {
  status: number;
  data: ChatRoomInfo;
}

interface ChatMessageResponse {
  status: number;
  data: ChatMessageInfo[];
}

// 채팅방 목록 조회
export const getChatList = async (userId:number, page:number, size:number): Promise<ChatListResponse> => {
  const response = await requestHeader.post(
    `/api/chatroom/list`,
     userId,
    { withCredentials: true }
  );
  return response;
};

// 단일 채팅방 조회
export const getChatRoom = async (
  chatroomId: number
): Promise<ChatRoomResponse> => {
  const response = await requestHeader.post(
    `/api/chatroom`,
    chatroomId,
    { withCredentials: true }
  );
  return response;
};

// 채팅 메시지 조회(목록)
export const getChatMessages = async (
  chatroomId: number
): Promise<ChatMessageResponse> => {
  const response = await requestHeader.post(
    `/api/chatroom/chatmsg`,
    { chatroomId },
    { withCredentials: true }
  );
  return response;
};
