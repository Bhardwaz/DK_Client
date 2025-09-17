import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addUsers } from "../../auth/authSlice";
import axiosInstance from "../../../utils/axiosInstance";
import toast from "react-hot-toast";

export const fetchFeed = createAsyncThunk(
  "/feed",
  async (_id, { dispatch, rejectWithValue }) => {
    try {
    const promise = axiosInstance.get("/feed", _id);

    const res = await toast.promise(promise, {
      loading: "Loading feed...",
      success: "Feed loaded!",
      error: "Failed to load feed",
    });
    
    const data = res?.data?.feed;
    dispatch(addUsers(data));

    return data;
    } catch (error) {
      return rejectWithValue(error.message || "Falied in loading feed")
    }
  }
);

export const userInteraction = createAsyncThunk(
  "/userInteraction",
  async ({ toUserId, action }) => {
   const promise = await axiosInstance.post(`request/send/${action}/${toUserId}`);
   const data = await toast.promise(promise, {
      loading: "sending",
      success: `${action}`,
      error: "Failed in sending",
    })
   return data
  }
);

const feedSlice = createSlice({
  name: "feed",
  initialState: { allProfiles: [], status: "idle", error: null },
  reducers: {
    removeUser: (state) => {
      state.allProfiles = state.allProfiles.slice(1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.allProfiles = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { removeUser } = feedSlice.actions;
export default feedSlice.reducer;

export const selectAllProfiles = (state) => state.feed.allProfiles;
