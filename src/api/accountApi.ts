// src/accountApi.ts
import axiosClient from "../utils/axiosClient";

// ==================== TYPES ====================

export interface UserResponse {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: string;
  dateOfBirth?: string;
  gender?: string;
}

export interface UserRequest {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  gender?: string;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface AddressDTO {
  addressLine: string;
  ward: string;
  district: string;
  province: string;
  receiverName: string;
  receiverPhone: string;
}

export interface AddressResponse {
  id: number;
  addressLine: string;
  ward: string;
  district: string;
  province: string;
  receiverName: string;
  receiverPhone: string;
  isDefault: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  code: string;
  message: string;
  data?: T;
}

// ==================== USER APIs ====================

/**
 * Lấy thông tin người dùng hiện tại
 */
export const getCurrentUser = async (): Promise<UserResponse> => {
  const response = await axiosClient.get<ApiResponse<UserResponse>>("/users/customer");
  return response.data.data!;
};

/**
 * Cập nhật thông tin người dùng
 */
export const updateUser = async (request: UserRequest): Promise<UserResponse> => {
  const response = await axiosClient.put<ApiResponse<UserResponse>>("/users/customer", request);
  return response.data.data!;
};

/**
 * Thay đổi mật khẩu
 */
export const changePassword = async (request: ChangePasswordRequest): Promise<void> => {
  await axiosClient.put<ApiResponse<void>>("/users/customer/changepassword", request);
};

// ==================== ADDRESS APIs ====================

/**
 * Lấy danh sách địa chỉ của người dùng
 */
export const getUserAddresses = async (): Promise<AddressResponse[]> => {
  const response = await axiosClient.get<ApiResponse<AddressResponse[]>>("/users/customer/addresses");
  return response.data.data || [];
};

/**
 * Thêm địa chỉ mới
 */
export const addAddress = async (addressDTO: AddressDTO): Promise<AddressResponse> => {
  const response = await axiosClient.post<ApiResponse<AddressResponse>>("/users/customer/addresses", addressDTO);
  return response.data.data!;
};

/**
 * Cập nhật địa chỉ
 */
export const updateAddress = async (id: number, addressDTO: AddressDTO): Promise<AddressResponse> => {
  const response = await axiosClient.put<ApiResponse<AddressResponse>>(`/users/customer/addresses/${id}`, addressDTO);
  return response.data.data!;
};

/**
 * Xóa địa chỉ
 */
export const deleteAddress = async (id: number): Promise<void> => {
  await axiosClient.delete<ApiResponse<void>>(`/users/customer/addresses/${id}`);
};

/**
 * Đặt địa chỉ mặc định
 */
export const setDefaultAddress = async (id: number): Promise<AddressResponse> => {
  const response = await axiosClient.patch<ApiResponse<AddressResponse>>(`/users/customer/addresses/${id}/default`);
  return response.data.data!;
};

/**
 * Lấy địa chỉ mặc định
 */
export const getDefaultAddress = async (): Promise<AddressResponse> => {
  const response = await axiosClient.get<ApiResponse<AddressResponse>>("/users/customer/addresses/default");
  return response.data.data!;
};

// ==================== EXPORT ALL ====================

const accountApi = {
  // User APIs
  getCurrentUser,
  updateUser,
  changePassword,

  // Address APIs
  getUserAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
  getDefaultAddress,
};

export default accountApi;
