import { useEffect } from 'react';
import ChatRoom from './ChatRoom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  setChatRooms,
  setEmpty,
  setError,
  setLoading,
} from '../../store/chatRoomsSlice';
import { tempChatListdata } from '../../data/tempChatListdata';
import { ChatRoomInfo } from '../../types/chatlist';
import NoChatRoom from './NoChatRoom';

export default function ChatRooms() {
  const dispatch = useDispatch();
  const { rooms, error, loading, isEmpty } = useSelector(
    (state: RootState) => state.chatRooms
  );

  // 소켓
  /*
  useEffect(() => {
    const socket = new WebSocket("");

    // 웹 소켓 연결 열림
    socket.onopen = () => {
      // 서버에 채팅방 리스트 요청
      socket.send(JSON.stringify({ action: "getChatRooms" }));
    };

    // 메시지 받음
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "chatRooms") {
        dispatch(setChatRooms(data.rooms));
        dispatch(setEmpty(tempData.length === 0));
        dispatch(setError(false));
        dispatch(setLoading(true));
      }
    };
    
    // 에러 처리
    socket.onerror = () => {
      dispatch(setError(true));
      dispatch(setLoading(false));
    };

    // 소켓 연결 종료
    socket.onclose = () => {
      dispatch(setLoading(true));
    };

    return () => {
      socket.close();
    };
  }, [dispatch, isEmpty]);
  */

  // 임시 데이터
  useEffect(() => {
    const tempData: ChatRoomInfo[] = [...tempChatListdata];
    dispatch(setChatRooms(tempData));
    dispatch(setEmpty(tempData.length === 0));
    dispatch(setError(false));
    dispatch(setLoading(true));
  }, [dispatch, isEmpty]);

  if (isEmpty) return <NoChatRoom />;

  return (
    <>
      <ul>
        {rooms.length > 0 &&
          rooms.map((room, index) => <ChatRoom key={index} room={room} />)}
      </ul>
    </>
  );
}
