import React from "react";
import aboutus from "../../../assets/images/image_about_us_home.png";

// Food Gallery Section Component
const FoodGallerySection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="grid">
            <div className="space-y-4">
              <img src={aboutus} alt="Food 1" className="w-full object-cover rounded-lg" />
            </div>
          </div>
          <div>
            <h3 className="text-primary mb-2 inline-block" style={{ fontFamily: "Miniver" }}>
              About us _____
            </h3>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Food is an important part of a balanced Diet</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat.
            </p>
            <div className="flex items-center space-x-4">
              <button className="bg-[#BC9A6C] hover:bg-orange-600 text-white px-8 py-3 rounded-sm font-semibold transition-colors">
                Show more
              </button>
              <button className="flex items-center space-x-2 text-orange-500 hover:text-orange-600 font-semibold">
                <div className="w-12 h-12 bg-[#BC9A6C] rounded-full flex items-center justify-center">
                  <span className="text-white-500">▶</span>
                </div>
                <span>Watch Video</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default FoodGallerySection;
