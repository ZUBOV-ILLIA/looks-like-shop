import { configureStore } from "@reduxjs/toolkit";
import basketSlice from "../slices/basketSlice";
import categoriesSlice from "../slices/categoriesSlice";
import languageSlice from "../slices/languageSlice";
import pageSlice from "../slices/pageSlice";
import productsSlice from "../slices/productsSlice";
import wishlistSlice from "../slices/wishlistSlice";

export const store = configureStore({
	reducer: {
		products: productsSlice,
		basket: basketSlice,
		lang: languageSlice,
		page: pageSlice,
		wishlist: wishlistSlice,
		categories: categoriesSlice,
	}
});

export type RootState = ReturnType<typeof store.getState>;
