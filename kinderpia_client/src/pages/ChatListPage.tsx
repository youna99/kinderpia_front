import { useEffect } from "react";
import ChatRooms from "../components/chatlist/ChatRooms";
import "../styles/chatlist/ChatListPage.scss";
import SelectedChatRoom from "../components/chatlist/SelectedChatRoom";
import UnSelectedChatRoom from "../components/chatlist/UnSelectedChatRoom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import NoChatRoom from "../components/chatlist/NoChatRoom";
import {
  setChatRooms,
  setEmpty,
  setError,
  setLoading,
} from "../store/chatRoomsSlice";
import { getChatList } from "../api/chat";
import { ChatRoomListInfo } from "../types/chat";
import { tempChatListdata } from "../data/tempChatListdata";

export default function ChatlistPage() {
  const dispatch = useDispatch();
  const { rooms, isEmpty, isSelected } = useSelector(
    (state: RootState) => state.chatRooms
  );

  useEffect(() => {
    const upBtn = document.querySelector(".up-btn") as HTMLButtonElement | null;
    // 페이지 마운트 시 스크롤 방지, 위로가기 버튼 없애기
    document.body.style.overflow = "hidden";

    if (upBtn) {
      upBtn.classList.add("hidden");
      upBtn.style.display = "none";
    }

    // 페이지 언마운트 시 스크롤 풀기, 위로가기 버튼 살리기
    return () => {
      document.body.style.overflow = "unset";
      if (upBtn) {
        upBtn.classList.remove("hidden");
        upBtn.style.display = "flex";
      }
    };
  }, []);

  // 비동기 요청
  useEffect(() => {
    // 임시 데이터
    tempChatList();
    // fetchChatList();
  }, [dispatch, isEmpty]);

  // 채팅방 목록 조회 함수(비동기) -> 백엔드와 연결 후 활성화
  const fetchChatList = async () => {
    try {
      const res = await getChatList(101, 1, 10);
      if (res?.status === 200) {
        const chatroomList = res.data.data.chatroomList;
        dispatch(setChatRooms(chatroomList));
        dispatch(setEmpty(chatroomList.length === 0));
        dispatch(setError(false));
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.error(error);
      dispatch(setError(true));
      dispatch(setLoading(false));
      throw error;
    }
  };

  // 임시 데이터 불러오는 함수
  const tempChatList = () => {
    const tempData: ChatRoomListInfo[] = [...tempChatListdata];
    dispatch(setChatRooms(tempData));
    dispatch(setEmpty(tempData.length === 0));
    dispatch(setError(false));
    dispatch(setLoading(false));
  };

  return (
    <section className="chatlist">
      {isEmpty ? (
        <NoChatRoom />
      ) : (
        <div className="chatlist-wrapper">
          <ChatRooms />
          {isSelected ? <SelectedChatRoom /> : <UnSelectedChatRoom />}
        </div>
      )}
    </section>
  );
}
