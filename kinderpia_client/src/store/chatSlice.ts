import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatMessageInfo, ChatRoomInfo } from "../types/chat";

interface ChatState {
  chatroom: ChatRoomInfo | null;
  error: boolean;
  loading: boolean;
  messages: ChatMessageInfo[];
}

const initialState:ChatState = {
  chatroom: null,
  error: false,
  loading: true,
  messages: []
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
    }
  },
});

export const {setChatInfo, setError, setLoading, setMessages} = chatSlice.actions;
export default chatSlice.reducer;
