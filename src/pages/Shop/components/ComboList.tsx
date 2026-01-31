import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { useState } from "react";
import imageDefault from "../../../assets/gallery/gallery_burger.png";
import LoginRequiredDialog from "../../../components/common/LoginRequiredDialog";
import { useCurrency } from "../../../hooks/useCurrency";
import { useGlobal } from "../../../hooks/useGlobal";
import { useSnackbar } from "../../../hooks/useSnackbar";
import { useTranslation } from "../../../hooks/useTranslation";
import cartService from "../../../services/cartService";
import type { ComboResponse } from "../../../types/responses/combo.response";
import ComboDetailDialog from "./ComboDetailDialog";

const fallbackImage = imageDefault;

interface ComboListProps {
  combos: ComboResponse[];
}

const ComboList = ({ combos }: ComboListProps) => {
  const [selectedCombo, setSelectedCombo] = useState<ComboResponse | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const { showSnackbar } = useSnackbar();
  const { isLogin } = useGlobal();
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const { t } = useTranslation("shop");
  const { format } = useCurrency();

  const handleAddToCart = async (combo: ComboResponse) => {
    if (!isLogin) {
      setShowLoginDialog(true);
      return;
    }
    try {
      await cartService.addToCart({ comboId: combo.id, quantity: 1 });
      showSnackbar("Combo added to cart!", "success", 3000);
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      showSnackbar("Failed to add combo to cart!", "error", 3000);
    }
  };

  const handleOpenDetail = (combo: ComboResponse) => {
    setSelectedCombo(combo);
    setOpenDialog(true);
  };

  const handleCloseDetail = () => {
    setOpenDialog(false);
    setTimeout(() => setSelectedCombo(null), 300); // Clear after animation
  };

  if (!combos || combos.length === 0) {
    return (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
          gap: 2,
          mb: 3,
          mt: 2,
        }}
      >
        {[1, 2, 3].map((i) => (
          <Box
            key={i}
            sx={{
              maxWidth: { md: 265, xs: "100%" },
              borderRadius: 0,
              overflow: "hidden",
              bgcolor: "white",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            <Box sx={{ height: 200, bgcolor: "grey.200" }} className="animate-pulse" />
            <Box sx={{ p: 2 }}>
              <Box sx={{ height: 20, bgcolor: "grey.200", mb: 1, borderRadius: 1 }} className="animate-pulse" />
              <Box sx={{ height: 16, bgcolor: "grey.200", mb: 2, borderRadius: 1 }} className="animate-pulse" />
              <Box sx={{ height: 40, bgcolor: "grey.200", borderRadius: 1 }} className="animate-pulse" />
            </Box>
          </Box>
        ))}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
        gap: 2,
        mb: 3,
        mt: 2,
      }}
    >
      {combos.map((combo) => (
        <Box
          key={combo.id}
          sx={{
            position: "relative",
            maxWidth: { md: 265, xs: "100%" },
            borderRadius: 0,
            overflow: "hidden",
            bgcolor: "white",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            display: "flex",
            flexDirection: "column",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            border: "1px solid transparent",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: "0 12px 24px rgba(0,0,0,0.1)",
              borderColor: "transparent",
              "& .combo-image": {
                transform: "scale(1.05)",
              },
            },
          }}
        >
          {/* Badge */}
          <Box
            sx={{
              position: "absolute",
              top: 12,
              left: 12,
              zIndex: 2,
              bgcolor: "#FF9F0D",
              color: "white",
              px: 1,
              py: 0.5,
              borderRadius: 0,
              fontSize: "0.7rem",
              fontWeight: 700,
              boxShadow: "0 4px 12px rgba(255, 159, 13, 0.3)",
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              letterSpacing: "0.5px",
            }}
          >
            <LocalFireDepartmentIcon sx={{ fontSize: 14 }} />
            HOT
          </Box>

          {/* Image Area */}
          <Box
            sx={{
              position: "relative",
              height: 200,
              borderRadius: 0,
              overflow: "hidden",
              bgcolor: "#f5f5f5",
            }}
          >
            <Box
              component="img"
              className="combo-image"
              src={combo.imageUrls?.[0] || fallbackImage}
              alt={combo.name}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.5s ease",
              }}
            />
            {/* Gradient Overlay */}
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "60%",
                background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)",
                display: "flex",
                alignItems: "flex-end",
                p: 3,
              }}
            >
              <Box>
                <Typography
                  variant="caption"
                  sx={{ color: "rgba(255,255,255,0.9)", fontWeight: 600, mb: 0.5, display: "block" }}
                >
                  {t("combo.promoPrice")}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <Typography
                    variant="h5"
                    fontWeight={800}
                    color="white"
                    sx={{ textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}
                  >
                    {format(combo.basePrice)}
                  </Typography>
                  {combo.originalPrice > combo.basePrice && (
                    <Typography
                      variant="body2"
                      sx={{
                        color: "rgba(255,255,255,0.7)",
                        textDecoration: "line-through",
                        fontWeight: 500,
                      }}
                    >
                      {format(combo.originalPrice)}
                    </Typography>
                  )}
                </Stack>
              </Box>
            </Box>
          </Box>

          {/* Content Area */}
          <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1.5, flex: 1 }}>
            <Box>
              <Typography
                variant="subtitle1"
                fontWeight={800}
                color="#1A1A1A"
                sx={{
                  fontSize: "1rem",
                  lineHeight: 1.3,
                  mb: 0.5,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {combo.name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontSize: "0.85rem",
                  lineHeight: 1.5,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  minHeight: "40px",
                }}
              >
                {combo.description || "Combo đầy đủ dinh dưỡng, hương vị tuyệt hảo."}
              </Typography>
            </Box>

            <Divider sx={{ borderStyle: "dashed" }} />

            <Stack spacing={0.5}>
              {combo.items.slice(0, 3).map((item) => (
                <Stack key={item.id} direction="row" alignItems="center" spacing={1}>
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      borderRadius: 0,
                      bgcolor: "rgba(255,159,13,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#FF9F0D",
                    }}
                  >
                    <RestaurantMenuIcon sx={{ fontSize: 12 }} />
                  </Box>
                  <Typography variant="caption" fontWeight={500} color="#333">
                    {item.productName} <span style={{ color: "#999", fontSize: "0.85em" }}>x{item.quantity}</span>
                  </Typography>
                </Stack>
              ))}
              {combo.items.length > 3 && (
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ pl: 3.5, fontStyle: "italic", fontSize: "0.7rem" }}
                >
                  + {combo.items.length - 3} {t("combo.others")}
                </Typography>
              )}
            </Stack>

            <Stack direction="row" spacing={1} mt="auto" pt={1}>
              <Button
                fullWidth
                variant="outlined"
                size="small"
                startIcon={<VisibilityIcon sx={{ fontSize: 16 }} />}
                onClick={() => handleOpenDetail(combo)}
                sx={{
                  textTransform: "none",
                  fontWeight: 700,
                  borderColor: "#e0e0e0",
                  color: "#666",
                  borderRadius: 0,
                  py: 0.5,
                  fontSize: "0.8rem",
                  "&:hover": {
                    borderColor: "#FF9F0D",
                    color: "#FF9F0D",
                    bgcolor: "white",
                  },
                }}
              >
                {t("combo.detail")}
              </Button>
              <Button
                fullWidth
                variant="contained"
                size="small"
                startIcon={<ShoppingBagIcon sx={{ fontSize: 16 }} />}
                onClick={() => handleAddToCart(combo)}
                sx={{
                  bgcolor: "#1A1A1A",
                  color: "white",
                  textTransform: "none",
                  fontWeight: 700,
                  borderRadius: 0,
                  py: 0.5,
                  fontSize: "0.8rem",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                  "&:hover": {
                    bgcolor: "#FF9F0D",
                    boxShadow: "0 4px 12px rgba(255,159,13,0.4)",
                  },
                }}
              >
                {t("combo.add")}
              </Button>
            </Stack>
          </Box>
        </Box>
      ))}

      <ComboDetailDialog
        open={openDialog}
        onClose={handleCloseDetail}
        combo={selectedCombo}
        onAddToCart={handleAddToCart}
      />
      <LoginRequiredDialog open={showLoginDialog} onClose={() => setShowLoginDialog(false)} />
    </Box>
  );
};

export default ComboList;
