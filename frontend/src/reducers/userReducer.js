import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    token: null,
    userDetails: null,
    loading: false,
    error: null,
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.userDetails = action.payload.userDetails;
    },
    logout: (state) => {
      state.token = null;
      Cookies.remove("userToken");
      state.userDetails = null;
    },
    updateUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    updateToken: (state, action) => {
      state.token = action.payload;
    },
    updateErr: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.userDetails = action.payload.userDetails;
        Cookies.set("userToken", action.payload.token, { expires: 1 });
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.userDetails = action.payload.userDetails;
        Cookies.set("userToken", action.payload.token, { expires: 1 });
        state.loading = false;
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (formData) => {
    try {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      const options = {
        method: "POST",
        headers,
        body: JSON.stringify(formData),
      };
      const data = await fetch(
        "https://macros-counter-sugo17.onrender.com/api/user/login",
        options
      );
      const res = await data.json();
      if (!data.ok) throw new Error(res.error);

      return { token: res.token, userDetails: "abc" };
    } catch (err) {
      throw err;
    }
  }
);

export const signupUser = createAsyncThunk("user/signup", async (formData) => {
  try {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const options = {
      method: "POST",
      headers,
      body: JSON.stringify(formData),
    };
    const data = await fetch(
      "https://macros-counter-sugo17.onrender.com/api/user/signup",
      options
    );
    const res = await data.json();
    if (!data.ok) throw new Error(res.error);
    return { token: res.token, userDetails: "abc" };
  } catch (err) {
    throw err;
  }
});

export const selectToken = (state) => {
  return state.user.token;
};
export const selectUserDetails = (state) => state.user.userDetails;
export const selectLoading = (state) => state.user.loading;
export const selectError = (state) => state.user.error;

export const userActions = userSlice.actions;

export default userSlice.reducer;
