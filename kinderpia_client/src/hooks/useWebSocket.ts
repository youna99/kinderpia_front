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
import { simpleAlert } from "../utils/alert";

const useWebSocket = (chatroomIds: number[], currentChatroomId?: number) => {
  const { messages } = useSelector((state: RootState) => state.chat);
  const subscriptionsRef = useRef<Map<number, any>>(new Map());
  const notificationRef = useRef<any>(null);
  const clientRef = useRef<Client | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const url = process.env.REACT_APP_API_URL || 'http://localhost:8080';
    const jwt = getJwtFromCookies();
    const userId = Number(extractUserIdFromCookie());
    if(!jwt) return;

    // 클라이언트 초기화
    clientRef.current = new Client({
      webSocketFactory: () => new SockJS(`${url}/ws`),
      reconnectDelay: 5000,
      heartbeatIncoming: 20000,
      heartbeatOutgoing: 20000,
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
                console.log(JSON.parse(message.body));
                
                const chatMessage = JSON.parse(message.body).body.data;
                console.log(chatMessage);
                

                // 들어 있는 방 확인
                if (chatMessage.chatroomId === currentChatroomId && chatMessage.senderId  !== userId) {
                  dispatch(setMessages([...messages, chatMessage]));

                } else if(chatMessage.senderId !== userId){
                  // 안들어가있는 방 메시지 쌓인당
                  dispatch(addUnreadMessages(chatMessage));
                }

                // 마지막 메시지 업데이트
                dispatch(
                  updateLastmessage({
                    chatroomId,
                    lastMessage: chatMessage.chatmsgContent,
                    lastMessageCreatedAt: chatMessage.createdAt
                  })
                );
              }
            );
            subscriptionsRef.current.set(chatroomId, subscription);
          }

          // 알림 전용 구독
          if(!notificationRef.current){
            const notificationTopic = `/topic/chatroom/notification`
            notificationRef.current = clientRef.current?.subscribe(notificationTopic, (message) => {
              console.log(message);
              const notificationMessage = JSON.parse(message.body)
              // 그 후에 알림에 대한 로직 밑에서 처리할 것 
              
            })
          }


          // 구독 해제
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
  }, [chatroomIds, currentChatroomId]);

  let lastMessageTime: number | null = null;
  // 메세지 전송 함수
  const sendMessage = (chatroomId: number, message: string) => {
    const jwt = getJwtFromCookies();
    const senderId = Number(extractUserIdFromCookie());
    const now = new Date();
    
    const offset = now.getTimezoneOffset() * 60000;
    const today = new Date(Date.now() - offset);

    const koreaTimeString = today.toISOString();
    
    const nowTime = now.getTime();
    if(lastMessageTime && nowTime - lastMessageTime < 2000){
      simpleAlert('warning', '메시지를 너무 빨리 보낼 수 없습니다.')
      return;
    }

    lastMessageTime = nowTime;

    if (!chatroomId) return;
    const messageObj = {
      chatroomId,
      senderId,
      chatmsgContent: message,
      createdAt: koreaTimeString,
      messageType: "CHAT",
    };
    
    const chatSend = `/app/${chatroomId}/chatmsg`;
    if (clientRef.current?.connected) {
      
      clientRef.current.publish({
        destination: chatSend,
        headers: {
          Authorization: `Bearer ${jwt}`, // 토큰 값 넘기기
        },
        body: JSON.stringify(messageObj),
      });

      const lastMessage = messages[messages.length - 1]
      if(lastMessage?.chatmsgContent !== messageObj.chatmsgContent){
        dispatch(setMessages([...messages, messageObj]));
        dispatch(
          updateLastmessage({
            chatroomId,
            lastMessage: message,
            lastMessageCreatedAt: koreaTimeString
          })
        );
      }

    }
  };
  return { sendMessage };
};

export default useWebSocket;
