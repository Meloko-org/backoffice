import type { AdminRole } from "../types/admin";

export type Permission =
  | "dashboard:read"
  | "products:read"
  | "products:manage"
  | "products:write"
  | "products:import"
  | "categories:manage"
	| "families:manage"
  | "markets:read"
  | "markets:manage"
  | "markets:import"
  | "orders:read"
  | "support:read"
  | "support:reply"
  | "users:read"
  | "users:manage"
  | "producers:manage"
  | "shops:manage"
  | "orders:manage"
  | "roles:manage";

export const ROLE_PERMISSIONS: Record<AdminRole, Permission[]> = {
  "support": [
    "dashboard:read",
    "support:read",
    "support:reply",
    "orders:read",
  ],

  "dev": [
    "dashboard:read",
    "products:read",
    "markets:read",
  ],

  "admin": [
    "dashboard:read",
    "products:read",
    "products:write",
    "products:manage",
    "products:import",
    "categories:manage",
		"families:manage",
    "markets:read",
    "markets:manage",
    "markets:import",
    "orders:read",
    "support:read",
    "support:reply",
    "users:read",
    "users:manage",
    "producers:manage",
    "shops:manage",
    "orders:manage",
  ],

  "super-admin": [
    "dashboard:read",
    "products:read",
    "products:write",
    "products:manage",
    "products:import",
    "categories:manage",
		"families:manage",
    "markets:read",
    "markets:import",
    "orders:read",
    "orders:manage",
    "support:read",
    "support:reply",
    "users:read",
    "users:manage",
    "producers:manage",
    "shops:manage",
    "orders:manage",
    "roles:manage",
  ],
};
