import CloseIcon from "@mui/icons-material/Close";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { useCurrency } from "../../../hooks/useCurrency";
import useTranslation from "../../../hooks/useTranslation";
import type { ComboResponse } from "../../../types/responses/combo.response";

interface ComboDetailDialogProps {
  open: boolean;
  onClose: () => void;
  combo: ComboResponse | null;
  onAddToCart: (combo: ComboResponse) => void;
}

const ComboDetailDialog = ({ open, onClose, combo, onAddToCart }: ComboDetailDialogProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { t } = useTranslation("shop");
  const { format } = useCurrency();

  if (!combo) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          borderRadius: 0,
          overflow: "hidden",
          maxWidth: { xs: "100%", md: "1200px" },
          m: { xs: 0, md: 2 },
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          minHeight: { md: "600px" },
          height: { xs: "100%", md: "auto" },
          overflow: { xs: "auto", md: "hidden" },
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            zIndex: 10,
            color: { xs: "white", md: "#333" },
            bgcolor: { xs: "rgba(0,0,0,0.3)", md: "transparent" },
            "&:hover": {
              bgcolor: { xs: "rgba(0,0,0,0.5)", md: "rgba(0,0,0,0.05)" },
            },
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Left Side: Image */}
        <Box
          sx={{
            width: { xs: "100%", md: "55%" },
            height: { xs: "300px", md: "auto" },
            minHeight: { md: "600px" },
            flexShrink: 0,
            position: "relative",
            bgcolor: "#f5f5f5",
          }}
        >
          <Box
            component="img"
            src={combo.imageUrls?.[0] || "/assets/images/placeholder.png"}
            alt={combo.name}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
          {/* Overlay Gradient for mobile text readability if needed */}
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "30%",
              background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent)",
              display: { xs: "block", md: "none" },
            }}
          />
        </Box>

        {/* Right Side: Content */}
        <DialogContent
          sx={{
            width: { xs: "100%", md: "45%" },
            p: { xs: 3, md: 4 },
            display: "flex",
            flexDirection: "column",
            flex: { xs: 1, md: "initial" },
            overflow: { xs: "visible", md: "auto" },
          }}
        >
          <Typography variant="overline" sx={{ color: "#FF9F0D", fontWeight: 700, letterSpacing: 1.5, mb: 1 }}>
            {t("combo.special")}
          </Typography>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              color: "#1A1A1A",
              mb: 2,
              fontSize: { xs: "1.5rem", md: "2rem" },
              lineHeight: 1.2,
            }}
          >
            {combo.name}
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Stack direction="row" alignItems="center" spacing={2} mb={1}>
              <Typography
                variant="h4"
                sx={{
                  color: "#FF9F0D",
                  fontWeight: 800,
                }}
              >
                {format(combo.basePrice)}
              </Typography>
              {combo.originalPrice > combo.basePrice && (
                <Typography
                  variant="h6"
                  sx={{
                    color: "text.secondary",
                    textDecoration: "line-through",
                    fontWeight: 500,
                  }}
                >
                  {format(combo.originalPrice)}
                </Typography>
              )}
            </Stack>
            {combo.originalPrice > combo.basePrice && (
              <Box
                sx={{
                  display: "inline-block",
                  bgcolor: "#FF9F0D",
                  color: "white",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 0,
                  fontSize: "0.875rem",
                  fontWeight: 700,
                }}
              >
                {t("combo.save")} {format(combo.originalPrice - combo.basePrice)}
              </Box>
            )}
          </Box>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.6 }}>
            {combo.description || t("combo.noDescription")}
          </Typography>

          <Divider sx={{ mb: 3, borderStyle: "dashed" }} />

          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, fontSize: "1.1rem" }}>
            {t("combo.includes", { count: combo.items.length })}
          </Typography>

          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              maxHeight: "200px",
              pr: 1,
              mb: 3,
              "&::-webkit-scrollbar": { width: "4px" },
              "&::-webkit-scrollbar-thumb": { bgcolor: "#e0e0e0", borderRadius: "4px" },
            }}
          >
            <Stack spacing={2}>
              {combo.items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      p: 1.5,
                      borderRadius: 0,
                      border: "1px solid #f0f0f0",
                      bgcolor: "#fafafa",
                      transition: "all 0.2s",
                      "&:hover": {
                        borderColor: "#FF9F0D",
                        bgcolor: "white",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: 0,
                        overflow: "hidden",
                        bgcolor: "#fff",
                        border: "1px solid #eee",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {item.productImageUrl ? (
                        <img
                          src={item.productImageUrl}
                          alt={item.productName}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      ) : (
                        <RestaurantMenuIcon sx={{ color: "#ccc" }} />
                      )}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" fontWeight={700} color="#333">
                        {item.productName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {t("combo.quantity")}{" "}
                        <span style={{ color: "#FF9F0D", fontWeight: 700 }}>x{item.quantity}</span>
                      </Typography>
                    </Box>
                  </Box>
                </motion.div>
              ))}
            </Stack>
          </Box>

          <Button
            fullWidth
            variant="contained"
            size="large"
            startIcon={<ShoppingBagIcon />}
            onClick={() => onAddToCart(combo)}
            sx={{
              bgcolor: "#FF9F0D",
              color: "white",
              borderRadius: 0,
              py: 1.5,
              fontSize: "1rem",
              fontWeight: 700,
              textTransform: "none",
              boxShadow: "0 8px 20px rgba(255, 159, 13, 0.3)",
              "&:hover": {
                bgcolor: "#e68900",
                boxShadow: "0 10px 25px rgba(255, 159, 13, 0.4)",
              },
            }}
          >
            {t("combo.addToCartWithPrice", { price: format(combo.basePrice) })}
          </Button>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

export default ComboDetailDialog;
