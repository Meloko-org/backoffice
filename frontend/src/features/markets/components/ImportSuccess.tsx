import type { MarketsImportReport } from "../types/marketsImport.types";
import { ImportErrors } from "./ImportErrors";

interface ImportSuccessProps {
  report: MarketsImportReport;
  onReset: () => void;
  onGoToMarkets?: () => void;
}




export function ImportSuccess({
  report,
  onReset,
  onGoToMarkets,
}: ImportSuccessProps) {
  const { meta, markets, warnings, errors } = report;

  console.log("le report :", report)

  const importFailed = markets.created === 0 && markets.updated === 0;
  const hasErrors = errors.length > 0;

  console.log("importFailed :", importFailed)

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
                <h2 className="text-lg font-semibold text-red-900">
                  Import terminé avec échec
                </h2>
                <p className="text-sm text-red-800">
                  Mode <strong>{meta.mode}</strong> — {meta.totalRows} lignes analysées
                </p>
              </div>
            </div>
          ) : (
            <div className="flex grow items-center gap-3">
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
          <div className="w-80 text-center pr-25">
            <SummaryCard
              label="Points de vente"
              created={markets.created}
              updated={markets.updated}
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
        <div className="bloc">
          <p className="text-md text-yellow-800">
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

        {onGoToMarkets && (
          <button
            onClick={onGoToMarkets}
            className="btn-primary"
          >
            Voir les points de vente
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
      <h3 className="">{label}</h3>
      <p className="">
        Créés : <strong>{created}</strong>
      </p>
      <p className="">
        Mis à jour : <strong>{updated}</strong>
      </p>
    </div>
  );
}
