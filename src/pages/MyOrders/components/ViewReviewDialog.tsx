import { Box, Dialog, DialogContent, IconButton, Rating, Typography } from "@mui/material";
import { Camera, X } from "lucide-react";
import React from "react";
import type { OrderItemResponse } from "../../../types/responses/order.reponse";
import type { ReviewResponse } from "../../../types/responses/review.response";

type ViewReviewDialogProps = {
  open: boolean;
  onClose: () => void;
  orderId: number;
  item: OrderItemResponse;
  productImage?: string;
  review: ReviewResponse;
};

const ViewReviewDialog: React.FC<ViewReviewDialogProps> = ({ open, onClose, orderId, item, productImage, review }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
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
              Your Review
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
              Order #{orderId}
            </Typography>
          </Box>
          <IconButton onClick={onClose} sx={{ color: "white" }}>
            <X size={24} />
          </IconButton>
        </Box>

        <Box sx={{ p: 3 }}>
          {/* Product Info */}
          <Box sx={{ display: "flex", gap: 2, mb: 3, pb: 3, borderBottom: "1px solid #E5E7EB" }}>
            {productImage ? (
              <img
                src={productImage}
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
                <Camera size={32} color="#9CA3AF" />
              </Box>
            )}
            <Box>
              <Typography variant="body1" fontWeight={600} color="var(--color-gray1)">
                {item.productName}
              </Typography>
              <Typography variant="body2" color="var(--color-gray3)" sx={{ mt: 0.5 }}>
                Quantity: {item.quantity}
              </Typography>
            </Box>
          </Box>

          {/* Rating */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" fontWeight={600} color="var(--color-gray1)" gutterBottom>
              Your Rating
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 1 }}>
              <Rating
                value={review.rating}
                readOnly
                size="large"
                sx={{
                  "& .MuiRating-iconFilled": {
                    color: "var(--color-primary)",
                  },
                }}
              />
              <Typography variant="body2" fontWeight={600} color="var(--color-primary)">
                {review.rating === 5
                  ? "Excellent!"
                  : review.rating === 4
                    ? "Good"
                    : review.rating === 3
                      ? "Average"
                      : review.rating === 2
                        ? "Poor"
                        : "Terrible"}
              </Typography>
            </Box>
          </Box>

          {/* Content */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" fontWeight={600} color="var(--color-gray1)" gutterBottom>
              Your Review
            </Typography>
            <Typography
              variant="body2"
              color="var(--color-gray2)"
              sx={{
                mt: 1,
                p: 2,
                bgcolor: "grey.50",
                borderRadius: 2,
                border: "1px solid #E5E7EB",
                whiteSpace: "pre-wrap",
              }}
            >
              {review.content}
            </Typography>
          </Box>

          {/* Images */}
          {review.imageUrls && review.imageUrls.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" fontWeight={600} color="var(--color-gray1)" gutterBottom>
                Photos
              </Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 2 }}>
                {review.imageUrls.map((image, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: 100,
                      height: 100,
                      borderRadius: 2,
                      overflow: "hidden",
                      border: "1px solid #E5E7EB",
                      cursor: "pointer",
                      "&:hover": {
                        opacity: 0.8,
                      },
                    }}
                    onClick={() => window.open(image, "_blank")}
                  >
                    <img
                      src={image}
                      alt={`Review ${index + 1}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          {/* Review Date */}
          <Box sx={{ mt: 3, pt: 3, borderTop: "1px solid #E5E7EB" }}>
            <Typography variant="caption" color="var(--color-gray3)">
              Reviewed on{" "}
              {new Date(review.createdAt || "").toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Typography>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ViewReviewDialog;
