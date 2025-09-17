import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { fetchFeed } from "../pages/feed/feedSlice";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

export const fetchLoggedInUser = createAsyncThunk(
  "/auth/loggedInUser",
  async (_, { rejectWithValue }) => {
    try {
      const promise = axiosInstance.get("/auth/loggedInUser");

      const res = await toast.promise(promise, {
        loading: "wait...trying to let you in",
        success: (data) => `Welcome ${data?.data?.user?.firstName}`,
        error: "Looks like your credentials are expired!",
      });

      if (res.status !== 200) {
        const errorData = res.data;
        return rejectWithValue(
          errorData.message || "Session does not exist. Please sign in again"
        );
      }

      const user = res.data.user;
      return user;
    } catch (error) {
      return rejectWithValue(error.message || "Network Error");
    }
  }
);

export const signinUser = createAsyncThunk(
  "/signin",
  async ({ email, password }, { rejectWithValue, dispatch }) => {
    try {
      const promise = axiosInstance.post("/signin", {
        email,
        password,
      });

      const res = await toast.promise(promise, {
        loading: "Letting you in",
        success: "Welcome back!",
        error: "Check your credentials",
      });

      if (!res.status === 200) {
        const errorData = res.data;
        return rejectWithValue(errorData.message || "Login failed");
      }
      const user = res?.data?.user;

      // prefetch feed after login
      dispatch(fetchFeed(user._id));

      return user;
    } catch (error) {
      return rejectWithValue(error.message || "Network Error");
    }
  }
);

export const signupUser = createAsyncThunk(
  "/signup",
  async (formData, { rejectWithValue, dispatch }) => {
    try {
      const promise = axiosInstance.post("/signup", formData);

      const res = await toast.promise(promise, {
        loading: "Creating your account",
        success: "Your dream match is here",
        error: "Failed in creating account",
      });

      if (res.status !== 200) {
        const errorData = await res.json();
        return rejectWithValue(errorData.message || "Login failed");
      }

      const user = res?.data?.user;

      // prefetch feed api
      dispatch(fetchFeed(user._id));

      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message || "Network Error");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "/logout",
  async (_, { rejectWithValue }) => {
    try {
      const promise = axiosInstance.post("/logout");

      const res = await toast.promise(promise, {
        loading: "Logging you out",
        success: "Logged out",
        error: "Failed in logging out",
      });

      if (res.status !== 200) {
        const data = res.data;
        rejectWithValue(data.message || "Logout failed");
      }

      return res.data;
    } catch (error) {
      return rejectWithValue(error.message || "Network Error");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: null,
    usersById: {},
    status: "idle",
    error: null,
    loggedinUser: null,
    initialized: false,
  },
  reducers: {
    // Generic method to add multiple users at once (used by feed too)
    addUsers: (state, action) => {
      action.payload.forEach((user) => {
        state.usersById[user._id] = user;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(signinUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signinUser.fulfilled, (state, action) => {
        const user = action.payload;
        state.usersById[user._id] = user;
        state.userId = user._id;
        state.status = "succeeded";
        state.loggedinUser = action.payload;
      })
      .addCase(signinUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Signup (same as login)
      .addCase(signupUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        const user = action.payload;
        state.usersById[user._id] = user;
        state.userId = user._id;
        state.status = "succeeded";
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // auth/loggedInUser

      .addCase(fetchLoggedInUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchLoggedInUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loggedinUser = action.payload;
        state.initialized = true;
      })
      .addCase(fetchLoggedInUser.rejected, (state, action) => {
        state.status = "failed";
        state.loggedinUser = null;
        state.error = action.payload || "Auth check failed";
        state.initialized = true;
      })

      // logout user
      .addCase(logoutUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
        state.loggedinUser = null;
        state.initialized = true;
      })

      .addCase(logoutUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Could not logout";
        state.initialized = true;
      });
  },
});

export const { addUsers } = authSlice.actions;
export default authSlice.reducer;

// some handy functions to avoid duplicacy
export const selectAuthReady = (state) => state.auth.initialized;
export const selectUser = (state) => state.auth.loggedinUser;
export const selectIsAuth = (state) => Boolean(state.auth.loggedinUser);
export const selectStatus = (state) => state.auth.status;
