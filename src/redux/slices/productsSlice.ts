import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../types/products";

interface InitialState {
  products: Product[],
}

const initialState: InitialState = {
	products: [],
};

const productsSlice = createSlice({
	name: "products",
	initialState,
	reducers: {
		setProducts: (state, action) => {
			state.products = action.payload;
		}
	},
});

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;
