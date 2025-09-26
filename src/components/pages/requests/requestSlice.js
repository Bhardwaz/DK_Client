import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axiosInstance";
import toast from "react-hot-toast";

export const fetchRequests = createAsyncThunk(
  "fetchRequests",
  async (userId, { rejectWithValue }) => {
    try {
      const requests = await axiosInstance.get("/user/requests/received");
      const data = requests?.data?.data;
      return data;
    } catch (error) {
      toast.error(error.message)
      rejectWithValue(error);
    }
  }
);

export const pushActionsThunk = createAsyncThunk(
  "requests/pushAction",
  async ({ action, targetUserId }, { rejectWithValue }) => {
    try {
      const promise = axiosInstance.post(
        `/request/review/${action}/${targetUserId}`
      );

      const res = await toast.promise(promise, {
        loading: "Sending...",
        success: `${action} successful`,
        error: `Failed to ${action}`,
      });

      return res.data;
    } catch (error) {
      toast.error(error.message)
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const requestSlice = createSlice({
  name: "requests",
  initialState: { allRequests: [], status: "idle", error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRequests.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRequests.fulfilled, (state, action) => {
        state.allRequests = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchRequests.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

    .addCase(pushActionsThunk.pending, (state, action) => {
        state.status = "loading";
        // Optional: optimistic update: remove request immediately
        const { targetUserId } = action.meta.arg;
        state.allRequests = state.allRequests.filter(
          (req) => req.id !== targetUserId
        );
      })
       .addCase(pushActionsThunk.fulfilled, (state) => {
        state.status = "succeeded";
        // Already removed optimistically, no further change needed
      })
      .addCase(pushActionsThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
  },
});

export default requestSlice.reducer;

export const selectAllRequests = (state) => state.requests.allRequests;
