// src/features/products/types/import-ui.types.ts

export type ImportIssueLevel = "error" | "warning";

export interface ImportIssueUI {
  line: number;
  message: string;
  level: ImportIssueLevel;
}

export interface ImportSummaryUI {
  totalRows: number;
  categoriesCreated: number;
  familiesCreated: number;
  productsCreated: number;
  ignoredRows: number;
  errorsCount: number;
}
