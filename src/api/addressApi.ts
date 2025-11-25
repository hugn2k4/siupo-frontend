import type { Address } from "../types/models/address";
import type { AddressUpdateRequest } from "../types/requests/address-update.request";
import type { AddressResponse } from "../types/responses/address.reponse";
import type { ApiResponse } from "../types/responses/api.response";
import axiosClient from "../utils/axiosClient";

const addressApi = {
  getAddresses: (): Promise<ApiResponse<AddressResponse[]>> =>
    axiosClient.get("/address").then((response) => response.data),

  addAddress: (data: Address): Promise<ApiResponse<AddressResponse>> =>
    axiosClient.post("/address", data).then((res) => res.data),

  updateAddress: (data: AddressUpdateRequest): Promise<ApiResponse<AddressResponse>> =>
    axiosClient.put("/address", data).then((res) => res.data),

  deleteAddress: (addressId: number): Promise<ApiResponse> =>
    axiosClient.delete("/address", { params: { addressId } }).then((res) => res.data),

  getDefaultAddress: (): Promise<ApiResponse<AddressResponse>> =>
    axiosClient.get("/address/default").then((res) => res.data),

  setDefaultAddress: (addressId: number): Promise<ApiResponse<AddressResponse>> =>
    axiosClient.put(`/address/default/${addressId}`).then((res) => res.data),
};
export default addressApi;
