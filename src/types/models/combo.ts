import type { ProductStatus } from "../enums/product.enum";

export interface ComboItem {
  id: number;
  productId: number;
  productName: string;
  productImageUrl: string | null;
  productPrice: number;
  quantity: number;
  displayOrder: number;
}

export type Combo = {
  id: number;
  name: string;
  description: string;
  basePrice: number;
  originalPrice: number;
  imageUrls: string[];
  items: ComboItem[];
  status: ProductStatus;
  createdAt: string;
  updatedAt: string;
};
