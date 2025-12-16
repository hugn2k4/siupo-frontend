import type { ApiResponse } from "../types/responses/api.response";
import axiosClient from "../utils/axiosClient";

export interface TagResponse {
  id: number;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

const tagApi = {
  getAllTags: (): Promise<ApiResponse<TagResponse[]>> => axiosClient.get("/tags").then((response) => response.data),
};
export default tagApi;
