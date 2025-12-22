import comboApi from "../api/comboApi";

const comboService = {
  getAllCombos: async (availableOnly: boolean = false) => {
    const res = await comboApi.getAllCombos(availableOnly);
    return res;
  },

  getComboById: async (id: number) => {
    const res = await comboApi.getComboById(id);
    return res;
  },

  getAvailableCombos: async () => {
    const res = await comboApi.getAvailableCombos();
    return res;
  },
};

export default comboService;
