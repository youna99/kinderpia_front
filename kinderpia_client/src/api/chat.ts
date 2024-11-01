import { requestHeader } from "./requestHeader";

// 채팅방 목록 조회
export const getChatList = () => {
  requestHeader.get(`/api/chatroom/list`);
};

// 단일 채팅방 조회
export const getChatRoom = (chatroomId: number) => {
  requestHeader.get(`/api/chatroom/${chatroomId}`);
};

// 채팅 메세지 전송
export const sendChatMessage = (chatroomId:number) => {
    requestHeader.post(`/api/${chatroomId}/chatmsg`)
};

// 채팅 메세지 수신 경로(WebSocket 전용) -> 이건 좀 보기
// stomp/js 이거랑 socket-client 이거 필요 (라이브러리))

// 채팅 메시지 조회(목록)
export const getChatMessages = (chatroomId:number) => {
    requestHeader.get(`/api/chatroom/chatmsg/${chatroomId}`)
};


// 채팅 메세지 신고
export const reportMessage = () => {
    requestHeader.post(`/api/report/chatmsg`)
};
