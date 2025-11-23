// src/components/OrderAtTable.tsx
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SearchBar from "../OrderAtTable/components/SearchBar";
import MenuCategory from "../OrderAtTable/components/MenuCategory";
import MenuItemCard from "../OrderAtTable/components/MenuItemCard";
import DraggableCartPopup from "../OrderAtTable/components/DraggableCartPopup";
import PaymentPage from "../OrderAtTable/components/PaymentPage";
import NoteModal from "../OrderAtTable/components/NoteModal";
import productApi from "../../api/productApi";
import { usePreOrder } from "../../contexts/PreOrderContext";
import type { ProductResponse, CartItem, CategoryResponse } from "../../types/responses/product.response";

const OrderAtTable: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { preOrderItems, setPreOrderItems } = usePreOrder();

  // ✅ Kiểm tra user đã đăng nhập chưa (thay đổi logic này theo auth system của bạn)
  const isAuthenticated = !!localStorage.getItem("authToken"); // Hoặc dùng auth context
  const isBookingFlow = location.state?.fromBooking === true || isAuthenticated;

  const [cart, setCart] = useState<CartItem[]>(preOrderItems);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [noteModal, setNoteModal] = useState<{ show: boolean; item?: ProductResponse }>({ show: false });
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await productApi.searchProducts(null, null, null, null, 0, 1000, "name,asc");

        if (response.success && response.data) {
          const uniqueCategories = Array.from(
            new Map(
              response.data.content.map((p) => [p.categoryId, { id: p.categoryId, name: p.categoryName }])
            ).values()
          );
          setCategories(uniqueCategories);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

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
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Không thể tải danh sách món ăn. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  }, [activeCategory, searchQuery]);

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
      // ✅ User đã đăng nhập → Cần thanh toán trước
      setPreOrderItems(cart);
      navigate("/placetable", { state: { hasPreOrder: true, requiresPayment: true } });
    } else {
      // ✅ User quét QR tại bàn → Gọi món trực tiếp, KHÔNG cần thanh toán
      alert("Đơn hàng của bạn đã được gửi đến bếp! Cảm ơn bạn.");
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
        requiresPayment={isBookingFlow} // ✅ Chỉ yêu cầu thanh toán nếu là booking flow
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
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
            <span className="text-sm font-semibold">
              Chọn món trước và thanh toán để tiết kiệm thời gian khi đến nhà hàng.
            </span>
          </div>
        </div>
      )}

      <SearchBar onSearch={setSearchQuery} />
      <MenuCategory categories={categories} activeCategory={activeCategory} onSelectCategory={setActiveCategory} />

      <div className="p-4 lg:px-[150px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-full text-center py-12">
            <div className="inline-block animate-spin h-12 w-12 border-b-2 border-primary"></div>
            <p className="text-gray-500 text-lg mt-4">Đang tải danh sách món ăn...</p>
          </div>
        ) : error ? (
          <div className="col-span-full text-center py-12">
            <p className="text-red-500 text-lg mb-4">{error}</p>
            <button
              onClick={fetchProducts}
              className="bg-primary text-white px-6 py-2 font-semibold hover:bg-amber-700 transition"
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

      <DraggableCartPopup
        cartItems={cart}
        onCheckout={() => setShowPayment(true)}
        onUpdateQuantity={(itemId, newQuantity) => {
          setCart((prev) => prev.map((i) => (i.id === itemId ? { ...i, quantity: newQuantity } : i)));
        }}
        onRemoveItem={(itemId) => {
          setCart((prev) => prev.filter((i) => i.id !== itemId));
        }}
        isBookingFlow={isBookingFlow}
      />

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
