import categoriesReducer, { fetchCategories } from '../categoriesSlice';

describe('categoriesSlice', () => {
  it('should return initial state', () => {
    const state = categoriesReducer(undefined, { type: 'unknown' });
    expect(state).toEqual({ categories: [], loading: false, error: null });
  });

  it('should set loading on fetchCategories.pending', () => {
    const state = categoriesReducer(
      { categories: [], loading: false, error: 'old error' },
      fetchCategories.pending('', undefined)
    );
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should set categories on fetchCategories.fulfilled', () => {
    const state = categoriesReducer(
      { categories: [], loading: true, error: null },
      fetchCategories.fulfilled(['electronics', 'clothing'], '', undefined)
    );
    expect(state.loading).toBe(false);
    expect(state.categories).toEqual(['electronics', 'clothing']);
  });

  it('should set error on fetchCategories.rejected', () => {
    const state = categoriesReducer(
      { categories: [], loading: true, error: null },
      fetchCategories.rejected(new Error('Network error'), '', undefined)
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Network error');
  });

  it('should set default error message when no error message provided', () => {
    const state = categoriesReducer(
      { categories: [], loading: true, error: null },
      fetchCategories.rejected(new Error(), '', undefined)
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBeTruthy();
  });
});
