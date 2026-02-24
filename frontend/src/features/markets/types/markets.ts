import type { PaginationMeta } from "../../../types/global.types";

export interface Market {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  address: {
    address1: string;
    address2: string;
    postalCode: string;
    city: string;
    latitude: number;
    longitude: number;
  },
  createdAt: string;
  updatedAt: string;
}

export interface MarketListResponse {
  items: Market[];
  pagination: PaginationMeta;
}

/* inutile dans ce cas */
export interface PostalCodeForSelect {
  postalCode: string;
}

export interface CreateMarketPayload {
  name: string;
  description?: string;
  image?: string;
  address: {
    address1: string;
    address2?: string;
    postalCode: string;
    city: string;
  }
}

export interface UpdateMarketPayload extends Partial<CreateMarketPayload> {}

export interface MarketFormValues {
  name: string;
  description: string;
  image?: string;
  address1: string;
  address2?: string;
  postalCode: string;
  city: string;
}