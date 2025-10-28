import authApi from "../api/authApi";
import type { ForgotPasswordRequest, LoginRequest, RegisterRequest } from "../types/requests/auth.request";

export const authService = {
  login: async (data: LoginRequest) => {
    const res = await authApi.login(data);

    if (res.success && res.data) {
      const { accessToken, user } = res.data;
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
      }
      if (user) {
        const userObj = typeof user === "string" ? JSON.parse(user) : user;
        localStorage.setItem("user", JSON.stringify(userObj));
      }
    }
    return res;
  },

  register: async (data: RegisterRequest) => {
    const res = await authApi.register(data);
    return res;
  },

  confirm: async (data: { email: string; otp: string }) => {
    const res = await authApi.confirm(data);
    return res;
  },

  resendOTP: async (email: string) => {
    const res = await authApi.resendOTp(email);
    return res;
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    return authApi.logout();
  },

  requestForgotPassword: async (email: string) => {
    const res = await authApi.requestForgotPassword(email);
    return res;
  },

  setNewPassword: async (data: ForgotPasswordRequest) => {
    const res = await authApi.setNewPassword(data);
    return res;
  },
};
