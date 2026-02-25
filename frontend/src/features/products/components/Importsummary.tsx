import type { ImportSummaryUI } from "../types/import-ui.types";
import type { ProductsImportReport } from "../types/productsImport.types";

interface ImportSummaryProps {
  report: ProductsImportReport
}

export function ImportSummary({ report }: ImportSummaryProps) {
  const isStrict = report.meta.mode === "strict";

  const summary: ImportSummaryUI = {
    totalRows: report.meta.totalRows,
    categoriesCreated: report.categories.created,
    familiesCreated: report.families.created,
    productsCreated: report.products.created,
    ignoredRows:
      report.meta.totalRows -
      report.products.created -
      report.products.updated,
    errorsCount: report.errors.length,
  };

  return (
    <section className="bloc">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2>
          Résumé de l’import
        </h2>

        <span
          className={`inline-flex items-center px-3 py-1
            ${
              isStrict
                ? "badge-danger"
                : "badge-warning"
            }`}
        >
          {isStrict ? "Mode strict" : "Mode permissif"}
        </span>
      </div>


      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Stat label="Lignes analysées" value={summary.totalRows} />
        <Stat label="Catégories créées" value={summary.categoriesCreated} />
        <Stat label="Familles créées" value={summary.familiesCreated} />
        <Stat label="Produits créés" value={summary.productsCreated} />
        <Stat label="Lignes ignorées" value={summary.ignoredRows} />
        <Stat
          label="Erreurs"
          value={summary.errorsCount}
          highlight={summary.errorsCount > 0}
        />
      </div>

      {/* Warning strict */}
      {summary.errorsCount > 0 && (
        isStrict ? (
          <div className="alert">
            En mode strict, la présence d’erreurs bloquera l’import.
          </div>
        ) : (
          <div className="rounded-lg border border-warning/30 bg-warning/5 p-4 text-sm text-warning">
            En mode permissif, l’import est possible mais les lignes en erreur ne seront pas importées.
          </div>
        )
        
      )}
    </section>
  );
}

interface StatProps {
  label: string;
  value: number;
  highlight?: boolean;
}

function Stat({ label, value, highlight }: StatProps) {

  return (
    <div
      className={`${
        highlight
          ? "stat-error"
          : "stat"
      }`}
    >
      <div className={`${
        highlight
          ? "stat-error-result"
          : "stat-result"
      }`}>
        {value}
      </div>
      <div className={`${
        highlight
          ? "stat-error-text"
          : "stat-text"
      }`}>
        {label}
      </div>
    </div>
  );
}
