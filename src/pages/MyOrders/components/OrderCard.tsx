import { Box, Button, Card, CardContent, Chip, Divider, Typography } from "@mui/material";
import { Clock, Package, Receipt, RotateCcw, X } from "lucide-react";
import React from "react";
import { EMethodPayment } from "../../../types/enums/methodPayment.enum";
import { EOrderStatus } from "../../../types/enums/order.enum";
import type { OrderResponse } from "../../../types/responses/order.reponse";
import { formatCurrency } from "../../../utils/format";

type OrderCardProps = {
  order: OrderResponse;
  onViewDetail: (order: OrderResponse) => void;
  onCancel: (orderId: number) => void;
  onReorder: (order: OrderResponse) => void;
};

const OrderCard: React.FC<OrderCardProps> = ({ order, onViewDetail, onCancel, onReorder }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case EOrderStatus.PENDING:
        return { bg: "var(--color-status-pending)", color: "var(--color-status-pending-text)" };
      case EOrderStatus.CONFIRMED:
        return { bg: "var(--color-status-confirmed)", color: "var(--color-status-confirmed-text)" };
      case EOrderStatus.SHIPPING:
        return { bg: "var(--color-status-shipping)", color: "var(--color-status-shipping-text)" };
      case EOrderStatus.DELIVERED:
        return { bg: "var(--color-status-delivered)", color: "var(--color-status-delivered-text)" };
      case EOrderStatus.COMPLETED:
        return { bg: "var(--color-status-completed)", color: "var(--color-status-completed-text)" };
      case EOrderStatus.CANCELED:
        return { bg: "var(--color-status-canceled)", color: "var(--color-status-canceled-text)" };
      default:
        return { bg: "#F3F4F6", color: "#374151" };
    }
  };

  const statusColors = getStatusColor(order.status);
  const canCancel = order.status === EOrderStatus.PENDING || order.status === EOrderStatus.CONFIRMED;
  const canReview = order.status === EOrderStatus.DELIVERED || order.status === EOrderStatus.COMPLETED;

  return (
    <Card
      sx={{
        border: "1px solid",
        borderColor: "grey.200",
        borderRadius: 2,
        boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
        transition: "all 0.2s",
        "&:hover": {
          borderColor: "var(--color-primary)",
          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "start", mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Receipt size={20} color="#6B7280" />
            <Box>
              <Typography variant="body2" fontWeight={600} color="var(--color-gray1)">
                Order #{order.orderId}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                <Clock size={14} color="#9CA3AF" />
                <Typography variant="caption" color="var(--color-gray3)">
                  {/* You can add order date here if backend provides it */}
                  {order.items.length} item{order.items.length > 1 ? "s" : ""}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Chip
            label={order.status}
            sx={{
              bgcolor: statusColors.bg,
              color: statusColors.color,
              fontWeight: 600,
              fontSize: "0.75rem",
              height: 28,
              borderRadius: 1.5,
            }}
          />
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Products Preview */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            {order.items.slice(0, 3).map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  flex: 1,
                  minWidth: 0,
                }}
              >
                {item.productImageUrl ? (
                  <img
                    src={item.productImageUrl}
                    alt={item.productName}
                    style={{
                      width: 56,
                      height: 56,
                      objectFit: "cover",
                      borderRadius: 8,
                      border: "1px solid #E5E7EB",
                      flexShrink: 0,
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      bgcolor: "grey.200",
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Package size={24} color="#9CA3AF" />
                  </Box>
                )}
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Typography
                    variant="body2"
                    fontWeight={500}
                    color="var(--color-gray1)"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.productName}
                  </Typography>
                  <Typography variant="caption" color="var(--color-gray3)">
                    x{item.quantity}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
          {order.items.length > 3 && (
            <Typography variant="caption" color="var(--color-gray3)">
              +{order.items.length - 3} more item{order.items.length - 3 > 1 ? "s" : ""}
            </Typography>
          )}
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Footer */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box>
            <Typography variant="caption" color="var(--color-gray3)">
              Total Amount
            </Typography>
            <Typography variant="h6" fontWeight={700} color="var(--color-primary)">
              {formatCurrency(order.totalPrice, "USD")}
            </Typography>
            <Typography variant="caption" color="var(--color-gray3)">
              {order.paymentMethod === EMethodPayment.COD
                ? "Cash on Delivery"
                : order.paymentMethod === EMethodPayment.MOMO
                  ? "MoMo E-Wallet"
                  : "Other"}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            {canCancel && (
              <Button
                variant="outlined"
                size="small"
                startIcon={<X size={16} />}
                onClick={() => onCancel(order.orderId)}
                sx={{
                  textTransform: "none",
                  borderColor: "var(--color-danger)",
                  color: "var(--color-danger)",
                  fontWeight: 600,
                  "&:hover": {
                    borderColor: "var(--color-danger-dark)",
                    bgcolor: "var(--color-danger-light)",
                  },
                }}
              >
                Cancel
              </Button>
            )}
            {canReview && (
              <Button
                variant="outlined"
                size="small"
                onClick={() => onViewDetail(order)}
                sx={{
                  textTransform: "none",
                  borderColor: "var(--color-primary)",
                  color: "var(--color-primary)",
                  fontWeight: 600,
                  "&:hover": {
                    borderColor: "var(--color-primary)",
                    bgcolor: "rgba(var(--color-primary-rgb), 0.04)",
                  },
                }}
              >
                Review
              </Button>
            )}
            <Button
              variant="outlined"
              size="small"
              startIcon={<RotateCcw size={16} />}
              onClick={() => onReorder(order)}
              sx={{
                textTransform: "none",
                borderColor: "var(--color-success)",
                color: "var(--color-success)",
                fontWeight: 600,
                "&:hover": {
                  borderColor: "var(--color-success)",
                  bgcolor: "rgba(39, 174, 96, 0.04)",
                },
              }}
            >
              Reorder
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={() => onViewDetail(order)}
              sx={{
                textTransform: "none",
                bgcolor: "var(--color-primary)",
                fontWeight: 600,
                boxShadow: "none",
                "&:hover": {
                  bgcolor: "var(--color-primary)",
                  opacity: 0.9,
                  boxShadow: "none",
                },
              }}
            >
              View Details
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
