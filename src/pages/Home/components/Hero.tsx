import { Box, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import ShiningStarsIcon from "../../../assets/icons/shining_stars.svg";
import SparkleIcon from "../../../assets/icons/sparkle.svg";
import ImageHero from "../../../assets/images/image_hero.png";
import ImageHeroMobile from "../../../assets/images/image_hero_mobile.png";
import MyButton from "../../../components/common/Button";

const Hero = () => {
  const [hoveredPlace, setHoveredPlace] = useState(false);

  return (
    <section className="w-full min-h-[90vh] flex flex-col relative overflow-hidden">
      {/* Right side: Hero Image - positioned absolutely to reach screen edge */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
        className="absolute top-0 right-0 w-1/2 h-full hidden lg:flex items-start justify-end z-0"
      >
        <img
          src={ImageHero}
          alt="Healthy and delicious food showcase"
          className="w-auto h-[80vh] object-contain"
          style={{ maxWidth: "none" }}
          loading="eager"
        />
      </Box>

      <Container maxWidth="xl" className="flex-1 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[90vh] items-center relative">
          {/* Left side: Text content */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col justify-center items-center lg:items-start px-4 lg:px-8 py-12 lg:py-0 text-center lg:text-left order-2 lg:order-1 relative z-10"
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                maxWidth: { xs: "100%", sm: 480, md: 520 },
                width: "100%",
              }}
            >
              <Typography
                component="div"
                sx={{
                  fontFamily: "Miniver",
                  mb: 1,
                  position: "relative",
                  display: "inline-block",
                  color: "var(--color-green-primary)",
                  fontSize: { xs: "0.9rem", sm: "1rem", md: "1.125rem" },
                }}
              >
                Healthy & Tasty Food
                <img
                  src={SparkleIcon}
                  alt="sparkle"
                  style={{
                    position: "absolute",
                    top: "-5px",
                    left: "3px",
                    width: "20px",
                    height: "20px",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: "8px",
                    left: { xs: "140px", sm: "160px", md: "170px" },
                    height: "1px",
                    width: { xs: "12px", sm: "15px" },
                    backgroundColor: "var(--color-green-primary)",
                  }}
                />
              </Typography>
              <Typography
                variant="h3"
                fontWeight="700"
                sx={{
                  position: "relative",
                  display: "inline-block",
                  whiteSpace: { xs: "normal", sm: "nowrap" },
                  fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem", lg: "3rem" },
                  lineHeight: { xs: 1.3, md: 1.2 },
                }}
              >
                Enjoy Healthy Life
              </Typography>
              <Box
                sx={{
                  mb: 4,
                  display: "flex",
                  justifyContent: { xs: "center", lg: "flex-start" },
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 1,
                }}
              >
                <Typography
                  variant="h3"
                  fontWeight="700"
                  sx={{
                    position: "relative",
                    display: "inline-block",
                    whiteSpace: { xs: "normal", sm: "nowrap" },
                    fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem", lg: "3rem" },
                    lineHeight: { xs: 1.3, md: 1.2 },
                  }}
                >
                  & Tasty Food.
                </Typography>
                <img
                  src={ShiningStarsIcon}
                  alt="sparkle"
                  style={{
                    width: "40px",
                    height: "40px",
                  }}
                />
              </Box>

              <Typography
                sx={{
                  mb: 4,
                  maxWidth: { xs: "100%", sm: 600, md: 650 },
                  color: "var(--color-gray2)",
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                  lineHeight: { xs: 1.6, md: 1.7 },
                }}
              >
                Discover a variety of healthy and delicious meals crafted to nourish your body and delight your taste
                buds. From fresh salads to wholesome bowls, every dish is made with love and quality ingredients,
                helping you enjoy a balanced and flavorful lifestyle.
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 2,
                  justifyContent: { xs: "center", lg: "flex-start" },
                  alignItems: { xs: "center", sm: "flex-start" },
                  pb: { xs: 8, lg: 20 },
                }}
              >
                <MyButton
                  colorScheme="green"
                  hovered={hoveredPlace}
                  disableDefaultHover
                  sx={{ width: { xs: "100%", sm: "auto" } }}
                >
                  Show More
                </MyButton>
                <MyButton
                  colorScheme="lightGreen"
                  onMouseEnter={() => setHoveredPlace(true)}
                  onMouseLeave={() => setHoveredPlace(false)}
                  sx={{ width: { xs: "100%", sm: "auto" } }}
                >
                  Place an Order
                </MyButton>
              </Box>
            </Box>
          </Box>

          {/* Mobile image - centered below content */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
            className="flex lg:hidden justify-center items-center px-4 order-1 mt-8"
          >
            <div className="relative w-full max-w-md">
              <img
                src={ImageHeroMobile}
                alt="Healthy and delicious food showcase"
                className="w-full h-auto object-contain max-h-[50vh]"
                loading="eager"
              />
            </div>
          </Box>
        </div>
      </Container>

      {/* Scroll indicator */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: true, amount: 0.3 }}
        className="flex flex-col items-center mb-6 relative lg:absolute lg:bottom-2 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:mb-0"
      >
        <Typography
          variant="caption"
          className="text-gray-500 text-xs tracking-wider mb-2 uppercase"
          sx={{
            color: "var(--color-gray2)",
            letterSpacing: "0.1em",
            fontSize: { xs: "0.7rem", md: "0.75rem" },
          }}
        >
          Scroll down
        </Typography>
        <div
          className="w-px h-12 md:h-16 bg-gray-400 animate-pulse"
          style={{ backgroundColor: "var(--color-gray3)" }}
        />
      </Box>
    </section>
  );
};

export default Hero;
