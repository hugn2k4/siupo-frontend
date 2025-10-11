import { useEffect } from "react";
import AboutUs from "./components/AboutUs";
import Hero from "./components/Hero";

function HomePage() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <Hero />
      <AboutUs />
    </>
  );
}

export default HomePage;
