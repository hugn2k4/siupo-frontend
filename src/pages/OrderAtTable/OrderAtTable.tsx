// src/components/OrderAtTable.tsx
import React, { useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import MenuCategory from "./components/MenuCategory";
import MenuItemCard from "./components/MenuItemCard";
import CartSummary from "./components/CartSummary";
import PaymentPage from "./components/PaymentPage";
import NoteModal from "./components/NoteModal";
import { MENU_ITEMS, CATEGORIES } from "./components/data/menuData";
import type { MenuItem, CartItem } from "./components/data/menuData";

const OrderAtTable: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState("Tất Cả");
  const [searchQuery, setSearchQuery] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [noteModal, setNoteModal] = useState<{ show: boolean; item?: MenuItem }>({ show: false });

  const filteredItems = MENU_ITEMS.filter(
    (item) =>
      (activeCategory === "Tất Cả" || item.category === activeCategory) &&
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === itemId);
      if (existing && existing.quantity > 1)
        return prev.map((i) => (i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i));
      return prev.filter((i) => i.id !== itemId);
    });
  };

  const addNote = (itemId: string, note: string) => {
    setCart((prev) => prev.map((i) => (i.id === itemId ? { ...i, note } : i)));
  };

  const handleConfirmOrder = () => {
    alert("Đơn hàng đã được gửi đến bếp! Cảm ơn quý khách.");
    setCart([]);
    setShowPayment(false);
  };

  const getCartQuantity = (itemId: string) => cart.find((i) => i.id === itemId)?.quantity || 0;

  if (showPayment) {
    return <PaymentPage cartItems={cart} onBack={() => setShowPayment(false)} onConfirm={handleConfirmOrder} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Header tableName="Bàn A12" />
      <SearchBar onSearch={setSearchQuery} />
      <MenuCategory categories={CATEGORIES} activeCategory={activeCategory} onSelectCategory={setActiveCategory} />

      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <MenuItemCard
            key={item.id}
            item={item}
            cartQuantity={getCartQuantity(item.id)}
            onAdd={() => addToCart(item)}
            onRemove={() => removeFromCart(item.id)}
            onAddNote={() => setNoteModal({ show: true, item })}
          />
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Không tìm thấy món ăn phù hợp</p>
        </div>
      )}
      <CartSummary cartItems={cart} onCheckout={() => setShowPayment(true)} />

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
