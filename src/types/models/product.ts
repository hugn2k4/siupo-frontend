import type { ProductStatus } from "../enums/product.enum";
import type { Images } from "./image";

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  images: Images[];
  status: ProductStatus;
};
