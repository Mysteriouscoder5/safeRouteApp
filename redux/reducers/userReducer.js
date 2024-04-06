import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../constants/theme";
import { removeFromStorage } from "../../constants/helperFunctions";

export const googleLoginIn = createAsyncThunk(
  "user/googleLoginIn",
  async ({ idToken }) => {
    const config = { headers: { "Content-Type": "application/json" } };
    const response = await axios.post(
      `${BASE_URL}/api/v1/user/app/google/login`,

      {
        idToken,
      },
      config
    );

    await AsyncStorage.setItem("user", JSON.stringify(response?.data?.user));
    await AsyncStorage.setItem("token", JSON.stringify(response?.data?.token));
    return response?.data;
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async ({ username, email, password }, { dispatch }) => {
    dispatch(clearErrors());
    const config = { headers: { "Content-Type": "application/json" } };
    const response = await axios.post(
      `${BASE_URL}/api/v1/user/register`,
      { username, email, password },
      config
    );
    await AsyncStorage.setItem("user", JSON.stringify(response?.data?.user));
    await AsyncStorage.setItem("token", JSON.stringify(response?.data?.token));
    return response?.data;
  }
);

export const emailLogin = createAsyncThunk(
  "user/emailLogin",
  async ({ email, password }, { dispatch }) => {
    dispatch(clearErrors());
    const config = { headers: { "Content-Type": "application/json" } };
    const response = await axios.post(
      `${BASE_URL}/api/v1/user/login`,
      { email, password },
      config
    );
    await AsyncStorage.setItem("user", JSON.stringify(response?.data?.user));
    await AsyncStorage.setItem("token", JSON.stringify(response?.data?.token));
    return response?.data;
  }
);

export const sendOtp = createAsyncThunk(
  "user/sendOtp",
  async ({ phone }, { dispatch }) => {
    dispatch(clearErrors());
    const config = { headers: { "Content-Type": "application/json" } };
    const response = await axios.post(
      `${BASE_URL}/api/v1/user/login/send/otp`,
      { phone },
      config
    );

    return {
      status: response?.data?.verification?.status,
      phone,
    };
  }
);

export const verifyOtp = createAsyncThunk(
  "user/verifyOtp",
  async ({ phone, otp }, { dispatch }) => {
    dispatch(clearErrors());
    const config = { headers: { "Content-Type": "application/json" } };
    const response = await axios.post(
      `${BASE_URL}/api/v1/user/login/verify/otp`,

      { phone, otp },
      config
    );

    await AsyncStorage.setItem("token", JSON.stringify(response?.data?.token));
    await AsyncStorage.setItem("user", JSON.stringify(response?.data?.user));
    return response?.data;
  }
);

export const loadUser = createAsyncThunk(
  "user/loadUser",
  async (arg, { dispatch }) => {
    dispatch(clearErrors());
    const token = await AsyncStorage.getItem("token");
    const authToken = `Bearer ${JSON.parse(token)}`;
    const response = await axios.get(`${BASE_URL}/api/v1/user/details`, {
      headers: { Authorization: authToken },
    });
    await AsyncStorage.setItem("user", JSON.stringify(response?.data?.user));
    await AsyncStorage.setItem("token", JSON.stringify(response?.data?.token));
    return response?.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: null,
    user: null,
    token: null,
    error: null,
    status: null,
    phone: null,
    verificationError: null,
  },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
      state.verificationError = null;
    },
    clearStatus: (state) => {
      state.status = null;
      state.loading = null;
    },
    logOut: (state) => {
      removeFromStorage({ key: "user" });
      removeFromStorage({ key: "token" });
      state.user = null;
      state.token = null;
      state.loading = null;
      state.phone = null;
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(googleLoginIn.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(googleLoginIn.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(googleLoginIn.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(registerUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(emailLogin.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(emailLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(emailLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(sendOtp.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(sendOtp.fulfilled, (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
      state.phone = action.payload.phone;
    });
    builder.addCase(sendOtp.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
      console.log("error", action.error);
    });
    builder.addCase(verifyOtp.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(verifyOtp.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(verifyOtp.rejected, (state, action) => {
      state.loading = false;
      state.verificationError = action.error;
      console.log("error", action.error);
    });
    builder.addCase(loadUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(loadUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
      console.log(action.error);
    });
  },
});

export const { clearErrors, logOut, clearStatus } = userSlice.actions;
export default userSlice.reducer;
