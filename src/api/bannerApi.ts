import axiosClient from "../utils/axiosClient";
import type { Banner } from "../types/models/banner";

const bannerApi = {
  getAll: () => {
    return axiosClient.get<Banner[]>("/banners");
  },

  getById: (id: string | number) => {
    return axiosClient.get<Banner>(`/banners/${id}`);
  },
};

export default bannerApi;
