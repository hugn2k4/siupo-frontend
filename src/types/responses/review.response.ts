import type { Review } from "../models/review";

export interface ReviewResponse extends Review {
  productName?: string;
  userName?: string;
  userAvatar?: string;
}

export interface OrderReviewsResponse {
  orderId: number;
  reviews: ReviewResponse[];
  totalItems: number;
  reviewedItems: number;
}
