import type { PaginationMeta } from "../../../types/global.types";

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
  pagination: PaginationMeta
}

export interface CategoryPayload {
  name: string;
  description?: string;
  image?: string | null;
  type: string;
}

export interface UpdateCategoryPayload extends CategoryPayload {}

export interface CategoryFormValues {
  values: {
    name: string;
    description: string;
    image: string;
    type: string;
  } | undefined;
  
}
