import cartApi from "../api/cartApi";
import type { AddToCartRequest } from "../types/requests/cart.request";

const cartService = {
  addToCart: async (item: AddToCartRequest) => {
    const res = await cartApi.addItemToCart(item);
    return res;
  },

  getCart: async () => {
    const res = await cartApi.getCart();
    return res;
  },

  updateItemQuantity: async (itemId: string, quantity: number) => {
    const res = await cartApi.updateItemQuantity(itemId, quantity);
    return res;
  },

  removeCartItem: async (itemId: string) => {
    const res = await cartApi.removeCartItem(itemId);
    return res;
  },
};
export default cartService;
