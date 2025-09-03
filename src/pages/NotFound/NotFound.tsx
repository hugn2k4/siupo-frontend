import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Box
      minHeight="60vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      gap={2}
      mt={4}
    >
      <Typography
        variant="h1"
        sx={{ color: "var(--color-primary)" }}
        fontWeight={700}
      >
        404
      </Typography>
      <Typography variant="h5" fontWeight={500} mb={2}>
        Oops! Look likes something going wrong
      </Typography>
      <Typography
        variant="body1"
        sx={{
          whiteSpace: "pre-line",
          lineHeight: 1.6,
        }}
      >
        Page Cannot be found! we’ll have it figured out in no time .{"\n"}
        Menwhile, cheek out these fresh ideas:
      </Typography>
      <Button
        variant="contained"
        component={Link}
        to="/"
        sx={{ background: "var(--color-primary)", mt: 2, px: 4, py: 1.5 }}
      >
        Go to home
      </Button>
    </Box>
  );
}
