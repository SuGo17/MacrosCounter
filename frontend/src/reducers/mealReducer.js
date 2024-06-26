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
      state.breakfast = segregateMeals(state.meals, "bf");
      state.morningSnack = segregateMeals(state.meals, "ms");
      state.lunch = segregateMeals(state.meals, "l");
      state.eveningSnack = segregateMeals(state.meals, "es");
      state.dinner = segregateMeals(state.meals, "d");
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
      state.breakfast = segregateMeals(state.meals, "bf");
      state.morningSnack = segregateMeals(state.meals, "ms");
      state.lunch = segregateMeals(state.meals, "l");
      state.eveningSnack = segregateMeals(state.meals, "es");
      state.dinner = segregateMeals(state.meals, "d");
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
        state.breakfast = segregateMeals(state.meals, "bf");
        state.morningSnack = segregateMeals(state.meals, "ms");
        state.lunch = segregateMeals(state.meals, "l");
        state.eveningSnack = segregateMeals(state.meals, "es");
        state.dinner = segregateMeals(state.meals, "d");
      })
      .addCase(getMeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteMeal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMeal.fulfilled, (state, action) => {
        state.loading = false;
        state.meals = state.meals.filter(
          (ele) => ele._id !== action.payload._id
        );
        state.breakfast = segregateMeals(state.meals, "bf");
        state.morningSnack = segregateMeals(state.meals, "ms");
        state.lunch = segregateMeals(state.meals, "l");
        state.eveningSnack = segregateMeals(state.meals, "es");
        state.dinner = segregateMeals(state.meals, "d");
      })
      .addCase(deleteMeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addMeal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addMeal.fulfilled, (state, action) => {
        state.loading = false;
        state.meals = [...state.meals, action.payload];
        state.breakfast = segregateMeals(state.meals, "bf");
        state.morningSnack = segregateMeals(state.meals, "ms");
        state.lunch = segregateMeals(state.meals, "l");
        state.eveningSnack = segregateMeals(state.meals, "es");
        state.dinner = segregateMeals(state.meals, "d");
      })
      .addCase(addMeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(editMeal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editMeal.fulfilled, (state, action) => {
        state.loading = false;
        state.meals = state.meals.filter(
          (ele) => ele._id !== action.payload._id
        );
        state.meals = [...state.meals, action.payload];
        state.breakfast = segregateMeals(state.meals, "bf");
        state.morningSnack = segregateMeals(state.meals, "ms");
        state.lunch = segregateMeals(state.meals, "l");
        state.eveningSnack = segregateMeals(state.meals, "es");
        state.dinner = segregateMeals(state.meals, "d");
      })
      .addCase(editMeal.rejected, (state, action) => {
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

export const deleteMeal = createAsyncThunk(
  "meals/delete",
  async (mealId, { getState }) => {
    const token = getState().user.token;

    try {
      const mealsRes = await fetchApi({
        urlExt: `meal/${mealId}`,
        method: "DELETE",
        token,
      });
      if (!mealsRes.ok) throw new Error(mealsRes.error);
      return mealsRes;
    } catch (error) {
      throw error;
    }
  }
);

export const addMeal = createAsyncThunk(
  "meals/add",
  async (data, { getState }) => {
    const token = getState().user.token;
    try {
      const mealRes = await fetchApi({
        urlExt: `meal`,
        formData: data,
        token,
        method: "POST",
      });

      if (!mealRes.ok) throw new Error(mealRes.error);

      return mealRes;
    } catch (error) {
      throw error;
    }
  }
);
export const editMeal = createAsyncThunk(
  "meals/edit",
  async (data, { getState }) => {
    const token = getState().user.token;
    const { _id, ...editData } = data;
    console.log(editData, _id);
    try {
      const mealRes = await fetchApi({
        urlExt: `meal/${_id}`,
        formData: editData,
        token,
        method: "PATCH",
      });

      if (!mealRes.ok) throw new Error(mealRes.error);

      return mealRes;
    } catch (error) {
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
