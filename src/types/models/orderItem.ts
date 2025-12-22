import type { Combo } from "./combo";
import type { Product } from "./product";

export type OrderItem = {
  id: number;
  product?: Product | null;
  combo?: Combo | null;
  quantity: number;
  totalPrice?: number;
};
