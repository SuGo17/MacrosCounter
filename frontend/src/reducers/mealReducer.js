import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchApi from "../utils/fetch-utils";

const segregateMeals = (meals, tag) => {
  return meals.filter((ele) => ele.tag === tag);
};

export const mealSlice = createSlice({
  name: "meals",
  initialState: {
    date: null,
    meals: [],
    breakfast: [],
    morningSnack: [],
    lunch: [],
    eveningSnack: [],
    dinner: [],
    loading: false,
    error: null,
  },
  reducers: {
    updateDate: (state, action) => {
      state.date = action.payload;
    },
    addMeals: (state, action) => {
      state.meals = [...state.meals, action.payload];
      state.breakfast = segregateMeals(action.payload, "bf");
      state.morningSnack = segregateMeals(action.payload, "ms");
      state.lunch = segregateMeals(action.payload, "l");
      state.eveningSnack = segregateMeals(action.payload, "es");
      state.dinner = segregateMeals(action.payload, "d");
    },
    removeMeals: (state, action) => {
      state.meals = state.meals.filter((ele) => ele._id !== action.payload._id);
      state.breakfast = segregateMeals(state.meals, "bf");
      state.morningSnack = segregateMeals(state.meals, "ms");
      state.lunch = segregateMeals(state.meals, "l");
      state.eveningSnack = segregateMeals(state.meals, "es");
      state.dinner = segregateMeals(state.meals, "d");
    },
    updateMeals: (state, action) => {
      state.meals = state.meals.filter((ele) => ele._id !== action.payload._id);
      state.meals = [...state.meals, action.payload];
      state.breakfast = segregateMeals(action.payload, "bf");
      state.morningSnack = segregateMeals(action.payload, "ms");
      state.lunch = segregateMeals(action.payload, "l");
      state.eveningSnack = segregateMeals(action.payload, "es");
      state.dinner = segregateMeals(action.payload, "d");
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
        state.breakfast = segregateMeals(action.payload, "bf");
        state.morningSnack = segregateMeals(action.payload, "ms");
        state.lunch = segregateMeals(action.payload, "l");
        state.eveningSnack = segregateMeals(action.payload, "es");
        state.dinner = segregateMeals(action.payload, "d");
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
export const selectBreakfast = (state) => state.meal.breakfast;
export const selectMorningSnack = (state) => state.meal.morningSnack;
export const selectLunch = (state) => state.meal.lunch;
export const selectEveningSnack = (state) => state.meal.eveningSnack;
export const selectDinner = (state) => state.meal.dinner;
export const selectError = (state) => state.meal.error;
export const selectLoading = (state) => state.meal.loading;

export const mealActions = mealSlice.actions;
export default mealSlice.reducer;
