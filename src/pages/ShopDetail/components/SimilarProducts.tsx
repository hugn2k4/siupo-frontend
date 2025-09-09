import React from "react";
import ProductCard from "./ProductCard";
import similar1 from "../../../assets/images/similar1.png";
import similar2 from "../../../assets/images/similar2.png";
import similar3 from "../../../assets/images/similar3.png";

const SimilarProducts: React.FC = () => {
  const products = [
    {
      title: "Fresh Lime",
      price: "$38.00",
      originalPrice: "$45.00",
      image: similar1, // Thay đổi đường dẫn phù hợp
    },
    {
      title: "Chocolate Muffin",
      price: "$28.00",
      image: similar2,
    },
    {
      title: "Burger",
      price: "$21.00",
      originalPrice: "$45.00",
      image: similar3,
    },
    {
      title: "Fresh Lime",
      price: "$38.00",
      originalPrice: "$45.00",
      image: similar1,
    },
  ];

  return (
    <div className="mt-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Similar Products</h2>
        <div className="flex space-x-2">
          <button className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300">
            ‹
          </button>
          <button className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-orange-600">
            ›
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            title={product.title}
            price={product.price}
            originalPrice={product.originalPrice}
            image={product.image}
          />
        ))}
      </div>
    </div>
  );
};

export default SimilarProducts;
