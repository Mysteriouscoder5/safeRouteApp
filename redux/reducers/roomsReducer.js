import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../constants/theme";

export const getAllRooms = createAsyncThunk("rooms/getAllRooms", async () => {
  const response = await axios.get(`${BASE_URL}/api/v1/room/all/rooms`);
  return response?.data;
});

const roomsSlice = createSlice({
  name: "rooms",
  initialState: {
    loading: null,
    rooms: [],
    error: null,
  },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllRooms.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllRooms.fulfilled, (state, action) => {
      state.loading = false;
      state.rooms = action.payload.rooms;
    });
    builder.addCase(getAllRooms.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});
export const { clearErrors, clearSuccess } = roomsSlice.actions;
export default roomsSlice.reducer;
