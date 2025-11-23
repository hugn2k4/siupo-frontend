import { Box, Container } from "@mui/material";
import { motion } from "framer-motion";
import { type ReactNode, useEffect, useRef } from "react";

interface AuthFormWrapperProps {
  children: ReactNode;
}

const AuthFormWrapper: React.FC<AuthFormWrapperProps> = ({ children }) => {
  const formRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (formRef.current) {
      const element = formRef.current;
      const headerHeight = window.innerWidth >= 900 ? 80 : 64; // Header height
      const elementRect = element.getBoundingClientRect();
      const absoluteElementTop = elementRect.top + window.pageYOffset;

      // Calculate scroll position: center of viewport minus half of header
      const scrollPosition = absoluteElementTop - window.innerHeight / 2 + elementRect.height / 2 - headerHeight / 2;

      window.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    }
  }, []);

  return (
    <motion.div
      ref={formRef}
      initial={{ opacity: 0, boxShadow: "0 0 0 rgba(255,159,13,0)" }}
      animate={{ opacity: 1, boxShadow: "0 0 60px 2px rgba(255,159,13,0.2)" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            py: 4,
          }}
        >
          <Box
            ref={formRef}
            sx={{
              width: "100%",
              maxWidth: 400,
              p: { xs: 3, sm: 4 },
              borderRadius: 0,
              boxShadow: "0 0 60px 2px rgba(255,159,13,0.2)",
              bgcolor: "background.paper",
            }}
          >
            {children}
          </Box>
        </Box>
      </Container>
    </motion.div>
  );
};

export default AuthFormWrapper;
