import type { ProductStatus } from "../enums/product.enum";

export interface SearchProductsRequest {
  name?: string;
  categoryIds?: number[];
  minPrice?: number;
  maxPrice?: number;
  status?: ProductStatus;
  minRating?: number;
  page?: number;
  size?: number;
  sortBy?: string;
}

export interface GetProductsRequest {
  page?: number;
  size?: number;
  sortBy?: string;
}
