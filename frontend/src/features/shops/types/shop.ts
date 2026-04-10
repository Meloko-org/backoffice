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

/* type dédié à la réponse du backend poru la route shops/form/:id */
export interface ShopForm {
  _id: string;

  name: string;
  siret: string;

  address: {
    address1: string;
    address2?: string;
    postalCode: string;
    city: string;
    country: string;
  };

  logo?: string;

  shortDesc: string;
  longDesc?: string;

  photos: string[];
  video: string[];

  types: {
    _id: string;
    label: string;
  }[];

  isOpen: boolean;
  reopenDate: string | null;
  isPremium: boolean;
  PremiumDate: string | null;

  features: {
    _id: string;
    label: string;
  }[];
}

export interface ShopFormValues {
  name: string;
  siret: string;

  address1: string;
  address2: string;
  postalCode: string;
  city: string;

  logo?: string;

  shortDesc: string;
  longDesc?: string;

  photos: string[];
  video: string[];

  types: string[];

  isPremium: string;
  PremiumDate: string | null;
  isOpen: string;
  reopenDate: string | null;

  features: string[];
}


export interface ShopPayload {
  name: string;
  siret: string;
  address: {
    address1: string;
    address2: string;
    postalCode: string;
    city: string;
  }

  logo?: string;

  shortDesc: string;
  longDesc?: string;

  photos: string[];
  video: string[];

  types: string[];

  isPremium: boolean;
  PremiumDate: Date | null;

  isOpen: boolean;
  reopenDate: Date | null;

  features: string[];

}