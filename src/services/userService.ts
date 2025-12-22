import userApi from "../api/userApi";
import uploadApi from "../api/uploadApi";
import type { UserRequest } from "../types/requests/user.request";
import type { ApiResponse } from "../types/responses/api.response";
import type { UserResponse } from "../types/responses/user.response";

const userService = {
  getCurrentUser: async (): Promise<ApiResponse<UserResponse>> => {
    const res = await userApi.getCurrentUser();
    return res;
  },

  uploadAvatar: async (file: File): Promise<{ avatarUrl: string; avatarName: string } | null> => {
    if (!file) return null;

    try {
      // Dựa trên uploadApi.ts, kết quả là string (URL)
      const uploadedUrl: string = await uploadApi.uploadSingle(file);

      if (!uploadedUrl || uploadedUrl.length === 0) {
        throw new Error("Upload API returned an empty URL.");
      }

      return {
        avatarUrl: uploadedUrl,
        avatarName: file.name,
      };
    } catch (error) {
      console.error("Error during avatar upload:", error);
      throw error;
    }
  },

  updateUser: async (data: UserRequest): Promise<ApiResponse<UserResponse>> => {
    const res = await userApi.updateUser(data);
    return res;
  },
};

export default userService;
