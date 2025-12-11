import type { ApiResponse } from "../types/responses/api.response";
import type { VoucherResponse, VoucherValidationResponse } from "../types/responses/voucher.response";
import axiosClient from "../utils/axiosClient";

const voucherApi = {
  getAvailableVouchers: (): Promise<ApiResponse<VoucherResponse[]>> =>
    axiosClient.get("/vouchers").then((response) => response.data),

  // Validate và tính toán discount cho voucher
  validateVoucher: (voucherCode: string, orderAmount: number): Promise<ApiResponse<VoucherValidationResponse>> =>
    axiosClient
      .post("/vouchers/validate", {
        voucherCode,
        orderAmount,
      })
      .then((response) => response.data),

  // Lấy thông tin voucher theo code
  getVoucherByCode: (code: string): Promise<ApiResponse<VoucherResponse>> =>
    axiosClient.get(`/vouchers/code/${code}`).then((response) => response.data),
};

export default voucherApi;
