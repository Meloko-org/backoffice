import type { ImportMode, ImportIssue } from "../types/marketsImport.types";

interface ImportErrorsProps {
  mode: ImportMode;
  errors: ImportIssue[];
}

export function ImportErrors({ mode, errors }: ImportErrorsProps) {
  if (errors.length === 0) return null;

  const isStrict = mode === "strict";

  return (
    <section className="bloc">
      <header className="flex items-center justify-between">
        <h2>
          Problèmes détectés
        </h2>

        <span className="bloc-sub-text text-sm">
          {errors.length} problème{errors.length > 1 ? "s" : ""}
        </span>
      </header>

      <ul className="space-y-3">
        {errors.map((issue, index) => (
          <IssueRow
            key={index}
            issue={issue}
            isBlocking={isStrict}
          />
        ))}
      </ul>

      {/* {isStrict && (
        <div className="rounded-lg border border-danger/30 bg-danger/5 p-4 text-sm text-danger">
          En mode strict, toute erreur bloque l’import.
        </div>
      )} */}
    </section>
  );
}

interface IssueRowProps {
  issue: ImportIssue;
  isBlocking: boolean;
}

function IssueRow({ issue, isBlocking }: IssueRowProps) {
  // const isError = issue.message === "error";


  return (
    <li
      className={`error-elt flex items-start gap-4`}
    >
      {/* Badge */}
      <span
        className={`mt-0.5 inline-flex error-badge`}
      >
        "Erreur"
        {/* {isBlocking ? "Erreur" : "Warning"} */}
      </span>

      {/* Content */}
      <div className="flex-1 space-y-1">
        <p className="error-title">
          Ligne {issue.line}
        </p>
        <p className="error-label">{issue.message}</p>
        <div className="">
          {issue.details?.map((detail, index) => (
            <p key={index} className="error-detail">{detail}</p>
          ))}
        </div>
      </div>

      {/* Blocking */}
      {isBlocking && (
        <span className="text-xs font-semibold text-danger">
          Bloquant
        </span>
      )}
    </li>
  );
}
