import type { MethodPayment } from "../enums/methodPayment.enum";
import type { Address } from "../models/address";
import type { OrderItem } from "../models/orderItem";

export type CreateOrderRequest = {
  items: OrderItem[];
  shippingAddress: Address;
  paymentMethod: MethodPayment;
};
