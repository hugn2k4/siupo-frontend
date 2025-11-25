import reviewApi from "../api/reviewApi";
import type { CreateReviewRequest, UpdateReviewRequest } from "../types/requests/review.request";

const reviewService = {
  createReview: async (data: CreateReviewRequest) => {
    const res = await reviewApi.createReview(data);
    return res;
  },

  updateReview: async (data: UpdateReviewRequest) => {
    const res = await reviewApi.updateReview(data);
    return res;
  },

  getReviewByOrderItemId: async (orderItemId: number) => {
    const res = await reviewApi.getReviewByOrderItemId(orderItemId);
    return res;
  },

  getProductReviews: async (productId: number) => {
    const res = await reviewApi.getProductReviews(productId);
    return res;
  },

  getReviewsByOrderId: async (orderId: number) => {
    const res = await reviewApi.getReviewsByOrderId(orderId);
    return res;
  },

  getMyReviews: async () => {
    const res = await reviewApi.getMyReviews();
    return res;
  },

  deleteReview: async (reviewId: number) => {
    const res = await reviewApi.deleteReview(reviewId);
    return res;
  },
};

export default reviewService;
