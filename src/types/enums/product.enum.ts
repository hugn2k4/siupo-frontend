export const EProductStatus = {
  AVAILABLE: "AVAILABLE",
  UNAVAILABLE: "UNAVAILABLE",
} as const;

export type ProductStatus = (typeof EProductStatus)[keyof typeof EProductStatus];
