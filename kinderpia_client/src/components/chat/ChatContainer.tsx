import { useEffect, useState } from "react";
import "../../styles/chat/ChatContainer.scss";
import ChatMessage from "./ChatMessage";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

interface ChatRoomProps {
  chatroomId: number;
}

interface ChatMessageType {
  chatmsgId: number;
  chatroomId: number;
  senderId: number;
  senderNickname: string;
  senderProfileImg: string;
  chatmsgContent: string;
  createdAt: string; // LocalDateTime 형식의 문자열
  messageType: string; // MessageType의 문자열 표현
}

// 채팅방 메시지 컨테이너 컴포넌트
export default function ChatContainer({ chatroomId }: ChatRoomProps) {
  // 내가 보낸 메시지, 다른 사람이 보낸 메시지 구분 필요 -> sender 로 하고 나의 메시지는 own 으로 표시
  // 메시지 -> msg, 메시지 시간 -> time, 프사 -> img, 닉네임 -> sender

  // 경로
  const url = process.env.REACT_APP_API_URL || "http://localhost:3000";

  // 메세지
  const [messages, setMessages] = useState<ChatMessageType[]>([]);

  // 소켓 설정
  useEffect(() => {
    // const socket = new SockJS(`${url}/topic/chatroom/${chatroomId}`);

    // const client = new Client({
    //   webSocketFactory: () => socket,
    //   debug: (str) => {
    //     console.log(str);
    //   },
    //   onConnect: () => {
    //     // 채팅방 메시지 구독
    //     client.subscribe(`/topic/chatroom/${chatroomId}`, (message) => {
    //       const chatMessage = JSON.parse(message.body);
    //       setMessages((prevMessages) => [...prevMessages, chatMessage]);
    //     })
    //   },
    //   onStompError: (frame) => {
    //     console.error(frame.body);
    //   }
    // });

    // client.activate;


    // 언마운트 시 소켓 연결 종료
    return () => {
      // client.deactivate;
    }
  }, [chatroomId]);

  return (
    <div className="chat-container">
      <ChatMessage
        sender="슈슈슈슈퍼노바"
        msg="사건은 다가와 아오에 거세게 다가와 아오에 우린 어디서 왔나 아오에 질문은 계속돼 아오에 감히 건드리지 못할걸 누구든 말야 지금 내안에선 슈슈슈슈퍼노바 노바 하이퍼 캔스탑 스텔라 원초 그걸 찾아 아파트아파트 아파트아파트 아파트"
        time="09:11"
        image="https://dain302.github.io/kokoa-clone-2022/photo/cherrycookie.jpg"
      />
      <ChatMessage sender="own" msg="hello" time="09:11" image="dkdkdkdk" />
      <ChatMessage sender="own" msg="hello" time="09:11" image="dkdkdkdk" />
      <ChatMessage sender="own" msg="hello" time="09:11" image="dkdkdkdk" />
      <ChatMessage sender="own" msg="hello" time="09:11" image="dkdkdkdk" />
      <ChatMessage sender="own" msg="hello" time="09:11" image="dkdkdkdk" />
      <ChatMessage sender="own" msg="hello" time="09:11" image="dkdkdkdk" />
      <ChatMessage sender="own" msg="hello" time="09:11" image="dkdkdkdk" />
      <ChatMessage sender="own" msg="hello" time="09:11" image="dkdkdkdk" />
      <ChatMessage sender="own" msg="hello" time="09:11" image="dkdkdkdk" />
      <ChatMessage sender="own" msg="hello" time="09:11" image="dkdkdkdk" />
      <ChatMessage sender="own" msg="hello" time="09:11" image="dkdkdkdk" />
      <ChatMessage sender="own" msg="hello" time="09:11" image="dkdkdkdk" />
      <ChatMessage sender="own" msg="hello" time="09:11" image="dkdkdkdk" />
      <ChatMessage sender="own" msg="hello" time="09:11" image="dkdkdkdk" />
      <ChatMessage sender="own" msg="hello" time="09:11" image="dkdkdkdk" />
      <ChatMessage sender="own" msg="hello" time="09:11" image="dkdkdkdk" />
      <ChatMessage sender="own" msg="hello" time="09:11" image="dkdkdkdk" />
      <ChatMessage sender="own" msg="hello" time="09:11" image="dkdkdkdk" />
      <ChatMessage sender="own" msg="hello" time="09:11" image="dkdkdkdk" />
      <ChatMessage sender="own" msg="hello" time="09:11" image="dkdkdkdk" />
      <ChatMessage sender="own" msg="hello" time="09:11" image="dkdkdkdk" />
      <ChatMessage sender="own" msg="hello" time="09:11" image="dkdkdkdk" />
      <ChatMessage sender="own" msg="hello" time="09:11" image="dkdkdkdk" />
      <ChatMessage sender="own" msg="hello" time="09:11" image="dkdkdkdk" />
      <ChatMessage sender="own" msg="hello" time="09:11" image="dkdkdkdk" />
      <ChatMessage sender="own" msg="hello" time="09:11" image="dkdkdkdk" />
      <ChatMessage sender="own" msg="hello" time="09:11" image="dkdkdkdk" />
      <ChatMessage sender="own" msg="hello" time="09:11" image="dkdkdkdk" />
      <ChatMessage sender="own" msg="hello" time="09:11" image="dkdkdkdk" />
      <ChatMessage sender="own" msg="hello" time="09:11" image="dkdkdkdk" />
      <ChatMessage sender="own" msg="hello" time="09:11" image="dkdkdkdk" />
      <ChatMessage sender="own" msg="hello" time="09:11" image="dkdkdkdk" />
      <ChatMessage sender="own" msg="hello" time="09:11" image="dkdkdkdk" />
      <ChatMessage sender="own" msg="hello" time="09:11" image="dkdkdkdk" />
      <ChatMessage sender="own" msg="hello" time="09:11" image="dkdkdkdk" />
      <ChatMessage sender="own" msg="hello" time="09:11" image="dkdkdkdk" />
      <ChatMessage sender="own" msg="hello" time="09:11" image="dkdkdkdk" />
      <ChatMessage sender="own" msg="hello" time="09:11" image="dkdkdkdk" />
      <ChatMessage sender="own" msg="hello" time="09:11" image="dkdkdkdk" />
      <ChatMessage sender="own" msg="hello" time="09:11" image="dkdkdkdk" />
      <ChatMessage sender="own" msg="hello" time="09:11" image="dkdkdkdk" />
      <ChatMessage sender="own" msg="hello" time="09:11" image="dkdkdkdk" />
      <ChatMessage sender="own" msg="hello" time="09:11" image="dkdkdkdk" />
      <ChatMessage sender="own" msg="hello" time="09:11" image="dkdkdkdk" />
      <ChatMessage sender="own" msg="hello" time="09:11" image="dkdkdkdk" />
      <ChatMessage sender="own" msg="hello" time="09:11" image="dkdkdkdk" />
      <ChatMessage sender="own" msg="hello" time="09:11" image="dkdkdkdk" />
      <ChatMessage sender="own" msg="hello" time="09:11" image="dkdkdkdk" />
      <ChatMessage sender="own" msg="hello" time="09:11" image="dkdkdkdk" />
      <ChatMessage sender="own" msg="hello" time="09:11" image="dkdkdkdk" />
      <ChatMessage sender="own" msg="hello" time="09:11" image="dkdkdkdk" />
      <ChatMessage sender="own" msg="hello" time="09:11" image="dkdkdkdk" />
      <ChatMessage sender="own" msg="hello" time="09:11" image="dkdkdkdk" />
    </div>
  );
}
