import { Box, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import ShiningStarsIcon from "../../assets/icons/shining_stars.svg";
import SparkleIcon from "../../assets/icons/sparkle.svg";
import ImageHero from "../../assets/images/image_hero.png";

const Hero = () => {
  const [hoveredPlace, setHoveredPlace] = useState(false);
  return (
    <section className="w-full h-90vh flex flex-col">
      {/* Flex container */}
      <Box className="flex h-full">
        {/* Left side: Text content full height */}
        <Box
          sx={{
            flex: "0 0 50%",
            height: "90vh",
            display: "flex",
            alignItems: "flex-center",
            justifyContent: "center",
          }}
          component={motion.div}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              maxWidth: 520,
            }}
          >
            <Typography
              sx={{
                fontFamily: "Miniver",
                mb: 1,
                position: "relative",
                display: "inline-block",
                color: "var(--color-green-primary)",
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
                  width: "24px",
                  height: "24px",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: "8px",
                  left: "170px",
                  height: "1px",
                  width: "15px",
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
                whiteSpace: "nowrap",
              }}
            >
              Enjoy Healthy Life
            </Typography>
            <Typography
              variant="h3"
              fontWeight="700"
              sx={{
                mb: 4,
                position: "relative",
                display: "inline-flex",
                whiteSpace: "nowrap",
              }}
            >
              & Tasty Food.
              <img
                src={ShiningStarsIcon}
                alt="sparkle"
                style={{
                  width: "50px",
                  height: "50px",
                }}
              />
            </Typography>
            <Typography sx={{ mb: 4, maxWidth: 650, color: "var(--color-gray2)" }}>
              Discover a variety of healthy and delicious meals crafted to nourish your body and delight your taste
              buds. From fresh salads to wholesome bowls, every dish is made with love and quality ingredients, helping
              you enjoy a balanced and flavorful lifestyle.
            </Typography>
            <Box className="flex space-x-4 gap-4 pb-20">
              <Button
                variant="outlined"
                sx={{
                  bgcolor: hoveredPlace ? "white" : "var(--color-green-primary)",
                  color: hoveredPlace ? "var(--color-green-primary)" : "white",
                  borderColor: "var(--color-green-primary)",
                  px: 5,
                  py: 1.5,
                  fontWeight: 700,
                }}
              >
                Show More
              </Button>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "var(--color-green-primary)",
                  color: "var(--color-green-primary)",
                  fontWeight: 700,
                  px: 5,
                  py: 1.5,
                  backgroundColor: "transparent",
                  "&:hover": {
                    bgcolor: "var(--color-green-primary)",
                    color: "white",
                  },
                }}
                onMouseEnter={() => setHoveredPlace(true)}
                onMouseLeave={() => setHoveredPlace(false)}
              >
                Place an Order
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Right side: Image */}
        <Box
          sx={{
            flex: "0 0 50%",
            height: "90vh",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            padding: 0,
            position: "relative",
          }}
          component={motion.div}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Box
            component="img"
            src={ImageHero}
            alt="Hero"
            sx={{
              position: "absolute",
              right: 0,
              top: 0,
              width: "100%",
              height: "auto",
              objectFit: "contain",
            }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: 1,
          left: 0,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: 300,
            fontSize: "0.9rem",
            letterSpacing: 2,
            color: "var(--color-gray2)",
          }}
        >
          Scrolldown
        </Typography>

        <Box
          sx={{
            width: "1px",
            height: "60px",
            bgcolor: "var(--color-gray3)",
            mt: 1,
          }}
        />
      </Box>
    </section>
  );
};

export default Hero;
