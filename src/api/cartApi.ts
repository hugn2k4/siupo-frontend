import type { AddToCartRequest } from "../types/requests/cart.request";
import type { ApiResponse } from "../types/responses/api.response";
import type { CartResponse } from "../types/responses/cart.response";
import axiosClient from "../utils/axiosClient";

const cartApi = {
  addItemToCart: (data: AddToCartRequest): Promise<ApiResponse<CartResponse>> =>
    axiosClient.post("/cart/add", data).then((response) => response.data),

  getCart: (): Promise<ApiResponse<CartResponse>> => axiosClient.get("/cart").then((response) => response.data),
};

export default cartApi;
