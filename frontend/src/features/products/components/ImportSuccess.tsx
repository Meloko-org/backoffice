import type { ProductsImportReport } from "../types/productsImport.types";
import { ImportErrors } from "./ImportErrors";

interface ImportSuccessProps {
  report: ProductsImportReport;
  onReset: () => void;
  onGoToProducts?: () => void;
}


export function ImportSuccess({
  report,
  onReset,
  onGoToProducts,
}: ImportSuccessProps) {
  const { meta, categories, families, products, warnings, errors } = report;

  const importFailed = categories.created === 0 &&
    categories.updated === 0 &&
    families.created === 0 &&
    families.updated === 0 &&
    products.created === 0 &&
    products.updated === 0;
  const hasErrors = errors.length > 0; 

  return (
    <section className={`space-y-6`}>

      {/* Header */}
      <div className={`
        bloc
        ${importFailed ? "border-danger" : "border-primary"}
      `}>

        <div className="flex flex-row gap-x-5">
          {importFailed ? (
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full text-white bg-danger/60">
                X
              </div>
              <div>
                <h2 className="text-lg font-semibold text-danger">
                  Import terminé avec échec
                </h2>
                <p className="text-sm text-danger/80">
                  Mode <strong>{meta.mode}</strong> — {meta.totalRows} lignes analysées
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full text-white bg-primary">
                ✓
              </div>
              <div>
                <h2>
                  Import terminé avec succès
                </h2>
                <p className="text-sm text-primary">
                  Mode <strong>{meta.mode}</strong> — {meta.totalRows} lignes analysées
                </p>
              </div>
            </div>
          )}

          {/* Résumé chiffres */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <SummaryCard
              label="Catégories"
              created={categories.created}
              updated={categories.updated}
            />
            <SummaryCard
              label="Familles"
              created={families.created}
              updated={families.updated}
            />
            <SummaryCard
              label="Produits"
              created={products.created}
              updated={products.updated}
            />
          </div>
        </div>

      </div>
      
        

      {hasErrors && (
        <ImportErrors
          errors={errors}
          mode={meta.mode}
        />
      )}

      {/* Warnings */}
      {warnings.length > 0 && (
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
          <p className="text-sm text-yellow-800">
            ⚠️ {warnings.length} avertissement(s) ignoré(s) lors de l’import
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          onClick={onReset}
          className="btn-outline"
        >
          Nouvel import
        </button>

        {onGoToProducts && (
          <button
            onClick={onGoToProducts}
            className="btn-primary"
          >
            Voir les produits
          </button>
        )}
      </div>
    </section>
  );
}


function SummaryCard({
  label,
  created,
  updated,
}: {
  label: string;
  created: number;
  updated: number;
}) {
  return (
    <div className="summary-card">
      <p className="">{label}</p>
      <p className="">
        Créés : <strong>{created}</strong>
      </p>
      <p className="">
        Mis à jour : <strong>{updated}</strong>
      </p>
    </div>
  );
}
