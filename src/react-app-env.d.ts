/// <reference types="react-scripts" />

import { Product } from "./types/products";

export interface PromiseProducts {
  limit: number,
  products: Product[],
  skip: number,
  total: number,
}