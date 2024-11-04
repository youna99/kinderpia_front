import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

import { setMessages } from "../../store/chatSlice";
import { RootState } from "../../store";

import ChatContainer from "../chat/ChatContainer";
import ChatHeader from "../chat/ChatHeader";
import ChatInput from "../chat/ChatInput";

import {
  extractUserIdFromCookie,
  getJwtFromCookies,
} from "../../utils/extractUserIdFromCookie";
import "../../styles/chatlist/SelectedChatRoom.scss";

// 채팅방 페이지 컴포넌트
export default function SelectedChatRoom() {
  const dispatch = useDispatch();
  const { chatroom, messages } = useSelector((state: RootState) => state.chat);

  const clientRef = useRef<Client | null>(null);

  const chatroomId = chatroom?.chatroomId;
  // 경로
  // const url =
  //   `${process.env.REACT_APP_API_URL}/ws` || "http://localhost:8080/ws";

  useEffect(() => {
    const jwt = getJwtFromCookies();
    const chatTopic = `/topic/chatroom/${chatroomId}`;

    if (!chatroomId) return;

    clientRef.current = new Client({
      webSocketFactory: () => {
        const socket = new SockJS(`http://localhost:8080/ws`);
        return socket;
      }, // 소켓 연결 반환
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      connectHeaders: {
        // 토큰 값 넘겨줌
        Authorization: `Bearer ${jwt}`,
      },
      debug: (str) => {
        // 디버그 메시지 출력
      },
      onConnect: () => {
        // 소켓 연결 시 호출 함수
        // 채팅방 구독
        clientRef.current?.subscribe(chatTopic, (message) => {
          // 수신 메시지 처리
          const chatMessage = JSON.parse(message.body).body.data;

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

    // 언마운트 시 소켓 연결 종료
    return () => {
      clientRef.current?.deactivate();
    };
  }, [dispatch, chatroomId, messages]);

  // 메세지 전송 함수
  const sendMessage = (message: string) => {
    const jwt = getJwtFromCookies();
    const senderId = Number(extractUserIdFromCookie());
    const now = new Date();
    const koreaTime = new Date(now.getTime() + (9 * 60 * 60 * 1000));
    const koreaTimeString = koreaTime.toISOString();

    if (!chatroomId) return;
    const chatSend = `/app/${chatroomId}/chatmsg`;
    if (clientRef.current?.connected) {
      const messageObj = {
        chatroomId,
        senderId,
        chatmsgContent: message,
        createdAt: koreaTimeString, // 나중에 한국 기준 시간으로 바꿔줄 것 지금은 외국 시간으로 되어있음
        messageType: "CHAT",
      };
      clientRef.current.publish({
        destination: chatSend,
        headers: {
          Authorization: `Bearer ${jwt}`, // 토큰 값 넘기기
        },
        body: JSON.stringify(messageObj),
      });
      dispatch(setMessages([...messages, messageObj]));
    }
  };

  return (
    <section className="chatroom">
      <ChatHeader />
      {chatroomId ? (
        <>
          <ChatContainer />
          <ChatInput onSendMessage={sendMessage} />
        </>
      ) : null}
    </section>
  );
}
