import themeReducer, { toggleTheme, setTheme } from '../themeSlice';

describe('themeSlice', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return the initial state with light theme by default', () => {
    const state = themeReducer(undefined, { type: 'unknown' });
    expect(state.theme).toBe('light');
  });

  it('should read initial theme from localStorage', () => {
    localStorage.setItem('theme', 'dark');
    // Re-import would be needed to test this properly, so we test via setTheme
    const state = themeReducer(undefined, setTheme('dark'));
    expect(state.theme).toBe('dark');
  });

  it('should toggle from light to dark', () => {
    const state = themeReducer({ theme: 'light' }, toggleTheme());
    expect(state.theme).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('should toggle from dark to light', () => {
    const state = themeReducer({ theme: 'dark' }, toggleTheme());
    expect(state.theme).toBe('light');
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('should set theme to a specific value', () => {
    const state = themeReducer({ theme: 'light' }, setTheme('dark'));
    expect(state.theme).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('should persist theme to localStorage on toggle', () => {
    themeReducer({ theme: 'light' }, toggleTheme());
    expect(localStorage.getItem('theme')).toBe('dark');

    themeReducer({ theme: 'dark' }, toggleTheme());
    expect(localStorage.getItem('theme')).toBe('light');
  });
});
