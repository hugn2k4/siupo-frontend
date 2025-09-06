import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { useNavigate } from "../../../hooks/useNavigate";

function Actions() {
  const navigate = useNavigate();
  return (
    <Stack direction="row">
      <IconButton
        aria-label="search"
        sx={{
          color: "white",
          mr: 0.5,
          ":hover": {
            color: "var(--color-primary)",
          },
        }}
      >
        <SearchIcon />
      </IconButton>
      <IconButton
        aria-label="user"
        sx={{
          color: "white",
          mr: 0.5,
          ":hover": {
            color: "var(--color-primary)",
          },
        }}
        onClick={() => {
          navigate("/login");
        }}
      >
        <PersonOutlineOutlinedIcon />
      </IconButton>
      <IconButton
        aria-label="cart"
        sx={{
          color: "white",
          ":hover": {
            color: "var(--color-primary)",
          },
        }}
      >
        <ShoppingBagOutlinedIcon />
      </IconButton>
    </Stack>
  );
}

export default Actions;
