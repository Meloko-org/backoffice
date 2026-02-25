// import type {  ProductsImportState, } from "../types/productsImport.types";
import { useMarketsImport } from "../../../hooks/useMarketsImport";

import { ImportSummary } from "../components/ImportSummary";
import { ImportErrors } from "../components/ImportErrors";
import { ImportWarnings } from "../components/ImportWarnings";
import { ImportPreview } from "../components/ImportPreview";

import ImportDropzone from "../components/ImportDropzone";
import { ImportActions } from "../components/ImportActions";
import { ImportSuccess } from "../components/ImportSuccess";
import { ImportProgressModal } from "../../../components/global/ImportProgressModal";
import { useAdminPage } from "../../../hooks/useAdminPage";



export default function ProductsImportPage() {
  
  const { state, setMode, selectFile, runDryRun, confirmImport, reset } = useMarketsImport();

  useAdminPage("Import des points de vente")

  console.log("mode :", state.mode)

  return (
    <div className="p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        {(state.status === "dryRun" || state.status === "importing") && (
          <ImportProgressModal status={state.status} />
        )}

        <div className="flex flex-row items-center space-x-5 justify-around">
          
          <div className="grow">
            <ImportDropzone 
              key={state.resetKey}
              onFileSelected={selectFile}
              error={state.error}
            />
          </div>

          <div className="space-y-4">
            <div className="import-mode flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-primary">
                  Mode d’import
                </p>
                <p className="text-xs">
                  {state.mode === "strict"
                    ? "Aucune erreur autorisée"
                    : "Les lignes en erreur seront ignorées"}
                </p>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={state.mode === "permissive"}
                  onChange={(e) =>
                    setMode(e.target.checked ? "permissive" : "strict")
                  }
                />
                <div className="switch-import-mode w-11 h-6 peer-focus:outline-none rounded-full peer peer-checked:bg-primary-100 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-primary after:h-5 after:w-5 after:rounded-full after:transition-all peer-checked:after:translate-x-full" />
              </label>
            </div>

            <div className="text-right">
              {state.status === "fileReady" && (
                <button
                  onClick={runDryRun}
                  className="btn-primary"
                >
                  Analyser le fichier (dry run)
                </button>
              )}
            </div>

          </div>

        </div>

        

        {state.status === "dryRun" && (
          <p className="text-sm text-gray-600">
            Analyse du fichier en cours…
          </p>
        )}

        {state.status === "preview" && state.report && state.report.meta && (
          <div className="space-y-6">
            <ImportSummary
              report={state.report}
            />

            <ImportErrors
              mode={state.report.meta.mode}
              errors={state.report.errors}
            />

            <ImportWarnings warnings={state.report.warnings} />

            {state.status === "preview" && state.report?.preview && state.report?.preview.markets && (
              <ImportPreview
                marketsCount={state.report.preview.marketsCount}
                markets={state.report.preview.markets}
                ignoredRows={state.report.preview.ignoredRows}
                totalRows={state.report.meta.totalRows}
              />
            )}

            <div className="flex justify-end gap-3">
              {/* <button className="px-4 py-2 rounded border">
                Nouveau test
              </button> */}

              <ImportActions
                mode={state.report.meta.mode}
                hasBlockingErrors={state.report.errors.length > 0}
                status={state.status}
                onConfirm={confirmImport}
                onReset={reset}
              />
            </div>
          </div>
        )}

        {state.status === "success" && state.report && (
          <ImportSuccess
            report={state.report}
            onReset={reset}
            onGoToMarkets={() => {}}
            // onGoToProducts={() => navigate("/products")}
          />
        )}

      </div>
    </div>
  );
}
