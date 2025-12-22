import { Box, Button, Card, CardContent, Chip, Divider, Typography } from "@mui/material";
import { Clock, Package, Receipt, RotateCcw, X } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import comboService from "../../../services/comboService";
import { EMethodPayment } from "../../../types/enums/methodPayment.enum";
import { EOrderStatus } from "../../../types/enums/order.enum";
import type { ComboResponse } from "../../../types/responses/combo.response";
import type { OrderItemResponse, OrderResponse } from "../../../types/responses/order.reponse";
import { formatCurrency } from "../../../utils/format";
import ComboDetailDialog from "../../Shop/components/ComboDetailDialog";
import ConfirmModal from "../../WishList/components/ConfirmModal";

type OrderCardProps = {
  order: OrderResponse;
  onViewDetail: (order: OrderResponse) => void;
  onCancel: (orderId: number) => void;
  onReorder: (order: OrderResponse) => void;
};

const OrderCard: React.FC<OrderCardProps> = ({ order, onViewDetail, onCancel, onReorder }) => {
  const navigate = useNavigate();
  const [confirmCancelOpen, setConfirmCancelOpen] = useState(false);
  const [selectedCombo, setSelectedCombo] = useState<ComboResponse | null>(null);
  const [comboDialogOpen, setComboDialogOpen] = useState(false);

  const viewProductDetail = async (item: OrderItemResponse) => {
    if (item.comboId) {
      // If it's a combo, fetch and show in dialog
      try {
        const response = await comboService.getComboById(item.comboId);
        setSelectedCombo(response.data);
        setComboDialogOpen(true);
      } catch (error) {
        console.error("Failed to fetch combo details:", error);
      }
    } else if (item.productId) {
      // If it's a product, navigate to product detail page
      navigate(`/shop/${item.productId}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleAddComboToCart = () => {
    // TODO: Implement add combo to cart
    setComboDialogOpen(false);
  };
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
    <>
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
              {order.items.slice(0, 3).map((item) => {
                const isCombo = !!item.comboId;
                const itemName = isCombo ? item.comboName : item.productName;
                const itemImage = isCombo ? item.comboImageUrl : item.productImageUrl;
                const hasValidId = isCombo ? !!item.comboId : !!item.productId;

                return (
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
                    {itemImage ? (
                      <img
                        src={itemImage}
                        alt={itemName || "Item"}
                        style={{
                          width: 56,
                          height: 56,
                          objectFit: "cover",
                          borderRadius: 8,
                          border: "1px solid #E5E7EB",
                          flexShrink: 0,
                          cursor: hasValidId ? "pointer" : "default",
                        }}
                        onClick={() => hasValidId && viewProductDetail(item)}
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
                          cursor: hasValidId ? "pointer" : "default",
                        }}
                        onClick={() => hasValidId && viewProductDetail(item)}
                      >
                        <Package size={24} color="#9CA3AF" />
                      </Box>
                    )}
                    <Box sx={{ minWidth: 0, flex: 1 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <Typography
                          variant="body2"
                          fontWeight={500}
                          color="var(--color-gray1)"
                          sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            cursor: hasValidId ? "pointer" : "default",
                          }}
                          onClick={() => hasValidId && viewProductDetail(item)}
                        >
                          {itemName}
                        </Typography>
                        {isCombo && (
                          <Box
                            sx={{
                              bgcolor: "var(--color-primary)",
                              color: "white",
                              px: 0.5,
                              py: 0.25,
                              fontSize: "0.625rem",
                              fontWeight: 700,
                              borderRadius: 0.5,
                            }}
                          >
                            COMBO
                          </Box>
                        )}
                      </Box>
                      <Typography variant="caption" color="var(--color-gray3)">
                        x{item.quantity}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
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
                  onClick={() => setConfirmCancelOpen(true)}
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

      <ConfirmModal
        isOpen={confirmCancelOpen}
        onClose={() => setConfirmCancelOpen(false)}
        onConfirm={() => onCancel(order.orderId)}
        title="Cancel Order"
        message={`Are you sure you want to cancel order #${order.orderId}? This action cannot be undone.`}
        confirmText="Yes, Cancel Order"
        cancelText="No, Keep Order"
        type="danger"
      />

      <ComboDetailDialog
        open={comboDialogOpen}
        onClose={() => setComboDialogOpen(false)}
        combo={selectedCombo}
        onAddToCart={handleAddComboToCart}
      />
    </>
  );
};

export default OrderCard;
