import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../types/products";

interface BasketItem extends Product {
  quantity: number,
}

interface InitialState {
  basket: BasketItem[],
}

const loadBasketFromStorage = (): BasketItem[] => {
	try {
		const stored = localStorage.getItem('basket');
		return stored ? JSON.parse(stored) : [];
	} catch {
		return [];
	}
};

const saveBasketToStorage = (basket: BasketItem[]) => {
	try {
		localStorage.setItem('basket', JSON.stringify(basket));
	} catch {
		// localStorage unavailable
	}
};

const initialState: InitialState = {
	basket: loadBasketFromStorage(),
};

const basketSlice = createSlice({
	name: "basket",
	initialState,
	reducers: {
		addBasketItem: (state, action) => {
			if (state.basket.some(item => item.id === action.payload.id)) {
				state.basket.map(item => {
					if (item.id === action.payload.id) {
						item.quantity += 1;

						return {
							...item,
						};
					}

					return item;
				});
			} else {
				state.basket.push({ ...action.payload, quantity: 1 });
			}
			saveBasketToStorage(state.basket);
		},
		removeBasketItem: (state, action) => {
			state.basket = state.basket.map(item => {
				if (item.id === action.payload.id) {
					item.quantity -= 1;

					return item;
				}

				return item;
			});
			saveBasketToStorage(state.basket);
		},
		deleteBasketItem: (state, action) => {
			state.basket = state.basket.filter((item: BasketItem) => item.id !== action.payload.id);
			saveBasketToStorage(state.basket);
		}
	}
});

export const { addBasketItem, removeBasketItem, deleteBasketItem } = basketSlice.actions;
export default basketSlice.reducer;
