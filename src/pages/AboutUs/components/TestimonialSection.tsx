import { Skeleton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import type { BannerProps } from "../../../types/props/BannerProps";

const TestimonialSection: React.FC<BannerProps> = ({ loading }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 3 khách hàng với hình riêng + đánh giá chân thật
  const testimonials = [
    {
      name: "Aaravh Naehia",
      role: "Food Specialist",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      text: "The quality of ingredients here is outstanding. Every salad feels fresh and thoughtfully prepared. This has become my go-to place for healthy, delicious meals that actually taste amazing!",
    },
    {
      name: "Emma Larson",
      role: "Fitness Coach",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
      text: "Finally found a restaurant that truly understands healthy eating! The portions are perfect, flavors are spot on, and everything is made with real, fresh ingredients. The quinoa bowls are a must-try!",
    },
    {
      name: "David Kim",
      role: "Regular Customer",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
      text: "I order lunch here 4–5 times a week. The grilled salmon salad is incredible — always fresh, perfectly seasoned, and delivered quickly. Hands down the best healthy food option in town!",
    },
  ];

  const current = testimonials[currentIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 5000); // 3 giây/lần

    return () => clearInterval(interval); // Clear khi component unmount
  }, [testimonials.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-16 bg-white mt-60">
      <div className="text-center mb-12">
        <h3 className="text-primary mb-2 text-left pl-[30%]" style={{ fontSize: 30, fontFamily: "Great Vibes" }}>
          Testimonials
        </h3>
        <h2 className="text-4xl font-bold text-gray-800 text-left pl-[30%] mb-4">What our client are saying</h2>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center relative">
          {/* Arrow Left */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all z-10"
          >
            <ChevronLeft className="w-7 h-7 text-gray-600" />
          </button>

          {/* Arrow Right */}
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all z-10"
          >
            <ChevronRight className="w-7 h-7 text-gray-600" />
          </button>

          {/* Avatar */}
          <div className="mb-6">
            {loading ? (
              <Skeleton variant="circular" width={160} height={160} className="mx-auto" />
            ) : (
              <img
                src={current.avatar}
                alt={current.name}
                className="w-40 h-40 object-cover rounded-full mx-auto border-4 border-white shadow-xl"
              />
            )}
          </div>

          {/* 5 Stars */}
          <div className="flex justify-center mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className="text-yellow-400 text-2xl">
                ⭐
              </span>
            ))}
          </div>

          {/* Quote */}
          <blockquote className="text-gray-600 text-lg leading-relaxed mb-6 max-w-3xl mx-auto italic px-8">
            "{current.text}"
          </blockquote>

          {/* Name & Role */}
          <div>
            <p className="font-semibold text-gray-800 text-xl">{current.name}</p>
            <p className="text-gray-500">{current.role}</p>
          </div>

          {/* Dots - active dot dài hơn */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-300 rounded-full ${
                  currentIndex === index ? "bg-yellow-400 w-10 h-2" : "bg-gray-300 w-2 h-2 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
