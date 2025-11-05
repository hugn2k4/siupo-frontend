// src/services/userApi.ts
import type { ApiResponse } from "../types/responses/api.response";
import type { UserResponse } from "../types/responses/user.response";
import type { AddressDTO } from "../types/dto/address.dto";
import type { AddressUpdateRequest } from "../types/requests/address-update.request";
import type { UserRequest } from "../types/requests/user.request";
import type { ChangePasswordRequest } from "../types/requests/change-password.request";

import axiosClient from "../utils/axiosClient";

const userApi = {
  // === USER INFO ===
  getCurrentUser: (): Promise<ApiResponse<UserResponse>> => axiosClient.get("/users/customer").then((res) => res.data),

  updateUser: (data: UserRequest): Promise<ApiResponse<UserResponse>> =>
    axiosClient.put("/users/customer", data).then((res) => res.data),

  changePassword: (data: ChangePasswordRequest): Promise<ApiResponse<void>> =>
    axiosClient.put("/users/customer/changepassword", data).then((res) => res.data),

  // === ĐỊA CHỈ ===
  getAddresses: (): Promise<ApiResponse<AddressDTO[]>> =>
    axiosClient.get("/users/customer/addresses").then((res) => res.data),

  addAddress: (data: AddressDTO): Promise<ApiResponse<AddressDTO>> =>
    axiosClient.post("/users/customer/addresses", data).then((res) => res.data),

  // CẬP NHẬT: Gửi cả oldAddress + newAddress (đều đầy đủ)
  updateAddress: (request: AddressUpdateRequest): Promise<ApiResponse<AddressDTO>> =>
    axiosClient.put("/users/customer/addresses", request).then((res) => res.data),

  // XÓA: Gửi toàn bộ AddressDTO
  deleteAddress: (data: AddressDTO): Promise<ApiResponse<void>> =>
    axiosClient.delete("/users/customer/addresses", { data }).then((res) => res.data),

  // ĐẶT MẶC ĐỊNH: Gửi toàn bộ AddressDTO
  setDefaultAddress: (data: AddressDTO): Promise<ApiResponse<AddressDTO>> =>
    axiosClient.patch("/users/customer/addresses/default", data).then((res) => res.data),

  getDefaultAddress: (): Promise<ApiResponse<AddressDTO>> =>
    axiosClient.get("/users/customer/addresses/default").then((res) => res.data),
};

export default userApi;
