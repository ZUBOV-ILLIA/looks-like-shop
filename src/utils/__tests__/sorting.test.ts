import { sorting } from '../sorting';
import { Product } from '../../types/products';

const createProduct = (overrides: Partial<Product>): Product => ({
  id: 1,
  title: 'Product A',
  description: 'desc',
  price: 100,
  discountPercentage: 0,
  rating: 4,
  stock: 10,
  brand: 'Brand',
  category: 'cat',
  thumbnail: 'img.jpg',
  images: ['img.jpg'],
  ...overrides,
});

describe('sorting', () => {
  const products: Product[] = [
    createProduct({ id: 1, title: 'Banana', price: 30, rating: 3 }),
    createProduct({ id: 2, title: 'Apple', price: 10, rating: 5 }),
    createProduct({ id: 3, title: 'Cherry', price: 20, rating: 4 }),
  ];

  it('sorts by rating (highest first)', () => {
    let result: Product[] = [];
    sorting(products, 'by rating', (sorted: Product[]) => { result = sorted; });
    expect(result.map(p => p.id)).toEqual([2, 3, 1]);
  });

  it('sorts lowest to highest price', () => {
    let result: Product[] = [];
    sorting(products, 'lowest to highest price', (sorted: Product[]) => { result = sorted; });
    expect(result.map(p => p.price)).toEqual([10, 20, 30]);
  });

  it('sorts highest to lowest price', () => {
    let result: Product[] = [];
    sorting(products, 'highest to lowest price', (sorted: Product[]) => { result = sorted; });
    expect(result.map(p => p.price)).toEqual([30, 20, 10]);
  });

  it('sorts alphabetically', () => {
    let result: Product[] = [];
    sorting(products, 'alphabet', (sorted: Product[]) => { result = sorted; });
    expect(result.map(p => p.title)).toEqual(['Apple', 'Banana', 'Cherry']);
  });

  it('sorts alphabet backwards', () => {
    let result: Product[] = [];
    sorting(products, 'alphabet backwards', (sorted: Product[]) => { result = sorted; });
    expect(result.map(p => p.title)).toEqual(['Cherry', 'Banana', 'Apple']);
  });

  it('returns original order for unknown sort', () => {
    let result: Product[] = [];
    sorting(products, 'unknown', (sorted: Product[]) => { result = sorted; });
    expect(result.map(p => p.id)).toEqual([1, 2, 3]);
  });

  it('does not mutate the original array', () => {
    const original = [...products];
    sorting(products, 'by rating', () => {});
    expect(products).toEqual(original);
  });
});
