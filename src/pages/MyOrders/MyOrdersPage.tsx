import { Box, Chip, CircularProgress, Container, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSnackbar } from "../../hooks/useSnackbar";
import orderService from "../../services/orderService";
import { EOrderStatus, type OrderStatus } from "../../types/enums/order.enum";
import type { OrderResponse } from "../../types/responses/order.reponse";
import OrderCard from "./components/OrderCard";
import OrderDetailDialog from "./components/OrderDetailDialog";

const MyOrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<string>("ALL");
  const [selectedOrder, setSelectedOrder] = useState<OrderResponse | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const { showSnackbar } = useSnackbar();

  const tabs: Array<{ label: string; value: string; status?: OrderStatus }> = [
    { label: "All Orders", value: "ALL" },
    { label: "Pending", value: EOrderStatus.PENDING, status: EOrderStatus.PENDING },
    { label: "Confirmed", value: EOrderStatus.CONFIRMED, status: EOrderStatus.CONFIRMED },
    { label: "Shipping", value: EOrderStatus.SHIPPING, status: EOrderStatus.SHIPPING },
    { label: "Delivered", value: EOrderStatus.DELIVERED, status: EOrderStatus.DELIVERED },
    { label: "Completed", value: EOrderStatus.COMPLETED, status: EOrderStatus.COMPLETED },
    { label: "Canceled", value: EOrderStatus.CANCELED, status: EOrderStatus.CANCELED },
  ];

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await orderService.getMyOrders();
      if (response.success && response.data) {
        setOrders(response.data);
        setFilteredOrders(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      showSnackbar("Failed to load orders", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedTab === "ALL") {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter((order) => order.status === selectedTab));
    }
  }, [selectedTab, orders]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };

  const handleViewDetail = (order: OrderResponse) => {
    setSelectedOrder(order);
    setDetailDialogOpen(true);
  };

  const handleCancelOrder = async (orderId: number) => {
    try {
      const response = await orderService.cancelOrder(orderId);
      if (response.success) {
        showSnackbar("Order cancelled successfully", "success");
        // Update order status locally without refetching to preserve tab selection
        setOrders((prev) =>
          prev.map((order) => (order.orderId === orderId ? { ...order, status: EOrderStatus.CANCELED } : order))
        );
      }
    } catch (error) {
      console.error("Failed to cancel order:", error);
      showSnackbar("Failed to cancel order", "error");
    }
  };

  const handleReorder = () => {
    // TODO: Navigate to menu/shop with items - will use order.items
    showSnackbar("Feature coming soon", "info");
  };

  const getOrderStats = () => {
    return {
      all: orders.length,
      pending: orders.filter((o) => o.status === EOrderStatus.PENDING).length,
      confirmed: orders.filter((o) => o.status === EOrderStatus.CONFIRMED).length,
      shipping: orders.filter((o) => o.status === EOrderStatus.SHIPPING).length,
      delivered: orders.filter((o) => o.status === EOrderStatus.DELIVERED).length,
      completed: orders.filter((o) => o.status === EOrderStatus.COMPLETED).length,
      canceled: orders.filter((o) => o.status === EOrderStatus.CANCELED).length,
    };
  };

  const stats = getOrderStats();

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress sx={{ color: "var(--color-primary)" }} />
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "#f9fafb", minHeight: "100vh", py: 6 }}>
      <Container maxWidth="xl">
        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4, bgcolor: "#f9fafb" }}>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              "& .MuiTab-root": {
                textTransform: "none",
                fontWeight: 600,
                fontSize: "0.95rem",
                color: "var(--color-gray3)",
                "&.Mui-selected": {
                  color: "var(--color-primary)",
                },
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "var(--color-primary)",
                height: 3,
              },
            }}
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.value}
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <span>{tab.label}</span>
                    {tab.value === "ALL" && stats.all > 0 && (
                      <Chip
                        label={stats.all}
                        size="small"
                        sx={{
                          height: 20,
                          fontSize: "0.75rem",
                          bgcolor: selectedTab === tab.value ? "var(--color-primary)" : "grey.300",
                          color: selectedTab === tab.value ? "white" : "grey.700",
                        }}
                      />
                    )}
                    {tab.status === EOrderStatus.PENDING && stats.pending > 0 && (
                      <Chip
                        label={stats.pending}
                        size="small"
                        sx={{
                          height: 20,
                          fontSize: "0.75rem",
                          bgcolor: selectedTab === tab.value ? "var(--color-primary)" : "grey.300",
                          color: selectedTab === tab.value ? "white" : "grey.700",
                        }}
                      />
                    )}
                    {tab.status === EOrderStatus.CONFIRMED && stats.confirmed > 0 && (
                      <Chip
                        label={stats.confirmed}
                        size="small"
                        sx={{
                          height: 20,
                          fontSize: "0.75rem",
                          bgcolor: selectedTab === tab.value ? "var(--color-primary)" : "grey.300",
                          color: selectedTab === tab.value ? "white" : "grey.700",
                        }}
                      />
                    )}
                    {tab.status === EOrderStatus.SHIPPING && stats.shipping > 0 && (
                      <Chip
                        label={stats.shipping}
                        size="small"
                        sx={{
                          height: 20,
                          fontSize: "0.75rem",
                          bgcolor: selectedTab === tab.value ? "var(--color-primary)" : "grey.300",
                          color: selectedTab === tab.value ? "white" : "grey.700",
                        }}
                      />
                    )}
                    {tab.status === EOrderStatus.DELIVERED && stats.delivered > 0 && (
                      <Chip
                        label={stats.delivered}
                        size="small"
                        sx={{
                          height: 20,
                          fontSize: "0.75rem",
                          bgcolor: selectedTab === tab.value ? "var(--color-primary)" : "grey.300",
                          color: selectedTab === tab.value ? "white" : "grey.700",
                        }}
                      />
                    )}
                    {tab.status === EOrderStatus.COMPLETED && stats.completed > 0 && (
                      <Chip
                        label={stats.completed}
                        size="small"
                        sx={{
                          height: 20,
                          fontSize: "0.75rem",
                          bgcolor: selectedTab === tab.value ? "var(--color-primary)" : "grey.300",
                          color: selectedTab === tab.value ? "white" : "grey.700",
                        }}
                      />
                    )}
                    {tab.status === EOrderStatus.CANCELED && stats.canceled > 0 && (
                      <Chip
                        label={stats.canceled}
                        size="small"
                        sx={{
                          height: 20,
                          fontSize: "0.75rem",
                          bgcolor: selectedTab === tab.value ? "var(--color-primary)" : "grey.300",
                          color: selectedTab === tab.value ? "white" : "grey.700",
                        }}
                      />
                    )}
                  </Box>
                }
                value={tab.value}
              />
            ))}
          </Tabs>
        </Box>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <Box
            sx={{
              bgcolor: "white",
              p: 8,
              textAlign: "center",
              borderRadius: 2,
              border: "1px solid",
              borderColor: "grey.200",
            }}
          >
            <Typography variant="h6" color="var(--color-gray3)" gutterBottom>
              No orders found
            </Typography>
            <Typography variant="body2" color="var(--color-gray3)">
              {selectedTab === "ALL" ? "You haven't placed any orders yet" : `No ${selectedTab.toLowerCase()} orders`}
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {filteredOrders.map((order) => (
              <OrderCard
                key={order.orderId}
                order={order}
                onViewDetail={handleViewDetail}
                onCancel={handleCancelOrder}
                onReorder={handleReorder}
              />
            ))}
          </Box>
        )}
      </Container>

      {/* Order Detail Dialog */}
      {selectedOrder && (
        <OrderDetailDialog
          open={detailDialogOpen}
          order={selectedOrder}
          onClose={() => {
            setDetailDialogOpen(false);
            setSelectedOrder(null);
          }}
          onCancel={handleCancelOrder}
          onReorder={handleReorder}
        />
      )}
    </Box>
  );
};

export default MyOrdersPage;
