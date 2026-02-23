// src/features/products/components/ImportPreview.tsx
import type { ImportMarketPreview } from "../types/marketsImport.types";

interface ImportPreviewProps {
  marketsCount: number;
  markets: ImportMarketPreview[];
  ignoredRows: number;
  totalRows: number;
}

const ACTION_STYLES: Record<ImportMarketPreview["action"], string> = {
  create: "text-primary",
  update: "text-warning",
  ignore: "text-secondary",
  existing: "text-success",
};

export function ImportPreview({
  marketsCount,
  markets,
  ignoredRows,
  totalRows,
}: ImportPreviewProps) {
  if (markets.length === 0) return null;

  return (
    <section className="bloc">
      <h2>
        Aperçu des points de vente ({marketsCount})
      </h2>

      <div className="mx-auto max-w-xl">
        <div className="import-table">
          <table className="">
            <thead className="">
              <tr>
                <th className="">Point de vente</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {markets.map((item, index) => (
                <tr
                  key={index}
                  className=""
                >
                  <td className="">{item.market}</td>
                  <td
                    className={`import-table-actions ${ACTION_STYLES[item.action]}`}
                  >
                    {item.action}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="preview-msg">
        {`${ignoredRows} ligne(s) ignorée(s) sur ${totalRows}`}
      </div>
    </section>
  );
}
