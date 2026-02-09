import {
  Package,
  Store,
  LifeBuoy,
  Users,
	Bug,
	FileUp,
	Apple,
	Citrus,
	Panda,
	TableProperties,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";


type AdminMenuItem =
  | {
      type: "link";
      key: string;
      label: string;
      icon: LucideIcon;
      path: string;
    }
  | {
      type: "group";
      key: string;
      label: string;
      icon: LucideIcon;
      children: {
        type: "sublink";
        key: string;
        label: string;
        icon: LucideIcon;
        path: string;
      }[];
    };



export const adminMenu: AdminMenuItem[] = [
  {
		type:"link",
    key: "dashboard",
    label: "Dashboard",
    icon: Bug,
    path: "/admin",
  },
  {
		type:"group",
    key: "products",
    label: "Produits",
    icon: Package,
    children: [
      { type: "sublink", key: "products", icon: TableProperties, label: "Produits", path: "/admin/products" },
      { type: "sublink", key: "families", icon: Citrus, label: "Familles", path: "/admin/product-families" },
      { type: "sublink", key: "categories", icon: Panda, label: "Catégories", path: "/admin/categories" },
      { type: "sublink", key: "product-import", icon: FileUp, label: "Import", path: "/admin/products/import" },
    ],
  },
  {
		type: "group",
    key: "markets",
    label: "Markets",
    icon: Store,
    children: [
      { type: "sublink", key: "markets", icon: TableProperties, label: "Liste", path: "/admin/markets" },
      { type: "sublink", key: "market-import", icon: FileUp, label: "Import", path: "/admin/markets/import" },
    ],
  },
  {
		type: "link",
    key: "users",
    label: "Utilisateurs",
    icon: Users,
    path: "/admin/users",
  },
  {
		type: "link",
    key: "support",
    label: "Support",
    icon: LifeBuoy,
    path: "/admin/support",
  },
];
