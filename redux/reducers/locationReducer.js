import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  loading: null,
  location: null,
  error: null,
};
const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
  },
  extraReducers: (builder) => {},
});
export const { clearErrors, setLocation } = locationSlice.actions;
export default locationSlice.reducer;
