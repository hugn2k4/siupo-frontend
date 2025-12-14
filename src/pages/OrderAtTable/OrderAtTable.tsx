// src/components/OrderAtTable.tsx
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchHeader from "../OrderAtTable/components/SearchHeader";
import ProductCardNew from "../OrderAtTable/components/ProductCardNew";
import CartPanel from "../OrderAtTable/components/CartPanel";
import PaymentPage from "../OrderAtTable/components/PaymentPage";
import NoteModal from "../OrderAtTable/components/NoteModal";
import productApi from "../../api/productApi";
import { usePreOrder } from "../../contexts/PreOrderContext";
import type { ProductResponse, CartItem, CategoryResponse } from "../../types/responses/product.response";

const OrderAtTable: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { preOrderItems, setPreOrderItems } = usePreOrder();

  // ✅ Check if user is authenticated
  const isAuthenticated = !!localStorage.getItem("authToken"); // Or use auth context
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
  const [drawerOpen, setDrawerOpen] = useState(false);

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
      setError("Unable to load menu items. Please try again.");
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
      // ✅ User is authenticated → Requires payment first
      setPreOrderItems(cart);
      navigate("/placetable", { state: { hasPreOrder: true, requiresPayment: true } });
    } else {
      // ✅ User scanned QR at table → Order directly, NO payment required
      alert("Your order has been sent to the kitchen! Thank you.");
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
        requiresPayment={isBookingFlow} // ✅ Only require payment if booking flow
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Back Button */}
      <div className="bg-white border-b sticky top-0 z-30">
        <div className="px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Go back"
          >
            <ArrowBackIcon className="text-gray-700" />
          </button>
          <h1 className="text-lg font-bold text-gray-800">Menu</h1>
        </div>
      </div>

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
              Pre-order and pay in advance to save time when you arrive at the restaurant.
            </span>
          </div>
        </div>
      )}

      <SearchHeader
        value={searchQuery}
        onChange={setSearchQuery}
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      <div className="p-4 lg:px-[150px] lg:flex lg:gap-6">
        <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? (
            <div className="col-span-full text-center py-12">
              <div className="inline-block animate-spin h-12 w-12 border-b-2 border-primary"></div>
              <p className="text-gray-500 text-lg mt-4">Loading menu items...</p>
            </div>
          ) : error ? (
            <div className="col-span-full text-center py-12">
              <p className="text-red-500 text-lg mb-4">{error}</p>
              <button
                onClick={fetchProducts}
                className="bg-primary text-white px-6 py-2 font-semibold hover:bg-amber-700 transition"
              >
                Try again
              </button>
            </div>
          ) : (
            products.map((item) => (
              <ProductCardNew
                key={item.id}
                item={item}
                quantity={getCartQuantity(item.id)}
                onAdd={(p) => addToCart(p)}
                onRemove={(id) => removeFromCart(id)}
                onOpenNote={(p) => setNoteModal({ show: true, item: p })}
              />
            ))
          )}
        </main>

        <aside className="hidden lg:block w-96">
          <CartPanel
            cartItems={cart}
            onUpdateQuantity={(id, q) => setCart((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: q } : i)))}
            onRemoveItem={(id) => setCart((prev) => prev.filter((i) => i.id !== id))}
            onCheckout={() => setShowPayment(true)}
            isBookingFlow={isBookingFlow}
          />
        </aside>
      </div>

      {/* Mobile floating button */}
      <div className="fixed right-4 bottom-6 z-40 lg:hidden">
        <button
          onClick={() => setDrawerOpen(true)}
          className="bg-gradient-to-r from-orange-500 to-primary text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
          </svg>
          <span className="text-sm font-semibold">Cart ({cart.length})</span>
        </button>
      </div>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-full lg:hidden">
            <div className="h-full bg-white p-4">
              <CartPanel
                cartItems={cart}
                onUpdateQuantity={(id, q) =>
                  setCart((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: q } : i)))
                }
                onRemoveItem={(id) => setCart((prev) => prev.filter((i) => i.id !== id))}
                onCheckout={() => setShowPayment(true)}
                onClose={() => setDrawerOpen(false)}
                isBookingFlow={isBookingFlow}
              />
            </div>
          </div>
          <div className="flex-1" onClick={() => setDrawerOpen(false)} />
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No items found</p>
        </div>
      )}

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
