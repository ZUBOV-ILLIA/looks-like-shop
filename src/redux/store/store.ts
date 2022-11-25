import { configureStore } from "@reduxjs/toolkit";
import basketSlice from "../slices/basketSlice";
import languageSlice from "../slices/languageSlice";
import pageSlice from "../slices/pageSlice";
import productsSlice from "../slices/productsSlice";

export const store = configureStore({
	reducer: {
		products: productsSlice,
		basket: basketSlice,
		lang: languageSlice,
		page: pageSlice,
	}
});

export type RootState = ReturnType<typeof store.getState>;
