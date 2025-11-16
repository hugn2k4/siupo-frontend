import orderApi from "../api/orderApi";
import type { CreateOrderRequest } from "../types/requests/order.request";

const orderService = {
  createOrder: async (createOrder: CreateOrderRequest) => {
    const res = await orderApi.createOrder(createOrder);
    return res;
  },

  getOrder: async (orderId: number) => {
    const res = await orderApi.getOrder(orderId);
    return res;
  },

  getMyOrders: async () => {
    const res = await orderApi.getMyOrders();
    return res;
  },

  cancelOrder: async (orderId: number) => {
    const res = await orderApi.cancelOrder(orderId);
    return res;
  },
};
export default orderService;
