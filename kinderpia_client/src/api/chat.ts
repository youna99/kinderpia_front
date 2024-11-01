import { requestHeader } from "./requestHeader";

// 채팅방 목록 조회
export const getChatList = () => {
  requestHeader.get(`/api/chatroom/list`);
};

// 단일 채팅방 조회
export const getChatRoom = (chatroomId: number) => {
  requestHeader.get(`/api/chatroom/${chatroomId}`);
};


// 채팅 메시지 조회(목록)
export const getChatMessages = (chatroomId:number) => {
    requestHeader.get(`/api/chatroom/chatmsg/${chatroomId}`)
};

