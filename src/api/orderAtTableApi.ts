import axiosClient from "../utils/axiosClient";

export interface OrderAtTableItemRequest {
  productId?: number;
  comboId?: number;
  quantity: number;
  note?: string;
}

export interface OrderAtTableRequest {
  tableId: number;
  items: OrderAtTableItemRequest[];
  note?: string;
  paymentMethod?: "COD" | "MOMO";
}

export interface OrderAtTableResponse {
  success: boolean;
  message: string;
  data?: {
    id: number;
    tableId: number;
    status: string;
    totalPrice: number;
    paymentMethod?: string;
    isPaid: boolean;
    payUrl?: string;
    createdAt: string;
    updatedAt: string;
  };
}

export const orderAtTableApi = {
  // Tạo order at table (Pay Later hoặc Pay with MoMo)
  createOrder: async (data: OrderAtTableRequest): Promise<OrderAtTableResponse> => {
    const response = await axiosClient.post("/orders-at-table", data);
    return response.data;
  },

  // Xử lý thanh toán sau (khi đã có order)
  processPayment: async (orderId: number, paymentMethod: "COD" | "MOMO"): Promise<OrderAtTableResponse> => {
    const response = await axiosClient.post(`/orders-at-table/${orderId}/payment`, { paymentMethod });
    return response.data;
  },
};
