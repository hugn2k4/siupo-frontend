import authApi from "../api/authApi";
import type { LoginRequest } from "../types/auth";

export const authService = {
  login: async (data: LoginRequest) => {
    const res = await authApi.login(data);
    localStorage.setItem("token", res.token);
    return res;
  },
  logout: () => {
    localStorage.removeItem("token");
    return authApi.logout();
  },
};
