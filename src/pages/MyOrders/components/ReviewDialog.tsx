import { Box, Button, Dialog, DialogContent, IconButton, Rating, TextField, Typography } from "@mui/material";
import { Camera, X } from "lucide-react";
import React, { useState } from "react";
import { useSnackbar } from "../../../hooks/useSnackbar";
import type { OrderItemResponse } from "../../../types/responses/order.reponse";

type ReviewDialogProps = {
  open: boolean;
  onClose: () => void;
  orderId: number;
  item: OrderItemResponse;
  productImage?: string;
  onSubmit: (data: { rating: number; comment: string; images?: string[] }) => Promise<void>;
};

const ReviewDialog: React.FC<ReviewDialogProps> = ({ open, onClose, orderId, item, productImage, onSubmit }) => {
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const { showSnackbar } = useSnackbar();

  const handleSubmit = async () => {
    if (rating === 0) {
      showSnackbar("Please select a rating", "warning");
      return;
    }

    if (comment.trim().length < 10) {
      showSnackbar("Review must be at least 10 characters", "warning");
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit({ rating, comment, images: images.length > 0 ? images : undefined });
      showSnackbar("Review submitted successfully!", "success");
      handleClose();
    } catch (error) {
      console.error("Failed to submit review:", error);
      showSnackbar("Failed to submit review", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setRating(5);
    setComment("");
    setImages([]);
    onClose();
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    // Simulate image upload - in real app, upload to server and get URLs
    for (let i = 0; i < Math.min(files.length, 5 - images.length); i++) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImages((prev) => [...prev, e.target!.result as string]);
        }
      };
      reader.readAsDataURL(files[i]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
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
              Write a Review
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
              Order #{orderId}
            </Typography>
          </Box>
          <IconButton onClick={handleClose} sx={{ color: "white" }}>
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
              Your Rating *
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 1 }}>
              <Rating
                value={rating}
                onChange={(_, newValue) => {
                  setRating(newValue || 0);
                }}
                size="large"
                sx={{
                  "& .MuiRating-iconFilled": {
                    color: "var(--color-primary)",
                  },
                  "& .MuiRating-iconHover": {
                    color: "var(--color-primary)",
                    opacity: 0.8,
                  },
                }}
              />
              <Typography variant="body2" fontWeight={600} color="var(--color-primary)">
                {rating === 5
                  ? "Excellent!"
                  : rating === 4
                    ? "Good"
                    : rating === 3
                      ? "Average"
                      : rating === 2
                        ? "Poor"
                        : rating === 1
                          ? "Terrible"
                          : "Select rating"}
              </Typography>
            </Box>
          </Box>

          {/* Comment */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" fontWeight={600} color="var(--color-gray1)" gutterBottom>
              Your Review *
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="Share your experience with this product... (min 10 characters)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              sx={{
                mt: 1,
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "var(--color-primary)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "var(--color-primary)",
                  },
                },
              }}
            />
            <Typography
              variant="caption"
              color={comment.length >= 10 ? "success.main" : "var(--color-gray3)"}
              sx={{ mt: 0.5, display: "block" }}
            >
              {comment.length}/500 characters {comment.length >= 10 ? "✓" : "(minimum 10)"}
            </Typography>
          </Box>

          {/* Images */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" fontWeight={600} color="var(--color-gray1)" gutterBottom>
              Add Photos (Optional)
            </Typography>
            <Typography variant="caption" color="var(--color-gray3)" sx={{ display: "block", mb: 2 }}>
              Help others by sharing photos of your experience (max 5 photos)
            </Typography>

            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              {images.map((image, index) => (
                <Box
                  key={index}
                  sx={{
                    position: "relative",
                    width: 80,
                    height: 80,
                    borderRadius: 2,
                    overflow: "hidden",
                  }}
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
                  <IconButton
                    size="small"
                    onClick={() => removeImage(index)}
                    sx={{
                      position: "absolute",
                      top: 4,
                      right: 4,
                      bgcolor: "rgba(0,0,0,0.6)",
                      color: "white",
                      "&:hover": {
                        bgcolor: "rgba(0,0,0,0.8)",
                      },
                      width: 24,
                      height: 24,
                    }}
                  >
                    <X size={16} />
                  </IconButton>
                </Box>
              ))}

              {images.length < 5 && (
                <Button
                  component="label"
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: 2,
                    border: "2px dashed #D1D5DB",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--color-gray3)",
                    bgcolor: "grey.50",
                    "&:hover": {
                      borderColor: "var(--color-primary)",
                      bgcolor: "rgba(var(--color-primary-rgb), 0.04)",
                      color: "var(--color-primary)",
                    },
                  }}
                >
                  <Camera size={24} />
                  <Typography variant="caption" sx={{ mt: 0.5 }}>
                    Add
                  </Typography>
                  <input type="file" hidden accept="image/*" multiple onChange={handleImageUpload} />
                </Button>
              )}
            </Box>
          </Box>

          {/* Actions */}
          <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mt: 4 }}>
            <Button
              variant="outlined"
              onClick={handleClose}
              disabled={submitting}
              sx={{
                textTransform: "none",
                borderColor: "grey.300",
                color: "var(--color-gray2)",
                fontWeight: 600,
                px: 3,
                "&:hover": {
                  borderColor: "grey.400",
                  bgcolor: "grey.50",
                },
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={submitting || rating === 0 || comment.trim().length < 10}
              sx={{
                textTransform: "none",
                bgcolor: "var(--color-primary)",
                fontWeight: 600,
                px: 3,
                boxShadow: "none",
                "&:hover": {
                  bgcolor: "var(--color-primary)",
                  opacity: 0.9,
                  boxShadow: "none",
                },
                "&:disabled": {
                  bgcolor: "grey.300",
                  color: "grey.500",
                },
              }}
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDialog;
