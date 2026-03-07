import type { ProductCategory } from "../features/categories/types/category";
import type { ProductFamily } from "../features/families/types/family";
import type { Market } from "../features/markets/types/markets";
import type { Order, ProductLine } from "../features/orders/types/order";
import type { Product } from "../features/products/types/product";
import type { User } from "../features/users/types/user";
import type { RightPanelType } from "../layouts/admin/config/rightPanelRegistry";


export type AdminRole =
  | "super-admin"
  | "admin"
  | "support"
  | "dev";


type ModelContextBase<T extends RightPanelType, D> = {
  type: T
  title: string
  data: D
}

export type ModelContext =
  | { 
      type: "category"; 
      title: string;
      category: ProductCategory;
      onEdit?: (category: ProductCategory) => void;
      onDelete?: (category: ProductCategory) => void;
    }
  | { 
      type: "family"; 
      title: string;
      family: ProductFamily;
      onEdit?: (family: ProductFamily) => void;
      onDelete?: (family: ProductFamily) => void;
    }
  | { 
      type: "product"; 
      title: string;
      product: Product;
      onEdit?: (product: Product) => void;
      onDelete?: (product: Product) => void;
    }
  | { 
      type: "market"; 
      title: string;
      market: Market;
      onEdit?: (market: Market) => void;
      onDelete?: (market: Market) => void;
    }
  | { 
      type: "user"; 
      title: string;
      user: User;
      onEdit?: (user: User) => void;
      onDelete?: (user: User) => void;
    }
  | { 
      type: "order"; 
      title: string;
      order: Order;
      onEdit?: (order: Order) => void;
      onDelete?: (order: Order) => void;
    }
  | { 
      type: "orderProduct"; 
      title: string;
      line: ProductLine;
      // onEdit?: (product: ProductLine) => void;
      // onDelete?: (product: ProductLine) => void;
    }
  | null;