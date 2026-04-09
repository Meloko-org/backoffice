import type { Address, PaginationMeta } from "../../../types/global.types";

export interface ShopActionTarget {
  _id: string;
  isOpen: boolean;
  isValidated: boolean;
}

export interface Shop extends ShopActionTarget {
  name: string;
  isPremium: boolean;
  createdAt: string;
  types: ShopType[];
}

export interface ShopType {
  _id: string;
  label: string;
}

export interface ShopListResponse {
  items: Shop[];
  pagination: PaginationMeta;
}


export interface ShopDetail {
  _id: string;

  name: string;
  logo?: string;
  siret: string;

  isOpen: boolean;
  isPremium: boolean;
  isValidated: boolean;

  createdAt: string;

  address: Address;

  types: {
    _id: string;
    label: string;
  }[];

  stats: {
    photosCount: number;
    videosCount: number;
    crewCount: number;
    featuresCount: number;
  };

  socials: {
    platform: "instagram" | "facebook" | "tiktok";
    username?: string;
  }[];

  owner: {
    _id: string;
    firstname: string;
    lastname: string;
  };
}


export interface ShopFormValues {

}

export interface ShopPayload {

}