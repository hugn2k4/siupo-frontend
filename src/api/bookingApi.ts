import axiosClient from "../utils/axiosClient";
import type { BookingGuestRequest } from "../types/requests/book.request";
import type { BookingGuestResponse } from "../types/responses/book.response";
import type { PlaceTableCustomerRequest } from "../types/requests/book.request";
import type { PlaceTableCustomerResponse } from "../types/responses/book.response";
// Gọi API đặt bàn
export const bookingApi = {
  placeTableForGuest: async (data: BookingGuestRequest): Promise<BookingGuestResponse> => {
    const response = await axiosClient.post("/place-table-for-guest/place-table", data);
    return response.data;
  },
  async placeTableForCustomer(data: PlaceTableCustomerRequest): Promise<PlaceTableCustomerResponse> {
    const res = await axiosClient.post("/place-tables", data);
    return res.data;
  },
};
