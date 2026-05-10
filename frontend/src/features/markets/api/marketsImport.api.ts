import { apiFetch } from "../../../lib/apiFetch";
import type { ImportMode, MarketsImportReport } from "../types/marketsImport.types";

const BASE_URL = "http://localhost:4000/admin/markets/import-csv";

async function uploadFile(
  file: File,
  dryRun: boolean,
  mode: ImportMode,
): Promise<MarketsImportReport> {
    
  const formData = new FormData();
  formData.append("file", file);


  return await apiFetch<MarketsImportReport>(
    `${BASE_URL}?dryrun=${dryRun}$mode=${mode}`,
    {
      method: "POST",
      body: formData,
    }
  )
}

export function dryRunImport(file: File, mode: ImportMode) {
  return uploadFile(file, true, mode);
}

export function executeImport(file: File, mode: ImportMode) {
  return uploadFile(file, false, mode);
}
