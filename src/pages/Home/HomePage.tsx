import { useEffect } from "react";
import AboutUs from "./components/AboutUs";
import Hero from "./components/Hero";
import { useBanners } from "../../hooks/useBanners";

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
    </>
  );
}

export default HomePage;
