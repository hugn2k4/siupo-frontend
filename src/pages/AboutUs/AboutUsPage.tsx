import FoodGallerySection from "./components/FoodGallerySection";
import WhyChooseUsSection from "./components/WhyChooseUsSection";
import TeamSection from "./components/TeamSection";
import TestimonialSection from "./components/TestimonialSection";
import MenuSection from "./components/MenuSection";
import { useBanners } from "../../hooks/useBanners";
const AboutUsPage = () => {
  const { banners, loading } = useBanners("About us");

  return (
    <div className="min-h-screen">
      <FoodGallerySection banners={banners} loading={loading} />
      <WhyChooseUsSection banners={banners} loading={loading} />
      <TeamSection banners={banners} loading={loading} />
      <TestimonialSection banners={banners} loading={loading} />
      <MenuSection />
    </div>
  );
};
export default AboutUsPage;
