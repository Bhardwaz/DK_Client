import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axiosInstance";
import toast from "react-hot-toast";

export const fetchUploadUrl = async (fileType) => {
  try {
    const res = await axiosInstance.post("/upload-url", {
      fileType,
    });

    return res.data;
  } catch (error) {
    toast.error(error.message)
    throw new Error(error)
  }
};

export const deletePhoto = createAsyncThunk(
  "delete-photo",
  async (fileUrl, { rejectWithValue }) => {
    try {
      const promise = axiosInstance.delete("/delete-photo", {
        data: { fileUrl },
      });

      const res = await toast.promise(promise, {
        loading: "Wait",
        success: "Your Picture has been Deleted",
        error: "Failed in Deleting",
      });

      return res.data;
    } catch (error) {
      toast.error(error.message)
      rejectWithValue(error.message || "Failed in deleting");
    }
  }
);

export const fetchProfile = createAsyncThunk(
  "profileView",
  async (id, { rejectWithValue }) => {
    try {
      const promise = axiosInstance.get(`/profile/view/${id}`);
      const res = await toast.promise(promise, {
        loading: "Fetching...",
        success: "",
        error: "Failed in Fetching",
      });
      return res.data;
    } catch (error) {
      toast.error(error.message)
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const editProfile = createAsyncThunk(
  "editProfile",
  async (modified, { rejectWithValue }) => {
    try {
      const promise = axiosInstance.patch("/profile/edit", modified);
      const res = await toast.promise(promise, {
        loading: "Sending for Edit",
        success: "Up to date",
        error: "Failed in Editing",
      });
      return res.data;
    } catch (error) {
      toast.error(error.message)
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  status: "idle",
  error: null,
  initialized: false,
  data: null,
  viewId: "",
  photos: [],
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setViewId: (state, action) => {
      state.viewId = action.payload;
    },
    addPhoto: (state, action) => {
      state.photos.push(action.payload);
    },
    setMain: (state, action) => {
      const photo = action.payload;
      const index = state.photos.indexOf(photo);

      if (index > -1) {
        state.photos.splice(index, 1);
        state.photos.unshift(photo);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        const payload = action.payload;
        state.data = payload;
        state.photos = payload.photoUrl;

        state.status = "succeeded";
        state.initialized = true;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      // delete photo
      .addCase(deletePhoto.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deletePhoto.fulfilled, (state, action) => {
        const { fileUrl } = action.payload;
        state.photos = state.photos.filter((url) => url !== fileUrl);

        state.status = "succeeded";
        state.initialized = true;
      })
      .addCase(deletePhoto.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const { setViewId, addPhoto, setMain } = profileSlice.actions;
export default profileSlice.reducer;

// handy selector
export const selectProfile = (state) => state.profile.data;
export const selectViewId = (state) => state.profile.viewId;
export const selectPhotos = (state) => state.profile.photos;
