import productApi from "../api/productApi";
import type { ApiResponse } from "../types/responses/api.response";
import type { PageResponse, ProductResponse, ProductDetailResponse } from "../types/responses/product.response";

interface ProductServiceResponse {
  products: ProductResponse[];
  totalPages: number;
  error?: string;
}
interface ProductDetailServiceResponse {
  product: ProductDetailResponse | null;
  error?: string;
}
const productService = {
  getProducts: async (page: number, size: number, sortBy: string): Promise<ProductServiceResponse> => {
    try {
      const response: ApiResponse<PageResponse<ProductResponse>> = await productApi.getProducts(page, size, sortBy);
      if (response.success && response.data && response.data.content) {
        return {
          products: response.data.content,
          totalPages: response.data.totalPages,
        };
      }
      return {
        products: [],
        totalPages: 1,
        error: response.message || "No products found.",
      };
    } catch (error) {
      console.error("Product service error:", error);
      return {
        products: [],
        totalPages: 1,
        error: "Failed to fetch products. Please try again.",
      };
    }
  },

  searchProducts: async (
    name: string | null,
    categoryIds: number[] | null,
    minPrice: number | null,
    maxPrice: number | null,
    page: number,
    size: number,
    sortBy: string
  ): Promise<ProductServiceResponse> => {
    try {
      console.log("searchProducts params:", { name, categoryIds, minPrice, maxPrice, page, size, sortBy });
      const response: ApiResponse<PageResponse<ProductResponse>> = await productApi.searchProducts(
        name,
        categoryIds,
        minPrice,
        maxPrice,
        page,
        size,
        sortBy
      );
      console.log("searchProducts response:", response);
      if (response.success && response.data && response.data.content) {
        return {
          products: response.data.content,
          totalPages: response.data.totalPages,
        };
      }
      return {
        products: [],
        totalPages: 1,
        error: response.message || "Không tìm thấy sản phẩm phù hợp với bộ lọc.",
      };
    } catch (error: unknown) {
      console.error("Lỗi tìm kiếm product service:", error);
      // Kiểm tra xem error có phải là instance của Error trước khi truy cập message
      const errorMessage = error instanceof Error ? error.message : "Không thể tìm kiếm sản phẩm. Vui lòng thử lại.";
      return {
        products: [],
        totalPages: 1,
        error: errorMessage,
      };
    }
  },
  getProductById: async (id: number): Promise<ProductDetailServiceResponse> => {
    try {
      const response: ApiResponse<ProductDetailResponse> = await productApi.getProductById(id);
      console.log("getProductById response:", response); // Debug
      if (response.success && response.data) {
        return {
          product: response.data,
        };
      }
      return {
        product: null,
        error: response.message || "Không tìm thấy sản phẩm.",
      };
    } catch (error: unknown) {
      console.error("Lỗi lấy chi tiết sản phẩm:", error); // Debug, log error gốc
      // Check type an toàn trước khi truy cập message
      const errorMessage =
        error instanceof Error ? error.message : "Không thể lấy chi tiết sản phẩm. Vui lòng thử lại.";
      return {
        product: null,
        error: errorMessage,
      };
    }
  },
};

export default productService;
