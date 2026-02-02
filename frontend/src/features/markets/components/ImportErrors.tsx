import type { ImportMode, ImportIssue } from "../types/marketsImport.types";

interface ImportErrorsProps {
  mode: ImportMode;
  errors: ImportIssue[];
}

export function ImportErrors({ mode, errors }: ImportErrorsProps) {
  if (errors.length === 0) return null;

  const isStrict = mode === "strict";

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
      <header className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          Problèmes détectés
        </h2>

        <span className="text-sm text-gray-600">
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

  console.log("issue :", issue)

  return (
    <li
      className={`flex items-start gap-4 rounded-lg border p-4 border-danger/40 bg-danger/5`}
    >
      {/* Badge */}
      <span
        className={`mt-0.5 inline-flex rounded-full px-2 py-0.5 text-xs font-semibold bg-danger/20 text-danger`}
      >
        "Erreur"
        {/* {isBlocking ? "Erreur" : "Warning"} */}
      </span>

      {/* Content */}
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium text-gray-900">
          Ligne {issue.line}
        </p>
        <p className="text-sm text-gray-700">{issue.message}</p>
        <div className="text-sm text-gray-700">
          {issue.details?.map((detail, index) => (
            <p key={index} className="text-sm text-gray-700">{detail}</p>
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
