import type { CreateOrderRequest } from "../types/requests/order.request";
import type { ApiResponse } from "../types/responses/api.response";
import type { OrderResponse } from "../types/responses/order.reponse";
import axiosClient from "../utils/axiosClient";

const orderApi = {
  createOrder: (data: CreateOrderRequest): Promise<ApiResponse<OrderResponse>> =>
    axiosClient.post("/orders", data).then((response) => response.data),
};

export default orderApi;
