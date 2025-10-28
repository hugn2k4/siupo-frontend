// src/components/OrderAtTable.tsx
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../OrderAtTable/components/Header";
import SearchBar from "../OrderAtTable/components/SearchBar";
import MenuCategory from "../OrderAtTable/components/MenuCategory";
import MenuItemCard from "../OrderAtTable/components/MenuItemCard";
import CartSummary from "../OrderAtTable/components/CartSummary";
import PaymentPage from "../OrderAtTable/components/PaymentPage";
import NoteModal from "../OrderAtTable/components/NoteModal";
import productApi from "../../api/productApi";
import { usePreOrder } from "../../contexts/PreOrderContext";
import type { ProductResponse, CartItem, CategoryResponse } from "../../types/responses/product.response";

const OrderAtTable: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { preOrderItems, setPreOrderItems } = usePreOrder();

  // Kiểm tra xem có phải từ booking flow không
  const isBookingFlow = location.state?.fromBooking === true;

  const [cart, setCart] = useState<CartItem[]>(preOrderItems);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [noteModal, setNoteModal] = useState<{ show: boolean; item?: ProductResponse }>({ show: false });
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await productApi.searchProducts(
        searchQuery || null,
        activeCategory ? [activeCategory] : null,
        null,
        null,
        0,
        100,
        "name,asc"
      );

      if (response.success && response.data) {
        setProducts(response.data.content);

        const uniqueCategories = Array.from(
          new Map(response.data.content.map((p) => [p.categoryId, { id: p.categoryId, name: p.categoryName }])).values()
        );
        setCategories(uniqueCategories);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Không thể tải danh sách món ăn. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  }, [activeCategory, searchQuery]);
  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(timer);
  }, [fetchProducts]);

  const addToCart = (item: ProductResponse) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: number) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === itemId);
      if (existing && existing.quantity > 1)
        return prev.map((i) => (i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i));
      return prev.filter((i) => i.id !== itemId);
    });
  };

  const addNote = (itemId: number, note: string) => {
    setCart((prev) => prev.map((i) => (i.id === itemId ? { ...i, note } : i)));
  };

  const handleConfirmOrder = () => {
    if (isBookingFlow) {
      // Lưu món đã chọn vào context và quay về trang đặt bàn
      setPreOrderItems(cart);
      navigate("/placetable", { state: { hasPreOrder: true } });
    } else {
      // Flow bình thường - gửi đơn hàng
      alert("Đơn hàng đã được gửi đến bếp! Cảm ơn quý khách.");
      setCart([]);
      setShowPayment(false);
    }
  };

  const getCartQuantity = (itemId: number) => cart.find((i) => i.id === itemId)?.quantity || 0;

  if (showPayment) {
    return (
      <PaymentPage
        cartItems={cart}
        onBack={() => setShowPayment(false)}
        onConfirm={handleConfirmOrder}
        isBookingFlow={isBookingFlow}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Header tableName={isBookingFlow ? "Chọn món trước" : "Bàn A12"} />

      {isBookingFlow && (
        <div className="bg-amber-50 border-b-2 border-amber-200 px-4 py-3">
          <div className="flex items-center gap-2 text-amber-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-sm font-semibold">Chọn món ăn trước để tiết kiệm thời gian khi đến nhà hàng</span>
          </div>
        </div>
      )}

      <SearchBar onSearch={setSearchQuery} />
      <MenuCategory categories={categories} activeCategory={activeCategory} onSelectCategory={setActiveCategory} />

      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-full text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
            <p className="text-gray-500 text-lg mt-4">Đang tải danh sách món...</p>
          </div>
        ) : error ? (
          <div className="col-span-full text-center py-12">
            <p className="text-red-500 text-lg mb-4">{error}</p>
            <button
              onClick={fetchProducts}
              className="bg-amber-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-amber-700 transition"
            >
              Thử lại
            </button>
          </div>
        ) : (
          products.map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              cartQuantity={getCartQuantity(item.id)}
              onAdd={() => addToCart(item)}
              onRemove={() => removeFromCart(item.id)}
              onAddNote={() => setNoteModal({ show: true, item })}
            />
          ))
        )}
      </div>

      {!loading && !error && products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Không tìm thấy món ăn phù hợp</p>
        </div>
      )}

      <CartSummary cartItems={cart} onCheckout={() => setShowPayment(true)} isBookingFlow={isBookingFlow} />

      {noteModal.show && noteModal.item && (
        <NoteModal
          item={noteModal.item}
          currentNote={cart.find((i) => i.id === noteModal.item?.id)?.note || ""}
          onSave={(note) => addNote(noteModal.item!.id, note)}
          onClose={() => setNoteModal({ show: false })}
        />
      )}
    </div>
  );
};

export default OrderAtTable;
