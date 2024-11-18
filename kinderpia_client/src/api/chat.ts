import { ChatMessageInfo, ChatRoomInfo } from "../types/chat";
import { requestHeader } from "./requestHeader";

interface ChatListResponse {
  status: number;
  data: {
    dataList: null | any;
    data: {
      chatroomList: ChatRoomInfo[];
    };
    pageInfo: {
      page: number;
      pageSize: number;
      totalElements: number;
      totalPages: number;
      sortFields: string[];
      sortDirections: string[];
    };
  };
  message: string;
}

interface ChatRoomResponse {
  status: number;
  data: ChatRoomInfo;
  message: string;
}

interface ChatMessageResponse {
  status: number;
  data: {
    data: {
      chatmsgList: ChatMessageInfo[];
      chatroomId: number;
    };
    pageInfo: {
      page: number;
      pageSize: number;
      totalElements: number;
      totalPages: number;
      sortFields: string[];
      sortDirections: string[];
    };
  };
  message: string;
}

// 채팅방 목록 조회
export const getChatList = async (
  page: number
): Promise<ChatListResponse> => {
  const response = await requestHeader.post(
    `/api/chatroom/list`,
    {},
    {
      params: { page, size: 15 },
      withCredentials: true,
    }
  );
  return response.data;
};

// 단일 채팅방 조회
export const getChatRoom = async (
  chatroomId: number
): Promise<ChatRoomResponse> => {
  const response = await requestHeader.post(`/api/chatroom`, chatroomId, {
    withCredentials: true,
  });
  return response.data;
};

// 채팅 메시지 조회(목록)
export const getChatMessages = async (
  chatroomId: number,
  page: number
): Promise<ChatMessageResponse> => {
  const response = await requestHeader.post(
    `/api/chatroom/chatmsg`,
    chatroomId,
    {
      params: { page },
      withCredentials: true,
    }
  );
  return response.data;
};
