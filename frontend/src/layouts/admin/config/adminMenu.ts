import {
  Package,
  Store,
  LifeBuoy,
  Users,
  UserStar,
  ShoppingBasket,
	Bug,
	FileUp,
	Citrus,
	Panda,
	TableProperties,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Permission } from "../../../config/adminPermissions";


export type AdminMenuItem =
  | {
      type: "link";
      key: string;
      label: string;
      icon: LucideIcon;
      path: string;
      permission?: Permission;
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
        permission?: Permission;
      }[];
    };



export const adminMenu: AdminMenuItem[] = [
  {
		type:"link",
    key: "dashboard",
    label: "Dashboard",
    icon: Bug,
    path: "/admin",
    permission: "dashboard:read",
  },
  {
		type:"group",
    key: "products",
    label: "Produits",
    icon: Package,
    children: [
      { 
        type: "sublink", 
        key: "products", 
        icon: TableProperties, 
        label: "Produits", 
        path: "/admin/products", 
        permission: "products:manage", 
      },
      { 
        type: "sublink", 
        key: "families", 
        icon: Citrus, 
        label: "Familles", 
        path: "/admin/families", 
        permission: "families:manage",  
      },
      { 
        type: "sublink", 
        key: "categories", 
        icon: Panda, 
        label: "Catégories", 
        path: "/admin/categories", 
        permission: "categories:manage",  
      },
      { 
        type: "sublink", 
        key: "product-import", 
        icon: FileUp, 
        label: "Import", 
        path: "/admin/products/import", 
        permission: "products:import",  
      },
    ],
  },
  {
		type: "group",
    key: "markets",
    label: "Markets",
    icon: Store,
    children: [
      { 
        type: "sublink", 
        key: "markets", 
        icon: TableProperties, 
        label: "Liste", 
        path: "/admin/markets", 
        permission: "markets:read",  
      },
      { 
        type: "sublink", 
        key: "market-import", 
        icon: FileUp, 
        label: "Import", 
        path: "/admin/markets/import", 
        permission: "markets:import",  
      },
    ],
  },
  {
		type: "link",
    key: "users",
    label: "Utilisateurs",
    icon: Users,
    path: "/admin/users",
    permission: "users:manage",
  },
  {
		type: "link",
    key: "producers",
    label: "Producteurs",
    icon: UserStar,
    path: "/admin/producers",
    permission: "producers:manage",
  },
  {
		type: "link",
    key: "orders",
    label: "Commandes",
    icon: ShoppingBasket,
    path: "/admin/orders",
    permission: "orders:manage",
  },
  {
		type: "link",
    key: "support",
    label: "Support",
    icon: LifeBuoy,
    path: "/admin/support",
    permission: "support:read",
  },
];
