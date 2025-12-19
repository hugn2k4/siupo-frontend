import type { ApiResponse } from "../types/responses/api.response";
import type { ShopInitialDataResponse } from "../types/responses/shop.response";
import axiosClient from "../utils/axiosClient";

const pageApi = {
  getInitData: (): Promise<ApiResponse<ShopInitialDataResponse>> =>
    axiosClient.get("/page/shop/initial-data").then((response) => response.data),
};
export default pageApi;
