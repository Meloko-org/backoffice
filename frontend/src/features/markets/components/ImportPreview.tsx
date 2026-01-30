// src/features/products/components/ImportPreview.tsx
import type { ImportMarketPreview } from "../types/marketsImport.types";

interface ImportPreviewProps {
  marketsCount: number;
  markets: ImportMarketPreview[];
}

const ACTION_STYLES: Record<ImportMarketPreview["action"], string> = {
  create: "text-green-600",
  update: "text-blue-600",
  ignore: "text-gray-400",
};

export function ImportPreview({
  marketsCount,
  markets,
}: ImportPreviewProps) {
  if (markets.length === 0) return null;

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">
        Aperçu des produits ({marketsCount})
      </h3>

      <div className="overflow-x-auto border rounded">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-black">
            <tr>
              <th className="px-3 py-2 text-left">Point de vente</th>
              <th className="px-3 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {markets.map((item, index) => (
              <tr
                key={index}
                className="border-t last:border-b"
              >
                <td className="px-3 py-2 text-black">{item.market}</td>
                <td
                  className={`px-3 py-2 font-medium ${ACTION_STYLES[item.action]}`}
                >
                  {item.action}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
