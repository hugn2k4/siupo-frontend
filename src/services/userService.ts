import addressApi from "../api/addressApi";
import userApi from "../api/userApi";
import type { Address } from "../types/models/address";
import type { AddressUpdateRequest } from "../types/requests/address-update.request";

const userService = {
  getCurrentUser: async () => {
    const res = await userApi.getCurrentUser();
    return res;
  },

  getDefaultAddress: async () => {
    const res = await addressApi.getDefaultAddress();
    return res;
  },

  setDefaultAddress: async (address: Address) => {
    const res = await addressApi.setDefaultAddress(address.id!);
    return res;
  },

  getAddresses: async () => {
    const res = await addressApi.getAddresses();
    return res;
  },

  addAddress: async (data: Address) => {
    const res = await addressApi.addAddress(data);
    return res;
  },

  updateAddress: async (data: AddressUpdateRequest) => {
    const res = await addressApi.updateAddress(data);
    return res;
  },

  deleteAddress: async (addressId: number) => {
    const res = await addressApi.deleteAddress(addressId);
    return res;
  },
};

export default userService;
