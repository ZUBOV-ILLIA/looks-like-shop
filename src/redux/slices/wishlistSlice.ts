import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types/products";

interface WishlistState {
  items: Product[];
}

const loadFromStorage = (): Product[] => {
  try {
    const data = localStorage.getItem("wishlist");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveToStorage = (items: Product[]) => {
  localStorage.setItem("wishlist", JSON.stringify(items));
};

const initialState: WishlistState = {
  items: loadFromStorage(),
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlistItem: (state, action: PayloadAction<Product>) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.push(action.payload);
      }
      saveToStorage(state.items);
    },
    removeWishlistItem: (state, action: PayloadAction<Product>) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload.id
      );
      saveToStorage(state.items);
    },
  },
});

export const { toggleWishlistItem, removeWishlistItem } = wishlistSlice.actions;
export default wishlistSlice.reducer;
