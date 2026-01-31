import { Skeleton } from "@mui/material";
import React from "react";
import Coffee from "../../../assets/icons/image_coffee.png";
import Person from "../../../assets/icons/image_person.png";
import Student from "../../../assets/icons/image_student.png";
import ImageFeature from "../../../assets/images/defaults/image_about_us_feature.png";
import { useTranslation } from "../../../hooks/useTranslation";
// import AboutusClient from "../../../assets/images/AboutusClient.png";
// Why Choose Us Section Component
const WhyChooseUsSection: React.FC = () => {
  const { t } = useTranslation("about");
  const featureImage = ImageFeature;
  const loading = false;
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">{t("whyChooseUs.title")}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{t("whyChooseUs.description")}</p>
        </div>

        <div className="mb-12">
          {loading ? (
            <Skeleton variant="rectangular" width="100%" height={256} />
          ) : featureImage ? (
            <img src={featureImage} alt="Featured dishes" className="w-full h-64 object-cover rounded-lg" />
          ) : null}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <img src={Student} alt="Student icon" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{t("whyChooseUs.features.bestChef.title")}</h3>
            <p className="text-gray-600">{t("whyChooseUs.features.bestChef.description")}</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <img src={Coffee} alt="Student Icon" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{t("whyChooseUs.features.qualityFood.title")}</h3>
            <p className="text-gray-600">{t("whyChooseUs.features.qualityFood.description")}</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <img src={Person} alt="Person Icon" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {t("whyChooseUs.features.cleanEnvironment.title")}
            </h3>
            <p className="text-gray-600">{t("whyChooseUs.features.cleanEnvironment.description")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default WhyChooseUsSection;
