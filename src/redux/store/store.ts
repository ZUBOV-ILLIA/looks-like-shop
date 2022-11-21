import { configureStore } from "@reduxjs/toolkit";
import basketSlice from "../slices/basketSlice";
import categoriesSlice from "../slices/categoriesSlice";
import productsSlice from "../slices/productsSlice";

export const store = configureStore({
  reducer: {
    products: productsSlice,
    categories: categoriesSlice,
    basket: basketSlice,
  }
});

export type RootState = ReturnType<typeof store.getState>;