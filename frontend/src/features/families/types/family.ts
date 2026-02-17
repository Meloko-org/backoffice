import type { PaginationMeta } from "../../../types/global.types";

export interface ProductFamily {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productsTypes: string[];
  category: {
    _id: string;
    name: string;
    slug: string;
  };
  tagCategories: {
    _id: string;
    name: string;
    color: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface FamilyListResponse {
  items: ProductFamily[];
  pagination: PaginationMeta;
}


export interface FamilyPayload {
  name: string;
  description: string;
  image: string | null;
  category: string;
  productsTypes: string[];
  tagCategories: string[];
}

export interface UpdateFamilyPayload extends FamilyPayload {}

export interface FamilyFormValues {
  name: string;
  description: string;
  image: string | null;
  category: string;
  tagCategories: string[];
  productsTypes: string[];
}