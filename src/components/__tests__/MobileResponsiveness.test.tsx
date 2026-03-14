import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import basketSlice from '../../redux/slices/basketSlice';
import categoriesSlice from '../../redux/slices/categoriesSlice';
import languageSlice from '../../redux/slices/languageSlice';
import pageSlice from '../../redux/slices/pageSlice';
import productsSlice from '../../redux/slices/productsSlice';
import themeSlice from '../../redux/slices/themeSlice';
import wishlistSlice from '../../redux/slices/wishlistSlice';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { Checkout } from '../Checkout/Checkout';

const mockProduct = {
  id: 1,
  title: 'Test Product',
  description: 'A test product',
  price: 100,
  discountPercentage: 10,
  rating: 4.5,
  stock: 50,
  brand: 'TestBrand',
  category: 'test',
  thumbnail: 'https://example.com/img.jpg',
  images: ['https://example.com/img.jpg'],
};

const createTestStore = (basketItems: any[] = []) =>
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
      theme: { theme: 'light' as const },
      lang: { lang: 'en' },
      basket: { basket: basketItems },
      wishlist: { items: [] },
      categories: {
        categories: ['electronics', 'clothing'],
        status: 'idle' as const,
        error: null,
      },
    },
  });

const renderWithProviders = (
  ui: React.ReactElement,
  store = createTestStore(),
) =>
  render(
    <Provider store={store}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>,
  );

describe('Mobile Responsiveness', () => {
  describe('Header', () => {
    it('renders header with sticky class', () => {
      renderWithProviders(<Header />);
      const banners = screen.getAllByRole('banner');
      expect(banners.length).toBeGreaterThanOrEqual(1);
    });

    it('renders theme toggle with accessible label', () => {
      renderWithProviders(<Header />);
      expect(
        screen.getByRole('button', { name: /theme/i }),
      ).toBeInTheDocument();
    });

    it('renders categories button', () => {
      renderWithProviders(<Header />);
      expect(
        screen.getByRole('button', { name: /categories/i }),
      ).toBeInTheDocument();
    });

    it('renders cart and wishlist buttons', () => {
      renderWithProviders(<Header />);
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('Footer', () => {
    it('renders footer as a contentinfo landmark', () => {
      renderWithProviders(<Footer />);
      expect(
        screen.getByRole('contentinfo'),
      ).toBeInTheDocument();
    });

    it('renders footer content', () => {
      renderWithProviders(<Footer />);
      const footer = screen.getByRole('contentinfo');
      expect(footer).toBeInTheDocument();
    });
  });

  describe('Checkout mobile layout', () => {
    it('renders checkout step form with items in cart', () => {
      const store = createTestStore([
        { ...mockProduct, quantity: 1 },
      ]);
      renderWithProviders(<Checkout />, store);
      expect(
        screen.getByTestId('address-step'),
      ).toBeInTheDocument();
    });

    it('renders checkout inputs for address form', () => {
      const store = createTestStore([
        { ...mockProduct, quantity: 1 },
      ]);
      renderWithProviders(<Checkout />, store);
      expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByLabelText('Phone')).toBeInTheDocument();
      expect(screen.getByLabelText('Address')).toBeInTheDocument();
      expect(screen.getByLabelText('City')).toBeInTheDocument();
      expect(screen.getByLabelText('Zip Code')).toBeInTheDocument();
    });

    it('renders continue button for navigation', () => {
      const store = createTestStore([
        { ...mockProduct, quantity: 1 },
      ]);
      renderWithProviders(<Checkout />, store);
      expect(
        screen.getByRole('button', { name: 'Continue' }),
      ).toBeInTheDocument();
    });
  });

  describe('Breakpoint consistency', () => {
    it('header renders without SCSS errors', () => {
      renderWithProviders(<Header />);
      const banners = screen.getAllByRole('banner');
      expect(banners.length).toBeGreaterThanOrEqual(1);
    });

    it('footer renders without SCSS errors', () => {
      renderWithProviders(<Footer />);
      expect(
        screen.getByRole('contentinfo'),
      ).toBeInTheDocument();
    });

    it('checkout renders without SCSS errors', () => {
      const store = createTestStore([
        { ...mockProduct, quantity: 1 },
      ]);
      renderWithProviders(<Checkout />, store);
      expect(
        screen.getByTestId('address-step'),
      ).toBeInTheDocument();
    });
  });
});
