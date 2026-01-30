import type { MarketsImportStatus } from "../types/marketsImport.types";

interface ImportActionsProps {
  mode: "strict" | "permissive";
  hasBlockingErrors: boolean;
  status: MarketsImportStatus;
  onConfirm: () => void;
  onReset: () => void;
}

export function ImportActions({
  mode,
  status,
  hasBlockingErrors,
  onConfirm,
  onReset,
}: ImportActionsProps) {
  const isStrict = mode === "strict";
  const isImporting = status === "importing";
  const isBlocked = isStrict && hasBlockingErrors;

  const isDisabled = isBlocked || isImporting;

  const buttonLabel = isImporting
    ? "Import en cours…"
    : "Lancer l’import";

  return (
    <section className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      {/* Infos */}
      <div className="space-y-1 mr-3">
        <p className="text-sm text-gray-700">
          {isStrict ? (
            <>
              Mode <strong>strict</strong> : aucune erreur autorisée
            </>
          ) : (
            <>
              Mode <strong>permissif</strong> : seules les lignes valides seront importées
            </>
          )}
        </p>

        {isBlocked && (
          <p className="text-sm text-danger">
            Corrige les erreurs pour pouvoir lancer l’import
          </p>
        )}

        {isImporting && (
          <p className="text-sm text-primary">
            Import des produits en cours…
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={onReset}
          disabled={isImporting}
          className="rounded-lg border px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50"
        >
          Annuler
        </button>

        <button
          disabled={isDisabled}
          onClick={onConfirm}
          className={`
            relative rounded-lg px-5 py-2 text-sm font-semibold transition
            ${
              isDisabled
                ? "cursor-not-allowed bg-gray-200 text-gray-400"
                : "bg-primary text-white hover:bg-primary/90"
            }
          `}
        >
          {isImporting && (
            <span className="absolute inset-y-0 left-3 flex items-center">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            </span>
          )}
          <span className={isImporting ? "pl-6" : ""}>
            {buttonLabel}
          </span>
        </button>
      </div>
    </section>
  );
}
