import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../auth/authSlice";
import feedReducer from "../pages/feed/feedSlice";
import requestReducer from "../pages/requests/requestSlice"
import chatsReducer from "../pages/chat/chatSlice"
import profileReducer from '../pages/profile/profileSlice'

const appReducer = combineReducers({
    auth: authReducer,
    feed: feedReducer,
    requests: requestReducer,
    chat: chatsReducer,
    profile: profileReducer
});

const rootReducer = (state, action) => {
  if(action.type === "auth/logout") state = undefined
  return appReducer(state, action)
}

export default rootReducer