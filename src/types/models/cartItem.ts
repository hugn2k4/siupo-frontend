import type { Product } from "./product";

export type CartItem = {
  id: number;
  product: Product;
  quantity: number;
  totalPice: number;
  rating: number;
};
