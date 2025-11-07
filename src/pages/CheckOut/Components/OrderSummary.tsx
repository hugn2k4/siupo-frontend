import { Skeleton } from "@mui/material";
import { ArrowRight } from "lucide-react";
import React from "react";
import MyButton from "../../../components/common/Button";
import { EMethodPayment, type MethodPayment } from "../../../types/enums/methodPayment.enum";
import type { OrderItem as OrderItemType } from "../../../types/models/orderItem";
import { formatCurrency } from "../../../utils/format";
import OrderItemComponent from "./OrderItem";

interface OrderSummaryProps {
  items: OrderItemType[];
  subtotal: number;
  shipping: number;
  discount: number;
  vat: number;
  total: number;
  selectedPaymentMethod?: MethodPayment;
  onProceedToPayment?: () => void;
  loading?: boolean;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  subtotal,
  shipping,
  vat,
  discount,
  total,
  selectedPaymentMethod = EMethodPayment.MOMO,
  onProceedToPayment,
  loading = false,
}) => (
  <div className="bg-white shadow-sm p-6 border border-gray-200">
    <h3 className="text-lg font-semibold mb-4">Your Order Detail</h3>

    {/* Danh sách món ăn */}
    <div className="divide-y divide-gray-100">
      {loading ? (
        <>
          {[1, 2].map((i) => (
            <div key={i} className="py-3 flex gap-3">
              <Skeleton variant="rectangular" width={60} height={60} />
              <div className="flex-1">
                <Skeleton variant="text" width="80%" height={20} />
                <Skeleton variant="text" width="40%" height={16} sx={{ mt: 0.5 }} />
              </div>
              <div className="text-right">
                <Skeleton variant="text" width={60} height={20} />
                <Skeleton variant="text" width={50} height={16} sx={{ mt: 0.5 }} />
              </div>
            </div>
          ))}
        </>
      ) : (
        items.map((item, index) => <OrderItemComponent key={index} item={item} />)
      )}
    </div>

    {/* Tóm tắt chi phí */}
    <div className="mt-6 pt-4 border-t border-gray-300 space-y-2">
      <div className="flex justify-between text-sm">
        <span>Subtotal</span>
        <span>{formatCurrency(subtotal, "USD")}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span>Shipping fee</span>
        <span className="text-green-600">{shipping === 0 ? "Free" : `$${shipping.toLocaleString()}`}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span>Discount</span>
        <span className="text-red-500">{discount > 0 ? `- $${discount.toLocaleString()}` : "- $0"}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span>VAT (10%)</span>
        <span>${vat.toFixed(2)}</span>
      </div>
      <div className="flex justify-between font-semibold text-lg pt-2 border-t border-gray-300">
        <span>Total</span>
        <span>{formatCurrency(total, "USD")}</span>
      </div>
    </div>

    {/* Nút thanh toán */}
    <MyButton
      fullWidth
      colorScheme="orange"
      onClick={onProceedToPayment}
      endIcon={<ArrowRight size={16} />}
      sx={{ mt: 3, borderRadius: 0 }}
      disabled={loading}
    >
      {loading ? "Processing..." : selectedPaymentMethod === EMethodPayment.COD ? "Place Order" : "Pay Now"}
    </MyButton>

    {/* Thông tin phương thức thanh toán đã chọn */}
    <div className="mt-4 text-center text-sm text-gray-600">
      {selectedPaymentMethod === EMethodPayment.MOMO && "Payment via MoMo e-wallet"}
      {selectedPaymentMethod === EMethodPayment.VNPAY && "Payment via VNPay gateway"}
      {selectedPaymentMethod === EMethodPayment.COD && "Cash on Delivery (COD)"}
    </div>
  </div>
);

export default OrderSummary;
