import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchApi from "../utils/fetch-utils";

export const mealSlice = createSlice({
  name: "meals",
  initialState: {
    date: null,
    meals: [],
    loading: false,
    error: null,
  },
  reducers: {
    updateDate: (state, action) => {
      state.date = action.payload;
    },
    updateMeals: (state, action) => {
      state.meals = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMeals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMeals.fulfilled, (state, action) => {
        state.loading = false;
        state.meals = action.payload;
      })
      .addCase(getMeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const getMeals = createAsyncThunk(
  "meals/get",
  async (_, { getState }) => {
    const token = getState().user.token;
    const date = getState().meal.date;
    try {
      const mealsRes = await fetchApi({
        urlExt: `meal/${date}`,
        method: "GET",
        token,
      });
      if (!mealsRes.ok) throw new Error(mealsRes.error);
      return mealsRes.meals;
    } catch (error) {
      // error.message !== "jwt expired" && toast.error(error.message, toastOptions);
      console.log(error);
      throw error;
    }
  }
);

export const selectMeals = (state) => state.meal.meals;
export const selectDate = (state) => state.meal.date;

export const mealActions = mealSlice.actions;
export default mealSlice.reducer;
