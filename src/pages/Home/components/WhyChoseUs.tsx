import { Clock, Factory, Truck, UtensilsCrossed } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "../../../hooks/useTranslation";

const WhyChooseUs = () => {
  const { t } = useTranslation("home");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const features = [
    {
      icon: <Truck size={40} strokeWidth={1.5} />,
      title: t("whyChooseUs.fastDelivery") as string,
      color: "bg-white",
    },
    {
      icon: <Clock size={40} strokeWidth={1.5} />,
      title: t("whyChooseUs.service247") as string,
      color: "bg-white",
    },
    {
      icon: <UtensilsCrossed size={40} strokeWidth={1.5} />,
      title: t("whyChooseUs.freshFood") as string,
      color: "bg-white",
    },
    {
      icon: <Factory size={40} strokeWidth={1.5} />,
      title: t("whyChooseUs.qualityMaintain") as string,
      color: "bg-white",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Images */}
          <div className="relative">
            {/* Background decorative element */}
            <div className="absolute -top-8 -left-8 w-64 h-64 bg-green-100 rounded-full opacity-20 blur-3xl"></div>

            {/* Main image container */}
            <div className="relative z-10">
              {/* Cooking hands image - Left */}
              <div className="relative w-3/5 shadow-2xl rounded-lg overflow-hidden transform -rotate-2">
                <img
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=primary&h=800&fit=crop"
                  alt="Cooking preparation"
                  className="w-full h-[500px] object-cover"
                />
              </div>

              {/* Salad plate image - Right overlapping */}
              <div className="absolute top-24 right-0 w-3/5 shadow-2xl rounded-lg overflow-hidden transform rotate-2">
                <img
                  src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=primary&h=700&fit=crop"
                  alt="Fresh salad bowl"
                  className="w-full h-[450px] object-cover"
                />
              </div>

              {/* Decorative green leaf */}
              <div className="absolute -top-4 right-20 w-24 h-24 animate-pulse">
                <div className="w-full h-full bg-green-500 rounded-full opacity-30 blur-xl"></div>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <p className="text-green-700 font-semibold mb-3 flex items-center gap-2">
                <span className="text-lg">{t("whyChooseUs.sectionTitle") as string}</span>
                <span className="w-12 h-[2px] bg-green-700"></span>
              </p>
              <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {t("whyChooseUs.heading") as string}
              </h2>

              <p className="text-gray-primary leading-relaxed mb-4">{t("whyChooseUs.description") as string}</p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-6 pt-4">
              {features.map((feature, index) => {
                const isDefaultActive = index === 0 && hoveredIndex === null;
                const isHovered = hoveredIndex === index;
                const showGreen = isDefaultActive || isHovered;

                return (
                  <div
                    key={index}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={`${feature.color} p-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative overflow-hidden ${
                      showGreen ? "border-l-4 border-green-primary" : "border-l-4 border-transparent"
                    }`}
                  >
                    {/* Green background overlay that slides from left to right */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-r from-green-50 to-green-100 transition-all duration-700 ease-out ${
                        showGreen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
                      }`}
                      style={{ zIndex: 0 }}
                    ></div>

                    <div className="flex flex-col items-start gap-3 relative z-10">
                      <div
                        className={`transition-colors duration-500 ${showGreen ? "text-green-primary" : "text-gray-700"}`}
                      >
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 transition-colors duration-300">
                        {feature.title}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
