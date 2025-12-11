import { Box, CircularProgress, Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import { format } from "date-fns";
import { Copy, Gift, Percent, Tag, Truck, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import voucherApi from "../../../api/voucherApi";
import MyButton from "../../../components/common/Button";
import { useSnackbar } from "../../../hooks/useSnackbar";
import type { VoucherResponse } from "../../../types/responses/voucher.response";

interface CouponSectionProps {
  orderAmount: number;
}

const CouponSection: React.FC<CouponSectionProps> = ({ orderAmount }) => {
  const [showVouchers, setShowVouchers] = useState(false);
  const [vouchers, setVouchers] = useState<VoucherResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const { showSnackbar } = useSnackbar();

  const fetchVouchers = async () => {
    setLoading(true);
    try {
      const response = await voucherApi.getAvailableVouchers();
      setVouchers(response.data || []);
    } catch (err) {
      console.error("Failed to fetch vouchers:", err);
      showSnackbar("Failed to load vouchers", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showVouchers && vouchers.length === 0) {
      fetchVouchers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showVouchers]);

  const copyVoucherCode = (code: string) => {
    navigator.clipboard.writeText(code);
    showSnackbar(`Copied: ${code}. Apply at checkout!`, "success");
  };

  const getVoucherIcon = (type: string) => {
    switch (type) {
      case "FREE_SHIPPING":
        return <Truck size={20} className="text-blue-500" />;
      case "PERCENTAGE":
        return <Percent size={20} className="text-green-500" />;
      case "FIXED_AMOUNT":
        return <Tag size={20} className="text-orange-500" />;
      default:
        return <Gift size={20} className="text-purple-500" />;
    }
  };

  const getVoucherValue = (voucher: VoucherResponse) => {
    if (voucher.type === "FREE_SHIPPING") return "Free Shipping";
    if (voucher.type === "PERCENTAGE") return `${voucher.discountValue}%`;
    return `${new Intl.NumberFormat("vi-VN").format(voucher.discountValue)}₫`;
  };

  const canUseVoucher = (voucher: VoucherResponse) => {
    return !voucher.minOrderValue || orderAmount >= voucher.minOrderValue;
  };

  return (
    <>
      <Box sx={{ bgcolor: "white", p: 3, borderRadius: 0, border: "1px solid var(--color-gray5)" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <Gift size={20} className="text-orange-500" />
          <Typography variant="h6" fontWeight={600} color="var(--color-gray1)">
            Discount Vouchers
          </Typography>
        </Box>
        <Box sx={{ border: "1px solid var(--color-gray5)", borderRadius: 0, p: 2 }}>
          <Typography variant="body2" color="var(--color-gray2)" sx={{ mb: 2, fontSize: "0.875rem" }}>
            View available vouchers and apply them at checkout for discounts.
          </Typography>
          <MyButton
            onClick={() => setShowVouchers(true)}
            colorScheme="orange"
            fullWidth
            sx={{
              borderRadius: 0,
              textTransform: "none",
              fontWeight: 600,
              fontSize: "0.875rem",
            }}
          >
            View Available Vouchers
          </MyButton>
        </Box>
      </Box>

      {/* Vouchers Modal */}
      <Dialog open={showVouchers} onClose={() => setShowVouchers(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: "orange.50", borderBottom: 1, borderColor: "divider", mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Gift size={24} className="text-orange-500" />
              <Typography variant="h6" fontWeight={600}>
                Available Vouchers
              </Typography>
            </Box>
            <IconButton onClick={() => setShowVouchers(false)} size="small">
              <X size={20} />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
              <CircularProgress />
            </Box>
          ) : vouchers.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 4 }}>
              <Gift size={48} className="text-gray-300 mx-auto mb-2" />
              <Typography variant="body1" color="text.secondary">
                No vouchers available at the moment
              </Typography>
            </Box>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5, mt: 1 }}>
              {vouchers.map((voucher) => {
                const usable = canUseVoucher(voucher);
                return (
                  <Box
                    key={voucher.id}
                    sx={{
                      position: "relative",
                      display: "flex",
                      alignItems: "stretch",
                      border: "2px dashed",
                      borderColor: usable ? "#FFB366" : "var(--color-gray5)",
                      borderRadius: 2,
                      bgcolor: usable ? "#FFFBF5" : "#FAFAFA",
                      overflow: "hidden",
                      opacity: usable ? 1 : 0.65,
                      transition: "all 0.2s",
                      "&:hover": usable
                        ? {
                            borderColor: "var(--color-primary)",
                            transform: "translateY(-2px)",
                            boxShadow: "0 4px 12px rgba(255, 179, 102, 0.2)",
                          }
                        : {},
                      // Notches effect (răng cưa)
                      "&::before, &::after": {
                        content: '""',
                        position: "absolute",
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: 16,
                        height: 16,
                        borderRadius: "50%",
                        bgcolor: "white",
                        border: "2px dashed",
                        borderColor: usable ? "#FFB366" : "var(--color-gray5)",
                      },
                      "&::before": {
                        left: -9,
                      },
                      "&::after": {
                        right: -9,
                      },
                    }}
                  >
                    {/* Left Section */}
                    <Box
                      sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        p: 2,
                        borderRight: "2px dashed",
                        borderColor: usable ? "#FFB366" : "var(--color-gray5)",
                        gap: 1,
                      }}
                    >
                      <Box sx={{ mb: 0.5 }}>{getVoucherIcon(voucher.type)}</Box>
                      <Typography
                        variant="h5"
                        fontWeight={700}
                        color={usable ? "var(--color-primary)" : "var(--color-gray3)"}
                        textAlign="center"
                        sx={{ lineHeight: 1 }}
                      >
                        {getVoucherValue(voucher)}
                      </Typography>
                      <Typography
                        variant="caption"
                        color={usable ? "var(--color-primary)" : "var(--color-gray3)"}
                        fontWeight={600}
                        fontSize="0.7rem"
                      >
                        OFF
                      </Typography>
                    </Box>

                    {/* Middle Content */}
                    <Box
                      sx={{
                        flex: 3,
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        borderRight: "2px solid",
                        borderColor: usable ? "var(--color-gray5)" : "var(--color-gray5)",
                      }}
                    >
                      <Typography variant="body1" fontWeight={600} color="var(--color-gray1)" sx={{ mb: 1 }}>
                        {voucher.name}
                      </Typography>
                      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                        {voucher.minOrderValue && (
                          <Typography variant="caption" color="var(--color-gray3)" fontSize="0.75rem">
                            • Min order:{" "}
                            <strong>{new Intl.NumberFormat("vi-VN").format(voucher.minOrderValue)}₫</strong>
                          </Typography>
                        )}
                        <Typography variant="caption" color="var(--color-gray3)" fontSize="0.75rem">
                          • Valid until: <strong>{format(new Date(voucher.endDate), "dd MMM yyyy")}</strong>
                        </Typography>
                        {!usable && voucher.minOrderValue && (
                          <Typography variant="caption" color="error.main" fontSize="0.7rem" sx={{ mt: 0.5 }}>
                            ⚠️ Add {new Intl.NumberFormat("vi-VN").format(voucher.minOrderValue - orderAmount)}₫ more to
                            use
                          </Typography>
                        )}
                      </Box>
                    </Box>

                    {/* Right Copy Section */}
                    <Box
                      onClick={() => usable && copyVoucherCode(voucher.code)}
                      sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        p: 2,
                        gap: 1,
                        cursor: usable ? "pointer" : "not-allowed",
                        transition: "all 0.2s",
                        "&:hover": usable
                          ? {
                              bgcolor: "rgba(255, 107, 0, 0.05)",
                            }
                          : {},
                      }}
                    >
                      <Copy size={20} color={usable ? "var(--color-primary)" : "var(--color-gray4)"} />
                      <Typography
                        variant="caption"
                        fontWeight={700}
                        fontFamily="monospace"
                        color={usable ? "var(--color-gray1)" : "var(--color-gray4)"}
                        fontSize="0.75rem"
                        sx={{ textAlign: "center", letterSpacing: "0.5px" }}
                      >
                        {voucher.code}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          )}

          {/* Info */}
          <Box
            sx={{
              mt: 3,
              p: 2.5,
              bgcolor: "white",
              borderRadius: 1.5,
              border: "1px solid var(--color-gray5)",
            }}
          >
            <Typography variant="body2" fontWeight={600} color="var(--color-gray1)" sx={{ mb: 2 }}>
              How to use vouchers:
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {[
                { text: "Click on voucher code to copy", icon: <Copy size={16} /> },
                { text: "Go to checkout page", icon: "➜" },
                { text: "Paste code in Discount field", icon: "📋" },
                { text: "Click Apply button", icon: "✓" },
              ].map((step, idx) => (
                <Box key={idx} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box
                    sx={{
                      minWidth: 28,
                      height: 28,
                      borderRadius: "50%",
                      bgcolor: idx === 0 ? "#FFF7ED" : "#F5F5F5",
                      border: "2px solid",
                      borderColor: idx === 0 ? "#FFB366" : "var(--color-gray5)",
                      color: idx === 0 ? "var(--color-primary)" : "var(--color-gray2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "0.75rem",
                    }}
                  >
                    {idx + 1}
                  </Box>
                  <Typography variant="body2" color="var(--color-gray2)" fontSize="0.875rem">
                    {step.text}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CouponSection;
