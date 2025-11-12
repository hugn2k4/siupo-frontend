export const EOrderStatus = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  SHIPPING: "SHIPPING",
  DELIVERED: "DELIVERED",
  COMPLETED: "COMPLETED",
  CANCELED: "CANCELED",
} as const;

export type OrderStatus = (typeof EOrderStatus)[keyof typeof EOrderStatus];
