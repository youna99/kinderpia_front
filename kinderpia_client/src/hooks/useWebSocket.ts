import { useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useDispatch, useSelector } from "react-redux";
import { addUnreadMessages, setMessages } from "../store/chatSlice";
import { updateLastmessage } from "../store/chatRoomsSlice";
import {
  extractUserIdFromCookie,
  getJwtFromCookies,
} from "../utils/extractUserIdFromCookie";
import { RootState } from "../store";

const useWebSocket = (chatroomIds: number[], currentChatroomId?: number) => {
  const { messages } = useSelector((state: RootState) => state.chat);
  const subscriptionsRef = useRef<Map<number, any>>(new Map());
  const clientRef = useRef<Client | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const jwt = getJwtFromCookies();

    // 클라이언트 초기화
    clientRef.current = new Client({
      webSocketFactory: () => new SockJS(`http://localhost:8080/ws`),
      reconnectDelay: 5000,
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,
      connectHeaders: {
        Authorization: `Bearer ${jwt}`,
      },
      debug: (str) => {},
      onConnect: () => {
        // 모든 채팅방에 대해 구독
        chatroomIds.forEach((chatroomId) => {
          if (!subscriptionsRef.current.has(chatroomId)) {
            const chatTopic = `/topic/chatroom/${chatroomId}`;
            const subscription = clientRef.current?.subscribe(
              chatTopic,
              (message) => {
                const chatMessage = JSON.parse(message.body).body.data;

                // 들어 있는 방 확인
                if (chatMessage.chatroomId === currentChatroomId) {
                  dispatch(setMessages([...messages, chatMessage]));
                } else {
                  // 안들어가있는 방 메시지 쌓인당
                  dispatch(addUnreadMessages(chatMessage));
                }

                // 마지막 메시지 업데이트
                dispatch(
                  updateLastmessage({
                    chatroomId,
                    lastMessage: chatMessage.chatmsgContent,
                  })
                );
              }
            );
            subscriptionsRef.current.set(chatroomId, subscription);
          }

          subscriptionsRef.current.forEach((subscription, id) => {
            if (!chatroomIds.includes(id)) {
              subscription.unsubscribe();
              subscriptionsRef.current.delete(id);
            }
          });
        });
      },
      onStompError: (frame) => {
        console.error(frame.body);
      },
    });

    clientRef.current.activate();

    return () => {
      clientRef.current?.deactivate();
      subscriptionsRef.current.forEach((subscription) =>
        subscription.unsubscribe()
      ); // 모든 구독 해제
      subscriptionsRef.current.clear();
    };
  }, [chatroomIds, currentChatroomId, dispatch]);

  // 메세지 전송 함수
  const sendMessage = (chatroomId: number, message: string) => {
    const jwt = getJwtFromCookies();
    const senderId = Number(extractUserIdFromCookie());
    const now = new Date();
    const koreaTime = new Date(now.getTime() + 9 * 60 * 60 * 1000);
    const koreaTimeString = koreaTime.toISOString();

    if (!chatroomId) return;
    const chatSend = `/app/${chatroomId}/chatmsg`;
    if (clientRef.current?.connected) {
      const messageObj = {
        chatroomId,
        senderId,
        chatmsgContent: message,
        createdAt: koreaTimeString,
        messageType: "CHAT",
      };
      clientRef.current.publish({
        destination: chatSend,
        headers: {
          Authorization: `Bearer ${jwt}`, // 토큰 값 넘기기
        },
        body: JSON.stringify(messageObj),
      });
      dispatch(setMessages([...messages, messageObj])); dispatch(
        updateLastmessage({
          chatroomId,
          lastMessage: message,
        })
      )
    }
  };
  return { sendMessage };
};

export default useWebSocket;
