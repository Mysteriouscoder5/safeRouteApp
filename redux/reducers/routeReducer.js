import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  loading: null,
  Path: null,
  Room: null,
  Exit: null,
  WayOut: null,
  error: null,
};
const routeSlice = createSlice({
  name: "route",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
    registerRoute: (state, action) => {
      const data = action.payload;
      state.Path = data.Path;
      state.Room = data.Room;
      state.Exit = data.Exit;
      state.WayOut = data.WayOut;
    },
  },
});
export const { clearErrors, registerRoute } = routeSlice.actions;
export default routeSlice.reducer;
