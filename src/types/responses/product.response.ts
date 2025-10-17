export interface ProductResponse {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  categoryName: string;
  imageUrls: string[];
  status: "AVAILABLE" | "UNAVAILABLE";
  createdAt: string;
  updatedAt: string;
}

export interface CategoryResponse {
  id: number;
  name: string;
}

export interface ProductDetailResponse extends ProductResponse {
  description: string;
  status: "AVAILABLE" | "UNAVAILABLE";
  rating: number;
  reviewCount: number;
  tags?: string[];
}

export interface PageResponse<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: { sorted: boolean; unsorted: boolean; empty: boolean };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  number: number;
  size: number;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}
