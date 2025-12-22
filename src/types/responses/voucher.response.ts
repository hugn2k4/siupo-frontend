export type VoucherType = "PERCENTAGE" | "FIXED_AMOUNT" | "FREE_SHIPPING";
export type VoucherStatus = "ACTIVE" | "INACTIVE" | "EXPIRED";

export type VoucherResponse = {
  id: number;
  code: string;
  name: string;
  description?: string;
  type: VoucherType;
  discountValue: number;
  minOrderValue?: number;
  maxDiscountAmount?: number;
  usageLimit?: number;
  usedCount: number;
  usageLimitPerUser?: number;
  startDate: string;
  endDate: string;
  status: VoucherStatus;
  isPublic: boolean;
  isAvailable: boolean;
  userUsageCount?: number;
};

export type VoucherValidationResponse = {
  valid: boolean;
  message?: string;
  voucherCode: string;
  discountAmount: number;
  finalAmount: number;
  voucher?: VoucherResponse;
};
