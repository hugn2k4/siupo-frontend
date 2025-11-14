import type { Review } from "../models/review";

export interface ReviewResponse extends Review {
  productName?: string;
  userName?: string;
  userAvatar?: string;
}
