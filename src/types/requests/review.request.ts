export interface CreateReviewRequest {
  orderItemId: number;
  rating: number;
  content: string;
  imageUrls?: string[];
}

export interface UpdateReviewRequest {
  reviewId: number;
  rating?: number;
  content?: string;
  imageUrls?: string[];
}
