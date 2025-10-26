export type CartResponse = {
  totalPrice: number;
  items: CartItem[];
};

export type CartItem = {
  id: number;
  productId: number;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
  rating: number;
};
