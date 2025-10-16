import React, { useState } from "react";
import Burger from "../../assets/images/image_burger.png";
import CartItemComponent from "./components/CartItemComponent";
import CouponSection from "./components/CouponSection";
import OrderSummary from "./components/OrderSummary";
// Types
interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  rating: number;
}

const ShoppingCart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: "Burger", image: Burger, price: 35.0, quantity: 1, rating: 4 },
    { id: 2, name: "Fresh Lime", image: Burger, price: 25.0, quantity: 1, rating: 4 },
    { id: 3, name: "Pizza", image: Burger, price: 15.0, quantity: 1, rating: 4 },
    { id: 4, name: "Chocolate Muffin", image: Burger, price: 45.0, quantity: 1, rating: 4 },
    { id: 5, name: "Cheese Butter", image: Burger, price: 15.0, quantity: 1, rating: 3 },
  ]);

  const handleQuantityChange = (id: number, newQuantity: number) => {
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)));
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const handleApplyCoupon = (code: string) => {
    console.log("Applying coupon:", code);
    // Implement coupon logic here
  };

  const handleCheckout = () => {
    console.log("Proceeding to checkout");
    // Implement checkout logic here
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 20.0;
  const total = subtotal + shipping;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 padding sm:px-6 lg:px-46">
      {/* Cart Content */}
      <div className="">
        {/* Left Column - Cart Items */}
        <div className="lg:col-span-2">
          {/* Table Header */}
          <div className="hidden md:grid md:grid-cols-12 gap-4 py-3 border-b border-gray-200 text-sm font-medium text-gray-600 mb-4">
            <div className="col-span-5">Product</div>
            <div className="col-span-2">Price</div>
            <div className="col-span-2">Quantity</div>
            <div className="col-span-2">Total</div>
            <div className="col-span-1">Remove</div>
          </div>

          {/* Cart Items */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            {cartItems.map((item) => (
              <CartItemComponent
                key={item.id}
                item={item}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemoveItem}
              />
            ))}
          </div>
        </div>

        {/* Right Column - Coupon and Summary */}
        <div className="space-y-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CouponSection onApplyCoupon={handleApplyCoupon} />
          <OrderSummary subtotal={subtotal} shipping={shipping} total={total} onCheckout={handleCheckout} />
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
