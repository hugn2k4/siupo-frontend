import authApi from "../api/authApi";
import type { LoginRequest, RegisterRequest } from "../types/requests/auth.request";

export const authService = {
  login: async (data: LoginRequest) => {
    const res = await authApi.login(data);

    if (res.success && res.data) {
      const accessToken = res.data.accessToken;
      if (accessToken) {
        localStorage.setItem("token", accessToken);
        // Dispatch auth state change event after token is saved
        window.dispatchEvent(new Event("authStateChange"));
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
    localStorage.removeItem("token");
    // Dispatch auth state change event after token is removed
    window.dispatchEvent(new Event("authStateChange"));
    return authApi.logout();
  },
};
