import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

import { ChatMessageInfo, ChatRoomInfo } from "../../types/chat";
import { setChatInfo, setMessages } from "../../store/chatSlice";
import { setLoading } from "../../store/chatRoomsSlice";
import { RootState } from "../../store";

import ChatContainer from "../chat/ChatContainer";
import ChatHeader from "../chat/ChatHeader";
import ChatInput from "../chat/ChatInput";

import "../../styles/chatlist/SelectedChatRoom.scss";

import { tempChatInfo } from "../../data/tempChatroomInfo";

// 채팅방 페이지 컴포넌트
export default function SelectedChatRoom() {
  const dispatch = useDispatch();
  const { messages } = useSelector((state: RootState) => state.chat);
  // 임시 채팅방 아이디
  const chatroomId = 1;

  const clientRef = useRef<Client | null>(null);

  // 경로
  // const url = process.env.REACT_APP_API_URL
  //   ? `${process.env.REACT_APP_API_URL}/ws`
  //   : "http://localhost:3000/ws";
  const url = `http://localhost:8080/ws`;
  const chatTopic = `/topic/chatroom/${chatroomId}`;
  const chatSend = `/app/chatroom/${chatroomId}/chatmsg`;

  useEffect(() => {
    // 소켓 설정
    const socket = new SockJS(`${url}`);

    clientRef.current = new Client({
      webSocketFactory: () => socket, // 소켓 연결 반환
      debug: (str) => {
        // 디버그 메시지 출력
        console.log(str);
      },
      onConnect: () => {
        // 소켓 연결 시 호출 함수
        // 채팅방 구독
        clientRef.current?.subscribe(chatTopic, (message) => {
          // 수신 메시지 처리
          const chatMessage: ChatMessageInfo = JSON.parse(message.body);
          // 메시지 리덕스에 저장
          dispatch(setMessages([...messages, chatMessage]));
        });
      },
      onStompError: (frame) => {
        console.error(frame.body);
      },
      onDisconnect: () => {
        // 소켓 연결 끊겼을 때 호출
        console.log("disconnect");
      },
    });

    // 소켓 연결 시작
    clientRef.current.activate();

    // 임시 데이터 세팅
    const tempData: ChatRoomInfo = { ...tempChatInfo };
    dispatch(setChatInfo(tempData));
    dispatch(setLoading(false));

    // 언마운트 시 소켓 연결 종료
    return () => {
      clientRef.current?.deactivate();
    };
  }, [dispatch, chatroomId]);

  // 메세지 전송 함수
  const sendMessage = (message: string) => {
    if (clientRef.current?.connected) {
      const messageObj = {
        chatroomId,
        chatmsgContent: message,
      };
      clientRef.current.publish({
        destination: chatSend,
        body: JSON.stringify(messageObj),
      });
    }
  };

  return (
    <section className="chatroom">
      <ChatHeader />
      <ChatContainer chatroomId={chatroomId} />
      <ChatInput onSendMessage={sendMessage} />
    </section>
  );
}
