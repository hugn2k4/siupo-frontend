import type { OrderStatus } from "../enums/order.enum";
import type { Address } from "./address";
import type { OrderItem } from "./orderItem";

export type Order = {
  id: number;
  orderItems: OrderItem[];
  shippingAddress: Address;
  shippingFee: number;
  totalPrice: number;
  vat: number;
  status: OrderStatus;
};
