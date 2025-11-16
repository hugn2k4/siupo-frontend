export type Review = {
  id?: number;
  orderItemId: number;
  productId: number;
  productName?: string;
  rating: number; // 1-5 stars
  content: string;
  imageUrls?: string[]; // Review images
  userName?: string;
  userId?: number;
  createdAt?: string;
  updatedAt?: string;
};
