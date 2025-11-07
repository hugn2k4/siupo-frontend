import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import HeroSection from "./components/HeroSection";
// import TableList from "./components/TableList";
import BookingForm from "./components/BookingForm";
import PreOrderSummary from "./components/PreOrderSummary";
import { usePreOrder } from "../../contexts/PreOrderContext";

const PlaceTableForGuest: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { preOrderItems, clearPreOrder, updateItemQuantity, removeItem } = usePreOrder();

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem("accessToken");
      const user = localStorage.getItem("user");
      console.log("Auth status changed. Token:", token, "User:", user);
      setIsLoggedIn(!!(token && user));
    };

    checkAuthStatus();
    window.addEventListener("storage", checkAuthStatus);

    return () => {
      window.removeEventListener("storage", checkAuthStatus);
    };
  }, []);

  // Scroll to pre-order summary if coming back with items
  useEffect(() => {
    if (location.state?.hasPreOrder && preOrderItems.length > 0) {
      setTimeout(() => {
        const element = document.getElementById("pre-order-summary");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100);
    }
  }, [location.state, preOrderItems]);

  const handleAddMoreDishes = () => {
    navigate("/orderattable", { state: { fromBooking: true } });
  };

  const handleEditPreOrder = () => {
    navigate("/orderattable", { state: { fromBooking: true } });
  };

  const handleClearPreOrder = () => {
    if (window.confirm("Bạn có chắc muốn xóa tất cả món đã chọn?")) {
      clearPreOrder();
    }
  };

  const handleUpdateQuantity = (itemId: string | number, newQuantity: number) => {
    updateItemQuantity(itemId, newQuantity);
  };

  const handleRemoveItem = (itemId: string | number) => {
    removeItem(itemId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeroSection />

      {/* Table List */}
      {/* <TableList /> */}

      {/* Pre-Order Summary - Hiển thị nếu có món đã chọn */}
      {preOrderItems.length > 0 && (
        <div id="pre-order-summary">
          <PreOrderSummary
            items={preOrderItems}
            onEdit={handleEditPreOrder}
            onClear={handleClearPreOrder}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
          />
        </div>
      )}

      {/* Booking Form */}
      <BookingForm preOrderItems={preOrderItems} />

      {/* Float Button - Chỉ hiển thị khi đã đăng nhập */}
      {isLoggedIn && (
        <button
          onClick={handleAddMoreDishes}
          className="fixed bottom-6 right-6 bg-primary hover:bg-amber-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-amber-300 z-50 group"
          aria-label="Chọn món ăn"
        >
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <span className="hidden group-hover:inline-block font-semibold whitespace-nowrap">
              {preOrderItems.length > 0 ? "Sửa món" : "Chọn món trước"}
            </span>
          </div>
          {preOrderItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
              {preOrderItems.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
        </button>
      )}
    </div>
  );
};

export default PlaceTableForGuest;
