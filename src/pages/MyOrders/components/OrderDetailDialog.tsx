import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { CheckCircle2, Clock, Eye, MessageCircle, Package, RotateCcw, Star, Truck, X, XCircle } from "lucide-react";
import React, { useState } from "react";
import { useSnackbar } from "../../../hooks/useSnackbar";
import reviewService from "../../../services/reviewService";
import { EMethodPayment } from "../../../types/enums/methodPayment.enum";
import { EOrderStatus } from "../../../types/enums/order.enum";
import type { OrderItemResponse, OrderResponse } from "../../../types/responses/order.reponse";
import type { ReviewResponse } from "../../../types/responses/review.response";
import { formatCurrency } from "../../../utils/format";
import ReviewDialog from "./ReviewDialog";
import ViewReviewDialog from "./ViewReviewDialog";

type OrderDetailDialogProps = {
  open: boolean;
  order: OrderResponse;
  onClose: () => void;
  onCancel: (orderId: number) => void;
  onReorder: (order: OrderResponse) => void;
};

const OrderDetailDialog: React.FC<OrderDetailDialogProps> = ({ open, order, onClose, onCancel, onReorder }) => {
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [viewReviewDialogOpen, setViewReviewDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<OrderItemResponse | null>(null);
  const [selectedReview, setSelectedReview] = useState<ReviewResponse | null>(null);
  const { showSnackbar } = useSnackbar();

  const getStatusStep = (status: string): number => {
    switch (status) {
      case EOrderStatus.PENDING:
        return 0;
      case EOrderStatus.CONFIRMED:
        return 1;
      case EOrderStatus.SHIPPING:
        return 2;
      case EOrderStatus.DELIVERED:
        return 3;
      case EOrderStatus.COMPLETED:
        return 4;
      case EOrderStatus.CANCELED:
        return -1;
      default:
        return 0;
    }
  };

  const steps = [
    { label: "Order Placed", icon: <Clock size={20} /> },
    { label: "Confirmed", icon: <CheckCircle2 size={20} /> },
    { label: "Shipping", icon: <Truck size={20} /> },
    { label: "Delivered", icon: <Package size={20} /> },
    { label: "Completed", icon: <Star size={20} /> },
  ];

  const currentStep = getStatusStep(order.status);
  const canCancel = order.status === EOrderStatus.PENDING || order.status === EOrderStatus.CONFIRMED;
  const canReview = order.status === EOrderStatus.DELIVERED || order.status === EOrderStatus.COMPLETED;

  const handleSubmitReview = async (data: { rating: number; content: string; imageUrls?: string[] }) => {
    if (!selectedItem) return;

    try {
      await reviewService.createReview({
        orderItemId: selectedItem.id,
        rating: data.rating,
        content: data.content,
        imageUrls: data.imageUrls,
      });

      showSnackbar("Review submitted successfully!", "success");

      // Mark item as reviewed in local state
      if (selectedItem) {
        selectedItem.reviewed = true;
      }

      setReviewDialogOpen(false);
      setSelectedItem(null);
    } catch (error: unknown) {
      console.error("Failed to submit review:", error);

      const err = error as { response?: { data?: { message?: string } } };

      const errorMessage = err.response?.data?.message || "Failed to submit review. Please try again.";

      showSnackbar(errorMessage, "error");
      throw error;
    }
  };

  return (
    <>
      <Dialog
        open={open && !reviewDialogOpen}
        onClose={onClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            maxHeight: "90vh",
          },
        }}
      >
        <DialogContent sx={{ p: 0 }}>
          {/* Header */}
          <Box
            sx={{
              p: 3,
              bgcolor: "var(--color-primary)",
              color: "white",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography variant="h6" fontWeight={700}>
                Order Details
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
                Order #{order.orderId}
              </Typography>
            </Box>
            <IconButton onClick={onClose} sx={{ color: "white" }}>
              <X size={24} />
            </IconButton>
          </Box>

          <Box sx={{ p: 3 }}>
            {/* Order Status Timeline */}
            {order.status !== EOrderStatus.CANCELED ? (
              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle1" fontWeight={600} color="var(--color-gray1)" gutterBottom>
                  Order Status
                </Typography>
                <Stepper activeStep={currentStep} alternativeLabel sx={{ mt: 2 }}>
                  {steps.map((step, index) => (
                    <Step key={step.label}>
                      <StepLabel
                        StepIconComponent={() => (
                          <Box
                            sx={{
                              width: 40,
                              height: 40,
                              borderRadius: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              bgcolor: index <= currentStep ? "var(--color-primary)" : "#E5E7EB",
                              color: index <= currentStep ? "white" : "#9CA3AF",
                              transition: "all 0.3s",
                            }}
                          >
                            {step.icon}
                          </Box>
                        )}
                      >
                        <Typography
                          variant="caption"
                          fontWeight={index <= currentStep ? 600 : 400}
                          color={index <= currentStep ? "var(--color-gray1)" : "var(--color-gray3)"}
                        >
                          {step.label}
                        </Typography>
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>
            ) : (
              <Box
                sx={{
                  mb: 4,
                  p: 3,
                  bgcolor: "var(--color-status-canceled)",
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <XCircle size={32} color="var(--color-danger-dark)" />
                <Box>
                  <Typography variant="subtitle1" fontWeight={600} color="var(--color-status-canceled-text)">
                    Order Cancelled
                  </Typography>
                  <Typography variant="body2" color="var(--color-danger-dark)">
                    This order has been cancelled
                  </Typography>
                </Box>
              </Box>
            )}

            <Divider sx={{ my: 3 }} />

            {/* Order Items */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" fontWeight={600} color="var(--color-gray1)" gutterBottom>
                Order Items
              </Typography>
              <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
                {order.items.map((item) => (
                  <Box
                    key={item.id}
                    sx={{
                      display: "flex",
                      gap: 2,
                      p: 2,
                      border: "1px solid",
                      borderColor: "grey.200",
                      borderRadius: 2,
                      "&:hover": {
                        borderColor: "var(--color-primary)",
                        bgcolor: "rgba(var(--color-primary-rgb), 0.04)",
                      },
                    }}
                  >
                    {item.productImageUrl ? (
                      <img
                        src={item.productImageUrl}
                        alt={item.productName}
                        style={{
                          width: 80,
                          height: 80,
                          objectFit: "cover",
                          borderRadius: 8,
                          border: "1px solid #E5E7EB",
                        }}
                      />
                    ) : (
                      <Box
                        sx={{
                          width: 80,
                          height: 80,
                          bgcolor: "grey.200",
                          borderRadius: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Package size={32} color="#9CA3AF" />
                      </Box>
                    )}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="body1" fontWeight={600} color="var(--color-gray1)">
                        {item.productName}
                      </Typography>
                      <Typography variant="body2" color="var(--color-gray3)" sx={{ mt: 0.5 }}>
                        {formatCurrency(item.price, "USD")} × {item.quantity}
                      </Typography>
                      {canReview &&
                        (item.reviewed ? (
                          <Button
                            size="small"
                            startIcon={<Eye size={16} />}
                            onClick={async (e) => {
                              e.stopPropagation();
                              try {
                                const response = await reviewService.getReviewByOrderItemId(item.id);
                                setSelectedReview(response.data);
                                setSelectedItem(item);
                                setViewReviewDialogOpen(true);
                              } catch (error) {
                                console.error("Failed to load review:", error);
                                showSnackbar("Failed to load review", "error");
                              }
                            }}
                            sx={{
                              mt: 1,
                              textTransform: "none",
                              color: "var(--color-success)",
                              fontWeight: 600,
                              fontSize: "0.875rem",
                              p: 0,
                              minWidth: "auto",
                              "&:hover": {
                                bgcolor: "transparent",
                                textDecoration: "underline",
                              },
                            }}
                          >
                            View review
                          </Button>
                        ) : (
                          <Button
                            size="small"
                            startIcon={<Star size={16} />}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedItem(item);
                              setReviewDialogOpen(true);
                            }}
                            sx={{
                              mt: 1,
                              textTransform: "none",
                              color: "var(--color-primary)",
                              fontWeight: 600,
                              fontSize: "0.875rem",
                              p: 0,
                              minWidth: "auto",
                              "&:hover": {
                                bgcolor: "transparent",
                                textDecoration: "underline",
                              },
                            }}
                          >
                            Write a review
                          </Button>
                        ))}
                    </Box>
                    <Box sx={{ textAlign: "right" }}>
                      <Typography variant="body1" fontWeight={700} color="var(--color-gray1)">
                        {formatCurrency(item.subTotal, "USD")}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Payment Summary */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" fontWeight={600} color="var(--color-gray1)" gutterBottom>
                Payment Summary
              </Typography>
              <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 1.5 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2" color="var(--color-gray3)">
                    Subtotal:
                  </Typography>
                  <Typography variant="body2" fontWeight={500} color="var(--color-gray1)">
                    {formatCurrency(
                      order.items.reduce((sum, item) => sum + item.subTotal, 0),
                      "USD"
                    )}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2" color="var(--color-gray3)">
                    Shipping Fee:
                  </Typography>
                  <Typography variant="body2" fontWeight={500} color="var(--color-gray1)">
                    {formatCurrency(order.shippingFee, "USD")}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2" color="var(--color-gray3)">
                    VAT (10%):
                  </Typography>
                  <Typography variant="body2" fontWeight={500} color="var(--color-gray1)">
                    {formatCurrency(order.vat, "USD")}
                  </Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body1" fontWeight={700} color="var(--color-gray1)">
                    Total:
                  </Typography>
                  <Typography variant="h6" fontWeight={700} color="var(--color-primary)">
                    {formatCurrency(order.totalPrice, "USD")}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                  <Typography variant="body2" color="var(--color-gray3)">
                    Payment Method:
                  </Typography>
                  <Typography variant="body2" fontWeight={500} color="var(--color-gray1)">
                    {order.paymentMethod === EMethodPayment.COD
                      ? "Cash on Delivery"
                      : order.paymentMethod === EMethodPayment.MOMO
                        ? "MoMo E-Wallet"
                        : "VNPay"}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Actions */}
            <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
              <Button
                variant="outlined"
                startIcon={<MessageCircle size={18} />}
                sx={{
                  textTransform: "none",
                  borderColor: "grey.300",
                  color: "var(--color-gray2)",
                  fontWeight: 600,
                  "&:hover": {
                    borderColor: "grey.400",
                    bgcolor: "grey.50",
                  },
                }}
              >
                Contact Support
              </Button>
              {canCancel && (
                <Button
                  variant="outlined"
                  startIcon={<X size={18} />}
                  onClick={() => {
                    onCancel(order.orderId);
                    onClose();
                  }}
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
                  Cancel Order
                </Button>
              )}
              <Button
                variant="outlined"
                startIcon={<RotateCcw size={18} />}
                onClick={() => {
                  onReorder(order);
                  onClose();
                }}
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
                Reorder
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Review Dialog */}
      {selectedItem && (
        <ReviewDialog
          open={reviewDialogOpen}
          onClose={() => {
            setReviewDialogOpen(false);
            setSelectedItem(null);
          }}
          orderId={order.orderId}
          item={selectedItem}
          productImage={selectedItem.productImageUrl}
          onSubmit={handleSubmitReview}
        />
      )}

      {/* View Review Dialog */}
      {selectedItem && selectedReview && (
        <ViewReviewDialog
          open={viewReviewDialogOpen}
          onClose={() => {
            setViewReviewDialogOpen(false);
            setSelectedItem(null);
            setSelectedReview(null);
          }}
          orderId={order.orderId}
          item={selectedItem}
          productImage={selectedItem.productImageUrl}
          review={selectedReview}
        />
      )}
    </>
  );
};

export default OrderDetailDialog;
