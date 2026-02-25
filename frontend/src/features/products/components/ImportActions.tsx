import type { ProductsImportStatus } from "../types/productsImport.types";

interface ImportActionsProps {
  mode: "strict" | "permissive";
  hasBlockingErrors: boolean;
  status: ProductsImportStatus;
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
    <section className="flex items-center justify-between bloc">
      {/* Infos */}
      <div className="space-y-1 mr-3">
        <p className="bloc-sub-text">
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
          className="btn-cancel"
        >
          Annuler
        </button>

        <button
          disabled={isDisabled}
          onClick={onConfirm}
          className="btn-primary"
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
