import type { CategoryResponse } from "./category.response";
import type { ComboResponse } from "./combo.response";
import type { ProductResponse, ProductWithRatingResponse } from "./product.response";
import type { TagResponse } from "./tag.response";

export interface ShopInitialDataResponse {
  combos: ComboResponse[];
  categories: CategoryResponse[];
  products: ProductResponse[];
  tags: TagResponse[];
  latestProducts: ProductWithRatingResponse[];
}
