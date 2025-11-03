// src/services/wishlistApi.ts
import axiosClient from "../utils/axiosClient";

const wishlistApi = {
  getWishlist() {
    return axiosClient.get("/wishlist");
  },

  addToWishlist(productId: number) {
    return axiosClient.post("/wishlist/items", { productId });
  },

  removeFromWishlist(productId: number) {
    return axiosClient.delete(`/wishlist/items/${productId}`);
  },

  checkProduct(productId: number) {
    return axiosClient.get(`/wishlist/check/${productId}`);
  },
};

export default wishlistApi;
