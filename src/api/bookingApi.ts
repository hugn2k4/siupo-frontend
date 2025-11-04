import axiosClient from "../utils/axiosClient";
import type { BookingRequest } from "../types/requests/book.request";
import type { BookingResponse } from "../types/responses/book.response";
// Gọi API đặt bàn
export const bookingApi = {
  placeTable: async (data: BookingRequest): Promise<BookingResponse> => {
    const response = await axiosClient.post("/place-table-for-guest/place-table", data);
    return response.data;
  },
};
