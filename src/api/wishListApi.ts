// src/services/wishlist.api.ts

import axiosClient from "../utils/axiosClient";
import type { WishlistResponse } from "../types/models/wishlist";

const API_URL = "/wishlist";

export const wishlistApi = {
  // Get user's wishlist
  getWishlist: async (): Promise<WishlistResponse> => {
    const response = await axiosClient.get(API_URL);
    return response.data;
  },

  // Add product to wishlist
  addToWishlist: async (productId: number): Promise<WishlistResponse> => {
    const response = await axiosClient.post(`${API_URL}/items`, { productId });
    return response.data;
  },

  // Remove product from wishlist
  removeFromWishlist: async (productId: number): Promise<WishlistResponse> => {
    const response = await axiosClient.delete(`${API_URL}/items/${productId}`);
    return response.data;
  },

  // Clear entire wishlist
  clearWishlist: async (): Promise<{ message: string }> => {
    const response = await axiosClient.delete(`${API_URL}/items`);
    return response.data;
  },

  // Check if product is in wishlist
  checkProductInWishlist: async (productId: number): Promise<boolean> => {
    const response = await axiosClient.get(`${API_URL}/check/${productId}`);
    return response.data.isInWishlist;
  },
};
