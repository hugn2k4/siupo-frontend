import React, { useState } from "react";
import StarRating from "./StarRating";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { FaYoutube, FaFacebookF, FaTwitter, FaVk, FaInstagram } from "react-icons/fa";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
const ProductInfo: React.FC = () => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex-1">
      <div className="mb-4">
        <span className="bg-primary text-white px-3 py-1 rounded text-sm font-medium">In Stock</span>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-4">Yummy Chicken Chup</h1>

      <p className="text-gray-600 mb-6 leading-relaxed">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque diam pellentesque bibendum non dui volutpat
        fringilla bibendum. Urna, urna, vitae feugiat pretium donec id elementum. Ultrices mattis sed vitae mus risus.
        Lacus risus et ac dapibus sit eu velit in consequat.
      </p>

      <div className="mb-6">
        <span className="text-3xl font-bold text-gray-900">54.00$</span>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <StarRating rating={5} />
        <span>|</span>
        <span className="text-sm text-gray-500">5.0 Rating</span>
        <span>|</span>
        <span className="text-sm text-gray-500">22 Review</span>
      </div>

      <p className="text-sm text-gray-600 mb-6">Dictum/cursus/Rhoncus</p>

      <div className="flex items-center space-x-4 mb-6">
        <div className="flex items-center border border-gray-300 rounded">
          <button className="px-3 py-2 hover:bg-gray-100" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
            -
          </button>
          <span className="px-4 py-2 border-l border-r border-gray-300">{quantity}</span>
          <button className="px-3 py-2 hover:bg-gray-100" onClick={() => setQuantity(quantity + 1)}>
            +
          </button>
        </div>
        <button className="bg-primary hover:bg-orange-600 text-white px-6 py-2 font-medium">
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
          <span className="font-medium">Category:</span> Pizza
        </p>
        <p className="text-sm text-gray-600 mb-4">
          <span className="font-medium">Tag:</span> Our Shop
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
