import { apiFetch } from "../../../lib/apiFetch";
import type { ImportMode, ProductsImportReport } from "../types/productsImport.types";

const BASE_URL = "http://localhost:4000/admin/products/import-csv";

async function uploadFile(
  file: File,
  dryRun: boolean,
  mode: ImportMode,
): Promise<ProductsImportReport> {
  const formData = new FormData();
  formData.append("file", file);

  return await apiFetch<ProductsImportReport>(
    `${BASE_URL}?dryRun=${dryRun}&mode=${mode}`,
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
