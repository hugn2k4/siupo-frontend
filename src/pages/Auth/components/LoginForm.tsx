import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { motion } from "framer-motion";
import { useSnackbar } from "../../../hooks/useSnackbar";
import { useNavigate } from "../../../hooks/useNavigate";
import { authService } from "../../../services/authService";
interface LoginFormProps {
  onSwitch: () => void;
  isLogin: boolean;
}

export default function LoginForm({ onSwitch, isLogin }: LoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  function validateLoginInput(username: string, password: string): boolean {
    if (!username.trim()) {
      showSnackbar("Vui lòng nhập tên đăng nhập!", "warning");
      return false;
    }
    if (!password) {
      showSnackbar("Vui lòng nhập mật khẩu!", "warning");
      return false;
    }
    if (username.length < 3) {
      showSnackbar("Tên đăng nhập phải có ít nhất 3 ký tự!", "warning");
      return false;
    }
    if (password.length < 6) {
      showSnackbar("Mật khẩu phải có ít nhất 6 ký tự!", "warning");
      return false;
    }
    return true;
  }

  const handleLogin = async () => {
    if (!validateLoginInput(username, password)) return;
    try {
      await authService.login({ username, password });
      showSnackbar("Đăng nhập thành công!", "success");
      navigate("/home");
    } catch (error) {
      console.error("Login error:", error);
      const err = error as { response?: { data?: { message?: string } } };
      showSnackbar(
        err.response?.data?.message || "Đăng nhập thất bại!",
        "error"
      );
    }
  };
  return (
    <motion.div
      className="flex w-1/2 h-full items-center justify-center bg-white "
      initial={{ x: "50%" }}
      animate={{ x: isLogin ? 0 : "100%" }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <div
        className="flex flex-col w-full max-w-md p-8 m-6 bg-white "
        style={{
          paddingTop: 32,
          paddingBottom: 32,
          paddingLeft: 64,
          paddingRight: 64,
          gap: 8,
        }}
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h1>
        <TextField
          id="username"
          label="Tên đăng nhập"
          variant="standard"
          required
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <FormControl variant="standard">
          <InputLabel htmlFor="password">Mật khẩu</InputLabel>
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? "hide the password" : "display the password"
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <div className="flex items-center justify-between w-full mt-4">
          <FormControlLabel
            control={
              <Checkbox
                sx={{
                  "&.Mui-checked": {
                    color: "#06202B",
                  },
                }}
              />
            }
            label="Ghi nhớ đăng nhập"
          />

          <Typography
            variant="body2"
            className="text-blue-600 cursor-pointer hover:underline mt-2"
          >
            Quên mật khẩu?
          </Typography>
        </div>
        <Button
          variant="contained"
          onClick={handleLogin}
          fullWidth
          sx={{
            backgroundColor: "#06202B",
            color: "#fff",
            "&:hover": { backgroundColor: "#000000" },
          }}
        >
          Đăng nhập
        </Button>

        <Typography variant="body2" align="center" className="mt-2">
          Chưa có tài khoản?{" "}
          <Typography
            component="span"
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={onSwitch}
          >
            Đăng ký ngay
          </Typography>
        </Typography>
      </div>
    </motion.div>
  );
}
