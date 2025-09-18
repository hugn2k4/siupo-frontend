import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import MyButton from "../../components/common/Button";

export default function NotFoundPage() {
  return (
    <Box
      sx={{
        minHeight: { xs: "70vh", md: "60vh" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: { xs: 3, md: 2 },
        mt: { xs: 2, md: 4 },
        px: { xs: 2, sm: 4, md: 0 },
        maxWidth: { xs: "100%", sm: 600, md: 800 },
        mx: "auto",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          color: "var(--color-primary)",
          fontSize: { xs: "4rem", sm: "6rem", md: "8rem" },
        }}
        fontWeight={700}
      >
        404
      </Typography>
      <Typography
        variant="h5"
        fontWeight={500}
        sx={{
          mb: 2,
          fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
          px: { xs: 1, sm: 0 },
        }}
      >
        Oops! Look likes something going wrong
      </Typography>
      <Typography
        variant="body1"
        sx={{
          whiteSpace: "pre-line",
          lineHeight: 1.6,
          mb: { xs: 3, md: 2 },
          fontSize: { xs: "0.875rem", sm: "1rem" },
          px: { xs: 1, sm: 2, md: 0 },
          maxWidth: { xs: "100%", sm: 500 },
        }}
      >
        Page Cannot be found! we'll have it figured out in no time .{"\n"}
        Menwhile, cheek out these fresh ideas:
      </Typography>
      <Box component={Link} to="/" sx={{ textDecoration: "none" }}>
        <MyButton
          colorScheme="orange"
          sx={{
            width: { xs: "100%", sm: "auto" },
            maxWidth: { xs: "280px", sm: "none" },
          }}
        >
          Go to home
        </MyButton>
      </Box>
    </Box>
  );
}
