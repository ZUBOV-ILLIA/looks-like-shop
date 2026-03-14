import { createSlice } from '@reduxjs/toolkit';

export type ThemeMode = 'light' | 'dark';

const initialState: { theme: ThemeMode } = {
  theme: (localStorage.getItem("theme") as ThemeMode) || 'light'
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem("theme", state.theme);
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem("theme", state.theme);
    }
  }
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
