export type CartResponse = {
  totalPrice: number;
  items: CartItem[];
};

export type CartItem = {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
};
