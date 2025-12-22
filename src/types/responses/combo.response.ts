import type { ProductStatus } from "../enums/product.enum";

export interface ComboItemResponse {
  id: number;
  productId: number;
  productName: string;
  productImageUrl: string | null;
  productPrice: number;
  quantity: number;
  displayOrder: number;
}

export interface ComboResponse {
  id: number;
  name: string;
  description: string;
  basePrice: number;
  originalPrice: number;
  imageUrls: string[];
  items: ComboItemResponse[];
  status: ProductStatus;
  createdAt: string;
  updatedAt: string;
}
