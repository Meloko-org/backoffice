// src/features/products/components/ImportPreview.tsx
import type { ImportProductPreview } from "../types/productsImport.types";

interface ImportPreviewProps {
  productsCount: number;
  products: ImportProductPreview[];
  ignoredRows: number;
  totalRows: number;
}

const ACTION_STYLES: Record<ImportProductPreview["action"], string> = {
  create: "text-primary",
  update: "text-warning",
  ignore: "text-secondary",
  existing: "text-success"
};

export function ImportPreview({
  productsCount,
  products,
  ignoredRows,
  totalRows,
}: ImportPreviewProps) {
  if (products.length === 0) return null;

  return (
    <section className="bloc">
      <h2 className="text-lg font-semibold">
        Aperçu des produits ({productsCount})
      </h2>

      <div className="mx-auto max-w-xl">
        <div className="import-table">
          <table className="">
            <thead className="">
              <tr>
                <th className="">Catégorie</th>
                <th className="">Famille</th>
                <th className="">Produit</th>
                <th className="">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item, index) => (
                <tr
                  key={index}
                  className=""
                >
                  <td className="">{item.category}</td>
                  <td className="">{item.family}</td>
                  <td className="">{item.product}</td>
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
