import { Heart, Share2, ShoppingBag } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import imageDefault from "../../../assets/images/products/image_burger.png";

interface ProductCardProps {
  id?: number;
  title: string;
  price: string;
  originalPrice?: string;
  image?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, title, price, originalPrice, image = imageDefault }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (id) {
      navigate(`/shop/${id}`);
    }
  };

  const handleButtonClick = (e: React.MouseEvent, action: string) => {
    e.stopPropagation(); // Ngăn chặn sự kiện click từ card
    console.log(`${action} clicked for product:`, title);
    // Thêm logic cho từng button ở đây
  };

  return (
    <div
      className="cursor-pointer relative group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      onClick={handleCardClick}
    >
      {/* Hình ảnh */}
      <div className="w-full h-48 bg-gray-200 overflow-hidden relative">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.currentTarget.src = imageDefault;
          }}
        />

        {/* Overlay nút khi hover */}
        <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => handleButtonClick(e, "share")}
            className="cursor-pointer bg-white p-3 rounded-md hover:bg-primary hover:text-white transition shadow"
          >
            <Share2 size={18} />
          </button>
          <button
            onClick={(e) => handleButtonClick(e, "add-to-cart")}
            className="cursor-pointer bg-white p-3 rounded-md hover:bg-primary hover:text-white transition shadow"
          >
            <ShoppingBag size={18} />
          </button>
          <button
            onClick={(e) => handleButtonClick(e, "wishlist")}
            className="cursor-pointer bg-white p-3 rounded-md hover:bg-primary hover:text-white transition shadow"
          >
            <Heart size={18} />
          </button>
        </div>
      </div>

      {/* Nội dung sản phẩm */}
      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-2 truncate hover:text-primary transition-colors">{title}</h3>
        <div className="flex items-center space-x-2">
          <span className="text-orange-500 font-bold">{price}</span>
          {originalPrice && <span className="text-gray-400 line-through text-sm">{originalPrice}</span>}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
