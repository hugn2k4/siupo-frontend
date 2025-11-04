export interface UserRequest {
  fullName: string;
  phoneNumber: string;
  dateOfBirth?: string; // "1990-01-01"
  gender?: "MALE" | "FEMALE" | "OTHER";
}
