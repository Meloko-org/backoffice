import type { PaginationMeta } from "../../../types/global.types";

export interface Address {
    _id: string;
    name: string;
    isDefault: boolean;
    address: {
      address1: string;
      address2: string;
      postalCode: string;
      city: string;
      country: string;
    },
    createdAt: string;
    updatedAt: string;
  };

export interface Bookmark {
  _id: string;
  name: string;
}

export interface User {
  _id: string;
  email: string;
  clerkUUID: string;
  clerkPasswordEnabled: boolean;
  role: {
    _id: string;
    name: string; 
  };
  firstname: string;
  lastname: string;
  avatar: string | null;
  bookmarks: Bookmark[];
  addresses: Address[];
  favSearch: string[];
  isDeleted: boolean;
  isSuspended: boolean;
  deletedAt: string;
  deletedByAdmin: {
    _id: string;
    lastname: string;
  };
  lastLoginAt: string;
  suspendedAt: string;
  suspensionReason: string;
  stripeUUID: string;
  totalOrders: number;
  totalSpent: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserListResponse {
  items: User[];
  pagination: PaginationMeta;
}


export type UserDashboard = {
  user: {
    id: string;
    email: string;
    firstname: string | null;
    lastname: string | null;
    avatar: string | null;
    role: {
      id: string;
      name: string;
    };

    bookmarks: Bookmark[];
    addresses: Address[];
    favSearch: string[];

    createdAt: string;
    updatedAt: string;
    lastLoginAt?: string;

    isSuspended: boolean;
    suspendedAt?: string;
    suspensionReason?: string;

    isDeleted: boolean;
    deletedAt?: string;
    deletedByAdmin: {
      _id: string;
      lastname: string;
    };

    isProducer: boolean;
    producerId?: string | null;
  };

  business: {
    totalOrders: number;
    totalSpentTTC: number;
    averageBasketTTC: number;
    lastOrderAt?: string;
    paidOrdersCount: number;
    cancelledOrdersCount: number;
    refundedProductsCount: number;
  };

  recentOrders: {
    items: {
      _id: string;
      orderNumber: string;
      createdAt: string;
      totalTTC: number;
      isPaid: boolean;
      isWithdrawn: boolean;
      paymentMethod: string;
    }[];
    pagination: PaginationMeta;
  };
};


export interface UserPayload {
  firstname: string;
  lastname: string;
  avatar: string | null;
  suspensionReason: string;
  role: string;
}

export interface UserFormValues {
  firstname: string;
  lastname: string;
  avatar: string | null,
  suspensionReason: string;
  role: string;
}