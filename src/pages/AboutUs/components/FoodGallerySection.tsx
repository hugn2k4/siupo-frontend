import { Skeleton } from "@mui/material";
import React from "react";
import defaultAboutUs from "../../../assets/images/image_about_us_home.png";
import MyButton from "../../../components/common/Button";
import { useTranslation } from "../../../hooks/useTranslation";
import type { BannerProps } from "../../../types/props/BannerProps";
// Food Gallery Section Component
const FoodGallerySection: React.FC<BannerProps> = ({ banners, loading }) => {
  const { t } = useTranslation("home");
  const aboutUsImage = banners[0]?.url || defaultAboutUs;
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="grid">
            <div className="space-y-4">
              {loading ? (
                <Skeleton variant="rectangular" width="100%" height={400} />
              ) : aboutUsImage ? (
                <img src={aboutUsImage} alt="Food 1" className="w-full object-cover rounded-lg" />
              ) : null}
            </div>
          </div>
          <div>
            <h3 className="text-primary mb-2 inline-block" style={{ fontFamily: "Miniver" }}>
              {t("aboutSection.heading")} _____
            </h3>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">{t("aboutSection.title")}</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">{t("aboutSection.description")}</p>
            <div className="flex items-center space-x-4 gap-4">
              <MyButton colorScheme="orange">{t("hero.showMore")}</MyButton>
              <MyButton isWatch colorScheme="orange" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default FoodGallerySection;
