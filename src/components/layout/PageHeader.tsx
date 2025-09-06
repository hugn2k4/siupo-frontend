import { Box, Breadcrumbs, Link as MuiLink, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ImageBanner from "../../assets/images/image_banner.png";

interface PageHeaderProps {
  title: string;
  backgroundImage?: string;
  breadcrumb?: { label: string; path?: string }[];
}

export default function PageHeader({
  title,
  backgroundImage,
  breadcrumb = [{ label: "Home", path: "/" }],
}: PageHeaderProps) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "13rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : `url(${ImageBanner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        textAlign: "center",
        position: "relative",
      }}
    >
      {/* Overlay tối để chữ rõ hơn */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          //   bgcolor: "rgba(0,0,0,0.5)",
        }}
      />

      {/* Nội dung */}
      <Box sx={{ position: "relative", zIndex: 2 }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          {title}
        </Typography>

        <Breadcrumbs
          aria-label="breadcrumb"
          separator=">"
          sx={{ justifyContent: "center", display: "flex", color: "white" }}
        >
          {breadcrumb.map((item, index) =>
            item.path ? (
              <MuiLink key={index} component={Link} to={item.path} underline="hover" color="inherit">
                {item.label}
              </MuiLink>
            ) : (
              <Typography key={index} color="var(--color-primary)">
                {item.label}
              </Typography>
            )
          )}
        </Breadcrumbs>
      </Box>
    </Box>
  );
}
