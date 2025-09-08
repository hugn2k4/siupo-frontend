import HeroSection from "./components/HeroSection";
import FoodGallerySection from "./components/FoodGallerySection";
import WhyChooseUsSection from "./components/WhyChooseUsSection";
import TeamSection from "./components/TeamSection";
import TestimonialSection from "./components/TestimonialSection";
import MenuSection from "./components/MenuSection";
import NewsletterSection from "./components/NewsletterSection";
const AboutMe = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FoodGallerySection />
      <WhyChooseUsSection />
      <TeamSection />
      <TestimonialSection />
      <MenuSection />
      <NewsletterSection />
    </div>
  );
};
export default AboutMe;
