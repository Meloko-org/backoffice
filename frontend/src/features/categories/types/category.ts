export interface ProductCategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string | null;
  type: {
    _id: string;
    name: string;
  } // ObjectId
  createdAt: string;
  updatedAt: string;
}

export interface CategoryListResponse {
  items: ProductCategory[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  }
}

export interface CategoryPayload {
  name: string;
  description?: string;
  image?: string | null;
  type: string;
}

export interface UpdateCategoryPayload extends CategoryPayload {}
