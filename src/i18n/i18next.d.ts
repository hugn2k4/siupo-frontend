// Type definitions for i18next resources
import "i18next";
import { resources } from "./config";

declare module "i18next" {
  interface CustomTypeOptions {
    // Make resources type-safe
    resources: (typeof resources)["vi"];

    // Make t() function return type more specific
    returnNull: false;
  }
}
