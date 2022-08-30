import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  success: false,
  id: "",
  password: "",
  auth: false,
};

export const loginThunk = createAsyncThunk(
  "login/loginThunks",
  async ({ id, password }) => {
    try {
      const response = await axios.post("백엔드 주소", {
        id,
        password,
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout: (state) => {
      state.id = "";
      state.password = "";
      state.auth = false;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: {
    [loginThunk.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [loginThunk.fulfilled]: (state) => {
      state.loading = false;
      state.auth = true;
    },
    [loginThunk.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { logout } = loginSlice.actions;

export default loginSlice.reducer;
