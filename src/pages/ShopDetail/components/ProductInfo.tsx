import React, { useState } from "react";
import StarRating from "./StarRating";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { FaYoutube, FaFacebookF, FaTwitter, FaVk, FaInstagram } from "react-icons/fa";
import type { ProductDetailResponse } from "../../../types/responses/product.response";

interface ProductInfoProps {
  product: ProductDetailResponse;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  // Debug: Log product để kiểm tra cấu trúc dữ liệu
  console.log("ProductInfo product:", product);
  console.log("Product status:", product.status);
  console.log("Product price:", product.price, typeof product.price);

  // Kiểm tra trạng thái dựa trên status thay vì stock
  const isAvailable = product.status?.toLowerCase() === "available";
  const displayStatus = isAvailable ? "Available" : "Unavailable";

  // Kiểm tra an toàn cho price
  const displayPrice = product.price ? `$${product.price.toFixed(2)}` : "$0.00";

  return (
    <div className="flex-1">
      <div className="mb-4">
        <span
          className={`px-3 py-1 rounded text-sm font-medium ${
            isAvailable ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {displayStatus}
        </span>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name || "Unknown Product"}</h1>

      <p className="text-gray-600 mb-6 leading-relaxed">{product.description || "Không có mô tả sản phẩm."}</p>

      <div className="mb-6">
        <span className="text-3xl font-bold text-gray-900">{displayPrice}</span>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <StarRating rating={product.rating || 0} />
        <span>|</span>
        <span className="text-sm text-gray-500">{(product.rating || 0).toFixed(1)} Rating</span>
        <span>|</span>
        <span className="text-sm text-gray-500">{product.reviewCount || 0} Review</span>
      </div>

      <p className="text-sm text-gray-600 mb-6">
        {product.tags && product.tags.length > 0 ? product.tags.join(", ") : "No tags"}
      </p>

      <div className="flex items-center space-x-4 mb-6">
        <div className="flex items-center border border-gray-300 rounded">
          <button
            className="px-3 py-2 hover:bg-gray-100 disabled:bg-gray-200 disabled:cursor-not-allowed"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={!isAvailable}
          >
            -
          </button>
          <span className="px-4 py-2 border-l border-r border-gray-300">{quantity}</span>
          <button
            className="px-3 py-2 hover:bg-gray-100 disabled:bg-gray-200 disabled:cursor-not-allowed"
            onClick={() => setQuantity(quantity + 1)}
            disabled={!isAvailable}
          >
            +
          </button>
        </div>
        <button
          className={`px-6 py-2 font-medium rounded disabled:bg-gray-300 disabled:cursor-not-allowed ${
            isAvailable ? "bg-primary hover:bg-orange-600 text-white" : "bg-gray-300 text-gray-700"
          }`}
          disabled={!isAvailable}
        >
          <ShoppingBagOutlinedIcon />
          <span className="ml-2">Add to Cart</span>
        </button>
      </div>

      <div className="flex items-center space-x-6 mb-6">
        <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
          <FavoriteBorderOutlinedIcon />
          <span>Add to Wishlist</span>
        </button>
        <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
          <span>⚖</span>
          <span>Compare</span>
        </button>
      </div>

      <div className="border-t pt-4">
        <p className="text-sm text-gray-600 mb-2">
          <span className="font-medium">Category:</span> {product.categoryName || "Unknown"}
        </p>
        <p className="text-sm text-gray-600 mb-4">
          <span className="font-medium">Tag:</span>{" "}
          {product.tags && product.tags.length > 0 ? product.tags.join(", ") : "Our Shop"}
        </p>

        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium">Share:</span>
          <div className="flex space-x-2">
            <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center">
              <FaYoutube className="text-white" size={14} />
            </div>
            <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center">
              <FaFacebookF className="text-white" size={14} />
            </div>
            <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center">
              <FaTwitter className="text-white" size={14} />
            </div>
            <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center">
              <FaVk className="text-white" size={14} />
            </div>
            <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center">
              <FaInstagram className="text-white" size={14} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
