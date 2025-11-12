// src/services/userApi.ts
import type { ChangePasswordRequest } from "../types/requests/change-password.request";
import type { UserRequest } from "../types/requests/user.request";
import type { ApiResponse } from "../types/responses/api.response";
import type { UserResponse } from "../types/responses/user.response";

import axiosClient from "../utils/axiosClient";

const userApi = {
  getCurrentUser: (): Promise<ApiResponse<UserResponse>> => axiosClient.get("/users/customer").then((res) => res.data),

  updateUser: (data: UserRequest): Promise<ApiResponse<UserResponse>> =>
    axiosClient.put("/users/customer", data).then((res) => res.data),

  changePassword: (data: ChangePasswordRequest): Promise<ApiResponse<void>> =>
    axiosClient.put("/users/customer/changepassword", data).then((res) => res.data),
};

export default userApi;
