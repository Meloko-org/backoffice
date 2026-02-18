import type { ProductCategory } from "../features/categories/types/category";
import type { ProductFamily } from "../features/families/types/family";
import type { Product } from "../features/products/types/product";


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
  | null;