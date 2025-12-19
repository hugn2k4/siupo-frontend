import type { WishlistResponse } from "../types/models/wishlist";
import axiosClient from "../utils/axiosClient";

const API_URL = "/wishlist";

export const wishlistApi = {
  getWishlist: (): Promise<WishlistResponse> => axiosClient.get(API_URL).then((res) => res.data.data),

  addToWishlist: (productId: number): Promise<WishlistResponse> =>
    axiosClient.post(`${API_URL}/items`, { productId }).then((res) => res.data.data),

  removeFromWishlist: (productId: number): Promise<WishlistResponse> =>
    axiosClient.delete(`${API_URL}/items/${productId}`).then((res) => res.data.data),

  clearWishlist: (): Promise<{ message: string }> => axiosClient.delete(`${API_URL}/items`).then((res) => res.data),
};
