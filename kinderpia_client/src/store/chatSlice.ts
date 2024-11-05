import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatMessageInfo, ChatPageInfo, ChatRoomInfo } from "../types/chat";

interface ChatState {
  chatroom: ChatRoomInfo | null;
  error: boolean;
  loading: boolean;
  messages: ChatMessageInfo[];
  msgPages : ChatPageInfo;
}

const initialState:ChatState = {
  chatroom: null,
  error: false,
  loading: true,
  messages: [],
  msgPages: {
    page :1,
    totalElements:1,
    totalPages:1
  }
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
    
  },
});

export const {setChatInfo, setError, setLoading, setMessages, setMsgPages} = chatSlice.actions;
export default chatSlice.reducer;
