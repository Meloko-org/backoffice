// src/features/products/components/ImportPreview.tsx
import type { ImportProductPreview } from "../types/productsImport.types";

interface ImportPreviewProps {
  productsCount: number;
  products: ImportProductPreview[];
}

const ACTION_STYLES: Record<ImportProductPreview["action"], string> = {
  create: "text-green-600",
  update: "text-blue-600",
  ignore: "text-gray-400",
};

export function ImportPreview({
  productsCount,
  products,
}: ImportPreviewProps) {
  if (products.length === 0) return null;

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">
        Aperçu des produits ({productsCount})
      </h3>

      <div className="overflow-x-auto border rounded">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-black">
            <tr>
              <th className="px-3 py-2 text-left">Catégorie</th>
              <th className="px-3 py-2 text-left">Famille</th>
              <th className="px-3 py-2 text-left">Produit</th>
              <th className="px-3 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => (
              <tr
                key={index}
                className="border-t last:border-b"
              >
                <td className="px-3 py-2 text-black">{item.category}</td>
                <td className="px-3 py-2 text-black">{item.family}</td>
                <td className="px-3 py-2 text-black">{item.product}</td>
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
