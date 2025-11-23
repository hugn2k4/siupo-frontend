import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Link as MuiLink,
} from "@mui/material";
import { format } from "date-fns";
import orderApi from "../../../api/orderApi";
import type { OrderResponse } from "../../../types/responses/order.reponse";

export default function OrderHistoryTable() {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const response = await orderApi.getMyOrders();

        if (response.success && response.data) {
          const sortedOrders = [...response.data].sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          setOrders(sortedOrders);
        } else {
          setError(response.message || "Không thể tải đơn hàng");
        }
      } catch (err) {
        if (err && typeof err === "object" && "response" in err) {
          const errorResponse = err as { response?: { data?: { message?: string } } };
          setError(errorResponse.response?.data?.message || "Đã có lỗi xảy ra");
        } else {
          setError("Đã có lỗi xảy ra");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, []);

  // Màu nhạt + trong suốt + viền nhẹ – cực đẹp & hiện đại
  const getStatusChipProps = (status: string) => {
    switch (status) {
      case "PENDING":
        return { label: "Pending", bg: "#FFF4E5", color: "#FF8A00", border: "#FFD8B1" };
      case "CONFIRMED":
        return { label: "Confirmed", bg: "#EBF5FF", color: "#0066CC", border: "#B3D9FF" };
      case "SHIPPING":
        return { label: "Shipping", bg: "#E5F9FF", color: "#0088A3", border: "#B3E8FF" };
      case "DELIVERED":
        return { label: "Delivered", bg: "#E6F7ED", color: "#00994D", border: "#B3E6CC" };
      case "COMPLETED":
        return { label: "Completed", bg: "#E6F7ED", color: "#006633", border: "#B3E6CC" };
      case "CANCELED":
        return { label: "Canceled", bg: "#FFF0F0", color: "#CC0000", border: "#FFB3B3" };
      default:
        return { label: status, bg: "#F3F4F6", color: "#374151", border: "#D1D5DB" };
    }
  };

  const formatTotal = (order: OrderResponse) => {
    const total = order.totalPrice + order.shippingFee + order.vat;
    const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
    return `$${total.toFixed(2)} (${itemCount} Product${itemCount > 1 ? "s" : ""})`;
  };

  if (loading) {
    return (
      <Paper sx={{ p: 4, textAlign: "center" }}>
        <CircularProgress />
      </Paper>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Paper elevation={0} sx={{ border: "1px solid #eee", borderRadius: 2, overflow: "hidden" }}>
      <Box
        sx={{
          p: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #eee",
          backgroundColor: "#fafafa",
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          Recent Order History
        </Typography>
        <MuiLink href="/orders" underline="hover" color="primary" fontWeight={500}>
          View All
        </MuiLink>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f9fafb" }}>
              <TableCell sx={{ fontWeight: 600 }}>Order ID</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Total</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 6, color: "#888" }}>
                  You have no orders yet.
                </TableCell>
              </TableRow>
            ) : (
              orders.slice(0, 6).map((order) => {
                const chip = getStatusChipProps(order.status);

                return (
                  <TableRow key={order.orderId} hover sx={{ "&:hover": { backgroundColor: "#f9f9f9" } }}>
                    <TableCell>#{order.orderId}</TableCell>
                    <TableCell>{order.createdAt ? format(new Date(order.createdAt), "dd MMM, yyyy") : "-"}</TableCell>
                    <TableCell>{formatTotal(order)}</TableCell>

                    {/* Trạng thái – nhạt, trong suốt, có viền */}
                    <TableCell>
                      <Box
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 2,
                          border: `1px solid ${chip.border}`,
                          backgroundColor: chip.bg,
                          opacity: 0.9,
                          transition: "all 0.2s",
                          "&:hover": {
                            opacity: 1,
                            transform: "translateY(-1px)",
                          },
                        }}
                      >
                        <Typography
                          variant="caption"
                          fontWeight={600}
                          fontSize="0.75rem"
                          color={chip.color}
                          letterSpacing="0.5px"
                        >
                          {chip.label}
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell align="right">
                      <MuiLink href="/orders" underline="hover" color="primary" fontWeight={500}>
                        View Details
                      </MuiLink>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
