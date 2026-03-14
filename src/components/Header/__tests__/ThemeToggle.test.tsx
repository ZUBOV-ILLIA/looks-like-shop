import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import basketSlice from '../../../redux/slices/basketSlice';
import categoriesSlice from '../../../redux/slices/categoriesSlice';
import languageSlice from '../../../redux/slices/languageSlice';
import pageSlice from '../../../redux/slices/pageSlice';
import productsSlice from '../../../redux/slices/productsSlice';
import themeSlice from '../../../redux/slices/themeSlice';
import wishlistSlice from '../../../redux/slices/wishlistSlice';
import { Header } from '../Header';

const createTestStore = (initialTheme: 'light' | 'dark' = 'light') =>
  configureStore({
    reducer: {
      products: productsSlice,
      basket: basketSlice,
      lang: languageSlice,
      page: pageSlice,
      wishlist: wishlistSlice,
      categories: categoriesSlice,
      theme: themeSlice,
    },
    preloadedState: {
      theme: { theme: initialTheme },
      lang: { lang: 'en' },
      basket: { basket: [] },
      wishlist: { items: [] },
      categories: { categories: [], status: 'idle' as const, error: null },
    },
  });

const renderHeader = (store: ReturnType<typeof createTestStore>) =>
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </Provider>
  );

describe('Theme Toggle in Header', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders the theme toggle button', () => {
    const store = createTestStore();
    renderHeader(store);
    const toggleButton = screen.getByLabelText('Toggle theme');
    expect(toggleButton).toBeInTheDocument();
  });

  it('shows dark mode icon when theme is light', () => {
    const store = createTestStore('light');
    renderHeader(store);
    expect(screen.getByTestId('DarkModeOutlinedIcon')).toBeInTheDocument();
  });

  it('shows light mode icon when theme is dark', () => {
    const store = createTestStore('dark');
    renderHeader(store);
    expect(screen.getByTestId('LightModeOutlinedIcon')).toBeInTheDocument();
  });

  it('toggles theme when clicking the button', () => {
    const store = createTestStore('light');
    renderHeader(store);

    const toggleButton = screen.getByLabelText('Toggle theme');
    fireEvent.click(toggleButton);

    expect(store.getState().theme.theme).toBe('dark');
  });

  it('toggles theme back to light', () => {
    const store = createTestStore('dark');
    renderHeader(store);

    const toggleButton = screen.getByLabelText('Toggle theme');
    fireEvent.click(toggleButton);

    expect(store.getState().theme.theme).toBe('light');
  });
});
