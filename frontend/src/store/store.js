import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/userReducer";
import mealReducer from "../reducers/mealReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    meal: mealReducer,
  },
});

export default store;
