import type { PaginationMeta } from "../../../types/global.types";

export interface ProducerActionTarget {
  _id: string;
  owner: OwnerFromProducer;
  shop: ShopFromProducer;
}

export interface OwnerFromProducer {
  _id: string;
  firstname: string;
  lastname: string;
  isDeleted: boolean;
  isSuspended: boolean;
}

export interface ShopFromProducer {
  _id: string;
  name: string;
  isOpen: boolean;
  isPremium: boolean;
}

export interface Producer extends ProducerActionTarget {
  onboardingStep: number;
  createdAt: string;
  siren: string;
  socialReason: string;
}

export interface ProducerListResponse {
  items: Producer[];
  pagination: PaginationMeta;
}


export interface ProducerDetails {
  _id: string;
  socialReason: string;
  siren: string;
  owner: {
    _id: string;
    firstname: string;
    lastname: string;
    isDeleted: boolean;
    isSuspended: boolean;
  };
  iban: string;
  bic: string;
  address: Address;
  createdAt: string;
  onboardingStep: number;
  shop: {
    _id: string;
    name: string;
    isOpen: boolean;
    isPremium: boolean;
    siret: string;
    createdAt: string;
    address: Address;
    types: {
      _id: string;
      label: string;
    }[];
    marketsCount: number;
  }
}

export interface Address {
  _id: string;
  address1: string;
  address2: string;
  postalCode: string;
  city: string;
  country: string;
  createdAt: string;
  updatedAt: string;
  latitude?: {
    $numberDecimal: number;
  };
  longitude?: {
    $numberDecimal: number;
  };
};

export interface ProducerFormValues {
  socialReason: string;
  siren: string;
  iban: string;
  bic: string;
  address1: string;
  address2: string;
  postalCode: string;
  city: string;
  country: string;
}

export interface ProducerPayload {
  socialReason: string;
  siren: string;
  iban: string;
  bic: string;
  address: {
    address1: string;
    address2: string;
    postalCode: string;
    city: string;
    country: string;
  }
}