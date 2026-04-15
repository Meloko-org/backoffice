import type { Address, OpeningHour, PaginationMeta } from "../../../types/global.types";

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


export interface ShopDashboard {
  shop: {
    _id: string;
    producer: {
      _id: string;
      socialReason: string;
      onboardingStep: number;
    };
    siret: string;
    address: Address;
    clickCollect: {
      _id: string;
      createdAt: string;
      updatedAt: string;
      openingHours: OpeningHour[];
      instructions: string;
      isActive: boolean;
    };
    createdAt: string;
    isOpen: boolean;
    markets: {
      market: string;
      name: string;
      isActive: boolean;
      openingHours: OpeningHour[];
      _id: string;
    }[];
    name: string;
    photos: string[];
    crew: {
      _id: string;
      forname: string;
      role: string;
      description: string;
      photo: string;
    }[],
    types: {
      _id: string;
      label: string;
    }[];
    video: string[];
    isPremium: boolean;
    logo: string;
    longDesc: string;
    shortDesc: string;
    socials: {
      connected: boolean;
      isEnabled: boolean;
      accesstoken: string;
      refreshToken: string;
      userId: string;
      username: string;
      pageId: string;
      pageName: string;
      expiresAt: string;
    }[];
    socialPostSettings: {
      customHastags: string[];
      customMentions: string[];
      frequency: {
        mode: string;
        timePerWeek: number;
        preferredDays: string[];
      }
    };
    features: {
      _id: string;
      label: string;
    }[];
    isValidated: boolean;
  };
  producer: {
    _id: string;
    socialReason: string;
    onboardingStep: number;
    siren: string;
  };
  user: {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
  };
  stats: {
    avgRating: number;
    totalNotes: number;
    totalOrders: number;
  };

}

export interface ShopOrder {
  _id: string;
  orderNumber: string;
  createdAt: Date;
  isPaid: boolean;
  isWithdrawn: boolean;

  user: {
    _idUser: string;
    firstname: string;
    lastname: string;
  };

  shopDetail: {
    status: string;
    shopTotalTTC: number;
    withdrawMode: string;
    withdrawDay: string;
  };

}

export interface ShopOrderListResponse {
  items: ShopOrder[];
  stats: {
    avgTTC: number;
    totalOrders: number;
  };
  pagination: PaginationMeta;
}

export interface ShopNote {
  _id: string;
  user: {
    _id: string;
    lastname: string;
  };
  note: number;
  comment: string;
  source: "purchase" | "touristVisit";
  createdAt: string;
}

export interface ShopNoteListResponse {
  items: ShopNote[];
  stats: {
    avgRating: number;
    totalNotes: number;
  };
  pagination: PaginationMeta;
}



export interface ShopWithdrawModes {
  clickCollect?: {
    instructions: string;
    openingHours: OpeningHour[];
    updatedAt: string;
    isActive: boolean;
  };
  markets?: {
    _id: string;
    openingHours: OpeningHour[];
    name: string;
    isActive: boolean;
  }[];
}