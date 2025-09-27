import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axiosInstance";
import { createSelector } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const fetchChats = createAsyncThunk(
  "chats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/chats");
      return response?.data;
    } catch (error) {
      toast.error(error.message)
      return rejectWithValue(error.message, "Cannot fetch chats");
    }
  }
);

export const fetchConnectionsWithoutChat = createAsyncThunk(
  "/connectionsWithoutChat",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/connectionsWithoutChat");

      return res?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchMessages = createAsyncThunk(
  "/messages",
  async ({ chatId, batch, limit }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/messages/${chatId}`, {
        params: { batch, limit }
      });
      return res.data;
    } catch (error) {
      toast.error(error.message)
      return rejectWithValue(error.message, "failed in fetching messages");
    }
  }
);

const initialState = {
  status: "idle",
  chats: {
    byId: {},
    allIds: []
  },
  isOnline: false,
  chatsFlag: true,
  connectionsWithoutChat: [],
  connectionsWithoutChatApi:false,
  initialized: false,
  messages: {
    byId: {},
  },
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
     pushMessage: (state, action) => {
      const msg = action.payload;
      const { chat } = msg;

      if (!state.messages?.byId[chat]) {
        state.messages.byId[chat] = [];
      }
      state.messages.byId[chat]?.messages.push(msg);
    },
     updateMessage: (state, action) => {
      const { tempId, chat, messageId, status} = action.payload;
      const chatMessages = state.messages.byId[chat].messages;
      if (!chatMessages) return;
    
      const msgIndex = chatMessages.findIndex(
        (m) => m.tempId === tempId || m._id === messageId || m.messageId === messageId
      );

      if (msgIndex !== -1) {
        const existingMsg = chatMessages[msgIndex];
        // Merge updates safely
        state.messages.byId[chat].messages[msgIndex] = {
          ...existingMsg,
          ...action.payload,
          status: status || existingMsg.status,
        };
      }
    },
    updatePreviewMessage: (state, action) => {
         const msg = action.payload
         const { sender, content, status, unreadCount } = msg

         if(!state.chats.allIds.includes(msg.chat)) return
         state.chats.byId[msg.chat].lastMessage.sender = sender
         state.chats.byId[msg.chat].lastMessage.content = content
         state.chats.byId[msg.chat].lastMessage.status = status
         if(unreadCount) state.chats.byId[msg.chat].unreadCount += unreadCount
    },
    updateUnreadCount: (state, action) => {
        const chat = action.payload
        if(!state.chats.allIds.includes(chat)) return
        state.chats.byId[chat].unreadCount = 0
    },
    isOnline: (state, action) => {
       const { sender, online } = action.payload
       if(!sender) return
       state.isOnline = online
    }   
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.status = "succeeded";
        const chats = action.payload;

        chats?.length > 0 && chats?.forEach(c => {
          if(!state.chats.byId[c._id]) state.chats.byId[c._id] = c
          if(!state.chats.allIds.includes(c._id)) state.chats.allIds.push(c._id) 
        })
        state.initialized = true;
      })
      .addCase(fetchChats.rejected, (state) => {
        state.status = "failed";
        state.initialized = true;
      });

    // fetch Connection without chat
    builder
      .addCase(fetchConnectionsWithoutChat.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchConnectionsWithoutChat.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.connectionsWithoutChat = action.payload;
        state.initialized = true;
        state.connectionsWithoutChatApi = true
      })
      .addCase(fetchConnectionsWithoutChat.rejected, (state) => {
        state.status = "failed";
        state.initialized = true;
      });

    // fetch Messages
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.status = "succeeded";
        const chatId = action.payload.messages[0].chat;
        const { hasMore } = action.payload
        const { batchNum } = action.payload
        const newMessages  = action.payload.messages;
        if(batchNum === 1) state.messages.byId[chatId] = { messages: newMessages, hasMore, batchNum};
        if(batchNum > 1) {
          const existing = current(state.messages.byId[chatId].messages) || []
          state.messages.byId[chatId].messages = [...newMessages, ...existing]
          state.messages.byId[chatId].hasMore = hasMore
          state.messages.byId[chatId].batchNum = batchNum
        }
        state.initialized = true;
      })

      .addCase(fetchMessages.rejected, (state) => {
        state.status = "failed";
        state.initialized = true;
      });
  },
});

export const { pushMessage, updateMessage, updatePreviewMessage, updateUnreadCount, isOnline } = chatSlice.actions;
export default chatSlice.reducer;

// handy selector
export const selectChats = createSelector(
  (state) => state.chat.chats.byId,
  (state) => state.chat.chats.allIds,
  (byId, allIds) => allIds.map(id => byId[id])
);
export const selectConnectionsWithoutChat = (state) =>
  state.chat.connectionsWithoutChat;
export const selectAllMessages = (state) => state.chat.messages;
export const selectConnectionsWithoutChatApi = state => state.chat.connectionsWithoutChatApi
export const chatsFlag = state => state.chat.chatsFlag
export const selectOnline = state => state.chat.isOnline
