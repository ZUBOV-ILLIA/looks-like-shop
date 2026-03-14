import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import { ScrollToTop } from '../ScrollToTop/ScrollToTop';

// Mock store for components that need Redux
const createMockStore = () => configureStore({
  reducer: {
    basket: () => ({ basket: [] }),
    products: () => ({ products: [] }),
    lang: () => ({ lang: 'en' }),
    page: () => ({ page: 1 }),
    wishlist: () => ({ items: [] }),
    categories: () => ({ categories: [], loading: false }),
    theme: () => ({ theme: 'light' }),
  },
});

describe('ScrollToTop component', () => {
  it('should render hidden by default', () => {
    render(<ScrollToTop />);
    const button = screen.getByLabelText('Scroll to top');
    expect(button).toBeInTheDocument();
    expect(button).not.toHaveClass('scroll-to-top--visible');
  });

  it('should become visible when scrolled past 300px', () => {
    render(<ScrollToTop />);
    const button = screen.getByLabelText('Scroll to top');

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 400, writable: true });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(button).toHaveClass('scroll-to-top--visible');
  });

  it('should hide when scrolled back to top', () => {
    render(<ScrollToTop />);
    const button = screen.getByLabelText('Scroll to top');

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 400, writable: true });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(button).toHaveClass('scroll-to-top--visible');

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(button).not.toHaveClass('scroll-to-top--visible');
  });

  it('should call window.scrollTo when clicked', () => {
    const scrollToMock = jest.fn();
    window.scrollTo = scrollToMock;

    render(<ScrollToTop />);
    const button = screen.getByLabelText('Scroll to top');

    fireEvent.click(button);
    expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });
});

describe('App with ScrollToTop', () => {
  it('should render ScrollToTop in the app', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ScrollToTop />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByLabelText('Scroll to top')).toBeInTheDocument();
  });
});

describe('Product loading skeletons', () => {
  it('should show skeletons while loading', async () => {
    const store = createMockStore();

    // Import Main lazily to capture loading state
    const { Main } = await import('../Main/Main');

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Main />
        </MemoryRouter>
      </Provider>
    );

    // During initial load, skeletons should be present
    const skeletons = screen.getAllByTestId('product-skeleton');
    expect(skeletons.length).toBeGreaterThan(0);
  });
});

describe('Image lazy loading', () => {
  it('should have loading="lazy" on product card images', async () => {
    const store = configureStore({
      reducer: {
        basket: () => ({ basket: [] }),
        products: () => ({ products: [] }),
        lang: () => ({ lang: 'en' }),
        page: () => ({ page: 1 }),
        wishlist: () => ({ items: [] }),
        categories: () => ({ categories: [], loading: false }),
        theme: () => ({ theme: 'light' }),
      },
    });

    const { ProductCard } = await import('../ProductCard/ProductCard');

    const mockProduct = {
      id: 1,
      title: 'Test',
      description: 'Test desc',
      price: 100,
      discountPercentage: 0,
      rating: 4,
      stock: 10,
      brand: 'Test',
      category: 'test',
      thumbnail: 'https://example.com/img.jpg',
      images: ['https://example.com/img.jpg'],
    };

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductCard product={mockProduct} />
        </MemoryRouter>
      </Provider>
    );

    const img = screen.getByAltText('Test');
    expect(img).toHaveAttribute('loading', 'lazy');
  });
});
