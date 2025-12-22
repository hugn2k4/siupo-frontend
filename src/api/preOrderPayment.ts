// src/services/preOrderPaymentService.ts
import axiosClient from "../utils/axiosClient";
import type { ApiResponse } from "../types/responses/api.response";

interface PreOrderPaymentRequest {
  amount: number;
  description: string;
  items: Array<{
    productId?: number;
    comboId?: number;
    name: string;
    quantity: number;
    price: number;
  }>;
  customerInfo: {
    name: string;
    phone: string;
  };
}

interface PreOrderPaymentData {
  orderId: string;
  payUrl: string;
  amount: number;
}

const preOrderPayment = {
  createPayment: async (request: PreOrderPaymentRequest) => {
    const response = await axiosClient.post<ApiResponse<PreOrderPaymentData>>(
      "/pre-order/payment/momo/create",
      request
    );
    return response.data;
  },
};

export default preOrderPayment;
