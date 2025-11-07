export interface BookingGuestRequest {
  fullname: string;
  phoneNumber: string;
  email?: string | null;
  memberInt: number;
  startedAt: string;
  note?: string | null;
}
export interface PlaceTableCustomerRequest {
  fullname: string;
  phoneNumber: string;
  email: string | null;
  memberInt: number;
  startedAt: string; // ISO string format
  note: string | null;
  preOrderItems: Array<{
    productId: number;
    quantity: number;
    price: number;
    note: string | null;
  }> | null;
}
