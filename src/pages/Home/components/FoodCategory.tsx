import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const FoodCategoryCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const foodItems = [
    { name: "Grand Italiano", items: 26, image: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=400" },
    { name: "Pene Salmone", items: 23, image: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=400" },
    {
      name: "Molto Tagliatelle",
      items: 20,
      image: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=400",
    },
    { name: "Pepperoni Tagli", items: 26, image: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=400" },
    { name: "Deluxe Special", items: 18, image: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=400" },
    { name: "Classic Pasta", items: 22, image: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=400" },
  ];

  // Auto lấy width card thực tế
  useEffect(() => {
    const resize = () => {
      if (!containerRef.current) return;

      const firstCard = containerRef.current.querySelector(".food-card") as HTMLElement;
      if (firstCard) {
        setCardWidth(firstCard.offsetWidth + 16); // card + gap
      }
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // Tính max index theo số card hiển thị
  const getItemsPerView = () => {
    if (window.innerWidth < 640) return 1; // mobile
    if (window.innerWidth < 768) return 2; // sm
    if (window.innerWidth < 1024) return 3; // md
    return 4; // lg
  };

  const maxIndex = Math.max(0, foodItems.length - getItemsPerView());

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <div className="bg-[#f5f5f0] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-semibold text-gray-800">Food category</h1>
          <p className="text-gray-500 text-sm max-w-md mx-auto mt-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative px-10">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-lg flex items-center justify-center transition-all
              ${currentIndex === 0 ? "bg-gray-200 text-gray-400" : "bg-green-600 text-white hover:bg-green-700"}
            `}
          >
            <ChevronLeft size={26} />
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-lg flex items-center justify-center transition-all
              ${currentIndex >= maxIndex ? "bg-gray-200 text-gray-400" : "bg-green-600 text-white hover:bg-green-700"}
            `}
          >
            <ChevronRight size={26} />
          </button>

          {/* Cards Slider */}
          <div className="overflow-hidden">
            <div
              ref={containerRef}
              className="flex gap-4 transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * cardWidth}px)`,
              }}
            >
              {foodItems.map((item, index) => (
                <div
                  key={index}
                  className="food-card flex-shrink-0
                             w-full
                             sm:w-1/2
                             md:w-1/3
                             lg:w-1/4
                             "
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      />
                    </div>
                    <div className="p-6 text-center">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.name}</h3>
                      <p className="text-gray-500 text-sm">{item.items} Item</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 rounded-full transition-all duration-300
                ${currentIndex === i ? "w-8 bg-green-700" : "w-2 bg-gray-300"}
              `}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodCategoryCarousel;
