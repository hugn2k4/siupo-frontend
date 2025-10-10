export const EGender = {
  MALE: "MALE",
  FEMALE: "FEMALE",
  OTHER: "OTHER",
} as const;

export type Gender = (typeof EGender)[keyof typeof EGender];
