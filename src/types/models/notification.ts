export interface Notification {
  id: number;
  title: string;
  content: string;
  status: "READ" | "UNREAD" | "DELETED";
  sentAt: string;
  userId: number;
}
