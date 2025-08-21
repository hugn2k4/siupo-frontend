import { Paper } from "@mui/material";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ImagePanel from "./components/ImagePanel";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ImageBackgroundAuth from "../../assets/images/image_background_auth.png";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSwitch = (newState: boolean) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsLogin(newState);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <div
      className="flex items-center justify-center h-screen"
      style={{
        backgroundImage: `url(${ImageBackgroundAuth})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "70%",
          height: "80%",
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        <div className="flex relative h-full w-full overflow-hidden">
          <ImagePanel isLogin={isLogin} />
          <div className="flex w-full relative">
            <AnimatePresence mode="wait">
              {isTransitioning ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full flex items-center justify-center"
                >
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </motion.div>
              ) : isLogin ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="w-full"
                >
                  <LoginForm
                    onSwitch={() => handleSwitch(false)}
                    isLogin={isLogin}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="register"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="w-full"
                >
                  <RegisterForm
                    onSwitch={() => handleSwitch(true)}
                    isLogin={isLogin}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Paper>
    </div>
  );
}
