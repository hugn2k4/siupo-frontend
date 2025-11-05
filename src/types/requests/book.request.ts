export interface BookingRequest {
  fullname: string;
  phoneNumber: string;
  email?: string | null;
  memberInt: number;
  startedAt: string;
  note?: string | null;
}
