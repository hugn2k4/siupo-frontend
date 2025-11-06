import type { Product } from "./product";

export type OrderItem = {
  id: number;
  product: Product;
  quantity: number;
  totalPice: number;
};
