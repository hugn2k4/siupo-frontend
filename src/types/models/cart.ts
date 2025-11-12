import type { CartItem } from "./cartItem";

export type Cart = {
  id: number;
  items: CartItem[];
  totalPrice: number;
};
