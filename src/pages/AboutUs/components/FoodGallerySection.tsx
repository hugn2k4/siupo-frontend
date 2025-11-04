import CloseIcon from "@mui/icons-material/Close";
import { Box, Dialog, IconButton, Skeleton } from "@mui/material";
import { useState } from "react";
import ImageAboutUs from "../../../assets/images/defaults/image_about_us.png";
import MyButton from "../../../components/common/Button";
import { useTranslation } from "../../../hooks/useTranslation";

// Food Gallery Section Component
const FoodGallerySection: React.FC = () => {
  const { t } = useTranslation("home");
  const aboutUsImage = ImageAboutUs;
  const loading = false;
  // State để mở/đóng modal video
  const [openVideo, setOpenVideo] = useState(false);

  const handleOpenVideo = () => setOpenVideo(true);
  const handleCloseVideo = () => setOpenVideo(false);
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="grid">
            <div className="space-y-4">
              {loading ? (
                <Skeleton variant="rectangular" width="100%" height={400} />
              ) : aboutUsImage ? (
                <img src={aboutUsImage} alt="Food 1" className="w-full object-cover rounded-lg" />
              ) : null}
            </div>
          </div>
          <div>
            <h3 className="text-primary mb-2 inline-block" style={{ fontFamily: "Miniver" }}>
              {t("aboutSection.heading")} _____
            </h3>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">{t("aboutSection.title")}</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">{t("aboutSection.description")}</p>
            <div className="flex items-center space-x-4 gap-4">
              <MyButton isWatch colorScheme="orange" onClick={handleOpenVideo}>
                {t("hero.watchVideo")}{" "}
              </MyButton>
            </div>
          </div>
        </div>
      </div>
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
};
export default FoodGallerySection;
