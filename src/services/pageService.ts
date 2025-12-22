import pageApi from "../api/pageApi";

const PageService = {
  getShopInitialData: async () => {
    const res = await pageApi.getInitData();
    return res.data;
  },
};

export default PageService;
