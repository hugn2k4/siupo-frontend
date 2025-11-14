export type Review = {
  id?: number;
  orderId: number;
  productId: number;
  rating: number; // 1-5 stars
  comment: string;
  createdAt?: string;
  images?: string[]; // Review images
};
