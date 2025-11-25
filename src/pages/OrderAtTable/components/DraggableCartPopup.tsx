// src/components/OrderAtTable/components/DraggableCartPopup.tsx
import React, { useState, useRef, useEffect } from "react";
import type { CartItem } from "../../../types/responses/product.response";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CheckIcon from "@mui/icons-material/Check";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface DraggableCartPopupProps {
  cartItems: CartItem[];
  onCheckout: () => void;
  onUpdateQuantity: (itemId: number, newQuantity: number) => void;
  onRemoveItem: (itemId: number) => void;
  isBookingFlow?: boolean;
}

const DraggableCartPopup: React.FC<DraggableCartPopupProps> = ({
  cartItems,
  onCheckout,
  onUpdateQuantity,
  onRemoveItem,
  isBookingFlow = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  // Initialize position after component mounts to avoid SSR issues
  const [position, setPosition] = useState({ x: 20, y: 100 });

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Set initial position after mount
  useEffect(() => {
    if (!isMobile && popupRef.current) {
      const popupHeight = popupRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      // Position popup so it's fully visible with 20px margin from bottom
      const initialY = Math.max(20, windowHeight - popupHeight - 20);
      setPosition({ x: 20, y: initialY });
    }
  }, [isMobile, cartItems.length]);

  useEffect(() => {
    if (cartItems.length > 0) {
      setIsExpanded(true);
      // Trigger animation
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
    }
  }, [cartItems.length]);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && popupRef.current && !isMobile) {
        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;
        const maxX = window.innerWidth - popupRef.current.offsetWidth;
        const maxY = window.innerHeight - popupRef.current.offsetHeight;

        requestAnimationFrame(() => {
          setPosition({
            x: Math.max(0, Math.min(newX, maxX)),
            y: Math.max(0, Math.min(newY, maxY)),
          });
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset, isMobile]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return; // Disable dragging on mobile

    const target = e.target as HTMLElement;
    if (target.tagName === "BUTTON" || target.closest("button")) {
      return;
    }

    if (popupRef.current) {
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  if (totalItems === 0) return null;

  // Mobile layout - fixed bottom
  if (isMobile) {
    return (
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-orange-500 shadow-2xl transition-all duration-500 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        {/* Collapsed view */}
        {!isExpanded && (
          <div
            onClick={() => setIsExpanded(true)}
            className="px-4 py-3 flex items-center justify-between bg-gradient-to-r from-orange-500 to-primary text-white cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <ShoppingCartIcon sx={{ fontSize: 24 }} />
              <div>
                <p className="font-bold">Giỏ hàng</p>
                <p className="text-xs text-orange-100">{totalItems} món</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xl font-bold">{totalPrice.toLocaleString("vi-VN")}$</span>
              <ExpandMoreIcon sx={{ fontSize: 24 }} className="rotate-180" />
            </div>
          </div>
        )}

        {/* Expanded view */}
        {isExpanded && (
          <div className="max-h-[70vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 z-10 px-4 py-3 flex items-center justify-between bg-gradient-to-r from-orange-500 to-primary text-white">
              <div className="flex items-center gap-3">
                <ShoppingCartIcon sx={{ fontSize: 24 }} />
                <div>
                  <p className="font-bold">Giỏ hàng</p>
                  <p className="text-xs text-orange-100">{totalItems} món ăn</p>
                </div>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="bg-opacity-20 hover:bg-opacity-30 p-2 rounded-lg transition active:scale-95"
              >
                <ExpandMoreIcon sx={{ fontSize: 24 }} />
              </button>
            </div>

            {/* Items */}
            <div className="p-4 space-y-3 bg-gray-50">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                  <div className="flex gap-3">
                    <img
                      src={
                        item.imageUrls && item.imageUrls.length > 0
                          ? item.imageUrls[0]
                          : "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100"
                      }
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-800 mb-1 text-sm line-clamp-2">{item.name}</h4>
                      <p className="text-primary font-bold mb-2">{item.price.toLocaleString("vi-VN")}$</p>
                      {item.note && (
                        <div className="bg-amber-50 border border-amber-200 rounded px-2 py-1 mb-2">
                          <p className="text-xs text-amber-800">📝 {item.note}</p>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                          <button
                            onClick={() => {
                              if (item.quantity === 1) {
                                onRemoveItem(item.id);
                              } else {
                                onUpdateQuantity(item.id, item.quantity - 1);
                              }
                            }}
                            className="w-7 h-7 rounded-md bg-white text-gray-700 hover:bg-gray-200 transition shadow-sm active:scale-95 flex items-center justify-center"
                          >
                            <RemoveIcon fontSize="small" />
                          </button>
                          <span className="font-bold text-sm min-w-[25px] text-center">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 rounded-md bg-orange-500 text-white hover:bg-primary transition shadow-sm active:scale-95 flex items-center justify-center"
                          >
                            <AddIcon fontSize="small" />
                          </button>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition active:scale-95"
                          title="Xóa món"
                        >
                          <DeleteOutlineIcon sx={{ fontSize: 20 }} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 border-t-2 border-orange-100 bg-white p-4">
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-3 mb-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-semibold">Tổng cộng:</span>
                  <span className="text-2xl font-bold text-primary">{totalPrice.toLocaleString("vi-VN")}$</span>
                </div>
              </div>
              <button
                onClick={onCheckout}
                className="w-full bg-gradient-to-r from-orange-500 to-primary hover:from-primary hover:to-orange-700 text-white py-3.5 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all transform active:scale-95 flex items-center justify-center gap-2"
              >
                {isBookingFlow ? (
                  <>
                    <CheckIcon sx={{ fontSize: 20 }} />
                    Xác nhận
                  </>
                ) : (
                  <>
                    <ArrowForwardIcon sx={{ fontSize: 20 }} />
                    Gọi món ngay
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Desktop layout - draggable popup
  return (
    <div
      ref={popupRef}
      style={{
        position: "fixed",
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: 1000,
        transition: isDragging ? "none" : "all 0.3s ease-out",
      }}
      className={`bg-white rounded-xl shadow-2xl border-2 border-orange-200 transition-all duration-500 ease-out ${
        isExpanded ? "w-[400px]" : "w-80"
      } ${isDragging ? "cursor-grabbing scale-105 shadow-3xl" : "cursor-grab"} ${
        isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-8 opacity-0 scale-95"
      }`}
    >
      <div
        onMouseDown={handleMouseDown}
        className="bg-gradient-to-r from-orange-500 to-primary text-white px-4 py-3 rounded-t-xl flex items-center justify-between select-none"
      >
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-opacity-20 p-2">
            <ShoppingCartIcon sx={{ fontSize: 24 }} />
          </div>
          <div>
            <p className="font-bold text-lg">Giỏ hàng</p>
            <p className="text-xs text-orange-100">{totalItems} món ăn</p>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
          className="rounded-lg bg-opacity-20 hover:bg-opacity-30 p-2 transition active:scale-95 z-10"
        >
          <ExpandMoreIcon
            sx={{ fontSize: 24 }}
            className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {isExpanded && (
        <div className="max-h-96 overflow-y-auto bg-gray-50">
          <div className="p-4 space-y-3">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 hover:shadow-md transition"
              >
                <div className="flex gap-3">
                  <img
                    src={
                      item.imageUrls && item.imageUrls.length > 0
                        ? item.imageUrls[0]
                        : "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100"
                    }
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-800 mb-1 line-clamp-2">{item.name}</h4>
                    <p className="text-primary font-bold text-lg mb-2">{item.price.toLocaleString("vi-VN")}$</p>
                    {item.note && (
                      <div className="bg-amber-50 border border-amber-200 rounded px-2 py-1 mb-2">
                        <p className="text-xs text-amber-800">📝 {item.note}</p>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                        <button
                          onClick={() => {
                            if (item.quantity === 1) {
                              onRemoveItem(item.id);
                            } else {
                              onUpdateQuantity(item.id, item.quantity - 1);
                            }
                          }}
                          className="w-8 h-8 rounded-md bg-white text-gray-700 hover:bg-gray-200 transition shadow-sm active:scale-95 flex items-center justify-center"
                        >
                          <RemoveIcon fontSize="small" />
                        </button>
                        <span className="font-bold text-base min-w-[30px] text-center">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-md bg-orange-500 text-white hover:bg-primary transition shadow-sm active:scale-95 flex items-center justify-center"
                        >
                          <AddIcon fontSize="small" />
                        </button>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition active:scale-95"
                        title="Xóa món"
                      >
                        <DeleteOutlineIcon sx={{ fontSize: 20 }} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="border-t-2 border-orange-100 bg-white rounded-b-xl p-4">
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-3 mb-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-semibold">Tổng cộng:</span>
            <span className="text-3xl font-bold text-primary">{totalPrice.toLocaleString("vi-VN")}$</span>
          </div>
        </div>
        <button
          onClick={onCheckout}
          className="w-full bg-gradient-to-r from-orange-500 to-primary hover:from-primary hover:to-orange-700 text-white py-3.5 rounded-lg font-bold text-base shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
        >
          {isBookingFlow ? (
            <>
              <CheckIcon sx={{ fontSize: 20 }} />
              Xác nhận
            </>
          ) : (
            <>
              <ArrowForwardIcon sx={{ fontSize: 20 }} />
              Gọi món ngay
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default DraggableCartPopup;
