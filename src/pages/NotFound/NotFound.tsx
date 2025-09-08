import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import MyButton from "../../components/common/Button";

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
      <Typography variant="h1" sx={{ color: "var(--color-primary)" }} fontWeight={700}>
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
          mb: 2,
        }}
      >
        Page Cannot be found! we’ll have it figured out in no time .{"\n"}
        Menwhile, cheek out these fresh ideas:
      </Typography>
      <MyButton colorScheme="orange" component={Link} to="/">
        Go to home
      </MyButton>
    </Box>
  );
}
