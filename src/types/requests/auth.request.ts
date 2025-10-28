export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  phoneNumber: string;
  fullName: string;
}

export interface ForgotPasswordRequest {
  email: string;
  newPassword: string;
  otp: string;
}
