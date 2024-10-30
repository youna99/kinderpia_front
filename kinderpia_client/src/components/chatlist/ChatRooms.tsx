import { useEffect } from "react";
import ChatRoom from "./ChatRoom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  setChatRooms,
  setEmpty,
  setError,
  setLoading,
} from "../../store/chatRoomsSlice";
import { tempChatListdata } from "../../data/tempChatListdata";
import { ChatRoomListInfo } from "../../types/chat";
import NoChatRoom from "./NoChatRoom";
import { getChatList } from "../../api/chat";

export default function ChatRooms() {
  const dispatch = useDispatch();
  const { rooms, isEmpty } = useSelector(
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

  // 비동기 요청
  useEffect(() => {
    // 임시 데이터
    const tempData: ChatRoomListInfo[] = [...tempChatListdata];
    dispatch(setChatRooms(tempData));
    dispatch(setEmpty(tempData.length === 0));
    dispatch(setError(false));
    dispatch(setLoading(false));
  }, [dispatch, isEmpty]);

  const fetchChatList = async () => {
    try {
      const res = await getChatList();
      // if (res?.status === 200) {
      //   dispatch(setChatRooms(res.data));
      //   dispatch(setEmpty(res.data.length === 0));
      //   dispatch(setError(false));
      //   dispatch(setLoading(false));
      // }
    } catch (error) {
      console.error(error);
      dispatch(setError(true))
      dispatch(setLoading(false))
      throw error;
    }
  };

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
