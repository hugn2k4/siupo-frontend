import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "../../../hooks/useTranslation";

const CustomerReview = () => {
  const { t } = useTranslation("home");
  const [currentReview, setCurrentReview] = useState(0);

  const reviews = [
    {
      id: 1,
      name: "Abdur Rahman",
      role: "Regular Customer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      text: "I’ve been ordering from here for months and the quality never drops. The quinoa bowl is my go-to lunch – fresh ingredients, perfect portion, and it actually keeps me full all afternoon. Highly recommend for anyone trying to eat healthier without sacrificing taste!",
      dishImage:
        "https://dmrqkbkq8el9i.cloudfront.net/Pictures/780xany/3/8/0/291380_anniesprattot7_vi0hhgunsplash_146309.jpg",
      dishName: "Quinoa Power Bowl",
      price: "$14.00",
      rating: 5,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Fitness Enthusiast",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
      text: "Finally found a place that understands healthy doesn’t mean boring! The grilled salmon salad is packed with flavor and the dressing is light but delicious. Delivery is always on time and the packaging keeps everything fresh. My new favorite spot!",
      dishImage: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop",
      dishName: "Grilled Salmon Salad",
      price: "$16.50",
      rating: 5,
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "Busy Professional",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
      text: "As someone who works long hours, I rely on quick but nutritious meals. Their chicken avocado wrap with the green smoothie combo is perfect – tastes amazing and gives me energy without the afternoon crash. Great portion sizes and consistent quality every time.",
      dishImage: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop",
      dishName: "Chicken Avocado Wrap",
      price: "$12.00",
      rating: 5,
    },
  ];

  const handlePrev = () => {
    setCurrentReview((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentReview((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const currentData = reviews[currentReview];

  return (
    <div className="bg-white pt-[200px] pb-8 sm:pb-12 lg:pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Review Content */}
          <div className="space-y-6 sm:space-y-8">
            {/* Header */}
            <div>
              <p className="text-gray-600 italic mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                <span>{t("testimonials.heading") as string}</span>
                <span className="w-8 sm:w-12 h-[1px] bg-gray-400"></span>
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                {t("testimonials.title") as string}
              </h2>

              {/* Quote Icon */}
              <div className="text-green-600 text-4xl sm:text-5xl lg:text-6xl mb-4 sm:mb-6 font-serif leading-none">
                ❝❞
              </div>

              {/* Review Text */}
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">{currentData.text}</p>
            </div>

            {/* Reviewer Info & Navigation */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 sm:gap-4">
                <img
                  src={currentData.avatar}
                  alt={currentData.name}
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-gray-200"
                />
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">{currentData.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-500">{currentData.role}</p>
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="flex gap-2 sm:gap-3">
                <button
                  onClick={handlePrev}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-gray-300 hover:border-green-600 hover:bg-green-50 flex items-center justify-center transition-all group"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-green-600" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-gray-300 hover:border-green-600 hover:bg-green-50 flex items-center justify-center transition-all group"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-green-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Dish Image with Card */}
          <div className="relative">
            {/* Main Dish Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={currentData.dishImage}
                alt="Featured dish"
                className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
              />

              {/* Overlay Card */}
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{currentData.dishName}</h3>

                  {/* Star Rating */}
                  <div className="flex gap-1">
                    {[...Array(currentData.rating)].map((_, index) => (
                      <Star key={index} className="w-4 h-4 sm:w-5 sm:h-5 fill-green-600 text-green-600" />
                    ))}
                  </div>

                  {/* Description */}
                  {/* Description - thay đổi theo từng món */}
                  <p className="text-xs sm:text-sm text-gray-600 mt-2 line-clamp-2">
                    {currentReview === 0 &&
                      "Organic quinoa, fresh vegetables, avocado, chickpeas, and lemon-tahini dressing – a complete balanced meal."}
                    {currentReview === 1 &&
                      "Wild-caught salmon, mixed greens, cherry tomatoes, cucumber, and light balsamic vinaigrette."}
                    {currentReview === 2 &&
                      "Grilled chicken breast, ripe avocado, whole grain wrap with fresh greens and herb dressing."}
                  </p>
                </div>

                {/* Price */}
                <div className="ml-3 sm:ml-4 flex-shrink-0">
                  <div className="text-xl sm:text-2xl font-bold text-green-600">{currentData.price}</div>
                </div>
              </div>
            </div>

            {/* Decorative background */}
            <div className="absolute -bottom-4 -right-4 w-32 sm:w-48 h-32 sm:h-48 bg-green-100 rounded-full opacity-20 blur-3xl -z-10"></div>
          </div>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mt-8 sm:mt-12">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentReview(index)}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                currentReview === index ? "w-6 sm:w-8 bg-green-600" : "w-1.5 sm:w-2 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerReview;
