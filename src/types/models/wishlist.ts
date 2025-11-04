export interface WishlistItemResponse {
  id: number;
  productId: number;
  productName: string;
  productDescription: string;
  productPrice: number;
  productImages: string[];
}

export interface WishlistResponse {
  id: number;
  userId: number;
  items: WishlistItemResponse[];
  totalItems: number;
}
