import type { ImportWarning } from "../types/productsImport.types";

import { useState } from "react";

type Props = {
  warnings: ImportWarning[];
};

export function ImportWarnings({ warnings }: Props) {
  const [open, setOpen] = useState(false);

  if (warnings.length === 0) return null;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
      >
        <h2 className="text-sm font-semibold text-yellow-800">
          Avertissements ({warnings.length})
        </h2>

        <span className="text-yellow-700">
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
      className={`flex items-start gap-4 rounded-lg border p-4 border-warning/40 bg-warning/5`}
    >
      {/* Badge */}
      <span
        className={`mt-0.5 inline-flex rounded-full px-2 py-0.5 text-xs font-semibold bg-warning/20 text-warning`}
      >
        "Warning"
      </span>

      {/* Content */}
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium text-gray-900">
          Ligne {warning.line}
        </p>
        <div className="text-sm text-gray-700">
          <ul className="mt-1 list-disc list-inside text-gray-600">
            {warning.warnings.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        </div>
      </div>

      
    </li>
  )
}



// export function ImportWarnings({ warnings }: Props) {
//   if (warnings.length === 0) return null;

//   return (
//     <div className="rounded-lg border border-yellow-300 bg-yellow-50 p-4">
//       <h2 className="text-lg font-semibold text-yellow-800 mb-3">
//         Avertissements ({warnings.length})
//       </h2>

//       <ul className="space-y-2 text-sm">
//         {warnings.map((warning, index) => (
//           <li
//             key={`${warning.line}-${index}`}
//             className="rounded border border-yellow-200 bg-white p-3"
//           >
//             <div className="font-medium text-yellow-800">
//               Ligne {warning.line}
//             </div>

//             {warning.warnings && warning.warnings.length > 0 && (
//               <ul className="mt-1 list-disc list-inside text-gray-600">
//                 {warning.warnings.map((w, i) => (
//                   <li key={i}>{w}</li>
//                 ))}
//               </ul>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
