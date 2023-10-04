import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import getData from "../utils/fetch-utils";
import { toast } from "react-toastify";

const toastOptions = {
  position: "bottom-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    token: null,
    userDetails: null,
    userRole: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      Cookies.remove("userToken");
      state.userDetails = null;
      state.userRole = null;
    },
    updateUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    updateToken: (state, action) => {
      state.token = action.payload;
    },
    updateUserRole: (state, action) => {
      state.userRole = action.payload;
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
        state.userDetails = action.payload.userDetails.userDetails;
        state.userRole = action.payload.userDetails.userDetails.role;
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
        state.userDetails = action.payload.userDetails.userDetails;
        state.userRole = action.payload.userDetails.userDetails.role;
        Cookies.set("userToken", action.payload.token, { expires: 1 });
        state.loading = false;
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(initialData.pending, (state) => {
        state.loading = true;
      })
      .addCase(initialData.fulfilled, (state, action) => {
        state.userDetails = action.payload.userDetails;
        state.userRole = action.payload.userDetails.role;
        state.loading = false;
        state.error = null;
      })
      .addCase(initialData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (formData) => {
    try {
      const loginData = await getData({
        urlExt: "login",
        method: "POST",
        formData,
      });
      const loginRes = await loginData.json();

      if (!loginData.ok) throw new Error(loginRes.error);
      const userDetails = await getData({
        urlExt: "details",
        method: "GET",
        token: loginRes.token,
      });
      if (!userDetails.ok) throw new Error(userDetails.error);
      const userDetailsRes = await userDetails.json();
      toast.success("Login Successful!", toastOptions);
      return { token: loginRes.token, userDetails: userDetailsRes };
    } catch (err) {
      toast.error(err.message, toastOptions);
      throw err;
    }
  }
);

export const signupUser = createAsyncThunk("user/signup", async (formData) => {
  try {
    const signupData = await getData({
      urlExt: "signup",
      method: "POST",
      formData,
    });
    const signupRes = await signupData.json();
    if (!signupData.ok) throw new Error(signupRes.error);
    const userDetails = await getData({
      urlExt: "details",
      method: "GET",
      token: signupRes.token,
    });
    if (!userDetails.ok) throw new Error(userDetails.error);
    const userDetailsRes = await userDetails.json();
    toast.success("Sign Up Successful!", toastOptions);
    return { token: signupRes.token, userDetails: userDetailsRes };
  } catch (err) {
    toast.error(err.message, toastOptions);
    throw err;
  }
});

export const initialData = createAsyncThunk(
  "user/initialData",
  async (_, { getState }) => {
    const currState = getState();
    try {
      const userDetails = await getData({
        urlExt: "details",
        method: "GET",
        token: currState.user.token,
      });
      if (!userDetails.ok) throw new Error(userDetails.error);
      const userDetailsRes = await userDetails.json();
      return { userDetails: userDetailsRes.userDetails };
    } catch (err) {
      return err;
    }
  }
);

export const selectToken = (state) => {
  return state.user.token;
};
export const selectUserDetails = (state) => state.user.userDetails;
export const selectLoading = (state) => state.user.loading;
export const selectError = (state) => state.user.error;
export const selectUserRole = (state) => state.user.userRole;

export const userActions = userSlice.actions;

export default userSlice.reducer;
