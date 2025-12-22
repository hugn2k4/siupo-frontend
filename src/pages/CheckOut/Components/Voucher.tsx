import { Check, Gift, Percent, Tag, Truck, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import voucherApi from "../../../api/voucherApi";
import { useSnackbar } from "../../../hooks/useSnackbar";
import type { VoucherResponse } from "../../../types/responses/voucher.response";

interface VoucherProps {
  onVoucherApply?: (voucherCode: string, discountAmount: number) => void;
  appliedVoucher?: string;
  onRemoveVoucher?: () => void;
  title?: string;
  orderAmount: number;
}

const Voucher: React.FC<VoucherProps> = ({
  onVoucherApply,
  appliedVoucher,
  onRemoveVoucher,
  title = "Discount Code",
  orderAmount,
}) => {
  const [voucherCode, setVoucherCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAvailableVouchers, setShowAvailableVouchers] = useState(false);
  const [availableVouchers, setAvailableVouchers] = useState<VoucherResponse[]>([]);
  const [loadingVouchers, setLoadingVouchers] = useState(false);
  const { showSnackbar } = useSnackbar();

  // Load danh sách voucher available khi component mount
  useEffect(() => {
    fetchAvailableVouchers();
  }, []);

  const fetchAvailableVouchers = async () => {
    setLoadingVouchers(true);
    try {
      const response = await voucherApi.getAvailableVouchers();
      setAvailableVouchers(response.data || []);
    } catch (err) {
      console.error("Failed to fetch vouchers:", err);
    } finally {
      setLoadingVouchers(false);
    }
  };

  const handleApplyVoucher = async () => {
    if (!voucherCode.trim()) {
      setError("Please enter discount code");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await voucherApi.validateVoucher(voucherCode.toUpperCase(), orderAmount);

      // Response structure: {success, code, message, data: {voucherCode, discountAmount, ...}}
      if (!response.data) {
        setError("Invalid response from server");
        return;
      }

      // Check success flag in response wrapper
      if (response.success && response.data.voucherCode) {
        onVoucherApply?.(response.data.voucherCode, response.data.discountAmount);
        setVoucherCode("");
        setError("");
        showSnackbar(response.data.message || "Voucher applied successfully!", "success");
      } else {
        const errorMsg = response.message || response.data.message || "Invalid or expired voucher code";
        setError(errorMsg);
        showSnackbar(errorMsg, "error");
      }
    } catch (err: unknown) {
      const errorMsg =
        (err as { response?: { data?: { message?: string } } }).response?.data?.message || "Failed to apply voucher";
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectVoucher = async (voucher: VoucherResponse) => {
    setIsLoading(true);
    try {
      const response = await voucherApi.validateVoucher(voucher.code, orderAmount);

      // Response structure: {success, code, message, data: {voucherCode, discountAmount, ...}}
      if (!response.data) {
        showSnackbar("Invalid response from server", "error");
        return;
      }

      // Check success flag in response wrapper
      if (response.success && response.data.voucherCode) {
        onVoucherApply?.(response.data.voucherCode, response.data.discountAmount);
        setShowAvailableVouchers(false);
        setError("");
        showSnackbar(response.data.message || "Voucher applied successfully!", "success");
      } else {
        showSnackbar(response.message || response.data.message || "Cannot apply this voucher", "error");
      }
    } catch (err: unknown) {
      showSnackbar(
        (err as { response?: { data?: { message?: string } } }).response?.data?.message || "Failed to apply voucher",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveVoucher = () => {
    onRemoveVoucher?.();
    setError("");
  };

  return (
    <div className="bg-white p-6 border border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <Tag className="text-primary" size={20} />
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>

      {/* Voucher đã áp dụng */}
      {appliedVoucher && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Check className="text-green-600" size={16} />
            <span className="text-green-700 font-medium">{appliedVoucher}</span>
            <span className="text-green-600 text-sm">applied</span>
          </div>
          <button onClick={handleRemoveVoucher} className="text-green-600 hover:text-green-800 p-1">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Form nhập voucher */}
      {!appliedVoucher && (
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={voucherCode}
                onChange={(e) => {
                  setVoucherCode(e.target.value.toUpperCase());
                  setError("");
                }}
                placeholder="Enter discount code"
                className={`w-full px-4 py-2.5 border ${error ? "border-red-400" : "border-primary/30"} focus:border-primary outline-none transition-colors font-medium text-gray-700 placeholder:text-gray-400`}
                disabled={isLoading}
              />
            </div>
            <button
              onClick={handleApplyVoucher}
              disabled={isLoading || !voucherCode.trim()}
              className="px-8 py-2.5 bg-primary hover:bg-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold transition-colors"
            >
              {isLoading ? "Applying..." : "Apply"}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="px-3 py-2 bg-red-50 border border-red-200 text-red-600 text-sm flex items-center gap-2">
              <X size={16} />
              <span>{error}</span>
            </div>
          )}

          {/* Toggle danh sách voucher */}
          <button
            onClick={() => setShowAvailableVouchers(!showAvailableVouchers)}
            className="text-primary hover:text-primary/80 text-sm font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Gift size={16} />
            {showAvailableVouchers ? "Hide available vouchers" : "View available vouchers"}
          </button>
        </div>
      )}

      {/* Danh sách voucher có sẵn */}
      {showAvailableVouchers && !appliedVoucher && (
        <div className="mt-4 space-y-3 max-h-64 overflow-y-auto">
          <h4 className="font-medium text-gray-700 text-sm">Available vouchers:</h4>
          {loadingVouchers ? (
            <div className="text-center py-4 text-gray-500 text-sm">Loading vouchers...</div>
          ) : availableVouchers.length === 0 ? (
            <div className="text-center py-4 text-gray-500 text-sm">No vouchers available</div>
          ) : (
            availableVouchers.map((voucher) => {
              const getVoucherIcon = () => {
                if (voucher.type === "FREE_SHIPPING") return <Truck size={14} />;
                if (voucher.type === "PERCENTAGE") return <Percent size={14} />;
                return <Tag size={14} />;
              };

              const getVoucherValue = () => {
                if (voucher.type === "FREE_SHIPPING") return "Free Shipping";
                if (voucher.type === "PERCENTAGE") return `${voucher.discountValue}% Off`;
                return `${new Intl.NumberFormat("vi-VN").format(voucher.discountValue)}₫ Off`;
              };

              const formatDate = (dateStr: string) => {
                return new Date(dateStr).toLocaleDateString("en-GB");
              };

              const canUse = !voucher.minOrderValue || orderAmount >= voucher.minOrderValue;

              return (
                <div
                  key={voucher.id}
                  className={`flex items-center gap-3 p-3 border transition-all ${
                    canUse
                      ? "border-primary/30 bg-white hover:border-primary hover:shadow-sm cursor-pointer"
                      : "border-gray-300 bg-gray-50 cursor-not-allowed opacity-60"
                  }`}
                  onClick={() => canUse && handleSelectVoucher(voucher)}
                >
                  {/* Left Icon Box */}
                  <div className="flex flex-col items-center justify-center min-w-[64px] p-2 bg-primary/5 border-2 border-dashed border-primary/30">
                    <div className="text-primary mb-1">{getVoucherIcon()}</div>
                    <span className="text-sm font-bold text-primary text-center leading-tight">
                      {getVoucherValue()}
                    </span>
                    <span className="text-[10px] text-primary font-semibold">OFF</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 mb-0.5">{voucher.name}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                      {voucher.minOrderValue && (
                        <span>Min: {new Intl.NumberFormat("vi-VN").format(voucher.minOrderValue)}₫</span>
                      )}
                      <span>Until: {formatDate(voucher.endDate)}</span>
                    </div>
                    {!canUse && voucher.minOrderValue && (
                      <p className="text-red-500 text-[10px] mt-0.5">
                        ⚠️ Min {new Intl.NumberFormat("vi-VN").format(voucher.minOrderValue)}₫ required
                      </p>
                    )}
                  </div>

                  {/* Code Badge */}
                  {canUse && (
                    <div className="bg-primary text-white px-3 py-1.5 text-xs font-bold font-mono">{voucher.code}</div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Ghi chú */}
      <div className="mt-4 p-3 bg-blue-50 borde border-blue-200 rounded-none">
        <div className="flex items-start gap-2">
          <Gift className="text-blue-600 mt-0.5" size={16} />
          <div className="text-sm text-blue-700">
            <p className="font-medium mb-1">Voucher usage notes:</p>
            <ul className="text-xs space-y-1">
              <li>• Only one voucher can be applied per order</li>
              <li>• Vouchers cannot be converted to cash</li>
              <li>• Check usage conditions before applying</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Voucher;
