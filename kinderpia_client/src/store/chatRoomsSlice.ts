import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatPageInfo, ChatRoomListInfo } from "../types/chat";

interface ChatRoomsState {
  rooms: ChatRoomListInfo[];
  chatPages: ChatPageInfo;
  error: boolean;
  loading: boolean;
  isEmpty: boolean;
  isSelected: boolean;
  badge : boolean;
}

const initialState: ChatRoomsState = {
  rooms: [],
  chatPages: {
    page: 1,
    totalElements: 1,
    totalPages: 1,
  },
  error: false,
  loading: true,
  isEmpty: true,
  isSelected: false,
  badge : false,
};

const chatRoomSlice = createSlice({
  name: "chatRooms",
  initialState,
  reducers: {
    setChatRooms: (state, action: PayloadAction<ChatRoomListInfo[]>) => {
      state.rooms = action.payload;
    },
    addChatRooms: (state, action: PayloadAction<ChatRoomListInfo[]>) => {
      state.rooms.push(...action.payload);
    },
    updateLastmessage:(state, action: PayloadAction<{chatroomId: number; lastMessage: string}>) => {
      const room = state.rooms.find(room => room.chatroomId === action.payload.chatroomId);
      if(room){
        room.lastMessage = action.payload.lastMessage;
      }
    },
    setPages: (state, action: PayloadAction<ChatPageInfo>) => {
      state.chatPages = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setEmpty: (state, action: PayloadAction<boolean>) => {
      state.isEmpty = action.payload;
    },
    setSelected: (state, action: PayloadAction<boolean>) => {
      state.isSelected = action.payload;
    },
    setBadge: (state, action:PayloadAction<boolean>) => {
      state.badge = action.payload;
    }
  },
});

export const {
  setChatRooms,
  addChatRooms,
  setError,
  setLoading,
  setEmpty,
  setSelected,
  setPages,
  updateLastmessage,
  setBadge
} = chatRoomSlice.actions;
export default chatRoomSlice.reducer;
