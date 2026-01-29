export type ProductsImportStatus =
  | "idle"
  | "fileReady"
  | "dryRun"
  | "preview"
  | "importing"
  | "success"
  | "error";

export type ImportMode = "strict" | "permissive";

export interface ImportMeta {
  totalRows: number;
  dryRun: boolean;
  mode: ImportMode;
}

export interface ImportCounter {
  created: number;
  updated: number;
}

export interface ImportIssue {
  line: number;
  message: string;
  details?: string[] | null;
}

export interface ImportWarning {
  line: number;
  warnings: string[];
}

export interface ProductsImportReport {
  meta: ImportMeta;
  categories: ImportCounter;
  families: ImportCounter;
  products: ImportCounter;
  preview?: {
    productsCount: number;
    products: ImportProductPreview[] | undefined;
    ignoredRows: number;
  };
  warnings: ImportWarning[];
  errors: ImportIssue[];
  humanReport?: string[];
}

export interface ImportProductPreview {
  product: string;
  family: string;
  category: string;
  action: "create" | "update" | "ignore";
} 

export interface ProductsImportState {
  status: ProductsImportStatus;
  file: File | null;
  report: ProductsImportReport | null;
  error: string | null;
  mode: ImportMode;
  resetKey: number;
}
