/// <reference types="react-scripts" />

import { Comment } from "./types/comments";
import { Product } from "./types/products";

export interface PromiseProducts {
  limit: number,
  products: Product[],
  skip: number,
  total: number,
}

export interface PromiseComments {
  limit: number,
  comments: Comment[],
  skip: number,
  total: number,
}