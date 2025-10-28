import type { User } from "../models/user";
import type { ApiResponse } from "./api.response";

export type LoginDataResponse = {
  message: string;
  accessToken: string;
  user: User;
};

export type LoginResponse = ApiResponse<LoginDataResponse>;
