import type { ProductCategory } from "../features/categories/types/category";
import type { ProductFamily } from "../features/families/types/family";
import type { Market } from "../features/markets/types/markets";
import type { Order, ProductLine } from "../features/orders/types/order";
import type { Product } from "../features/products/types/product";
import type { User } from "../features/users/types/user";


export type AdminRole =
  | "super-admin"
  | "admin"
  | "support"
  | "dev";




export type ModelContext =
  | { 
      type: "category"; 
      title: string;
      data: ProductCategory;
      onEdit?: (category: ProductCategory) => void;
      onDelete?: (category: ProductCategory) => void;
    }
  | { 
      type: "family"; 
      title: string;
      data: ProductFamily;
      onEdit?: (family: ProductFamily) => void;
      onDelete?: (family: ProductFamily) => void;
    }
  | { 
      type: "product"; 
      title: string;
      data: Product;
      onEdit?: (product: Product) => void;
      onDelete?: (product: Product) => void;
    }
  | { 
      type: "market"; 
      title: string;
      data: Market;
      onEdit?: (market: Market) => void;
      onDelete?: (market: Market) => void;
    }
  | { 
      type: "user"; 
      title: string;
      data: User;
      onEdit?: (user: User) => void;
      onDelete?: (user: User) => void;
    }
  | { 
      type: "order"; 
      title: string;
      data: Order;
      onEdit?: (order: Order) => void;
      onDelete?: (order: Order) => void;
    }
  | { 
      type: "orderProduct"; 
      title: string;
      data: ProductLine;
      // onEdit?: (product: ProductLine) => void;
      // onDelete?: (product: ProductLine) => void;
    }
  | null;