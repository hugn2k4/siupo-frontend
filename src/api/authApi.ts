import axiosClient from "../utils/axiosClient";
import type { User } from "../types/user";
import type { LoginRequest, LoginResponse } from "../types/auth";

const authApi = {
  login: (data: LoginRequest): Promise<LoginResponse> =>
    axiosClient.post("/auth/login", data),

  register: (user: User): Promise<string> =>
    axiosClient.post("/auth/register", user),

  logout: () => axiosClient.post("/api/logout"),
};

export default authApi;
