import categoryApi from "../api/categoryApi";
import type { ApiResponse } from "../types/responses/api.response";
import type { CategoryResponse } from "../types/responses/category.response";

interface CategoryServiceResponse {
  categories: CategoryResponse[];
  error?: string;
}

const categoryService = {
  getCategories: async (): Promise<CategoryServiceResponse> => {
    try {
      const response: ApiResponse<CategoryResponse[]> = await categoryApi.getCategories();
      if (response.success && response.data) {
        return {
          categories: response.data,
        };
      }
      return {
        categories: [],
        error: response.message || "No categories found.",
      };
    } catch (error) {
      console.error("Category service error:", error);
      return {
        categories: [],
        error: "Failed to fetch categories. Please try again.",
      };
    }
  },
};

export default categoryService;
