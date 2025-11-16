import userApi from "../api/userApi";

const userService = {
  getCurrentUser: async () => {
    const res = await userApi.getCurrentUser();
    return res;
  },
};

export default userService;
