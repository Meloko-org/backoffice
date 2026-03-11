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
  | "dev"
  | "user";


export type SuspensionReason =
  | "abuse"
  | "fraud"
  | "spam";

type ModelContextBase<T> = {
  title: string;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void; 
  onDisplay?: (item: T) => void;
  onSuspend?: (item: T) => void;
}

export type ModelContext =
  | { 
      type: "category"; 
      category: ProductCategory;
    } & ModelContextBase<ProductCategory>
  | { 
      type: "family"; 
      family: ProductFamily;
    } & ModelContextBase<ProductFamily>
  | { 
      type: "product"; 
      product: Product;
    } & ModelContextBase<Product>
  | { 
      type: "market"; 
      market: Market;
    } & ModelContextBase<Market>
  | { 
      type: "user"; 
      user: User;
    } & ModelContextBase<User>
  | { 
      type: "order"; 
      order: Order;
    } & ModelContextBase<Order>
  | { 
      type: "orderProduct"; 
      line: ProductLine;
    } & ModelContextBase<ProductLine>
  | null;