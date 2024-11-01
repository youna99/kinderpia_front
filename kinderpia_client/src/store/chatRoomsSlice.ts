import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatRoomListInfo } from "../types/chat";

interface ChatRoomsState {
  rooms: ChatRoomListInfo[];
  error: boolean;
  loading: boolean;
  isEmpty: boolean;
  isSelected : boolean;
}

const initialState: ChatRoomsState = {
  rooms: [],
  error: false,
  loading: true,
  isEmpty: true,
  isSelected : true,
};

const chatRoomSlice = createSlice({
  name: "chatRooms",
  initialState,
  reducers: {
    setChatRooms: (state, action: PayloadAction<ChatRoomListInfo[]>) => {
      state.rooms = action.payload;
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
    }
  },
});

export const { setChatRooms, setError, setLoading, setEmpty, setSelected } =
  chatRoomSlice.actions;
export default chatRoomSlice.reducer;
