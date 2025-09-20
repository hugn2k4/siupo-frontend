import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import MyButton from "../../../components/common/Button";
import ImageAboutUs from "../../../assets/images/image_about_us_home.png";

function AboutUs() {
  return (
    <section className="w-full min-h-screen flex flex-col relative">
      {/* Flex container */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          minHeight: "100vh",
          alignItems: "center",
        }}
      >
        {/* Left side - Image */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          sx={{
            flex: { xs: "none", lg: "0 0 50%" },
            width: { xs: "100%", lg: "50%" },
            height: { xs: "50vh", lg: "100vh" },
            display: "flex",
            justifyContent: { xs: "center", lg: "flex-end" },
            alignItems: "center",
            padding: { xs: 2, md: 4, lg: 0 },
            order: { xs: 2, lg: 1 },
          }}
        >
          <Box
            component="img"
            src={ImageAboutUs}
            alt="About us food showcase"
            sx={{
              width: { xs: "100%", md: "80%", lg: "90%" },
              maxHeight: { xs: "100%", lg: "90%" },
              objectFit: "contain",
            }}
          />
        </Box>

        {/* Right side*/}
        <Box
          component={motion.div}
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
          sx={{
            flex: { xs: "none", lg: "0 0 50%" },
            width: { xs: "100%", lg: "50%" },
            minHeight: { xs: "50vh", lg: "100vh" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: { xs: 3, md: 4, lg: 8, xl: 16 },
            order: { xs: 1, lg: 2 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              maxWidth: { xs: "100%", sm: 480, md: 520 },
              textAlign: { xs: "center", lg: "left" },
            }}
          >
            <Typography
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              sx={{
                fontFamily: "Miniver",
                mb: 1,
                position: "relative",
                display: "inline-block",
                color: "var(--color-green-primary)",
                fontSize: { xs: "1rem", md: "1.125rem" },
              }}
            >
              About us
              <Box
                sx={{
                  position: "absolute",
                  bottom: "8px",
                  left: { xs: "50%", lg: "70px" },
                  transform: { xs: "translateX(-50%)", lg: "none" },
                  height: "1px",
                  width: "30px",
                  backgroundColor: "var(--color-green-primary)",
                }}
              />
            </Typography>
            <Typography
              component={motion.div}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              variant="h3"
              fontWeight="700"
              sx={{
                position: "relative",
                display: "inline-block",
                mb: 4,
                fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem", lg: "3rem" },
                lineHeight: { xs: 1.3, md: 1.2 },
              }}
            >
              Food is an important part Of a balanced Diet
            </Typography>

            <Typography
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              sx={{
                mb: 4,
                color: "var(--color-gray2)",
                fontSize: { xs: "0.875rem", md: "1rem" },
                lineHeight: { xs: 1.6, md: 1.7 },
              }}
            >
              Eating well is not just about feeling full — it’s about fueling your body with the right nutrients to stay
              strong and energized. A balanced diet of vegetables, grains, proteins, and healthy fats helps you enjoy
              both wellness and flavor while supporting long-term health.
            </Typography>
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              viewport={{ once: true }}
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 2,
                justifyContent: { xs: "center", lg: "flex-start" },
                alignItems: { xs: "center", sm: "flex-start" },
                pb: { xs: 4, lg: 20 },
              }}
            >
              <MyButton colorScheme="green">Show More</MyButton>

              <MyButton isWatch />
            </Box>
          </Box>
        </Box>
      </Box>
    </section>
  );
}

export default AboutUs;
