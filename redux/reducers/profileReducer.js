import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../constants/theme";

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (data) => {
    const token = await AsyncStorage.getItem("token");
    const authToken = `Bearer ${JSON.parse(token)}`;
    const config = {
      headers: { "Content-Type": "application/json", Authorization: authToken },
    };
    const response = await axios.put(
      `${BASE_URL}/api/v1/user/update/profile`,
      data,
      config
    );
  
    return response?.data;
  },
  {
    condition: (arg, { getState, extra }) => {
      const user = getState()?.user?.user;
      if (user && Object.keys(user).length > 0) {
        return true;
      } else {
        return false;
      }
    },
  }
);

export const saveEmergencyContact = createAsyncThunk(
  "profile/saveEmergencyContact",
  async (contact) => {
    const token = await AsyncStorage.getItem("token");
    const authToken = `Bearer ${JSON.parse(token)}`;

    const config = {
      headers: { "Content-Type": "application/json", Authorization: authToken },
    };
    const response = await axios.post(
      `${BASE_URL}/api/v1/user/save/contact`,
      contact,
      config
    );

    return response?.data;
  }
);

export const updateEmergencyContact = createAsyncThunk(
  "profile/updateEmergencyContact",
  async (contact) => {
    const token = await AsyncStorage.getItem("token");
    const authToken = `Bearer ${JSON.parse(token)}`;
    const config = {
      headers: { "Content-Type": "application/json", Authorization: authToken },
    };
    const response = await axios.put(
      `${BASE_URL}/api/v1/user/update/contact/${contact._id}`,
      contact,
      config
    );

    return response?.data;
  }
);

export const deleteEmergencyContact = createAsyncThunk(
  "profile/deleteEmergencyContact",
  async (contact) => {
    const token = await AsyncStorage.getItem("token");
    const authToken = `Bearer ${JSON.parse(token)}`;
    const config = {
      headers: { "Content-Type": "application/json", Authorization: authToken },
    };

    const response = await axios.put(
      `${BASE_URL}/api/v1/user/delete/contact`,
      { contactId: contact._id },
      config
    );
    return response?.data;
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    loading: null,
    success: null,
    error: null,
  },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateProfile.pending, (state, action) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.error;
    });
    builder.addCase(saveEmergencyContact.pending, (state, action) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(saveEmergencyContact.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
    });
    builder.addCase(saveEmergencyContact.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.error;
    });
    builder.addCase(updateEmergencyContact.pending, (state, action) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(updateEmergencyContact.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
    });
    builder.addCase(updateEmergencyContact.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.error;
    });
    builder.addCase(deleteEmergencyContact.pending, (state, action) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(deleteEmergencyContact.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
    });
    builder.addCase(deleteEmergencyContact.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.error;
    });
  },
});
export const { clearErrors, clearSuccess } = profileSlice.actions;
export default profileSlice.reducer;
