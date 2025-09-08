import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import ImageAboutUs from "../../assets/images/image_about_us_home.png";
import MyButton from "../../components/common/Button";
import WatchVideoButton from "../../components/common/WatchVideoButton";

function AboutUs() {
  return (
    <section className="w-full h-screen flex flex-col relative">
      {/* Flex container */}
      <Box className="flex h-full">
        {/* Left side*/}
        <Box
          component={motion.div}
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          sx={{
            flex: "0 0 50%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            padding: 0,
            position: "relative",
          }}
        >
          <Box
            component="img"
            src={ImageAboutUs}
            alt="Hero"
            sx={{
              maxWidth: "90%",
              maxHeight: "90%",
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
            flex: "0 0 50%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            paddingRight: { xs: 2, md: 8, lg: 16 },
          }}
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
              }}
            >
              About us
              <Box
                sx={{
                  position: "absolute",
                  bottom: "8px",
                  left: "70px",
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
              sx={{ mb: 4, color: "var(--color-gray2)" }}
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
              className="flex space-x-4 gap-4 pb-20 "
            >
              <MyButton colorScheme="green">Show More</MyButton>

              <WatchVideoButton />
            </Box>
          </Box>
        </Box>
      </Box>
      {/* <Box
        component="img"
        src={ImageDecor}
        alt="Hero"
        sx={{
          position: "absolute",
          left: 0,
          top: "80%",

          objectFit: "contain",
        }}
      /> */}
    </section>
  );
}

export default AboutUs;
