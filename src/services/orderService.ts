import orderApi from "../api/orderApi";
import type { CreateOrderRequest } from "../types/requests/order.request";

const orderService = {
  createOrder: async (createOrder: CreateOrderRequest) => {
    const res = await orderApi.createOrder(createOrder);
    return res;
  },
};
export default orderService;
