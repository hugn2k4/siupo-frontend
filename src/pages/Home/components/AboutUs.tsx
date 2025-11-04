import CloseIcon from "@mui/icons-material/Close"; // ← Thêm icon đóng
import { Box, Dialog, IconButton, Skeleton, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react"; // ← Thêm import này
import { useNavigate } from "react-router-dom";
import ImageAboutUs from "../../../assets/images/defaults/image_about_us.png";
import MyButton from "../../../components/common/Button";
import { useTranslation } from "../../../hooks/useTranslation";

function AboutUs() {
  const { t } = useTranslation("home");
  const navigate = useNavigate();
  const loading = false;

  // State để mở/đóng modal video
  const [openVideo, setOpenVideo] = useState(false);

  const handleOpenVideo = () => setOpenVideo(true);
  const handleCloseVideo = () => setOpenVideo(false);

  // Lấy banner từ API
  const aboutUsImage = ImageAboutUs;

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
          {loading ? (
            <Skeleton variant="rectangular" width="80%" height="80%" sx={{ borderRadius: 2 }} />
          ) : aboutUsImage ? (
            <Box
              component="img"
              src={aboutUsImage}
              alt="About us food showcase"
              sx={{
                width: { xs: "100%", md: "80%", lg: "90%" },
                maxHeight: { xs: "100%", lg: "90%" },
                objectFit: "contain",
              }}
            />
          ) : null}
        </Box>

        {/* Right side */}
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
              {t("aboutSection.heading")}
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
              {t("aboutSection.title")}
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
              {t("aboutSection.description")}
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
                alignItems: "center",
                pb: { xs: 4, lg: 20 },
              }}
            >
              <MyButton colorScheme="green" onClick={() => navigate("/about")}>
                {t("hero.showMore")}
              </MyButton>

              {/* Nút Watch Video - mở modal */}
              <MyButton isWatch={true} onClick={handleOpenVideo}>
                {t("aboutSection.watchVideo") as string}
              </MyButton>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Modal Video YouTube */}
      <Dialog
        open={openVideo}
        onClose={handleCloseVideo}
        maxWidth="lg"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: { xs: 2, md: 3 },
            overflow: "hidden",
            bgcolor: "black",
            boxShadow: 24,
          },
        }}
      >
        {/* Nút đóng */}
        <IconButton
          onClick={handleCloseVideo}
          sx={{
            position: "absolute",
            right: { xs: 8, sm: 16 },
            top: { xs: 8, sm: 16 },
            color: "white",
            bgcolor: "rgba(0,0,0,0.5)",
            zIndex: 10,
            "&:hover": {
              bgcolor: "rgba(0,0,0,0.7)",
            },
          }}
        >
          <CloseIcon />
        </IconButton>
        <Box sx={{ position: "relative", paddingTop: "56.25%" }}>
          <iframe
            src="https://www.youtube.com/embed/4pRcDgMhWuw?autoplay=1&rel=0&modestbranding=1"
            title="About Our Healthy Food Journey"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: 0,
            }}
          />
        </Box>
      </Dialog>
    </section>
  );
}

export default AboutUs;
