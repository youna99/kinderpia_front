import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatMessageInfo, ChatPageInfo, ChatRoomInfo } from "../types/chat";

interface ChatState {
  chatroom: ChatRoomInfo | null;
  error: boolean;
  loading: boolean;
  messages: ChatMessageInfo[];
  msgPages: ChatPageInfo;
  unreadMessages : ChatMessageInfo[];
  unreadCounts: { [key: number]: number };
}

const initialState: ChatState = {
  chatroom: null,
  error: false,
  loading: true,
  messages: [],
  msgPages: {
    page: 1,
    totalElements: 1,
    totalPages: 1,
  },
  unreadMessages : [],
  unreadCounts: {},
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChatInfo: (state, action: PayloadAction<ChatRoomInfo>) => {
      state.chatroom = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setMessages: (state, action: PayloadAction<ChatMessageInfo[]>) => {
      state.messages = action.payload;
    },
    setMsgPages: (state, action: PayloadAction<ChatPageInfo>) => {
      state.msgPages = action.payload;
    },
    markMessagesAsRead: (state, action: PayloadAction<number>) => {
      state.unreadCounts[action.payload] = 0; // 특정 채팅방의 읽지 않은 메시지 수 초기화
    },
    addUnreadMessages: (state, action: PayloadAction<ChatMessageInfo>) => {
      state.unreadMessages.push(action.payload);
      state.unreadCounts[action.payload.chatroomId] =
        (state.unreadCounts[action.payload.chatroomId] || 0) + 1;
    },
  },
});

export const {
  setChatInfo,
  setError,
  setLoading,
  setMessages,
  setMsgPages,
  markMessagesAsRead,
  addUnreadMessages
} = chatSlice.actions;
export default chatSlice.reducer;
