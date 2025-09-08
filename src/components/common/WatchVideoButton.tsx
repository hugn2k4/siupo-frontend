import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import { Box, Typography } from "@mui/material";
import { useState } from "react";

const WatchVideoButton = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <Box
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        borderRadius: 8, // bo cong toàn bộ vùng
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: hovered ? "100%" : 0,
          height: "100%",
          bgcolor: "rgba(0,0,0,0.1)", // màu nền hover (xám nhạt)
          transition: "width 0.3s ease",
          borderRadius: 8,
          zIndex: 0,
        },
      }}
    >
      {/* Icon tròn bên ngoài */}
      <Box
        sx={{
          bgcolor: "var(--color-green-primary)",
          borderRadius: "50%",
          height: "100%",
          aspectRatio: "1 / 1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          flexShrink: 0,
        }}
      >
        <PlayArrowOutlinedIcon sx={{ color: "white" }} />
      </Box>
      <Typography sx={{ position: "relative", zIndex: 1, fontWeight: 600, pr: 2 }}>Watch video</Typography>
    </Box>
  );
};

export default WatchVideoButton;
