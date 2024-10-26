import { useEffect, useState } from "react";
import ChatRoom from "./ChatRoom";
import { ChatRoomInfo } from "../../../types/chatlist";

export default function ChatRooms() {
  // 채팅방 참여 목록
  const [chatRooms, setChatRooms] = useState<ChatRoomInfo[]>([]);
  // 에러 처리
  const [error, setError] = useState(false);

  useEffect(() => {
    const socket = new WebSocket("");

    // 웹 소켓 연결 열림
    socket.onopen = () => {
      
      // 서버에 채팅방 리스트 요청
      socket.send(JSON.stringify({action : 'getChatRooms'}))
    }

    // 메시지 받음
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if(data.type === 'chatRooms') {
        setChatRooms(data.rooms);
      }
    }

    // 에러 처리
    socket.onerror = () => {
      setError(true);
    }

    // 소켓 연결 종료
    socket.onclose = () => {

    }

    return () => {
      socket.close();
    }


  }, []);

  return (
    <>
      <ul>
        {
          chatRooms.length > 0 &&
          chatRooms.map((room, index) => (
            <ChatRoom key={index} room={room}/>
          ))
        }
      </ul>
    </>
  )
}
