// src/Account/pages/WishlistPage.tsx
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { wishlistApi } from "../../api/wishListApi";
import { useSnackbar } from "../../hooks/useSnackbar";
import cartService from "../../services/cartService";
import type { WishlistResponse } from "../../types/models/wishlist";
import Sidebar from "../Account/components/Sidebar";
import ConfirmModal from "../WishList/components/ConfirmModal";
import WishlistEmpty from "../WishList/components/WishlistEmpty";
import WishlistHeader from "../WishList/components/WishlistHeader";
import WishlistItem from "../WishList/components/WishlistItem";
import WishlistLoading from "../WishList/components/WishlistLoading";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<WishlistResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [showClearModal, setShowClearModal] = useState(false); // Thêm dòng này
  const { showSnackbar } = useSnackbar();

  // Fetch wishlist on mount
  useEffect(() => {
    fetchWishlist();
  }, []);
  const getErrorMessage = (error: unknown): string => {
    if (error instanceof AxiosError) {
      return error.response?.data?.message || error.message;
    }
    if (error instanceof Error) {
      return error.message;
    }
    return "An unexpected error occurred";
  };
  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const data = await wishlistApi.getWishlist();
      setWishlist(data);
    } catch (error) {
      showSnackbar(getErrorMessage(error) || "Failed to load wishlist", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (productId: number) => {
    try {
      const updatedWishlist = await wishlistApi.removeFromWishlist(productId);
      setWishlist(updatedWishlist);
      showSnackbar("Item removed from wishlist", "success");
    } catch (error) {
      showSnackbar(getErrorMessage(error) || "Failed to remove item", "error");
    }
  };

  const handleClearAll = async () => {
    try {
      await wishlistApi.clearWishlist();
      setWishlist({
        ...wishlist!,
        items: [],
        totalItems: 0,
      });
      showSnackbar("Wishlist cleared successfully", "success");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to clear wishlist";
      showSnackbar(errorMessage, "error");
    }
  };

  const handleAddToCart = async (productId: number) => {
    try {
      await cartService.addToCart({ productId: productId, quantity: 1 });
      showSnackbar("Product added to cart!", "success", 3000);
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      showSnackbar("Failed to add product to cart!", "error", 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-6">
          {/* Sidebar */}
          <Sidebar activeLabel="Wishlist" />

          {/* Main Content */}
          <div className="flex-1">
            {loading ? (
              <WishlistLoading />
            ) : !wishlist || wishlist.totalItems === 0 ? (
              <>
                <WishlistHeader totalItems={0} onClearAll={() => setShowClearModal(true)} />
                <WishlistEmpty />
              </>
            ) : (
              <>
                <WishlistHeader totalItems={wishlist.totalItems} onClearAll={() => setShowClearModal(true)} />

                {/* Wishlist Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlist.items?.map((item) => (
                    <WishlistItem key={item.id} item={item} onRemove={handleRemoveItem} onAddToCart={handleAddToCart} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <ConfirmModal
        isOpen={showClearModal}
        onClose={() => setShowClearModal(false)}
        onConfirm={handleClearAll}
        title="Clear Wishlist?"
        message="Are you sure you want to remove all items from your wishlist? This action cannot be undone."
        confirmText="Clear All"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
}
