export type MarketsImportStatus =
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

export interface MarketsImportReport {
  meta: ImportMeta;
  markets: ImportCounter;
  preview?: {
    marketsCount: number;
    markets: ImportMarketPreview[] | undefined;
    ignoredRows: number;
  };
  warnings: ImportWarning[];
  errors: ImportIssue[];
  humanReport?: string[];
}

export interface ImportMarketPreview {
  market: string;
  action: "create" | "update" | "ignore";
} 

export interface MarketsImportState {
  status: MarketsImportStatus;
  file: File | null;
  report: MarketsImportReport | null;
  error: string | null;
  mode: ImportMode;
  resetKey: number;
}
