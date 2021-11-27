import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import PlayReducer from '../features/PlaySlice';
let user=userReducer
export default configureStore({
    reducer:{
        user,
        playInfo: PlayReducer
    }
})
