import type { ApiResponse } from "../types/responses/api.response";
import type { PageResponse, ProductResponse, ProductDetailResponse } from "../types/responses/product.response";
import axiosClient from "../utils/axiosClient";

const productApi = {
  getProducts: (page: number, size: number, sortBy: string): Promise<ApiResponse<PageResponse<ProductResponse>>> =>
    axiosClient
      .get("/products", {
        params: { page, size, sortBy },
      })
      .then((response) => response.data),

  searchProducts: (
    name: string | null,
    categoryIds: number[] | null,
    minPrice: number | null,
    maxPrice: number | null,
    page: number,
    size: number,
    sortBy: string
  ): Promise<ApiResponse<PageResponse<ProductResponse>>> =>
    axiosClient
      .get("/products/search", {
        params: {
          name: name || undefined,
          categoryIds: categoryIds?.length ? categoryIds.join(",") : undefined,
          minPrice: minPrice ?? undefined,
          maxPrice: maxPrice ?? undefined,
          page,
          size,
          sortBy,
        },
        paramsSerializer: (params) => {
          const searchParams = new URLSearchParams();
          Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined) {
              searchParams.append(key, value.toString());
            }
          });
          return searchParams.toString();
        },
      })
      .then((response) => response.data),

  getProductById: (id: number): Promise<ApiResponse<ProductDetailResponse>> =>
    axiosClient.get(`/products/${id}`).then((response) => response.data),
};

export default productApi;
