import type { CartItem } from "../models/cartItem";

export type CartResponse = {
  id: number;
  totalPrice: number;
  items: CartItem[];
};
