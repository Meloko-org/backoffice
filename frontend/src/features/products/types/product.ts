import type { PaginationMeta } from "../../../types/global.types";

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  family: {
    _id: string;
    name: string;
    slug: string;
    category: {
      _id: string;
      name: string;
      slug: string;
    }
  },
  weight: {
    unit: string;
    measurement: number;
  },
  vatRate: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductListResponse {
  items: Product[];
  pagination: PaginationMeta;
}


export interface CreateProductPayload {
  name: string;
  description?: string;
  image?: string;
  family: string;
  weight: {
    unit: "gr" | "piece";
    measurement: number;
  };
  vatRate: number;
}


export interface UpdateProductPayload extends Partial<CreateProductPayload> {};



export interface ProductFormValues {
  name: string;
  description: string;
  image?: string;

  categoryId: string; 
  familyId: string;

  weightMeasurement: number;
  weightUnit: "gr" | "piece";

  vatRate: string;
}

