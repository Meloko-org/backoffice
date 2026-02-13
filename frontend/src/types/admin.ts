import type { ProductCategory } from "../features/categories/types/category";


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
  | null;