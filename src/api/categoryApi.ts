import type { ApiResponse } from "../types/responses/api.response";
import type { CategoryResponse } from "../types/responses/category.response";
import axiosClient from "../utils/axiosClient";

const categoryApi = {
  getCategories: (): Promise<ApiResponse<CategoryResponse[]>> =>
    axiosClient.get("/categories").then((response) => response.data),
};

export default categoryApi;
