import axiosClient from "../utils/axiosClient";
import type { NotificationResponse } from "../types/responses/notification.response";
import type { SingleNotificationResponse } from "../types/responses/singleNofitication.response";
const notificationApi = {
  // Lấy thông báo của user hiện tại
  getMyNotifications: (): Promise<NotificationResponse> => axiosClient.get("/notifications/customer"),

  // Đánh dấu đã đọc
  markAsRead: (notificationId: number): Promise<SingleNotificationResponse> =>
    axiosClient.put(`/notifications/customer/${notificationId}/read`),

  // Xóa thông báo
  deleteNotification: (notificationId: number): Promise<void> =>
    axiosClient.delete(`/notifications/customer/${notificationId}`),
};

export default notificationApi;
