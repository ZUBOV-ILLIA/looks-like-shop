import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';

// Slices
import basketReducer from '../../redux/slices/basketSlice';
import productsReducer from '../../redux/slices/productsSlice';
import categoriesReducer from '../../redux/slices/categoriesSlice';
import langReducer from '../../redux/slices/languageSlice';
import wishlistReducer from '../../redux/slices/wishlistSlice';
import pageReducer from '../../redux/slices/pageSlice';
import themeReducer from '../../redux/slices/themeSlice';

const mockProduct = {
  id: 1,
  title: 'Test Product',
  description: 'A test product description',
  price: 100,
  discountPercentage: 10,
  rating: 4.5,
  stock: 50,
  brand: 'TestBrand',
  category: 'test-category',
  thumbnail: 'test.jpg',
  images: ['test.jpg', 'test2.jpg'],
};

const createStore = (overrides: Record<string, any> = {}) =>
  configureStore({
    reducer: {
      basket: basketReducer,
      products: productsReducer,
      categories: categoriesReducer,
      lang: langReducer,
      wishlist: wishlistReducer,
      page: pageReducer,
      theme: themeReducer,
    },
    preloadedState: {
      basket: { basket: [] },
      products: { products: [] },
      categories: { categories: ['test-category'], loading: false, error: null },
      lang: { lang: 'en' },
      wishlist: { items: [] },
      page: { page: 1 },
      theme: { theme: 'light' },
      ...overrides,
    },
  });

describe('PageNotFound', () => {
  it('renders 404 page with back to home link', async () => {
    const { PageNotFound } = await import('../PageNotFound/PageNotFound');
    const store = createStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PageNotFound />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/');
  });
});

describe('Layout', () => {
  it('renders main content for valid category', async () => {
    const { Layout } = await import('../Layout/Layout');
    const store = createStore();
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/test-category']}>
          <Routes>
            <Route path="/:category" element={<Layout />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    // Layout renders Header successfully
    expect(screen.getByTestId('DarkModeOutlinedIcon')).toBeInTheDocument();
  });

  it('renders PageNotFound for invalid category', async () => {
    const { Layout } = await import('../Layout/Layout');
    const store = createStore();
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/invalid-category']}>
          <Routes>
            <Route path="/:category" element={<Layout />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    // Should show 404 content
    expect(screen.getByText('404')).toBeInTheDocument();
  });
});

describe('ProductCard', () => {
  it('renders product info correctly', async () => {
    const { ProductCard } = await import('../ProductCard/ProductCard');
    const store = createStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductCard product={mockProduct} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('A test product description')).toBeInTheDocument();
  });

  it('shows discounted price when discount exists', async () => {
    const { ProductCard } = await import('../ProductCard/ProductCard');
    const store = createStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductCard product={mockProduct} />
        </MemoryRouter>
      </Provider>
    );
    // 100 * (1 - 0.10) = 90.00
    expect(screen.getByText('$90.00')).toBeInTheDocument();
    expect(screen.getByText('$100.00')).toBeInTheDocument();
    expect(screen.getByText('-10%')).toBeInTheDocument();
  });

  it('shows regular price when no discount', async () => {
    const { ProductCard } = await import('../ProductCard/ProductCard');
    const noDiscountProduct = { ...mockProduct, discountPercentage: 0 };
    const store = createStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductCard product={noDiscountProduct} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('$100.00')).toBeInTheDocument();
  });

  it('adds product to cart when add button is clicked', async () => {
    const { ProductCard } = await import('../ProductCard/ProductCard');
    const store = createStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductCard product={mockProduct} />
        </MemoryRouter>
      </Provider>
    );
    fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));
    expect(store.getState().basket.basket).toHaveLength(1);
  });

  it('toggles wishlist when heart button is clicked', async () => {
    const { ProductCard } = await import('../ProductCard/ProductCard');
    const store = createStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductCard product={mockProduct} />
        </MemoryRouter>
      </Provider>
    );
    // The wishlist button has FavoriteBorder icon
    const wishlistBtn = screen.getByTestId('FavoriteBorderIcon');
    fireEvent.click(wishlistBtn);
    expect(store.getState().wishlist.items).toHaveLength(1);
  });

  it('has lazy loading on product image', async () => {
    const { ProductCard } = await import('../ProductCard/ProductCard');
    const store = createStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductCard product={mockProduct} />
        </MemoryRouter>
      </Provider>
    );
    const img = screen.getByAltText('Test Product');
    expect(img).toHaveAttribute('loading', 'lazy');
  });
});

describe('Search', () => {
  it('renders search input and button', async () => {
    const { Search } = await import('../Search/Search');
    const store = createStore();
    const mockQuery = jest.fn();
    const mockGetProducts = jest.fn();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Search query="" liftingQuery={mockQuery} getProducts={mockGetProducts} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('calls liftingQuery on input change', async () => {
    const { Search } = await import('../Search/Search');
    const store = createStore();
    const mockQuery = jest.fn();
    const mockGetProducts = jest.fn();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Search query="" liftingQuery={mockQuery} getProducts={mockGetProducts} />
        </MemoryRouter>
      </Provider>
    );
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'phone' } });
    expect(mockQuery).toHaveBeenCalledWith('phone');
  });

  it('calls getProducts on search button click with non-empty query', async () => {
    const { Search } = await import('../Search/Search');
    const store = createStore();
    const mockQuery = jest.fn();
    const mockGetProducts = jest.fn();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Search query="phone" liftingQuery={mockQuery} getProducts={mockGetProducts} />
        </MemoryRouter>
      </Provider>
    );
    fireEvent.click(screen.getAllByText(/search/i).find(el => el.tagName === 'BUTTON')!);
    expect(mockGetProducts).toHaveBeenCalledWith('phone');
  });

  it('does not search with empty query', async () => {
    const { Search } = await import('../Search/Search');
    const store = createStore();
    const mockQuery = jest.fn();
    const mockGetProducts = jest.fn();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Search query="   " liftingQuery={mockQuery} getProducts={mockGetProducts} />
        </MemoryRouter>
      </Provider>
    );
    fireEvent.click(screen.getAllByText(/search/i).find(el => el.tagName === 'BUTTON')!);
    expect(mockGetProducts).not.toHaveBeenCalled();
  });

  it('searches on Enter key press', async () => {
    const { Search } = await import('../Search/Search');
    const store = createStore();
    const mockQuery = jest.fn();
    const mockGetProducts = jest.fn();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Search query="phone" liftingQuery={mockQuery} getProducts={mockGetProducts} />
        </MemoryRouter>
      </Provider>
    );
    fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' });
    expect(mockGetProducts).toHaveBeenCalledWith('phone');
  });
});

describe('Wishlist drawer', () => {
  it('renders empty state when no items', async () => {
    const { Wishlist } = await import('../Wishlist/Wishlist');
    const store = createStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Wishlist drawerIsOpen={true} onClose={jest.fn()} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('Wishlist')).toBeInTheDocument();
    expect(screen.getByText('Your wishlist is empty')).toBeInTheDocument();
  });

  it('renders items when wishlist has products', async () => {
    const { Wishlist } = await import('../Wishlist/Wishlist');
    const store = createStore({ wishlist: { items: [mockProduct] } });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Wishlist drawerIsOpen={true} onClose={jest.fn()} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });

  it('adds item to cart from wishlist', async () => {
    const { Wishlist } = await import('../Wishlist/Wishlist');
    const store = createStore({ wishlist: { items: [mockProduct] } });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Wishlist drawerIsOpen={true} onClose={jest.fn()} />
        </MemoryRouter>
      </Provider>
    );
    fireEvent.click(screen.getByText(/add to cart/i));
    expect(store.getState().basket.basket).toHaveLength(1);
  });

  it('removes item from wishlist', async () => {
    const { Wishlist } = await import('../Wishlist/Wishlist');
    const store = createStore({ wishlist: { items: [mockProduct] } });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Wishlist drawerIsOpen={true} onClose={jest.fn()} />
        </MemoryRouter>
      </Provider>
    );
    const deleteIcon = screen.getByTestId('DeleteOutlineIcon');
    fireEvent.click(deleteIcon);
    expect(store.getState().wishlist.items).toHaveLength(0);
  });
});

describe('LanguageSelector', () => {
  it('renders with current language', async () => {
    const { LanguageSelector } = await import('../LanguageSelector/LanguageSelector');
    const store = createStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LanguageSelector />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('EN')).toBeInTheDocument();
  });
});

describe('ItemsPerPageSelector', () => {
  it('renders with the given items per page value', async () => {
    const { ItemsPerPageSelector } = await import('../ItemsPerPageSelector/ItemsPerPageSelector');
    const store = createStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ItemsPerPageSelector itemsPerPage={8} liftingItemsPerPage={jest.fn()} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('8')).toBeInTheDocument();
  });
});

describe('Cart drawer', () => {
  it('renders empty cart state', async () => {
    const { Cart } = await import('../Cart/Cart');
    const store = createStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Cart drawerIsOpen={true} liftingDrawerIsOpen={jest.fn()} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/your cart is empty|empty/i)).toBeInTheDocument();
  });

  it('renders cart with items', async () => {
    const { Cart } = await import('../Cart/Cart');
    const store = createStore({
      basket: { basket: [{ ...mockProduct, quantity: 2 }] },
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Cart drawerIsOpen={true} liftingDrawerIsOpen={jest.fn()} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('increments quantity', async () => {
    const { Cart } = await import('../Cart/Cart');
    const store = createStore({
      basket: { basket: [{ ...mockProduct, quantity: 1 }] },
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Cart drawerIsOpen={true} liftingDrawerIsOpen={jest.fn()} />
        </MemoryRouter>
      </Provider>
    );
    fireEvent.click(screen.getByText('+'));
    expect(store.getState().basket.basket[0].quantity).toBe(2);
  });

  it('decrements quantity', async () => {
    const { Cart } = await import('../Cart/Cart');
    const store = createStore({
      basket: { basket: [{ ...mockProduct, quantity: 3 }] },
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Cart drawerIsOpen={true} liftingDrawerIsOpen={jest.fn()} />
        </MemoryRouter>
      </Provider>
    );
    fireEvent.click(screen.getByText('−'));
    expect(store.getState().basket.basket[0].quantity).toBe(2);
  });

  it('deletes item from cart', async () => {
    const { Cart } = await import('../Cart/Cart');
    const store = createStore({
      basket: { basket: [{ ...mockProduct, quantity: 1 }] },
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Cart drawerIsOpen={true} liftingDrawerIsOpen={jest.fn()} />
        </MemoryRouter>
      </Provider>
    );
    const deleteIcon = screen.getByTestId('DeleteOutlineIcon');
    fireEvent.click(deleteIcon);
    expect(store.getState().basket.basket).toHaveLength(0);
  });

  it('closes drawer and navigates to checkout', async () => {
    const { Cart } = await import('../Cart/Cart');
    const mockClose = jest.fn();
    const store = createStore({
      basket: { basket: [{ ...mockProduct, quantity: 1 }] },
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Cart drawerIsOpen={true} liftingDrawerIsOpen={mockClose} />
        </MemoryRouter>
      </Provider>
    );
    fireEvent.click(screen.getByText(/proceed to checkout|checkout/i));
    expect(mockClose).toHaveBeenCalledWith(false);
  });

  it('shows correct total price with discount', async () => {
    const { Cart } = await import('../Cart/Cart');
    const store = createStore({
      basket: { basket: [{ ...mockProduct, quantity: 2, discountPercentage: 10, price: 100 }] },
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Cart drawerIsOpen={true} liftingDrawerIsOpen={jest.fn()} />
        </MemoryRouter>
      </Provider>
    );
    // 100 * 0.9 * 2 = 180.00 (appears in item total and cart total)
    const totals = screen.getAllByText('$180.00');
    expect(totals.length).toBeGreaterThanOrEqual(1);
  });
});

describe('SingleProduct', () => {
  const mockProductData = {
    ...mockProduct,
    images: ['test.jpg', 'test2.jpg'],
    stock: 30,
  };

  const mockComments = {
    comments: [
      { id: 1, body: 'Great product!', user: { username: 'testuser' } },
    ],
  };

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('renders product details after loading', async () => {
    // Mock the API modules
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockProductData),
    } as Response).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockComments),
    } as Response);

    const { SingleProduct } = await import('../SingleProduct/SingleProduct');
    const store = createStore();
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/products/1']}>
          <Routes>
            <Route path="/products/:params" element={<SingleProduct />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    // Wait for product to load
    expect(await screen.findByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('A test product description')).toBeInTheDocument();
    expect(screen.getByText('$90.00')).toBeInTheDocument();
    expect(screen.getByText('$100.00')).toBeInTheDocument();
  });

  it('renders comments section', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockProductData),
    } as Response).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockComments),
    } as Response);

    const { SingleProduct } = await import('../SingleProduct/SingleProduct');
    const store = createStore();
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/products/1']}>
          <Routes>
            <Route path="/products/:params" element={<SingleProduct />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(await screen.findByText('Great product!')).toBeInTheDocument();
    expect(screen.getByText('TE')).toBeInTheDocument(); // first 2 chars uppercase
  });

  it('adds product to cart and shows snackbar', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockProductData),
    } as Response).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ comments: [] }),
    } as Response);

    const { SingleProduct } = await import('../SingleProduct/SingleProduct');
    const store = createStore();
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/products/1']}>
          <Routes>
            <Route path="/products/:params" element={<SingleProduct />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await screen.findByText('Test Product');
    fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));
    expect(store.getState().basket.basket).toHaveLength(1);
  });

  it('toggles wishlist for product', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockProductData),
    } as Response).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ comments: [] }),
    } as Response);

    const { SingleProduct } = await import('../SingleProduct/SingleProduct');
    const store = createStore();
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/products/1']}>
          <Routes>
            <Route path="/products/:params" element={<SingleProduct />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await screen.findByText('Test Product');
    // SingleProduct renders Header which also has a FavoriteBorderIcon
    // Find the one in the product info section
    const favoriteIcons = screen.getAllByTestId('FavoriteBorderIcon');
    fireEvent.click(favoriteIcons[favoriteIcons.length - 1]);
    expect(store.getState().wishlist.items).toHaveLength(1);
  });

  it('selects different thumbnail', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockProductData),
    } as Response).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ comments: [] }),
    } as Response);

    const { SingleProduct } = await import('../SingleProduct/SingleProduct');
    const store = createStore();
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/products/1']}>
          <Routes>
            <Route path="/products/:params" element={<SingleProduct />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await screen.findByText('Test Product');
    // Should have thumbnails since there are 2 images
    const thumbs = screen.getAllByAltText(/Test Product \d/);
    if (thumbs.length > 1) {
      fireEvent.click(thumbs[1]);
    }
  });
});
