import type { Address } from "../models/address";

export interface AddressUpdateRequest {
  addressId: number;
  updateAddress: Address;
}
