import type { MethodPayment } from "../enums/methodPayment.enum";
import type { OrderStatus } from "../enums/order.enum";

export type OrderItemResponse = {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  subTotal: number;
};

export type OrderResponse = {
  orderId: number;
  items: OrderItemResponse[];
  totalPrice: number;
  shippingFee: number;
  vat: number;
  status: OrderStatus;
  paymentMethod: MethodPayment;
};
