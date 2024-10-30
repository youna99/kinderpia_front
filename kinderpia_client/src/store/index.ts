import { configureStore } from "@reduxjs/toolkit";
import chatRoomsReducer from './chatRoomsSlice';
import chatReducer from './chatSlice';

const store = configureStore({
    reducer : {
        chatRooms : chatRoomsReducer,
        chat :  chatReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;