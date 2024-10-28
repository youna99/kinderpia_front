import { configureStore } from "@reduxjs/toolkit";
import chatRoomsReducer from './chatRoomsSlice';

const store = configureStore({
    reducer : {
        chatRooms : chatRoomsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;