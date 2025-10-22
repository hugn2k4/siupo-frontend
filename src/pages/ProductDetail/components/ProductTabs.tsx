import React, { useState } from "react";

interface ProductTabsProps {
  description: string;
  rating: number;
  reviewCount: number;
}

const ProductTabs: React.FC<ProductTabsProps> = ({ description, rating, reviewCount }) => {
  const [activeTab, setActiveTab] = useState("description");

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
          Reviews ({reviewCount})
        </button>
      </div>

      <div className="p-6 bg-gray-50">
        {activeTab === "description" && (
          <div>
            <p className="text-gray-700 mb-6 leading-relaxed">{description || "Không có mô tả."}</p>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Key Benefits</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                <li>Maecenas ullamcorper est et massa mattis condimentum.</li>
                <li>Vestibulum sed massa vel ipsum imperdiet malesuada id tempus nisl.</li>
                <li>Etiam non massa et felis tempor feugiat congue ac vitae.</li>
                <li>Mauris sagittis diam magna, in blandit turpis.</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div>
            <p className="text-gray-700">
              Đánh giá trung bình: {rating} ({reviewCount} đánh giá). Nội dung đánh giá sẽ hiển thị ở đây...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
