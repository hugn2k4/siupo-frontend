import cartApi from "../api/cartApi";
import type { AddToCartRequest } from "../types/requests/cart.request";

const cartService = {
  addToCart: async (item: AddToCartRequest) => {
    const res = await cartApi.addItemToCart(item);
    return res;
  },
};
export default cartService;
