import type { ImageResponse } from "./image.response";

export interface CategoryResponse {
  id: number;
  name: string;
  image: ImageResponse;
}
