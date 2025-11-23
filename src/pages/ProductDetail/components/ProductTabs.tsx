import React, { useEffect, useState } from "react";
import reviewService from "../../../services/reviewService";

import ProductReviews from "./ProductReviews";

interface ProductTabsProps {
  productId: number;
  description: string;
  reviewCount: number;
}

const ProductTabs: React.FC<ProductTabsProps> = ({ productId, description, reviewCount }) => {
  const [activeTab, setActiveTab] = useState("description");
  const [actualReviewCount, setActualReviewCount] = useState(reviewCount);

  // Load review count ngay khi component mount
  useEffect(() => {
    const loadReviewCount = async () => {
      try {
        const response = await reviewService.getProductReviews(productId);
        if (response && response.data) {
          const reviewsData = Array.isArray(response.data) ? response.data : [];
          setActualReviewCount(reviewsData.length);
        }
      } catch (error) {
        console.error("Failed to load review count:", error);
      }
    };
    loadReviewCount();
  }, [productId]);

  return (
    <div className="mt-12">
      <div className="flex border-b border-gray-200">
        <button
          className={`px-6 py-3 font-medium ${
            activeTab === "description" ? "bg-primary text-white rounded-t" : "text-gray-600 hover:text-gray-800"
          }`}
          onClick={() => setActiveTab("description")}
        >
          Description
        </button>
        <button
          className={`px-6 py-3 font-medium ${
            activeTab === "reviews" ? "bg-primary text-white rounded-t" : "text-gray-600 hover:text-gray-800"
          }`}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews ({actualReviewCount || 0})
        </button>
      </div>

      <div className="p-6 bg-gray-50">
        {activeTab === "description" && (
          <div>
            <p className="text-gray-700 mb-6 leading-relaxed">{description || "Không có mô tả."}</p>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Key Benefits</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Fresh and high-quality ingredients that ensure great taste and nutrition.</li>
                <li>Rich, satisfying flavor that appeals to a wide range of customers.</li>
                <li>Nutritious and balanced, providing essential vitamins and energy.</li>
                <li>Prepared with care and hygiene, ensuring safety and peace of mind.</li>
                <li>Versatile and convenient, suitable for any meal of the day.</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div>
            <ProductReviews
              productId={productId}
              reviewCount={reviewCount}
              onReviewCountUpdate={setActualReviewCount}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
