import { Box } from "@mui/material";
import { CheckCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import MyButton from "../../components/common/Button";
import React from "react";

const OrderSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderId = (location.state as unknown as { orderId?: number })?.orderId;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 border border-gray-200 shadow-sm">
          <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 4 }}>
            <CheckCircle color="#10B981" size={48} />
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Order placed successfully</h2>
              <p className="text-sm text-gray-500 mt-1">
                Thank you for your purchase — we are processing your order now.
              </p>
            </div>
          </Box>

          {orderId && (
            <div className="mb-6">
              <p className="text-sm text-gray-700">Your order number:</p>
              <p className="text-lg font-medium text-gray-900">#{orderId}</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <MyButton
              fullWidth
              sx={{ borderRadius: 0 }}
              colorScheme="grey"
              startIcon={<ArrowLeft size={16} />}
              onClick={() => navigate("/shop")}
            >
              Continue shopping
            </MyButton>

            <MyButton
              fullWidth
              sx={{ borderRadius: 0 }}
              colorScheme="orange"
              endIcon={<ArrowRight size={16} />}
              onClick={() => (orderId ? navigate(`/orders/${orderId}`) : navigate("/"))}
            >
              View order
            </MyButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
