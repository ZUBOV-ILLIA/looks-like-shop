import { createSlice } from '@reduxjs/toolkit';


interface InitialState {
  categories: string[],
}

const initialState: InitialState = {
  categories: [],
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    }
  }
});

export const { setCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;
