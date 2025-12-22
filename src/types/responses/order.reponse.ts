import type { MethodPayment } from "../enums/methodPayment.enum";
import type { OrderStatus } from "../enums/order.enum";

export type OrderItemResponse = {
  id: number;
  productId?: number | null;
  productName?: string | null;
  comboId?: number | null;
  comboName?: string | null;
  quantity: number;
  price: number;
  subTotal: number;
  productImageUrl?: string | null;
  comboImageUrl?: string | null;
  note?: string;
  reviewed?: boolean;
  productCategoryName?: string | null;
};

export type OrderResponse = {
  orderId: number;
  status: OrderStatus;
  totalPrice: number;
  shippingFee: number;
  vat: number;
  discountAmount?: number; // Thêm field discount từ voucher
  voucherCode?: string; // Thêm field voucher code
  finalAmount?: number; // Thêm field final amount sau discount
  items: OrderItemResponse[];
  paymentMethod: MethodPayment;
  payUrl?: string;
  qrCodeUrl?: string;
  deeplink?: string;
  createdAt: string;
};
