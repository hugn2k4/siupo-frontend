export const EMethodPayment = {
  COD: "COD",
  MOMO: "MOMO",
  VNPAY: "VNPAY",
} as const;
export type MethodPayment = (typeof EMethodPayment)[keyof typeof EMethodPayment];
