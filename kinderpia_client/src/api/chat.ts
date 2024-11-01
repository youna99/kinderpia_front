import { ChatMessageInfo, ChatRoomInfo } from "../types/chat";
import { requestHeader } from "./requestHeader";

interface ChatListResponse {
  status : number;
  data : ChatRoomInfo[];
}

interface ChatRoomResponse {
  status : number;
  data : ChatRoomInfo;
}

interface ChatMessageResponse {
  status : number;
  data : ChatMessageInfo[];
}


// 채팅방 목록 조회
export const getChatList = async () :Promise<ChatListResponse> => {
  const response = await requestHeader.get(`/api/chatroom/list`);
  return response;
};

// 단일 채팅방 조회
export const getChatRoom = async (chatroomId: number):Promise<ChatRoomResponse> => {
  const response = await requestHeader.get(`/api/chatroom/${chatroomId}`);
  return response;
};

// 채팅 메시지 조회(목록)
export const getChatMessages = async (chatroomId:number) : Promise<ChatMessageResponse> => {
    const response = await requestHeader.get(`/api/chatroom/chatmsg/${chatroomId}`)
    return response;
};

