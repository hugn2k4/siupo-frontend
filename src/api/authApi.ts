import type { ForgotPasswordRequest, LoginRequest, RegisterRequest } from "../types/requests/auth.request";
import type { ApiResponse } from "../types/responses/api.response";
import type { LoginResponse } from "../types/responses/auth.response";
import axiosClient from "../utils/axiosClient";

const authApi = {
  login: (data: LoginRequest): Promise<LoginResponse> =>
    axiosClient.post("/auth/login", data).then((response) => response.data),

  register: (data: RegisterRequest): Promise<ApiResponse> =>
    axiosClient.post("/auth/register", data).then((response) => response.data),

  confirm: (data: { email: string; otp: string }): Promise<ApiResponse> =>
    axiosClient.post("/auth/confirm", data).then((response) => response.data),

  resendOTp: (email: string): Promise<ApiResponse> =>
    axiosClient
      .post(`/auth/resend-otp`, null, {
        params: { email },
      })
      .then((response) => response.data),

  refreshToken: (): Promise<LoginResponse> => axiosClient.post("/auth/refresh-token").then((response) => response.data),

  logout: (): Promise<ApiResponse> => axiosClient.post("/api/logout").then((response) => response.data),

  requestForgotPassword: (email: string): Promise<ApiResponse> =>
    axiosClient.post("/auth/request-forgot-password", null, { params: { email } }).then((response) => response.data),

  setNewPassword: (data: ForgotPasswordRequest): Promise<ApiResponse> =>
    axiosClient.post("/auth/set-new-password", data).then((response) => response.data),
};

export default authApi;
