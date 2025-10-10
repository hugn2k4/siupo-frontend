import authApi from "../api/authApi";
import type { LoginRequest, RegisterRequest } from "../types/requests/auth.request";

export const authService = {
  login: async (data: LoginRequest) => {
    const res = await authApi.login(data);

    if (res.success && res.data) {
      const accessToken = res.data.accessToken;
      if (accessToken) {
        localStorage.setItem("token", accessToken);
      }
    }
    return res;
  },

  register: async (data: RegisterRequest) => {
    const res = await authApi.register(data);
    return res;
  },
};
