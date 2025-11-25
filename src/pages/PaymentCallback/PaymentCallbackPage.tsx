import { Box, CircularProgress, Typography } from "@mui/material";
import { CheckCircle2, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import MyButton from "../../components/common/Button";
import { useSnackbar } from "../../hooks/useSnackbar";

const PaymentCallbackPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "failed" | "cancelled">("loading");
  const [orderInfo, setOrderInfo] = useState<{ orderId: string | null; message: string | null }>({
    orderId: null,
    message: null,
  });
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    // Get payment result from URL params
    const resultCode = searchParams.get("resultCode");
    const momoOrderId = searchParams.get("orderId"); // Format: ORDER_18_1763158753818
    const message = searchParams.get("message");
    const orderInfo = searchParams.get("orderInfo"); // Format: "Thanh toán đơn hàng #18"

    // Extract actual order ID from momoOrderId (ORDER_18_xxx -> 18) or orderInfo (#18 -> 18)
    let actualOrderId: string | null = null;

    if (momoOrderId) {
      // Try to extract from ORDER_18_xxx format
      const match = momoOrderId.match(/ORDER_(\d+)_/);
      if (match) {
        actualOrderId = match[1];
      }
    }

    // Fallback: try to extract from orderInfo
    if (!actualOrderId && orderInfo) {
      const match = decodeURIComponent(orderInfo).match(/#(\d+)/);
      if (match) {
        actualOrderId = match[1];
      }
    }

    console.log("Payment callback:", { resultCode, momoOrderId, actualOrderId, orderInfo, message });

    // Store order info
    setOrderInfo({ orderId: actualOrderId, message });

    // Process payment result
    if (resultCode === "0") {
      // Payment successful
      setStatus("success");
      showSnackbar("Payment successful!", "success");

      // Redirect to order success page after 2 seconds
      setTimeout(() => {
        if (actualOrderId) {
          navigate(`/order-success?orderId=${actualOrderId}`, { replace: true });
        } else {
          navigate("/orders", { replace: true });
        }
      }, 2000);
    } else if (resultCode === "1006") {
      // User cancelled payment
      setStatus("cancelled");
      showSnackbar("Payment cancelled", "warning");
    } else {
      // Payment failed (other error codes)
      setStatus("failed");
      showSnackbar(message || "Payment failed", "error");
    }
  }, [searchParams, navigate, showSnackbar]);

  const handleBackToHome = () => {
    navigate("/");
  };

  const handleRetryPayment = () => {
    const orderId = orderInfo.orderId;
    if (orderId) {
      // If we have orderId, navigate to checkout to retry with the same order
      navigate("/checkout", {
        state: {
          retryOrderId: orderId,
          fromPaymentFailed: true,
        },
      });
    } else {
      // Otherwise, go back to cart
      navigate("/cart");
    }
  };

  const handleViewOrder = () => {
    const orderId = orderInfo.orderId;
    if (orderId) {
      navigate(`/order-success?orderId=${orderId}`, { replace: true });
    } else {
      navigate("/orders");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: 3,
            p: 4,
            textAlign: "center",
          }}
        >
          {status === "loading" && (
            <>
              <CircularProgress size={60} sx={{ color: "#FF6B35", mb: 3 }} />
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                Processing Payment...
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Please wait while we verify your payment
              </Typography>
            </>
          )}

          {status === "success" && (
            <>
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  backgroundColor: "#10B981",
                  mb: 3,
                }}
              >
                <CheckCircle2 size={48} color="white" />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: "#10B981" }}>
                Payment Successful!
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Your payment has been processed successfully. Redirecting to order details...
              </Typography>
              <CircularProgress size={30} sx={{ color: "#FF6B35" }} />
            </>
          )}

          {status === "failed" && (
            <>
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  backgroundColor: "#EF4444",
                  mb: 3,
                }}
              >
                <XCircle size={48} color="white" />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: "#EF4444" }}>
                Payment Failed
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {orderInfo.message || "Your payment could not be processed."}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 4, fontWeight: 500 }}>
                Don't worry, your order has been saved. You can try paying again or contact support for help.
              </Typography>

              <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
                <MyButton fullWidth colorScheme="orange" onClick={handleRetryPayment}>
                  Retry Payment
                </MyButton>
                {orderInfo.orderId && (
                  <MyButton fullWidth colorScheme="grey" onClick={handleViewOrder}>
                    View Order Details
                  </MyButton>
                )}
                <MyButton fullWidth colorScheme="grey" onClick={handleBackToHome}>
                  Back to Home
                </MyButton>
              </Box>
            </>
          )}

          {status === "cancelled" && (
            <>
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  backgroundColor: "#F59E0B",
                  mb: 3,
                }}
              >
                <XCircle size={48} color="white" />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: "#F59E0B" }}>
                Payment Cancelled
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                You have cancelled the payment.
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 4, fontWeight: 500 }}>
                Your order has been saved. You can complete the payment anytime or choose a different payment method.
              </Typography>

              <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
                <MyButton fullWidth colorScheme="orange" onClick={handleRetryPayment}>
                  Complete Payment
                </MyButton>
                {orderInfo.orderId && (
                  <MyButton fullWidth colorScheme="grey" onClick={handleViewOrder}>
                    View Order Details
                  </MyButton>
                )}
                <MyButton fullWidth colorScheme="grey" onClick={handleBackToHome}>
                  Back to Home
                </MyButton>
              </Box>
            </>
          )}
        </Box>
      </div>
    </div>
  );
};

export default PaymentCallbackPage;
