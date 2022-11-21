import { createSlice } from '@reduxjs/toolkit';
import { Product } from '../../types/products';

interface BasketItem extends Product {
  quantity: number,
}

interface InitialState {
  basket: BasketItem[],
};

const initialState: InitialState = {
  basket: [],
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addBasketItem: (state, action) => {
      if (state.basket.some(item => item.id === action.payload.id)) {
        state.basket.map(item => {
          if (item.id === action.payload.id) {
            item.quantity += 1;

            return {
              ...item,
            }
          }

          return item;
        })
      } else {
        state.basket.push({ ...action.payload, quantity: 1 });
      }
    },
    removeBasketItem: (state, action) => {
      state.basket = state.basket.map(item => {
        if (item.id === action.payload.id) {
          item.quantity -= 1;

          return item;
        }

        return item;
      })

    },
    deleteBasketItem: (state, action) => {
      state.basket = state.basket.filter((item: BasketItem) => item.id !== action.payload.id);
    }
  }
});

export const { addBasketItem, removeBasketItem, deleteBasketItem } = basketSlice.actions;
export default basketSlice.reducer;
