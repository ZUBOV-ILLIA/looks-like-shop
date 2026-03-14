import wishlistReducer, { toggleWishlistItem, removeWishlistItem } from '../wishlistSlice';

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
  thumbnail: 'test.jpg',
  images: ['test.jpg'],
};

const mockProduct2 = {
  ...mockProduct,
  id: 2,
  title: 'Test Product 2',
};

describe('wishlistSlice', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return empty items by default', () => {
    const state = wishlistReducer(undefined, { type: 'unknown' });
    expect(state.items).toEqual([]);
  });

  it('should add item when toggling a new item', () => {
    const state = wishlistReducer({ items: [] }, toggleWishlistItem(mockProduct));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].id).toBe(1);
  });

  it('should remove item when toggling an existing item', () => {
    const initialState = { items: [mockProduct] };
    const state = wishlistReducer(initialState, toggleWishlistItem(mockProduct));
    expect(state.items).toHaveLength(0);
  });

  it('should persist to localStorage on toggle add', () => {
    wishlistReducer({ items: [] }, toggleWishlistItem(mockProduct));
    const stored = JSON.parse(localStorage.getItem('wishlist')!);
    expect(stored).toHaveLength(1);
    expect(stored[0].id).toBe(1);
  });

  it('should persist to localStorage on toggle remove', () => {
    wishlistReducer({ items: [mockProduct] }, toggleWishlistItem(mockProduct));
    const stored = JSON.parse(localStorage.getItem('wishlist')!);
    expect(stored).toHaveLength(0);
  });

  it('should remove a specific item with removeWishlistItem', () => {
    const initialState = { items: [mockProduct, mockProduct2] };
    const state = wishlistReducer(initialState, removeWishlistItem(mockProduct));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].id).toBe(2);
  });

  it('should persist after removeWishlistItem', () => {
    wishlistReducer({ items: [mockProduct, mockProduct2] }, removeWishlistItem(mockProduct));
    const stored = JSON.parse(localStorage.getItem('wishlist')!);
    expect(stored).toHaveLength(1);
    expect(stored[0].id).toBe(2);
  });

  it('should handle corrupted localStorage gracefully', () => {
    localStorage.setItem('wishlist', 'not-json');
    const state = wishlistReducer({ items: [] }, toggleWishlistItem(mockProduct));
    expect(state.items).toHaveLength(1);
  });
});
