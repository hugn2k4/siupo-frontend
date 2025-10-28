import axiosClient from "../utils/axiosClient";

export interface BookingRequest {
  fullname: string;
  phoneNumber: string;
  email?: string | null;
  memberInt: number;
  startedAt: string;
  note?: string | null;
}

export interface BookingResponse {
  success: boolean;
  message?: string;
}

// Gọi API đặt bàn
export const bookingApi = {
  placeTable: async (data: BookingRequest): Promise<BookingResponse> => {
    const response = await axiosClient.post("/place-table-for-guest/place-table", data);
    return response.data;
  },
};
