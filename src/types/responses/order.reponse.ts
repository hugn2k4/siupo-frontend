import type { MethodPayment } from "../enums/methodPayment.enum";
import type { OrderStatus } from "../enums/order.enum";

export type OrderItemResponse = {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  subTotal: number;
  productImageUrl: string;
  note?: string;
  reviewed?: boolean;
};

export type OrderResponse = {
  orderId: number;
  status: OrderStatus;
  totalPrice: number;
  shippingFee: number;
  vat: number;
  items: OrderItemResponse[];
  paymentMethod: MethodPayment;
  payUrl?: string;
  qrCodeUrl?: string;
  deeplink?: string;
};
