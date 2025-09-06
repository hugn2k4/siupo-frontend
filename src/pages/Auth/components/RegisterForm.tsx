import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import { useSnackbar } from "../../../hooks/useSnackbar";

interface RegisterFormProps {
  onSwitch: () => void;
  isLogin: boolean;
}

export default function RegisterForm({ onSwitch, isLogin }: RegisterFormProps) {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const { showSnackbar } = useSnackbar();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleRegister = async () => {
    if (!fullName.trim()) {
      showSnackbar("Vui lòng nhập họ và tên!", "warning");
      return;
    }
    if (!username.trim()) {
      showSnackbar("Vui lòng nhập tên đăng nhập!", "warning");
      return;
    }
    if (!password) {
      showSnackbar("Vui lòng nhập mật khẩu!", "warning");
      return;
    }
    if (username.length < 3) {
      showSnackbar("Tên đăng nhập phải có ít nhất 3 ký tự!", "warning");
      return;
    }
    if (password.length < 6) {
      showSnackbar("Mật khẩu phải có ít nhất 6 ký tự!", "warning");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showSnackbar("Vui lòng nhập email hợp lệ!", "warning");
      return;
    }

    // Validate phone number (Vietnam: 10-11 digits, starts with 0)
    const phoneRegex = /^0\d{9,10}$/;
    if (!phoneRegex.test(phone)) {
      showSnackbar("Vui lòng nhập số điện thoại hợp lệ!", "warning");
      return;
    }

    // Call API to register the user
    // await authApi.register({ fullName, username, password, email, phone });

    showSnackbar("Đăng ký thành công!");
  };
  return (
    <motion.div
      className="flex w-1/2 h-full items-center justify-center bg-white"
      initial={{ x: "25%" }}
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
        <h1 className="text-2xl font-bold mb-6 text-center">Đăng ký</h1>
        <TextField
          id="fullName"
          label="Họ và tên"
          variant="standard"
          required
          fullWidth
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
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
                  aria-label={showPassword ? "hide the password" : "display the password"}
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

        <TextField
          id="email"
          label="Email"
          variant="standard"
          required
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          id="phone"
          label="Số điện thoại"
          variant="standard"
          required
          fullWidth
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <Button
          variant="contained"
          onClick={handleRegister}
          fullWidth
          sx={{
            backgroundColor: "#06202B",
            color: "#fff",
            "&:hover": { backgroundColor: "#000000" },
          }}
        >
          Đăng ký
        </Button>

        <Typography variant="body2" align="center" className="mt-2">
          Bạn đã có tài khoản?{" "}
          <Typography component="span" className="text-blue-600 cursor-pointer hover:underline" onClick={onSwitch}>
            Đăng nhập ngay
          </Typography>
        </Typography>
      </div>
    </motion.div>
  );
}
