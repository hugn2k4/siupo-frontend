import axiosClient from "../utils/axiosClient";
import type { WishlistResponse } from "../types/models/wishlist";

const API_URL = "/wishlist";

export const wishlistApi = {
  getWishlist: (): Promise<WishlistResponse> => axiosClient.get(API_URL).then((res) => res.data),

  addToWishlist: (productId: number): Promise<WishlistResponse> =>
    axiosClient.post(`${API_URL}/items`, { productId }).then((res) => res.data),

  removeFromWishlist: (productId: number): Promise<WishlistResponse> =>
    axiosClient.delete(`${API_URL}/items/${productId}`).then((res) => res.data),

  clearWishlist: (): Promise<{ message: string }> => axiosClient.delete(`${API_URL}/items`).then((res) => res.data),

  checkProductInWishlist: (productId: number): Promise<boolean> =>
    axiosClient.get(`${API_URL}/check/${productId}`).then((res) => res.data.isInWishlist),
};
