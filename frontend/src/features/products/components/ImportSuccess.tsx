import type { ProductsImportReport } from "../types/productsImport.types";

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
  const { meta, categories, families, products, warnings } = report;

  return (
    <section className="space-y-6 rounded-xl border border-green-200 bg-green-50 p-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white">
          ✓
        </div>
        <div>
          <h2 className="text-lg font-semibold text-green-900">
            Import terminé avec succès
          </h2>
          <p className="text-sm text-green-800">
            Mode <strong>{meta.mode}</strong> — {meta.totalRows} lignes analysées
          </p>
        </div>
      </div>

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
          className="rounded-lg border px-4 py-2 text-sm hover:bg-white"
        >
          Nouvel import
        </button>

        {onGoToProducts && (
          <button
            onClick={onGoToProducts}
            className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary/90"
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
    <div className="rounded-lg border bg-white p-4 text-sm">
      <p className="font-medium text-black">{label}</p>
      <p className="text-gray-600">
        Créés : <strong>{created}</strong>
      </p>
      <p className="text-gray-600">
        Mis à jour : <strong>{updated}</strong>
      </p>
    </div>
  );
}
