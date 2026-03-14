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
import { Checkout } from '../Checkout';

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
      categories: { categories: [], status: 'idle' as const, error: null },
    },
  });

const renderCheckout = (store: ReturnType<typeof createTestStore>) =>
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/checkout']}>
        <Checkout />
      </MemoryRouter>
    </Provider>
  );

describe('Checkout', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('shows empty cart message when basket is empty', () => {
    const store = createTestStore([]);
    renderCheckout(store);
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
  });

  it('renders the address step initially when cart has items', () => {
    const store = createTestStore([{ ...mockProduct, quantity: 1 }]);
    renderCheckout(store);
    expect(screen.getByTestId('address-step')).toBeInTheDocument();
  });

  it('shows progress bar with 3 steps', () => {
    const store = createTestStore([{ ...mockProduct, quantity: 1 }]);
    renderCheckout(store);
    const progressSteps = screen.getAllByTestId('progress-number');
    expect(progressSteps).toHaveLength(3);
    expect(progressSteps[0].textContent).toBe('1');
    expect(progressSteps[1].textContent).toBe('2');
    expect(progressSteps[2].textContent).toBe('3');
  });

  it('validates address fields before proceeding', () => {
    const store = createTestStore([{ ...mockProduct, quantity: 1 }]);
    renderCheckout(store);

    fireEvent.click(screen.getByText('Continue'));

    // Should show required errors
    const errors = screen.getAllByText('This field is required');
    expect(errors.length).toBeGreaterThan(0);
  });

  it('navigates to payment step after valid address', () => {
    const store = createTestStore([{ ...mockProduct, quantity: 1 }]);
    renderCheckout(store);

    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Phone'), { target: { value: '+1234567890' } });
    fireEvent.change(screen.getByLabelText('Address'), { target: { value: '123 Main St' } });
    fireEvent.change(screen.getByLabelText('City'), { target: { value: 'New York' } });
    fireEvent.change(screen.getByLabelText('Zip Code'), { target: { value: '10001' } });

    fireEvent.click(screen.getByText('Continue'));

    expect(screen.getByTestId('payment-step')).toBeInTheDocument();
  });

  it('validates payment fields before proceeding', () => {
    const store = createTestStore([{ ...mockProduct, quantity: 1 }]);
    renderCheckout(store);

    // Fill address and go to payment
    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Phone'), { target: { value: '+1234567890' } });
    fireEvent.change(screen.getByLabelText('Address'), { target: { value: '123 Main St' } });
    fireEvent.change(screen.getByLabelText('City'), { target: { value: 'New York' } });
    fireEvent.change(screen.getByLabelText('Zip Code'), { target: { value: '10001' } });
    fireEvent.click(screen.getByText('Continue'));

    // Try to continue without filling payment
    fireEvent.click(screen.getByText('Continue'));

    expect(screen.getByText('Invalid card number')).toBeInTheDocument();
  });

  it('navigates to confirmation step after valid payment', () => {
    const store = createTestStore([{ ...mockProduct, quantity: 2 }]);
    renderCheckout(store);

    // Fill address
    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Phone'), { target: { value: '+1234567890' } });
    fireEvent.change(screen.getByLabelText('Address'), { target: { value: '123 Main St' } });
    fireEvent.change(screen.getByLabelText('City'), { target: { value: 'New York' } });
    fireEvent.change(screen.getByLabelText('Zip Code'), { target: { value: '10001' } });
    fireEvent.click(screen.getByText('Continue'));

    // Fill payment
    fireEvent.change(screen.getByLabelText('Card Number'), { target: { value: '4111111111111111' } });
    fireEvent.change(screen.getByLabelText('Expiry Date'), { target: { value: '1225' } });
    fireEvent.change(screen.getByLabelText('CVV'), { target: { value: '123' } });
    fireEvent.change(screen.getByLabelText('Cardholder Name'), { target: { value: 'John Doe' } });
    fireEvent.click(screen.getByText('Continue'));

    // Should be on confirmation
    expect(screen.getByTestId('confirmation-step')).toBeInTheDocument();
    expect(screen.getByText('Order Summary')).toBeInTheDocument();
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    // Masked card
    expect(screen.getByText('**** **** **** 1111')).toBeInTheDocument();
  });

  it('can go back from payment to address', () => {
    const store = createTestStore([{ ...mockProduct, quantity: 1 }]);
    renderCheckout(store);

    // Fill address and go to payment
    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Phone'), { target: { value: '+1234567890' } });
    fireEvent.change(screen.getByLabelText('Address'), { target: { value: '123 Main St' } });
    fireEvent.change(screen.getByLabelText('City'), { target: { value: 'New York' } });
    fireEvent.change(screen.getByLabelText('Zip Code'), { target: { value: '10001' } });
    fireEvent.click(screen.getByText('Continue'));

    expect(screen.getByTestId('payment-step')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Back'));

    expect(screen.getByTestId('address-step')).toBeInTheDocument();
    // Address data should be preserved
    expect(screen.getByLabelText('Full Name')).toHaveValue('John Doe');
  });

  it('validates email format', () => {
    const store = createTestStore([{ ...mockProduct, quantity: 1 }]);
    renderCheckout(store);

    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'invalid-email' } });
    fireEvent.change(screen.getByLabelText('Phone'), { target: { value: '+1234567890' } });
    fireEvent.change(screen.getByLabelText('Address'), { target: { value: '123 Main St' } });
    fireEvent.change(screen.getByLabelText('City'), { target: { value: 'New York' } });
    fireEvent.change(screen.getByLabelText('Zip Code'), { target: { value: '10001' } });

    fireEvent.click(screen.getByText('Continue'));

    expect(screen.getByText('Invalid email address')).toBeInTheDocument();
  });

  it('shows order placed screen after placing order', () => {
    const store = createTestStore([{ ...mockProduct, quantity: 1 }]);
    renderCheckout(store);

    // Fill address
    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Phone'), { target: { value: '+1234567890' } });
    fireEvent.change(screen.getByLabelText('Address'), { target: { value: '123 Main St' } });
    fireEvent.change(screen.getByLabelText('City'), { target: { value: 'New York' } });
    fireEvent.change(screen.getByLabelText('Zip Code'), { target: { value: '10001' } });
    fireEvent.click(screen.getByText('Continue'));

    // Fill payment
    fireEvent.change(screen.getByLabelText('Card Number'), { target: { value: '4111111111111111' } });
    fireEvent.change(screen.getByLabelText('Expiry Date'), { target: { value: '1225' } });
    fireEvent.change(screen.getByLabelText('CVV'), { target: { value: '123' } });
    fireEvent.change(screen.getByLabelText('Cardholder Name'), { target: { value: 'John Doe' } });
    fireEvent.click(screen.getByText('Continue'));

    // Place order
    fireEvent.click(screen.getByText('Place Order'));

    expect(screen.getByText('Order Placed!')).toBeInTheDocument();
    expect(screen.getByText('Thank you for your order.')).toBeInTheDocument();
  });

  it('formats card number with spaces', () => {
    const store = createTestStore([{ ...mockProduct, quantity: 1 }]);
    renderCheckout(store);

    // Go to payment step
    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Phone'), { target: { value: '+1234567890' } });
    fireEvent.change(screen.getByLabelText('Address'), { target: { value: '123 Main St' } });
    fireEvent.change(screen.getByLabelText('City'), { target: { value: 'New York' } });
    fireEvent.change(screen.getByLabelText('Zip Code'), { target: { value: '10001' } });
    fireEvent.click(screen.getByText('Continue'));

    const cardInput = screen.getByLabelText('Card Number');
    fireEvent.change(cardInput, { target: { value: '4111111111111111' } });
    expect(cardInput).toHaveValue('4111 1111 1111 1111');
  });
});
