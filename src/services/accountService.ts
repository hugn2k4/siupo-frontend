// // src/services/accountService.ts
// import axios from 'axios';
// import type { User } from '../types/models/user';
// import type { Address } from '../types/models/address';

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
// });

// // Interceptor: tự thêm token
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('accessToken');
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// export const accountService = {
//   getProfile: async (): Promise<User> => {
//     const res = await api.get('/user/profile');
//     return res.data;
//   },

//   updateProfile: async (data: Partial<User>): Promise<User> => {
//     const res = await api.put('/user/profile', data);
//     return res.data;
//   },

//   getAddresses: async (): Promise<Address[]> => {
//     const res = await api.get('/user/addresses');
//     return res.data;
//   },

//   addAddress: async (data: Omit<Address, 'id'>): Promise<Address> => {
//     const res = await api.post('/user/addresses', data);
//     return res.data;
//   },

//   updateAddress: async (id: string, data: Partial<Address>): Promise<Address> => {
//     const res = await api.put(`/user/addresses/${id}`, data);
//     return res.data;
//   },

//   deleteAddress: async (id: string): Promise<void> => {
//     await api.delete(`/user/addresses/${id}`);
//   },

//   setDefaultAddress: async (id: string): Promise<void> => {
//     await api.patch(`/user/addresses/${id}/default`);
//   },

//   changePassword: async (data: { current: string; new: string }): Promise<void> => {
//     await api.post('/user/change-password', data);
//   },
// };
