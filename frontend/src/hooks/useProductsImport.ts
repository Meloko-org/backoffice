import { useState } from "react";
import type {
  ImportMode,
  ProductsImportState,
} from "../features/products/types/productsImport.types";
import { dryRunImport, executeImport } from "../features/products/api/productsImport.api";


const initialState: ProductsImportState = {
  status: "idle",
  file: null,
  report: null,
  error: null,
  mode: "strict",
  resetKey: 0,
};

export function useProductsImport() {
  const [state, setState] = useState<ProductsImportState>(initialState);

  function selectFile(file: File) {
    setState((prev) => ({
      ...prev,
      status: "fileReady",
      file,
      report: null,
      error: null,
    }))
  }

  function setMode(mode: ImportMode) {
    setState((prev) => ({
      ...prev,
      mode,
    }));
  }

  async function runDryRun() {
    if (!state.file) return;

    console.log("📤 Dry run – fichier envoyé :", state.file);

    setState((prev) => ({
      ...prev,
      status: "dryRun",
      error: null,
    }));

    try {
      const report = await dryRunImport(state.file, state.mode)
      console.log("📥 Dry run – réponse API :", report);

      if (!report || !report?.meta) {
        throw new Error("Réponse API invalide (meta manquant)");
      }

      setState((prev) => ({
        ...prev,
        status: "preview",
        report,
      }));
    } catch (err) {
      setState((prev) => ({
        ...prev,
        status: "error",
        error: "Erreur lors de l’analyse du fichier",
      }));
    }
  }


  async function confirmImport() {
    if (!state.file || !state.report) return;

    setState((prev) => ({
      ...prev,
      status: "importing",
      error: null,
    }));

    try {
      const report = await executeImport(state.file, state.mode)

      setState((prev) => ({
        ...prev,
        status: "success",
        report,
      }));
    } catch {
      setState((prev) => ({
        ...prev,
        status: "error",
        error: "Erreur lors de l’import",
      }));
    }
  }


  function reset() {
    setState((prev) => ({
      ...initialState,
      resetKey: prev.resetKey + 1,    // pour forcer React à remount le composant ImportDropzone
    }));
  }

  return {
    state,
    setMode,
    selectFile,
    runDryRun,
    confirmImport,
    reset,
  };
}
