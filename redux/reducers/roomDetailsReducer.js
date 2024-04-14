import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../constants/theme";

export const getRoomDetails = createAsyncThunk(
  "roomDetails/getRoomDetails",
  async ({ number }) => {
    const response = await axios.get(`${BASE_URL}/api/v1/room/${number}`);
    return response?.data;
  }
);

export const updateRoomDetails = createAsyncThunk(
  "roomDetails/updateRoomDetails",
  async ({ number, temperature }) => {
    const config = {
      headers: { "Content-Type": "application/json", Authorization: authToken },
    };
    const response = await axios.put(
      `${BASE_URL}/api/v1/room/${number}`,
      { temperature },
      config
    );
    return response?.data;
  }
);

const roomDetailsSlice = createSlice({
  name: "roomDetails",
  initialState: {
    loading: null,
    room: null,
    error: null,
  },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRoomDetails.pending, (state, action) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(getRoomDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.room = action.payload.room;
    });
    builder.addCase(getRoomDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});
export const { clearErrors } = roomDetailsSlice.actions;
export default roomDetailsSlice.reducer;
