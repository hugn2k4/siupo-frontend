import type { CreateReviewRequest, UpdateReviewRequest } from "../types/requests/review.request";
import type { ApiResponse } from "../types/responses/api.response";
import type { ReviewResponse } from "../types/responses/review.response";
import axiosClient from "../utils/axiosClient";

const reviewApi = {
  createReview: (data: CreateReviewRequest): Promise<ApiResponse<ReviewResponse>> =>
    axiosClient.post("/reviews", data).then((response) => response.data),

  updateReview: (data: UpdateReviewRequest): Promise<ApiResponse<ReviewResponse>> =>
    axiosClient.put(`/reviews/${data.reviewId}`, data).then((response) => response.data),

  getProductReviews: (productId: number): Promise<ApiResponse<ReviewResponse[]>> =>
    axiosClient.get(`/products/${productId}/reviews`).then((response) => response.data),

  getMyReviews: (): Promise<ApiResponse<ReviewResponse[]>> =>
    axiosClient.get("/reviews/my-reviews").then((response) => response.data),

  deleteReview: (reviewId: number): Promise<ApiResponse<void>> =>
    axiosClient.delete(`/reviews/${reviewId}`).then((response) => response.data),
};

export default reviewApi;
