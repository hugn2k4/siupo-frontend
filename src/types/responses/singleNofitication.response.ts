import type { Notification } from "../models/notification.ts";

export interface SingleNotificationResponse {
  success: boolean;
  code: string;
  message: string;
  data: Notification;
  timestamp: string;
}
