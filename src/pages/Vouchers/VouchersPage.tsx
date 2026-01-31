import { Box, Container, Grid, Paper, Skeleton, Typography } from "@mui/material";
import { format } from "date-fns";
import { Copy, Gift, Percent, Tag, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import voucherApi from "../../api/voucherApi";
import { useSnackbar } from "../../hooks/useSnackbar";
import { useTranslation } from "../../hooks/useTranslation";
import type { VoucherResponse } from "../../types/responses/voucher.response";

const VouchersPage: React.FC = () => {
  const { t } = useTranslation("vouchers");
  const [vouchers, setVouchers] = useState<VoucherResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const { showSnackbar } = useSnackbar();

  const fetchVouchers = async () => {
    setLoading(true);
    try {
      const response = await voucherApi.getAvailableVouchers();
      setVouchers(response.data || []);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch vouchers:", err);
      // Keep loading = true to show skeleton
    }
  };

  useEffect(() => {
    fetchVouchers();
  }, []);

  const copyVoucherCode = (code: string) => {
    navigator.clipboard.writeText(code);
    showSnackbar(t("messages.copiedCode", { code }), "success");
  };

  const getVoucherIcon = (type: string) => {
    switch (type) {
      case "FREE_SHIPPING":
        return <Truck size={24} className="text-blue-500" />;
      case "PERCENTAGE":
        return <Percent size={24} className="text-green-500" />;
      case "FIXED_AMOUNT":
        return <Tag size={24} className="text-orange-500" />;
      default:
        return <Gift size={24} className="text-purple-500" />;
    }
  };

  const getVoucherValue = (voucher: VoucherResponse) => {
    if (voucher.type === "FREE_SHIPPING") return t("types.freeShippingValue");
    if (voucher.type === "PERCENTAGE") return `${voucher.discountValue}%`;
    return `${new Intl.NumberFormat("vi-VN").format(voucher.discountValue)}₫`;
  };

  const getVoucherTypeLabel = (type: string) => {
    switch (type) {
      case "PERCENTAGE":
        return t("types.percentage");
      case "FIXED_AMOUNT":
        return t("types.fixedAmount");
      case "FREE_SHIPPING":
        return t("types.freeShipping");
      default:
        return type;
    }
  };

  return (
    <Box sx={{ bgcolor: "#F9F9F9", minHeight: "100vh", py: 6 }}>
      <Container maxWidth="lg">
        {loading ? (
          <Grid container spacing={3}>
            {[...Array(3)].map((_, index) => (
              <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    height: "100%",
                    border: "1px solid var(--color-gray5)",
                    borderRadius: 2,
                    p: 3,
                  }}
                >
                  {/* Header skeleton */}
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                    <Skeleton variant="rectangular" width={56} height={56} sx={{ borderRadius: 2 }} />
                    <Skeleton variant="rectangular" width={80} height={24} sx={{ borderRadius: 1 }} />
                  </Box>

                  {/* Value skeleton */}
                  <Skeleton variant="text" width="60%" height={48} sx={{ mb: 2 }} />

                  {/* Name skeleton */}
                  <Skeleton variant="text" width="80%" height={32} sx={{ mb: 1 }} />

                  {/* Description skeleton */}
                  <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1 }} />
                  <Skeleton variant="text" width="90%" height={20} sx={{ mb: 3 }} />

                  {/* Divider */}
                  <Box sx={{ borderTop: "1px solid var(--color-gray5)", my: 2 }} />

                  {/* Details skeleton */}
                  <Skeleton variant="text" width="100%" height={20} sx={{ mb: 0.75 }} />
                  <Skeleton variant="text" width="90%" height={20} sx={{ mb: 0.75 }} />
                  <Skeleton variant="text" width="85%" height={20} sx={{ mb: 3 }} />

                  {/* Code box skeleton */}
                  <Skeleton variant="rectangular" height={48} sx={{ borderRadius: 1, mb: 1.5 }} />

                  {/* Usage info skeleton */}
                  <Skeleton variant="text" width="50%" height={16} />
                </Paper>
              </Grid>
            ))}
          </Grid>
        ) : vouchers.length === 0 ? (
          <Paper
            elevation={0}
            sx={{
              p: 6,
              textAlign: "center",
              border: "1px solid var(--color-gray5)",
              borderRadius: 2,
              bgcolor: "white",
            }}
          >
            <Gift
              size={64}
              style={{
                color: "var(--color-gray4)",
                marginBottom: "16px",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
            <Typography variant="h6" fontWeight={600} color="var(--color-gray2)" sx={{ mb: 1 }}>
              {t("empty.title")}
            </Typography>
            <Typography variant="body2" color="var(--color-gray3)">
              {t("empty.description")}
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {vouchers.map((voucher) => (
              <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={voucher.id}>
                <Paper
                  elevation={0}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    border: "1px solid var(--color-gray5)",
                    borderRadius: 2,
                    transition: "all 0.3s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
                      borderColor: "var(--color-primary)",
                    },
                  }}
                >
                  {/* Main Content */}
                  <Box sx={{ p: 3 }}>
                    {/* Header with Icon and Badge */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 3 }}>
                      <Box
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          bgcolor: "rgba(255, 107, 0, 0.08)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {getVoucherIcon(voucher.type)}
                      </Box>
                      <Box
                        sx={{
                          bgcolor: "var(--color-primary)",
                          color: "white",
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 1,
                          fontSize: "0.7rem",
                          fontWeight: 600,
                          textTransform: "uppercase",
                        }}
                      >
                        {getVoucherTypeLabel(voucher.type)}
                      </Box>
                    </Box>

                    <Typography
                      variant="h4"
                      fontWeight={700}
                      sx={{
                        color: "var(--color-primary)",
                        mb: 2,
                      }}
                    >
                      {getVoucherValue(voucher)}
                    </Typography>

                    {/* Name */}
                    <Typography variant="h6" fontWeight={600} color="var(--color-gray1)" sx={{ mb: 1 }}>
                      {voucher.name}
                    </Typography>

                    {/* Description */}
                    {voucher.description && (
                      <Typography variant="body2" color="var(--color-gray3)" sx={{ mb: 3 }}>
                        {voucher.description}
                      </Typography>
                    )}

                    {/* Divider */}
                    <Box sx={{ borderTop: "1px solid var(--color-gray5)", my: 2 }} />

                    {/* Details */}
                    <Box sx={{ mb: 3 }}>
                      {voucher.minOrderValue && (
                        <Typography variant="body2" color="var(--color-gray3)" sx={{ mb: 0.75 }}>
                          • {t("details.minOrder")}:{" "}
                          <strong>{new Intl.NumberFormat("vi-VN").format(voucher.minOrderValue)}₫</strong>
                        </Typography>
                      )}
                      {voucher.maxDiscountAmount && (
                        <Typography variant="body2" color="var(--color-gray3)" sx={{ mb: 0.75 }}>
                          • {t("details.maxDiscount")}:{" "}
                          <strong>{new Intl.NumberFormat("vi-VN").format(voucher.maxDiscountAmount)}₫</strong>
                        </Typography>
                      )}
                      <Typography variant="body2" color="var(--color-gray3)">
                        • {t("details.validUntil")}: <strong>{format(new Date(voucher.endDate), "dd MMM yyyy")}</strong>
                      </Typography>
                    </Box>

                    {/* Code Box */}
                    <Box
                      onClick={() => copyVoucherCode(voucher.code)}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        p: 1.5,
                        bgcolor: "#FFF7ED",
                        border: "1px dashed var(--color-primary)",
                        borderRadius: 1,
                        cursor: "pointer",
                        transition: "all 0.2s",
                        "&:hover": {
                          bgcolor: "#FFEDD5",
                          borderStyle: "solid",
                        },
                      }}
                    >
                      <Typography
                        variant="body1"
                        fontWeight={700}
                        fontFamily="monospace"
                        sx={{ color: "var(--color-primary)" }}
                      >
                        {voucher.code}
                      </Typography>
                      <Copy size={16} style={{ color: "var(--color-primary)" }} />
                    </Box>

                    {/* Usage Info */}
                    {voucher.usageLimit && (
                      <Typography variant="caption" color="var(--color-gray3)" sx={{ mt: 1.5, display: "block" }}>
                        {t("details.used")}: {voucher.usedCount} / {voucher.usageLimit}
                      </Typography>
                    )}
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Info Box */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mt: 5,
            borderRadius: 2,
            border: "1px solid var(--color-gray5)",
            bgcolor: "white",
          }}
        >
          <Typography variant="h6" fontWeight={600} color="var(--color-gray1)" sx={{ mb: 3 }}>
            {t("howToUse.title")}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {(t("howToUse.steps", { returnObjects: true }) as string[]).map((step, index) => (
              <Box key={index} sx={{ display: "flex", gap: 2 }}>
                <Typography
                  variant="body2"
                  sx={{
                    minWidth: 24,
                    height: 24,
                    borderRadius: "50%",
                    bgcolor: "var(--color-primary)",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 600,
                    fontSize: "0.75rem",
                  }}
                >
                  {index + 1}
                </Typography>
                <Typography variant="body2" color="var(--color-gray2)" sx={{ pt: 0.25 }}>
                  {step}
                </Typography>
              </Box>
            ))}
          </Box>
          <Box
            sx={{
              mt: 3,
              p: 2,
              bgcolor: "#FFF7ED",
              borderRadius: 1,
              borderLeft: "3px solid var(--color-primary)",
            }}
          >
            <Typography variant="body2" color="var(--color-gray2)" fontWeight={500}>
              💡 {t("howToUse.note")}
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default VouchersPage;
