import TeamSection from "../../components/shared/TeamSection";
import FoodGallerySection from "./components/FoodGallerySection";
import MenuSection from "./components/MenuSection";
import TestimonialSection from "./components/TestimonialSection";
import WhyChooseUsSection from "./components/WhyChooseUsSection";
const AboutUsPage = () => {
  return (
    <div className="min-h-screen">
      <FoodGallerySection />
      <WhyChooseUsSection />
      <TeamSection variant="about" />
      <TestimonialSection />
      <MenuSection />
    </div>
  );
};
export default AboutUsPage;
