import axiosClient from "../utils/axiosClient";

export const tableApi = {
  getTableById: async (id: number) => {
    const response = await axiosClient.get(`/tables/${id}`);
    return response.data;
  },

  getAllTables: async () => {
    const response = await axiosClient.get("/tables");
    return response.data;
  },
};
