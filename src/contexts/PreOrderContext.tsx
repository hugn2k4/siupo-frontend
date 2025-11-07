// src/contexts/PreOrderContext.tsx
import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { CartItem } from "../types/responses/product.response";

interface PreOrderContextType {
  preOrderItems: CartItem[];
  setPreOrderItems: (items: CartItem[]) => void;
  clearPreOrder: () => void;
  updateItemQuantity: (itemId: string | number, newQuantity: number) => void;
  removeItem: (itemId: string | number) => void;
  addItem: (item: CartItem) => void;
}

const PreOrderContext = createContext<PreOrderContextType | undefined>(undefined);

export const PreOrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [preOrderItems, setPreOrderItems] = useState<CartItem[]>([]);

  const clearPreOrder = () => {
    setPreOrderItems([]);
  };

  const updateItemQuantity = (itemId: string | number, newQuantity: number) => {
    setPreOrderItems((prevItems) =>
      prevItems.map((item) => (item.id === itemId ? { ...item, quantity: Math.max(1, newQuantity) } : item))
    );
  };

  const removeItem = (itemId: string | number) => {
    setPreOrderItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const addItem = (newItem: CartItem) => {
    setPreOrderItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.id === newItem.id);

      if (existingItemIndex !== -1) {
        // Nếu món đã có, tăng số lượng
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + newItem.quantity,
        };
        return updatedItems;
      } else {
        // Nếu món chưa có, thêm mới
        return [...prevItems, newItem];
      }
    });
  };

  return (
    <PreOrderContext.Provider
      value={{
        preOrderItems,
        setPreOrderItems,
        clearPreOrder,
        updateItemQuantity,
        removeItem,
        addItem,
      }}
    >
      {children}
    </PreOrderContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const usePreOrder = () => {
  const context = useContext(PreOrderContext);
  if (context === undefined) {
    throw new Error("usePreOrder must be used within a PreOrderProvider");
  }
  return context;
};
