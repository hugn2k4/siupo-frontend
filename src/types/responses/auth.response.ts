import type { ApiResponse } from "./api.response";

export type LoginDataResponse = {
  message: string;
  accessToken: string;
};

export type LoginResponse = ApiResponse<LoginDataResponse>;
