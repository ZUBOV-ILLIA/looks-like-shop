import { configureStore } from "@reduxjs/toolkit";
import basketSlice from "../slices/basketSlice";
import productsSlice from "../slices/productsSlice";

export const store = configureStore({
	reducer: {
		products: productsSlice,
		basket: basketSlice,
	}
});

export type RootState = ReturnType<typeof store.getState>;