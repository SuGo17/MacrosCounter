import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import fetchApi from "../utils/fetch-utils";
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
    refreshToken: null,
    userDetailsRes: null,
    userRole: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      Cookies.remove("userToken");
      Cookies.remove("refreshToken");
      state.refreshToken = null;
      state.userDetailsRes = null;
      state.userRole = null;
    },
    updateUserDetails: (state, action) => {
      state.userDetailsRes = action.payload;
    },
    updateToken: (state, action) => {
      state.token = action.payload;
    },
    updateRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
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
        state.refreshToken = action.payload.refreshToken;
        state.userDetailsRes = action.payload.userDetails;
        state.userRole = action.payload.userDetails.role;
        Cookies.set("userToken", action.payload.token, { expires: 1 });
        Cookies.set("refreshToken", action.payload.refreshToken, {
          expires: 1,
        });
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
        state.refreshToken = action.payload.refreshToken;
        state.userDetailsRes = action.payload.userDetailsRes.userDetailsRes;
        state.userRole = action.payload.userDetailsRes.userDetailsRes.role;
        Cookies.set("userToken", action.payload.token, { expires: 1 });
        Cookies.set("refreshToken", action.payload.refreshToken, {
          expires: 1,
        });
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
        state.userDetailsRes = action.payload.userDetailsRes;
        state.userRole = action.payload.userDetailsRes?.role;
        state.loading = false;
        state.error = null;
      })
      .addCase(initialData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUserDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserDetails.fulfilled, (state, action) => {
        state.userDetailsRes = action.payload.updatedData;
        state.loading = false;
        state.error = null;
      })
      .addCase(updateUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        console.log(state);
        Cookies.remove("userToken");
        Cookies.remove("refreshToken");
        state.loading = false;
        state.error = null;
        state.token = null;
        state.refreshToken = null;
        state.userDetailsRes = null;
        state.userRole = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        console.log(action);
        state.loading = false;
        state.error = action.error.message;
        Cookies.remove("userToken");
        Cookies.remove("refreshToken");
        state.loading = false;
        state.error = null;
        state.token = null;
        state.refreshToken = null;
        state.userDetailsRes = null;
        state.userRole = null;
      })
      .addCase(refreshIdToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(refreshIdToken.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.token = action.payload.token;
      })
      .addCase(refreshIdToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (formData) => {
    try {
      const loginRes = await fetchApi({
        urlExt: "login",
        method: "POST",
        formData,
      });
      if (!loginRes.ok) throw new Error(loginRes.error);
      const userDetailsRes = await fetchApi({
        urlExt: "details",
        method: "GET",
        token: loginRes.token,
      });
      if (!userDetailsRes.ok) throw new Error(userDetailsRes.error);
      toast.success("Login Successful!", toastOptions);
      return {
        token: loginRes.token,
        refreshToken: loginRes.refreshToken,
        userDetails: userDetailsRes.userDetails,
      };
    } catch (err) {
      err.message !== "jwt expired" && toast.error(err.message, toastOptions);
      throw err;
    }
  }
);

export const refreshIdToken = createAsyncThunk(
  "user/refresh",
  async (_, { getState }) => {
    const refreshToken = getState().user.refreshToken;
    try {
      const refreshRes = await fetchApi({
        urlExt: "token-refresh",
        method: "POST",
        formData: { refreshToken },
      });
      if (!refreshRes.ok) throw new Error(refreshRes.error);
      return { token: refreshRes.token };
    } catch (error) {
      error.message !== "jwt expired" &&
        toast.error(error.message, toastOptions);
      throw error;
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, { getState }) => {
    const token = getState().user.token;

    try {
      const logoutRes = await fetchApi({
        urlExt: "logout",
        method: "GET",
        token,
      });
      if (!logoutRes.ok) throw new Error(logoutRes.error);
    } catch (error) {
      error.message !== "jwt expired" &&
        toast.error(error.message, toastOptions);
      throw error;
    }
  }
);

export const signupUser = createAsyncThunk("user/signup", async (formData) => {
  try {
    const signupRes = await fetchApi({
      urlExt: "signup",
      method: "POST",
      formData,
    });
    if (!signupRes.ok) throw new Error(signupRes.error);
    const userDetailsRes = await fetchApi({
      urlExt: "details",
      method: "GET",
      token: signupRes.token,
    });
    if (!userDetailsRes.ok) throw new Error(userDetailsRes.error);
    toast.success("Sign Up Successful!", toastOptions);
    return {
      token: signupRes.token,
      refreshToken: signupRes.refreshToken,
      userDetailsRes: userDetailsRes,
    };
  } catch (err) {
    err.message !== "jwt expired" && toast.error(err.message, toastOptions);
    throw err;
  }
});

export const initialData = createAsyncThunk(
  "user/initialData",
  async (_, { getState }) => {
    const currState = getState();
    try {
      const userDetailsRes = await fetchApi({
        urlExt: "details",
        method: "GET",
        token: currState.user.token,
      });
      if (!userDetailsRes.ok) throw new Error(userDetailsRes.error);
      return { userDetailsRes: userDetailsRes.userDetails };
    } catch (err) {
      err.message !== "jwt expired" && toast.error(err.message, toastOptions);
      throw err;
    }
  }
);

export const updateUserDetails = createAsyncThunk(
  "user/update-userDetails",
  async (formData, { getState }) => {
    const currState = getState();
    try {
      const res = await fetchApi({
        urlExt: "details",
        method: "PATCH",
        token: currState.user.token,
        formData,
      });
      if (!res.ok) throw new Error(res.error);
      delete res["_id"];
      delete res["user_id"];
      return { ...currState.user["userDetailsRes"], ...res };
    } catch (error) {
      error.message !== "jwt expired" &&
        toast.error(error.message, toastOptions);
      throw error;
    }
  }
);

export const selectToken = (state) => {
  return state.user.token;
};
export const selectUserDetails = (state) => state.user.userDetailsRes;
export const selectLoading = (state) => state.user.loading;
export const selectError = (state) => state.user.error;
export const selectUserRole = (state) => state.user.userRole;

export const userActions = userSlice.actions;

export default userSlice.reducer;
