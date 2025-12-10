import type { Combo } from "./combo";
import type { Product } from "./product";

export type OrderItem = {
  id: number;
  product: Product | Combo;
  quantity: number;
  totalPrice: number;
};
