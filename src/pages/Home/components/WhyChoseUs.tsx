import React from "react";
import { Truck, Clock, UtensilsCrossed, Factory } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <Truck size={40} strokeWidth={1.5} />,
      title: "Fast Delivery",
      color: "bg-green-50",
    },
    {
      icon: <Clock size={40} strokeWidth={1.5} />,
      title: "24/7 services",
      color: "bg-gray-50",
    },
    {
      icon: <UtensilsCrossed size={40} strokeWidth={1.5} />,
      title: "Fresh food",
      color: "bg-gray-50",
    },
    {
      icon: <Factory size={40} strokeWidth={1.5} />,
      title: "Quality maintain",
      color: "bg-gray-50",
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

                {/* Orange juice and vegetables decoration */}
                <div className="absolute -top-12 -right-8 w-32 h-40">
                  <img
                    src="https://images.unsplash.com/photo-1primary271886742-f049cd451bba?w=200&h=200&fit=crop"
                    alt="Fresh vegetables"
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                </div>
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
                <span className="text-lg">Why Choose us</span>
                <span className="w-12 h-[2px] bg-green-700"></span>
              </p>
              <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">Why We are the best?</h2>

              <p className="text-gray-primary leading-relaxed mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque diam pellentesque bibendum non dui
                volutpat fringilla bibendum. Urna, elit augue urna, vitae feugiat pretium donec id elementum. Ultrices
                mattis sed vitae mus risus. Lacus nisl, et ac dapibus sit eu velit in consequat.
              </p>

              <p className="text-gray-primary leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius sed pharetra dictum neque massa congue
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-6 pt-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`${feature.color} p-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden`}
                >
                  {/* Colored border accent */}
                  <div
                    className={`absolute left-0 top-0 h-full w-1 ${index === 0 ? "bg-green-primary" : "bg-transparent"} transition-all group-hover:w-1.5`}
                  ></div>

                  <div className="flex flex-col items-start gap-3">
                    <div
                      className={`text-gray-700 group-hover:text-green-primary transition-colors ${index === 0 ? "text-green-primary" : ""}`}
                    >
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
