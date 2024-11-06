import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { getChatList } from "../api/chat";
import { ChatRoomInfo } from "../types/chat";
import {
  addChatRooms,
  setChatRooms,
  setEmpty,
  setError,
  setLoading,
  setPages,
} from "../store/chatRoomsSlice";
import { getJwtFromCookies } from "../utils/extractUserIdFromCookie";

export const useChatListFetch = (currentPage: number) => {
  const dispatch = useDispatch();
  const { isEmpty } = useSelector((state: RootState) => state.chatRooms);

  useEffect(() => {
    const jwt = getJwtFromCookies();
    if (!jwt) return;
    fetchChatList(jwt, currentPage);
    return () => {};
  }, [dispatch, isEmpty]);

  const fetchChatList = async (token: string, page: number) => {
    try {
      const res = await getChatList(token, page);
      if (res.status === 200) {
        const chatroomList: ChatRoomInfo[] = res.data.data.chatroomList;
        if (currentPage === 1) {
          dispatch(setChatRooms(chatroomList));
        } else {
          dispatch(addChatRooms(chatroomList));
        }
        dispatch(setPages(res.data.pageInfo));
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

  return { fetchChatList };
};
