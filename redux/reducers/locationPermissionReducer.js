import { createSlice } from "@reduxjs/toolkit";

const locationPermissionSlice = createSlice({
  name: "locationPermission",
  initialState: { locationPermission: null },
  reducers: {
    enabled: (state) => {
      state.locationPermission = true;
    },
    disabled: (state) => {
      state.locationPermission = false;
    },
  },
});

export const { enabled, disabled } = locationPermissionSlice.actions;
export default locationPermissionSlice.reducer;
