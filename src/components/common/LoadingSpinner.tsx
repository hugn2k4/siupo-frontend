import { Box, CircularProgress } from "@mui/material";

const LoadingPageSpinner = ({ minHeight = "60vh", size = 60, color = "var(--color-primary)" }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: minHeight,
      }}
    >
      <CircularProgress sx={{ color: color }} size={size} />
    </Box>
  );
};

export default LoadingPageSpinner;
