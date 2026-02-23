import type { PaginationMeta } from "../../../types/global.types";

export interface Market {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  address: {
    addres1: string;
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