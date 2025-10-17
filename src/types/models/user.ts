import type { Gender } from "../enums/gender.enum";

export interface User {
  id?: number;
  email: string;
  fullName: string;
  dateOfBirth?: string;
  phoneNumber: string;
  gender?: Gender;
  role?: string;
}
