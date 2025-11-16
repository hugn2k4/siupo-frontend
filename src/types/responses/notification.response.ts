import type { Notification } from "../models/notification.ts";

export interface NotificationResponse {
  success: boolean;
  code: string;
  message: string;
  data: Notification[];
  timestamp: string;
}
