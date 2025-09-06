import { motion } from "framer-motion";
import ImagePanelAuth from "../../../assets/images/image_panel_auth.png";

interface ImagePanel {
  isLogin: boolean;
}

export default function ImagePanel({ isLogin }: ImagePanel) {
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: isLogin ? "100%" : 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="absolute top-0 left-0 h-full w-1/2 flex items-center justify-center bg-gray-100 shadow-lg z-20"
    >
      <img src={ImagePanelAuth} alt="Auth Illustration" className="h-full w-full object-cover" />
    </motion.div>
  );
}
