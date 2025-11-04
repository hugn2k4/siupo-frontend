// src/types/dto/address-update.request.ts
import type { AddressDTO } from "../dto/address.dto";

export interface AddressUpdateRequest {
  oldAddress: AddressDTO;
  newAddress: AddressDTO;
}
