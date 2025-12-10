import type { Combo } from "./combo";
import type { Product } from "./product";

export type CartItem = {
  id: number;
  product: Product | null;
  combo: Combo | null;
  quantity: number;
  totalPrice: number;
  rating: number;
};
