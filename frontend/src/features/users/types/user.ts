import type { PaginationMeta } from "../../../types/global.types";

export interface User {
  _id: string;
  email: string;
  clerkUUID: string;
  clerkPasswordEnabled: boolean;
  roles: {
    _id: string;
    name: string; 
  }[];
  firstname: string;
  lastname: string;
  avatar: string | null;
  bookmarks: {
    _id: string;
    name: string;
  }[];
  addresses: {
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
  }[];
  favSearch: string[];
  isDeleted: boolean;
  isSuspended: boolean;
  deletedAt: string;
  deletedByAdmin: string;
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