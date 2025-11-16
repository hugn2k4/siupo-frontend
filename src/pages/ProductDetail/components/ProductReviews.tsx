import { Avatar, Box, CircularProgress, Rating, Typography } from "@mui/material";
import { Calendar, CheckCircle, Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import reviewService from "../../../services/reviewService";
import type { ReviewResponse } from "../../../types/responses/review.response";

interface ProductReviewsProps {
  productId: number;
  reviewCount: number;
  onReviewCountUpdate?: (count: number) => void;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ productId, onReviewCountUpdate }) => {
  const [reviews, setReviews] = useState<ReviewResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await reviewService.getProductReviews(productId);
        console.log("Reviews response:", response);
        // API trả về ApiResponse với data bên trong
        if (response && response.data) {
          const reviewsData = Array.isArray(response.data) ? response.data : [];
          setReviews(reviewsData);
          // Update review count in parent immediately
          onReviewCountUpdate?.(reviewsData.length);
        } else {
          setReviews([]);
          onReviewCountUpdate?.(0);
        }
      } catch (err) {
        console.error("Failed to load reviews:", err);
        setError("Failed to load reviews");
        setReviews([]);
        onReviewCountUpdate?.(0);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchReviews();
    }
  }, [productId, onReviewCountUpdate]);

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    if (Array.isArray(reviews)) {
      reviews.forEach((review) => {
        if (review && typeof review.rating === "number") {
          const ratingValue = Math.round(review.rating);
          if (ratingValue >= 1 && ratingValue <= 5) {
            distribution[ratingValue as keyof typeof distribution]++;
          }
        }
      });
    }
    return distribution;
  };

  const calculateAverageRating = () => {
    if (!Array.isArray(reviews) || reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => {
      return sum + (review.rating || 0);
    }, 0);
    return total / reviews.length;
  };

  const distribution = getRatingDistribution();
  const totalReviews = reviews.length;
  const averageRating = calculateAverageRating();

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress sx={{ color: "var(--color-primary)" }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: 4, textAlign: "center" }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Rating Summary */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "300px 1fr" },
          gap: 4,
          mb: 4,
          pb: 4,
          borderBottom: "1px solid #E5E7EB",
        }}
      >
        {/* Overall Rating */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: 3,
            bgcolor: "grey.50",
            borderRadius: 2,
            border: "1px solid #E5E7EB",
          }}
        >
          <Typography variant="h2" fontWeight={700} color="var(--color-primary)">
            {averageRating.toFixed(1)}
          </Typography>
          <Rating value={averageRating} readOnly precision={0.1} size="large" sx={{ my: 1 }} />
          <Typography variant="body2" color="var(--color-gray3)">
            Based on {totalReviews} review{totalReviews !== 1 ? "s" : ""}
          </Typography>
        </Box>

        {/* Rating Distribution */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = distribution[stars as keyof typeof distribution];
            const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;

            return (
              <Box key={stars} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, minWidth: 80 }}>
                  <Typography variant="body2" fontWeight={600} color="var(--color-gray2)">
                    {stars}
                  </Typography>
                  <Star size={16} fill="var(--color-primary)" color="var(--color-primary)" />
                </Box>
                <Box sx={{ flex: 1, position: "relative", height: 8, bgcolor: "grey.200", borderRadius: 1 }}>
                  <Box
                    sx={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      height: "100%",
                      width: `${percentage}%`,
                      bgcolor: "var(--color-primary)",
                      borderRadius: 1,
                      transition: "width 0.3s ease",
                    }}
                  />
                </Box>
                <Typography variant="body2" color="var(--color-gray3)" sx={{ minWidth: 50, textAlign: "right" }}>
                  {count} ({percentage.toFixed(0)}%)
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <Box
          sx={{
            py: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            bgcolor: "linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)",
            borderRadius: 3,
            border: "2px dashed #E5E7EB",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "radial-gradient(circle at 20% 30%, rgba(255, 107, 0, 0.05) 0%, transparent 50%)",
              pointerEvents: "none",
            },
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              bgcolor: "rgba(255, 107, 0, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 3,
              position: "relative",
              zIndex: 1,
            }}
          >
            <Star size={40} color="var(--color-primary)" fill="var(--color-primary)" opacity={0.8} />
          </Box>
          <Typography
            variant="h5"
            fontWeight={600}
            color="var(--color-gray1)"
            sx={{ mb: 1.5, position: "relative", zIndex: 1 }}
          >
            Chưa có đánh giá nào
          </Typography>
          <Typography
            variant="body1"
            color="var(--color-gray3)"
            sx={{ maxWidth: 400, position: "relative", zIndex: 1 }}
          >
            Hãy là người đầu tiên đánh giá sản phẩm này và chia sẻ trải nghiệm của bạn với mọi người
          </Typography>
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {reviews.map((review) => (
            <Box
              key={review.id}
              sx={{
                p: 3,
                bgcolor: "white",
                borderRadius: 2,
                border: "1px solid #E5E7EB",
                transition: "all 0.2s",
                "&:hover": {
                  borderColor: "var(--color-primary)",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                },
              }}
            >
              {/* Reviewer Info */}
              <Box sx={{ display: "flex", alignItems: "start", justifyContent: "space-between", mb: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar
                    sx={{
                      width: 48,
                      height: 48,
                      bgcolor: "var(--color-primary)",
                      fontWeight: 600,
                    }}
                  >
                    {review.userName?.charAt(0).toUpperCase() || "A"}
                  </Avatar>
                  <Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography variant="body1" fontWeight={600} color="var(--color-gray1)">
                        {review.userName || "Anonymous"}
                      </Typography>
                      <CheckCircle size={16} color="var(--color-success)" />
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                      <Calendar size={14} color="#9CA3AF" />
                      <Typography variant="caption" color="var(--color-gray3)">
                        {new Date(review.createdAt || "").toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Rating value={review.rating} readOnly size="small" />
              </Box>

              {/* Review Content */}
              <Typography
                variant="body2"
                color="var(--color-gray2)"
                sx={{
                  mb: 2,
                  lineHeight: 1.6,
                  whiteSpace: "pre-wrap",
                }}
              >
                {review.content}
              </Typography>

              {/* Review Images */}
              {review.imageUrls && review.imageUrls.length > 0 && (
                <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
                  {review.imageUrls.map((imageUrl, index) => (
                    <Box
                      key={index}
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: 2,
                        overflow: "hidden",
                        border: "1px solid #E5E7EB",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        "&:hover": {
                          transform: "scale(1.05)",
                          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                        },
                      }}
                      onClick={() => window.open(imageUrl, "_blank")}
                    >
                      <img
                        src={imageUrl}
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
              )}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ProductReviews;
