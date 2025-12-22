import type { ImageResponse } from "./image.response";

export interface UserResponse {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: string;
  dateOfBirth?: string;
  gender?: string;
  avatar?: ImageResponse;
}
