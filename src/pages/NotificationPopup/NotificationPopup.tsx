import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import {
  alpha,
  Backdrop,
  Badge,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Modal,
  Popover,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import notificationApi from "../../api/notificationApi.ts";
import type { Notification } from "../../types/models/notification.ts";

interface NotificationDetailDialogProps {
  notification: Notification | null;
  open: boolean;
  onClose: () => void;
}

const NotificationDetailDialog = ({ notification, open, onClose }: NotificationDetailDialogProps) => {
  if (!notification) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          },
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: 500,
          width: "90%",
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 0,
          outline: "none",
        }}
      >
        <Box sx={{ p: 3, position: "relative" }}>
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "grey.500",
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, pr: 4 }}>
            {notification.title}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 2 }}>
            {new Date(notification.sentAt).toLocaleString("vi-VN")}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="body2" sx={{ whiteSpace: "pre-wrap", lineHeight: 1.6 }}>
            {notification.content}
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};

const NotificationPopup = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [loading, setLoading] = useState(false);

  const unreadCount = notifications.filter((n) => n.status === "UNREAD").length;

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const response = await notificationApi.getMyNotifications();
      setNotifications(response.data || []);
    } catch (error) {
      console.error("Error loading notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = async (notification: Notification) => {
    // Đánh dấu đã đọc nếu chưa đọc
    if (notification.status === "UNREAD") {
      try {
        await notificationApi.markAsRead(notification.id);
        setNotifications((prev) => prev.map((n) => (n.id === notification.id ? { ...n, status: "READ" as const } : n)));
      } catch (error) {
        console.error("Error marking as read:", error);
      }
    }

    // Hiển thị chi tiết
    setSelectedNotification(notification);
    setShowDetail(true);
  };

  const handleDelete = async (notificationId: number, event: React.MouseEvent) => {
    event.stopPropagation();

    if (!window.confirm("Bạn có chắc muốn xóa thông báo này?")) {
      return;
    }

    try {
      await notificationApi.deleteNotification(notificationId);
      setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
    } catch (error) {
      console.error("Error deleting notification:", error);
      alert("Không thể xóa thông báo");
    }
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        sx={{
          color: "white",
          "&:hover": {
            color: "var(--color-primary)",
          },
          transition: "all 0.2s ease",
          p: { xs: 1, md: 1.5 },
        }}
      >
        <Badge
          badgeContent={unreadCount}
          color="error"
          sx={{
            "& .MuiBadge-badge": {
              animation: unreadCount > 0 ? "pulse 2s infinite" : "none",
              top: -12,
              right: -8,
              "@keyframes pulse": {
                "0%": {
                  transform: "scale(1)",
                  opacity: 1,
                },
                "50%": {
                  transform: "scale(1.1)",
                  opacity: 0.8,
                },
                "100%": {
                  transform: "scale(1)",
                  opacity: 1,
                },
              },
            },
          }}
        >
          <NotificationsOutlinedIcon sx={{ fontSize: { xs: 20, md: 24 } }} />
        </Badge>
      </IconButton>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{
          mt: 1,
          "& .MuiPaper-root": {
            width: 380,
            maxHeight: 500,
            borderRadius: 2,
            boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
          },
        }}
      >
        <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Notifications
          </Typography>
          {unreadCount > 0 && (
            <Typography variant="caption" color="primary">
              You have {unreadCount} unread {unreadCount === 1 ? "notification" : "notifications"}
            </Typography>
          )}
        </Box>

        {loading ? (
          <Box sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              Đang tải...
            </Typography>
          </Box>
        ) : notifications.length === 0 ? (
          <Box sx={{ p: 3, textAlign: "center" }}>
            <NotificationsOutlinedIcon sx={{ fontSize: 48, color: "text.disabled", mb: 1 }} />
            <Typography variant="body2" color="text.secondary">
              Chưa có thông báo nào
            </Typography>
          </Box>
        ) : (
          <List sx={{ p: 0, maxHeight: 400, overflowY: "auto" }}>
            {notifications.map((notification, index) => (
              <Box key={notification.id}>
                <ListItem
                  onClick={() => handleNotificationClick(notification)}
                  sx={{
                    cursor: "pointer",
                    opacity: notification.status === "READ" ? 0.6 : 1,
                    bgcolor: notification.status === "UNREAD" ? alpha("#1976d2", 0.05) : "transparent",
                    transition: "all 0.2s",
                    "&:hover": {
                      bgcolor: alpha("#1976d2", 0.1),
                    },
                    position: "relative",
                    pl: 3,
                  }}
                >
                  {notification.status === "UNREAD" && (
                    <Box
                      sx={{
                        position: "absolute",
                        left: 12,
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: "error.main",
                        animation: "glow 2s infinite",
                        "@keyframes glow": {
                          "0%, 100%": {
                            boxShadow: "0 0 4px rgba(211, 47, 47, 0.8)",
                          },
                          "50%": {
                            boxShadow: "0 0 8px rgba(211, 47, 47, 1)",
                          },
                        },
                      }}
                    />
                  )}

                  <ListItemText
                    primary={
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: notification.status === "UNREAD" ? 600 : 400,
                          mb: 0.5,
                        }}
                      >
                        {notification.title}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            mb: 0.5,
                            lineHeight: 1.4,
                          }}
                        >
                          {notification.content}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(notification.sentAt).toLocaleString("vi-VN")}
                        </Typography>
                      </>
                    }
                  />

                  <IconButton
                    size="small"
                    onClick={(e) => handleDelete(notification.id, e)}
                    sx={{
                      ml: 1,
                      "&:hover": {
                        color: "error.main",
                      },
                    }}
                  >
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                </ListItem>
                {index < notifications.length - 1 && <Divider />}
              </Box>
            ))}
          </List>
        )}
      </Popover>

      <NotificationDetailDialog
        notification={selectedNotification}
        open={showDetail}
        onClose={() => setShowDetail(false)}
      />
    </>
  );
};

export default NotificationPopup;
