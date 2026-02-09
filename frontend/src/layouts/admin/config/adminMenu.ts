import {
  Package,
  Store,
  LifeBuoy,
  Users,
	Bug,
	FileUp,
	Citrus,
	Panda,
	TableProperties,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { AdminRole } from "../../../types/admin";


type AdminMenuItem =
  | {
      type: "link";
      key: string;
      label: string;
      icon: LucideIcon;
      path: string;
      roles: AdminRole[];
    }
  | {
      type: "group";
      key: string;
      label: string;
      icon: LucideIcon;
      roles: AdminRole[];
      children: {
        type: "sublink";
        key: string;
        label: string;
        icon: LucideIcon;
        path: string;
        roles: AdminRole[];
      }[];
    };



export const adminMenu: AdminMenuItem[] = [
  {
		type:"link",
    key: "dashboard",
    label: "Dashboard",
    icon: Bug,
    path: "/admin",
    roles: ["admin", "support", "dev", "super-admin"],
  },
  {
		type:"group",
    key: "products",
    label: "Produits",
    icon: Package,
    roles: ["admin", "super-admin"],
    children: [
      { type: "sublink", key: "products", icon: TableProperties, label: "Produits", path: "/admin/products", roles: ["admin", "super-admin"], },
      { type: "sublink", key: "families", icon: Citrus, label: "Familles", path: "/admin/product-families", roles: ["admin", "super-admin"],  },
      { type: "sublink", key: "categories", icon: Panda, label: "Catégories", path: "/admin/categories", roles: ["admin", "super-admin"],  },
      { type: "sublink", key: "product-import", icon: FileUp, label: "Import", path: "/admin/products/import", roles: ["admin", "super-admin"],  },
    ],
  },
  {
		type: "group",
    key: "markets",
    label: "Markets",
    icon: Store,
    roles: ["admin", "super-admin"],
    children: [
      { type: "sublink", key: "markets", icon: TableProperties, label: "Liste", path: "/admin/markets", roles: ["admin", "super-admin"],  },
      { type: "sublink", key: "market-import", icon: FileUp, label: "Import", path: "/admin/markets/import", roles: ["admin", "super-admin"],  },
    ],
  },
  {
		type: "link",
    key: "users",
    label: "Utilisateurs",
    icon: Users,
    path: "/admin/users",
    roles: ["admin", "support", "dev", "super-admin"],
  },
  {
		type: "link",
    key: "support",
    label: "Support",
    icon: LifeBuoy,
    path: "/admin/support",
    roles: ["admin", "support", "super-admin"],
  },
];
