import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatRoomInfo } from "../types/chat";

interface ChatState {
  chatroom: ChatRoomInfo | null;
  error: boolean;
  loading: boolean;
}

const initialState:ChatState = {
  chatroom: null,
  error: false,
  loading: true,
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
  },
});

export const {setChatInfo, setError, setLoading} = chatSlice.actions;
export default chatSlice.reducer;
