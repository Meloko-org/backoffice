import type { ImportSummaryUI } from "../types/import-ui.types";
import type { MarketsImportReport } from "../types/marketsImport.types";

interface ImportSummaryProps {
  report: MarketsImportReport;
}

export function ImportSummary({ report }: ImportSummaryProps) {
  const isStrict = report.meta.mode === "strict";

  const summary: ImportSummaryUI = {
    totalRows: report.meta.totalRows,
    marketsCreated: report.markets.created,
    ignoredRows:
      report.meta.totalRows -
      report.markets.created -
      report.markets.updated,
    errorsCount: report.errors.length,
  };

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          Résumé de l’import
        </h2>

        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium
            ${
              isStrict
                ? "bg-danger/10 text-danger"
                : "bg-warning/10 text-warning"
            }`}
        >
          {isStrict ? "Mode strict" : "Mode permissif"}
        </span>
      </div>


      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Stat label="Lignes analysées" value={summary.totalRows} />
        <Stat label="Points de vente créés" value={summary.marketsCreated} />
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
          <div className="rounded-lg border border-danger/30 bg-danger/5 p-4 text-sm text-danger">
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

  console.log("highlight :", highlight)
  return (
    <div
      className={`rounded-lg border p-4 text-center ${
        highlight
          ? "border-danger/40 bg-danger/5 text-danger"
          : "border-gray-200 bg-gray-50 text-gray-900"
      }`}
    >
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
}
