export interface CreateReviewRequest {
  orderId: number;
  productId: number;
  rating: number;
  comment: string;
  images?: string[];
}

export interface UpdateReviewRequest {
  reviewId: number;
  rating?: number;
  comment?: string;
  images?: string[];
}
