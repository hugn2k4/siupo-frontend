export interface BookingGuestResponse {
  success: boolean;
  code?: string;
  message?: string;
  data?: {
    id: number;
    fullname: string;
    phoneNumber: string;
    email: string;
    memberInt: number;
    status: string;
    startedAt: string;
    note?: string;
    createdAt: string;
  };
  timestamp?: string;
}
export interface PlaceTableCustomerResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    member: number;
    status: string;
    totalPrice: number;
    startedAt: string;
    createdAt: string;
    note: string;
    hasPreOrder: boolean;
    items: Array<{
      id: number;
      quantity: number;
      price: number;
      note: string;
      product: {
        id: number;
        name: string;
        price: number;
        imageUrl: string;
      };
    }>;
  };
}
