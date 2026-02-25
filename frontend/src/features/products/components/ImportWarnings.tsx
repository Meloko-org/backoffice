import type { ImportWarning } from "../types/productsImport.types";

import { useState } from "react";

type Props = {
  warnings: ImportWarning[];
};

export function ImportWarnings({ warnings }: Props) {
  const [open, setOpen] = useState(false);

  if (warnings.length === 0) return null;

  return (
    <div className="bloc space-y-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
      >
        <h2 className="text-sm font-semibold text-warning">
          Avertissements ({warnings.length})
        </h2>

        <span className="text-warning">
          {open ? "▲" : "▼"}
        </span>
      </button>

      {open && (
        <ul className="space-y-3">
          {warnings.map((warning, index) => (
            <WarningRow key={index} warning={warning} />
          ))}
        </ul>
      )}
    </div>
  );
}


interface WarningRowProps {
  warning: ImportWarning;
}

function WarningRow({warning}: WarningRowProps) {
  return (
    <li
      className={`flex items-start warning-elt`}
    >
      {/* Badge */}
      <span
        className={`mt-0.5 inline-flex warning-badge`}
      >
        "Warning"
      </span>

      {/* Content */}
      <div className="flex-1 space-y-1">
        <p className="warning-title">
          Ligne {warning.line}
        </p>
        <div className="text-sm text-gray-700">
          <ul className="mt-1 list-disc list-inside warning-label">
            {warning.warnings.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        </div>
      </div>

      
    </li>
  )
}


