import { useEffect } from "react";
import AboutUs from "./components/AboutUs";
import Hero from "./components/Hero";
import { useBanners } from "../../hooks/useBanners";
import FoodCategory from "./components/FoodCategory";
import WhyChooseUs from "./components/WhyChoseUs";
import MenuSection from "./components/MenuSection";
import TeamSection from "./components/TeamMember";
import CustomerReview from "./components/CustomerReview";
import LatestNewsBlog from "./components/LatestNewsBlog";
import PartnersSection from "../Menu/PartnersSection";
function HomePage() {
  const { banners, loading } = useBanners("Home");
  const { banners: aboutBanners, loading: aboutLoading } = useBanners("About us");
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

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
