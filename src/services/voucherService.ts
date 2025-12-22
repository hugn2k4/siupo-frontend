import voucherApi from "../api/voucherApi";
import type { VoucherResponse, VoucherValidationResponse } from "../types/responses/voucher.response";

const voucherService = {
  getAvailableVouchers: async (): Promise<VoucherResponse[]> => {
    try {
      const response = await voucherApi.getAvailableVouchers();
      return response.data || [];
    } catch (error) {
      console.error("Get available vouchers failed:", error);
      throw error;
    }
  },

  /**
   * Validate và tính toán discount cho voucher
   */
  validateVoucher: async (voucherCode: string, orderAmount: number): Promise<VoucherValidationResponse> => {
    try {
      const response = await voucherApi.validateVoucher(voucherCode, orderAmount);
      return response.data!;
    } catch (error) {
      console.error("Validate voucher failed:", error);
      throw error;
    }
  },

  /**
   * Lấy thông tin voucher theo code
   */
  getVoucherByCode: async (code: string): Promise<VoucherResponse> => {
    try {
      const response = await voucherApi.getVoucherByCode(code);
      return response.data!;
    } catch (error) {
      console.error("Get voucher by code failed:", error);
      throw error;
    }
  },

  /**
   * Format voucher value để hiển thị
   */
  formatVoucherValue: (voucher: VoucherResponse): string => {
    if (voucher.type === "FREE_SHIPPING") return "Free Shipping";
    if (voucher.type === "PERCENTAGE") return `${voucher.discountValue}%`;
    return `${new Intl.NumberFormat("vi-VN").format(voucher.discountValue)}₫`;
  },

  /**
   * Check xem user có thể dùng voucher không
   */
  canUseVoucher: (voucher: VoucherResponse, orderAmount: number): { canUse: boolean; reason?: string } => {
    // Check minOrderValue
    if (voucher.minOrderValue && orderAmount < voucher.minOrderValue) {
      return {
        canUse: false,
        reason: `Order minimum ${new Intl.NumberFormat("vi-VN").format(voucher.minOrderValue)}₫ required`,
      };
    }

    // Check if available
    if (!voucher.isAvailable) {
      return {
        canUse: false,
        reason: "This voucher is not available",
      };
    }

    // Check status
    if (voucher.status !== "ACTIVE") {
      return {
        canUse: false,
        reason: "This voucher is not active",
      };
    }

    // Check dates
    const now = new Date();
    const startDate = new Date(voucher.startDate);
    const endDate = new Date(voucher.endDate);

    if (now < startDate) {
      return {
        canUse: false,
        reason: "This voucher is not valid yet",
      };
    }

    if (now > endDate) {
      return {
        canUse: false,
        reason: "This voucher has expired",
      };
    }

    return { canUse: true };
  },
};

export default voucherService;
