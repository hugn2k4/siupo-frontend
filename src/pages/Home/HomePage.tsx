import { useBanners } from "../../hooks/useBanners";
import PartnersSection from "../Menu/PartnersSection";
import AboutUs from "./components/AboutUs";
import CustomerReview from "./components/CustomerReview";
import FoodCategory from "./components/FoodCategory";
import Hero from "./components/Hero";
import LatestNewsBlog from "./components/LatestNewsBlog";
import MenuSection from "./components/MenuSection";
import TeamSection from "./components/TeamMember";
import WhyChooseUs from "./components/WhyChoseUs";
function HomePage() {
  const { banners, loading } = useBanners("Home");
  const { banners: aboutBanners, loading: aboutLoading } = useBanners("About us");

  return (
    <>
      <Hero banners={banners} loading={loading} />
      <AboutUs banners={aboutBanners} loading={aboutLoading} />
      <FoodCategory />
      <WhyChooseUs />
      <MenuSection />
      <TeamSection banners={aboutBanners} loading={aboutLoading} />
      <CustomerReview />
      <LatestNewsBlog />
      <PartnersSection />
    </>
  );
}

export default HomePage;
