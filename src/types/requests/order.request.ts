import type { MethodPayment } from "../enums/methodPayment.enum";
import type { Order } from "../models/order";

export type CreateOrderRequest = {
  order: Order;
  methodePayment: MethodPayment;
};
