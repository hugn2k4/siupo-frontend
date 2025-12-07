import type { ApiResponse } from "../types/responses/api.response";
import type { ComboResponse } from "../types/responses/combo.response";
import axiosClient from "../utils/axiosClient";

const comboApi = {
  getAllCombos: (availableOnly: boolean = false): Promise<ApiResponse<ComboResponse[]>> =>
    axiosClient.get("/combos", { params: { availableOnly } }).then((response) => response.data),

  getComboById: (id: number): Promise<ApiResponse<ComboResponse>> =>
    axiosClient.get(`/combos/${id}`).then((response) => response.data),

  getAvailableCombos: (): Promise<ApiResponse<ComboResponse[]>> =>
    axiosClient.get("/combos", { params: { availableOnly: true } }).then((response) => response.data),
};

export default comboApi;
