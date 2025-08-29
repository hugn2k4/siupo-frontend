import { Box, Typography, TextField, Button } from "@mui/material";

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
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-around",
          alignItems: "center",
          gap: 4,
          p: 4,
        }}
      >
        {/* Text */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="h5" fontWeight="bold">
            <Box component="span" sx={{ color: "var(--color-primary)" }}>
              St
            </Box>
            ill You Need Our Support ?
          </Typography>
          <Typography>
            Don’t wait make a smart & logical quote here. It’s pretty easy.
          </Typography>
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

      {/* Section 2: Copyright + Links */}
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
        <Typography variant="body2">
          Copyright © 2025 Nhà hàng của bạn. All rights reserved.
        </Typography>

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
