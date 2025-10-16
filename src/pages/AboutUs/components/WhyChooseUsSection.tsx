import React from "react";
import aboutus4 from "../../../assets/images/image_about_us_4.png";
import Student from "../../../assets/images/image_student.png";
import Person from "../../../assets/images/image_person.png";
import Coffee from "../../../assets/images/image_coffee.png";
// import AboutusClient from "../../../assets/images/AboutusClient.png";
// Why Choose Us Section Component
const WhyChooseUsSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque diam pellentesque bibendum non dui volutpat
            fringilla bibendum.
          </p>
        </div>

        <div className="mb-12">
          <img src={aboutus4} alt="Featured dishes" className="w-full h-64 object-cover rounded-lg" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <img src={Student} alt="Student icon" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Best Chef</h3>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <img src={Coffee} alt="Student Icon" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">120 Item food</h3>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <img src={Person} alt="Person Icon" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Clean Environment</h3>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default WhyChooseUsSection;
