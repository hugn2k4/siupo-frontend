import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import QueryBuilderOutlinedIcon from "@mui/icons-material/QueryBuilderOutlined";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Box, Button, IconButton, Link as MuiLink, Stack, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import menu from "../../config/menuConfig";

import img1 from "../../assets/gallery/image1.png";
import img2 from "../../assets/gallery/image2.png";
import img3 from "../../assets/gallery/image3.png";
import img4 from "../../assets/gallery/image4.png";
import img5 from "../../assets/gallery/image5.png";
import img6 from "../../assets/gallery/image6.png";

const images = [img1, img2, img3, img4, img5, img6];

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: "black",
        color: "white",
        width: "100%",
        mt: 4,
      }}
    >
      {/* Section 1: Support + Subscribe */}
      <Box sx={{ width: "100%", maxWidth: 1250, mx: "auto" }}>
        {/* Nội dung */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 4,
            pt: 4,
            pb: 4,
          }}
        >
          {/* Text */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="h6" fontWeight="bold">
              <Box component="span" sx={{ color: "var(--color-primary)" }}>
                St
              </Box>
              ill You Need Our Support ?
            </Typography>
            <Typography>Don’t wait make a smart & logical quote here. It’s pretty easy.</Typography>
          </Box>

          {/* Input + Button */}
          <Box sx={{ display: "flex", width: "100%", maxWidth: 500 }}>
            <TextField
              variant="outlined"
              placeholder="Enter your email"
              sx={{
                flex: 2,
                backgroundColor: "var(--color-primary)",
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                borderTopLeftRadius: 4,
                borderBottomLeftRadius: 4,
                "& fieldset": { border: "none" },
                input: { color: "white", px: 2 },
              }}
            />
            <Button
              sx={{
                flex: 1,
                backgroundColor: "var(--color-white)",
                color: "black",
                px: 3,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                "&:hover": { backgroundColor: "#f0f0f0" },
                whiteSpace: "nowrap",
              }}
            >
              Subscribe Now
            </Button>
          </Box>
        </Box>

        {/* Line cùng độ rộng */}
        <Box className="border-t border-primary " sx={{ width: "100%", maxWidth: 1250, mx: "auto", p: 4 }} />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          alignItems: "start",
          justifyContent: "space-around",
          paddingLeft: 20,
          paddingRight: 20,
          marginBottom: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "start",
            maxWidth: 300,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Siupo{" "}
          </Typography>
          <Typography variant="subtitle2">Subscribe our newsletter and get discount 25%off</Typography>
          <Stack direction="row" spacing={1}>
            <IconButton aria-label="facebook">
              <FacebookOutlinedIcon sx={{ color: "#1877F2", fontSize: 24 }} />
            </IconButton>
            <IconButton aria-label="instagram">
              <InstagramIcon sx={{ color: "#E4405F", fontSize: 24 }} />
            </IconButton>
            <IconButton aria-label="youtube">
              <YouTubeIcon sx={{ color: "#FF0000", fontSize: 24 }} />
            </IconButton>
          </Stack>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "start",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Contact us
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <PhoneOutlinedIcon />
            <Typography variant="body2">0123 456 789</Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <PlaceOutlinedIcon />
            <Typography variant="body2">1 Vo Van Ngan Street, Thu Duc City, Ho Chi Minh City</Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <MailOutlineOutlinedIcon />
            <Typography variant="body2">hcl2k4@gmail.com</Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <QueryBuilderOutlinedIcon />
            <Typography variant="body2">Sun - Sat / 10:00 AM - 8:00 PM</Typography>
          </Stack>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "start",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Links
          </Typography>
          <Stack spacing={1}>
            {menu.map((item) => (
              <MuiLink
                key={item.path}
                component={Link}
                to={item.path}
                underline="hover"
                color="inherit"
                variant="subtitle2"
                sx={{ "&:hover": { color: "var(--color-primary)" } }}
              >
                {item.label}
              </MuiLink>
            ))}
          </Stack>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "start",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Instagram Gallery
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, maxWidth: 320 }}>
            {images.map((src, index) => (
              <Box
                key={index}
                component="img"
                src={src}
                alt={`Ảnh ${index + 1}`}
                sx={{
                  width: 100,
                  height: 100,
                  objectFit: "cover",
                  borderRadius: 1,
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          bgcolor: "var(--color-gray2)",
          color: "white",
          py: 2,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-around",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography variant="body2">Copyright © 2025 Nhà hàng của bạn. All rights reserved.</Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          {["Privacy Policy", "Term of Use", "Partner"].map((text) => (
            <Typography
              key={text}
              component="p"
              onClick={() => console.log(`${text} clicked`)}
              sx={{
                cursor: "pointer",
                "&:hover": { color: "var(--color-primary)" },
              }}
            >
              {text}
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
