import { Box, CircularProgress, Divider } from "@mui/material";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MyButton from "../../components/common/Button";
import orderService from "../../services/orderService";
import productService from "../../services/productService";
import { EMethodPayment } from "../../types/enums/methodPayment.enum";
import type { OrderResponse } from "../../types/responses/order.reponse";
import { formatCurrency } from "../../utils/format";

const OrderSuccessPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const orderIdFromQuery = searchParams.get("orderId");
  const stateData = location.state as { orderId?: number; order?: OrderResponse };
  const orderId = stateData?.orderId || (orderIdFromQuery ? Number(orderIdFromQuery) : undefined);
  const [order, setOrder] = useState<OrderResponse | null>(stateData?.order || null);
  const [loading, setLoading] = useState(!stateData?.order);
  const [productImages, setProductImages] = useState<Record<number, string>>({});

  useEffect(() => {
    const fetchOrder = async () => {
      // If no orderId, nothing to fetch
      if (!orderId) {
        setLoading(false);
        return;
      }

      // If we already have the order from state (COD payment), no need to fetch
      if (stateData?.order) {
        setLoading(false);
        return;
      }

      // Fetch order from API (for MoMo/VNPay redirect cases)
      try {
        const response = await orderService.getOrder(orderId);
        if (response.data) {
          setOrder(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch order:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  // Fetch product images
  useEffect(() => {
    const fetchProductImages = async () => {
      if (!order?.items) return;

      const imagePromises = order.items.map(async (item) => {
        try {
          const response = await productService.getProductById(item.productId);
          if (response.product?.imageUrls?.[0]) {
            return { productId: item.productId, imageUrl: response.product.imageUrls[0] };
          }
        } catch (error) {
          console.error(`Failed to fetch image for product ${item.productId}:`, error);
        }
        return null;
      });

      const results = await Promise.all(imagePromises);
      const imagesMap: Record<number, string> = {};
      results.forEach((result) => {
        if (result) {
          imagesMap[result.productId] = result.imageUrl;
        }
      });
      setProductImages(imagesMap);
    };

    fetchProductImages();
  }, [order]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <CircularProgress sx={{ color: "#FF6B35" }} />
      </div>
    );
  }

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

          {order && (
            <>
              <Divider sx={{ my: 3 }} />

              {/* Order Items */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h3>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex gap-4 py-3 border-b border-gray-100">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        {productImages[item.productId] ? (
                          <img
                            src={productImages[item.productId]}
                            alt={item.productName}
                            className="w-20 h-20 object-cover rounded border border-gray-200"
                          />
                        ) : (
                          <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center">
                            <span className="text-gray-400 text-xs">No image</span>
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{item.productName}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          {formatCurrency(item.price, "USD")} × {item.quantity}
                        </p>
                      </div>

                      {/* Subtotal */}
                      <div className="flex-shrink-0 text-right">
                        <p className="font-semibold text-gray-900">{formatCurrency(item.subTotal, "USD")}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Divider sx={{ my: 3 }} />

              {/* Order Summary */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="text-gray-900 font-medium">
                      {formatCurrency(
                        order.items.reduce((sum, item) => sum + item.subTotal, 0),
                        "USD"
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping Fee:</span>
                    <span className="text-gray-900 font-medium">{formatCurrency(order.shippingFee, "USD")}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">VAT (10%):</span>
                    <span className="text-gray-900 font-medium">{formatCurrency(order.vat, "USD")}</span>
                  </div>
                  <Divider sx={{ my: 2 }} />
                  <div className="flex justify-between text-base font-semibold">
                    <span className="text-gray-900">Total:</span>
                    <span className="text-orange-600">{formatCurrency(order.totalPrice, "USD")}</span>
                  </div>
                </div>
              </div>

              <Divider sx={{ my: 3 }} />

              {/* Payment Info */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment Method</h3>
                <p className="text-sm text-gray-700">
                  {order.paymentMethod === EMethodPayment.COD
                    ? "Cash on Delivery (COD)"
                    : order.paymentMethod === EMethodPayment.MOMO
                      ? "MoMo E-Wallet"
                      : "VNPay"}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Status: <span className="font-medium text-green-600">{order.status}</span>
                </p>
              </div>
            </>
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
              onClick={() => navigate("/orders")}
            >
              View My Orders
            </MyButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
