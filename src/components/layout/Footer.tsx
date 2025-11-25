import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import QueryBuilderOutlinedIcon from "@mui/icons-material/QueryBuilderOutlined";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Box, Button, IconButton, Link as MuiLink, Stack, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import menu from "../../config/menuConfig";

import img1 from "../../assets/gallery/gallery_image_1.png";
import img2 from "../../assets/gallery/gallery_image_2.png";
import img3 from "../../assets/gallery/gallery_image_3.png";
import img4 from "../../assets/gallery/gallery_image_4.png";
import img5 from "../../assets/gallery/gallery_image_5.png";
import img6 from "../../assets/gallery/gallery_image_6.png";

const images = [img1, img2, img3, img4, img5, img6];

const Footer = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        bgcolor: "black",
        color: "white",
        width: "100%",
        // mt: 4,
      }}
    >
      {/* Section 1: Support + Subscribe */}
      <Box sx={{ width: "100%", maxWidth: 1250, mx: "auto", px: { xs: 2, sm: 3, md: 4 } }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "stretch", md: "center" },
            gap: { xs: 3, md: 4 },
            pt: { xs: 3, md: 4 },
            pb: { xs: 3, md: 4 },
          }}
        >
          {/* Text */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              textAlign: { xs: "center", md: "left" },
            }}
          >
            <Typography variant="h6" fontWeight="bold" sx={{ fontSize: { xs: "1.1rem", md: "1.25rem" } }}>
              {t("footer.support.title")}
            </Typography>
            <Typography sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}>{t("footer.support.subtitle")}</Typography>
          </Box>

          {/* Input + Button */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              width: "100%",
              maxWidth: { xs: "100%", md: 500 },
              gap: { xs: 1, sm: 0 },
            }}
          >
            <TextField
              variant="outlined"
              placeholder={t("footer.support.placeholder")}
              size="small"
              sx={{
                flex: { xs: 1, sm: 2 },
                backgroundColor: "var(--color-primary)",
                borderRadius: { xs: 1, sm: 0 },
                borderTopRightRadius: { sm: 0 },
                borderBottomRightRadius: { sm: 0 },
                borderTopLeftRadius: { xs: 1, sm: 1 },
                borderBottomLeftRadius: { xs: 1, sm: 1 },
                "& fieldset": { border: "none" },
                "& input": {
                  color: "white",
                  px: 2,
                  fontSize: { xs: "0.875rem", md: "1rem" },
                },
                py: { xs: 0.5, md: 1 },
              }}
            />
            <Button
              size="small"
              sx={{
                flex: { xs: 1, sm: 1 },
                backgroundColor: "var(--color-white)",
                color: "var(--color-primary)",
                px: { xs: 0.5, md: 1 },
                borderRadius: { xs: 1, sm: 0 },
                borderTopLeftRadius: { sm: 0 },
                borderBottomLeftRadius: { sm: 0 },
                borderTopRightRadius: { xs: 1, sm: 1 },
                borderBottomRightRadius: { xs: 1, sm: 1 },
                "&:hover": { backgroundColor: "#f0f0f0" },
                whiteSpace: "nowrap",
                fontSize: { xs: "0.875rem", md: "1rem" },
                minHeight: { xs: 40, md: 40 },
                textTransform: "none",
                fontWeight: 400,
              }}
            >
              {t("footer.support.button")}
            </Button>
          </Box>
        </Box>

        {/* Divider */}
        <Box sx={{ borderTop: "1px solid var(--color-primary)", width: "100%" }} />
      </Box>

      {/* Section 2: Main Footer Content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: 4, sm: 2, md: 4 },
          alignItems: { xs: "center", sm: "start" },
          justifyContent: { xs: "center", sm: "space-around" },
          px: { xs: 2, sm: 4, md: 20 },
          py: { xs: 3, md: 4 },
          mb: 4,
        }}
      >
        {/* Company Info */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: { xs: "center", sm: "start" },
            maxWidth: { xs: "100%", sm: 300 },
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {t("footer.company.title")}
          </Typography>
          <Typography variant="subtitle2" sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}>
            {t("footer.company.description")}
          </Typography>
          <Stack direction="row" spacing={1} sx={{ justifyContent: { xs: "center", sm: "flex-start" } }}>
            <IconButton aria-label="facebook">
              <FacebookOutlinedIcon sx={{ color: "#1877F2", fontSize: { xs: 20, md: 24 } }} />
            </IconButton>
            <IconButton aria-label="instagram">
              <InstagramIcon sx={{ color: "#E4405F", fontSize: { xs: 20, md: 24 } }} />
            </IconButton>
            <IconButton aria-label="youtube">
              <YouTubeIcon sx={{ color: "#FF0000", fontSize: { xs: 20, md: 24 } }} />
            </IconButton>
          </Stack>
        </Box>

        {/* Contact Info */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: { xs: "center", sm: "start" },
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {t("footer.contact.title")}
          </Typography>
          <Stack spacing={1.5} sx={{ alignItems: { xs: "center", sm: "flex-start" } }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <PhoneOutlinedIcon sx={{ fontSize: { xs: 18, md: 20 } }} />
              <Typography variant="body2" sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}>
                {t("footer.contact.phone")}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="flex-start">
              <PlaceOutlinedIcon sx={{ fontSize: { xs: 18, md: 20 }, mt: 0.2 }} />
              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: "0.875rem", md: "1rem" },
                  maxWidth: { xs: 280, sm: "none" },
                }}
              >
                {t("footer.contact.address")}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <MailOutlineOutlinedIcon sx={{ fontSize: { xs: 18, md: 20 } }} />
              <Typography variant="body2" sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}>
                {t("footer.contact.email")}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <QueryBuilderOutlinedIcon sx={{ fontSize: { xs: 18, md: 20 } }} />
              <Typography variant="body2" sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}>
                {t("footer.contact.hours")}
              </Typography>
            </Stack>
          </Stack>
        </Box>

        {/* Navigation Links */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: { xs: "center", sm: "start" },
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {t("footer.links.title")}
          </Typography>
          <Stack spacing={1} sx={{ alignItems: { xs: "center", sm: "flex-start" } }}>
            {menu.map((item) => (
              <MuiLink
                key={item.path}
                component={Link}
                to={item.path}
                underline="hover"
                color="inherit"
                variant="subtitle2"
                sx={{
                  "&:hover": { color: "var(--color-primary)" },
                  fontSize: { xs: "0.875rem", md: "1rem" },
                  transition: "color 0.3s ease",
                }}
              >
                {item.label}
              </MuiLink>
            ))}
          </Stack>
        </Box>

        {/* Instagram Gallery */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: { xs: "center", sm: "start" },
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: { xs: "center", sm: "left" } }}>
            {t("footer.gallery.title")}
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "repeat(3, 1fr)", sm: "repeat(3, 1fr)" },
              gap: 1,
              maxWidth: { xs: 240, sm: 200, md: 320 },
              justifyContent: "center",
            }}
          >
            {images.map((src, index) => (
              <Box
                key={index}
                component="img"
                src={src}
                alt={t("footer.gallery.imageAlt", { number: index + 1 })}
                sx={{
                  width: { xs: 75, sm: 65, md: 100 },
                  height: { xs: 75, sm: 65, md: 100 },
                  objectFit: "cover",
                  borderRadius: 1,
                  cursor: "pointer",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>

      {/* Section 3: Footer Bottom */}
      <Box
        sx={{
          bgcolor: "var(--color-gray2)",
          color: "white",
          py: { xs: 2, md: 3 },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-around",
          alignItems: "center",
          gap: { xs: 2, md: 0 },
          px: { xs: 2, md: 0 },
        }}
      >
        <Typography
          variant="body2"
          sx={{
            textAlign: { xs: "center", md: "left" },
            fontSize: { xs: "0.875rem", md: "1rem" },
          }}
        >
          {t("footer.bottom.copyright")}
        </Typography>

        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: { xs: 1, sm: 2 } }}>
          {["privacyPolicy", "termOfUse", "partner"].map((key) => (
            <Typography
              key={key}
              component="p"
              onClick={() => console.log(`${key} clicked`)}
              sx={{
                cursor: "pointer",
                "&:hover": { color: "var(--color-primary)" },
                fontSize: { xs: "0.875rem", md: "1rem" },
                textAlign: { xs: "center", md: "left" },
                transition: "color 0.3s ease",
                m: 0,
              }}
            >
              {t(`footer.bottom.${key}`)}
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
