import React from 'react';

interface ProductCardProps {
  title: string;
  price: string;
  originalPrice?: string;
  image?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  title, 
  price, 
  originalPrice,
  image = "/api/placeholder/300/200" // Ảnh mặc định nếu không có
}) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="w-full h-48 bg-gray-200 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            // Fallback khi ảnh không tải được
            e.currentTarget.src = "/api/placeholder/300/200";
          }}
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-2 truncate">{title}</h3>
        <div className="flex items-center space-x-2">
          <span className="text-orange-500 font-bold">{price}</span>
          {originalPrice && (
            <span className="text-gray-400 line-through text-sm">{originalPrice}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
