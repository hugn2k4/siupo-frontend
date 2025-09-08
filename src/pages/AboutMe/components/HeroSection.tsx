import React from "react";
import heroImage from "../../../assets/images/hero.png";

// Hero Section Component
const HeroSection: React.FC = () => {
  return (
    <section
      className="relative text-white py-24 px-4"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center">
          {/* Main heading */}
          <h1 className="text-6xl font-bold mb-6">About Us</h1>

          {/* Breadcrumb navigation */}
          <nav className="flex items-center justify-center space-x-2 text-lg">
            <a href="/" className="text-white hover:text-yellow-400 transition-colors duration-200">
              Home
            </a>
            <span className="text-yellow-400">›</span>
            <span className="text-yellow-400">About</span>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
