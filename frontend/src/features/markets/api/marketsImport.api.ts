import type { ImportMode, MarketsImportReport } from "../types/marketsImport.types";

const BASE_URL = "http://localhost:4000/admin/markets/import-csv";

async function uploadFile(
  file: File,
  dryRun: boolean,
  mode: ImportMode,
): Promise<MarketsImportReport> {
    
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${BASE_URL}?dryRun=${dryRun}&mode=${mode}`, {
    method: "POST",
    body: formData,
  });

  console.log("🌐 API status :", res.status);

  if (!res.ok) {
    throw new Error(
      dryRun
        ? "Erreur lors de l’analyse du fichier"
        : "Erreur lors de l’import"
    );
  }

  const data = res.json();

  console.log(data)

  return data;
}

export function dryRunImport(file: File, mode: ImportMode) {
  return uploadFile(file, true, mode);
}

export function executeImport(file: File, mode: ImportMode) {
  return uploadFile(file, false, mode);
}
