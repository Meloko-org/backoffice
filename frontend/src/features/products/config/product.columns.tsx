import { DataInlineRowActions } from "../../../components/data-table/DataInlineRowActions";
import type { Column } from "../../../components/data-table/DataTable";
import type { Product } from "../types/product";
import type { ProductActionContext } from "./product.actions";
import { productActions } from "./productActionsRegistry";

export function createProductsColumns(
  ctx: ProductActionContext
): Column<Product>[] {

  return [
    {
      key: "family",
      label: "Famille",
      render: (product) => product.family?.name,
    },
    { key: "name", label: "Nom", sortable: true },
    { key: "slug", label: "Slug", sortable: true },
    {
      key: "createdAt",
      label: "Créée le",
      sortable: true,
      render: (product) =>
        new Date(product.createdAt).toLocaleDateString(),
    },
    {
      key: "actions",
      label: "",
      render: (product) => (
        <div className="table-actions">
          <DataInlineRowActions
            actions={productActions.getActions(product, ctx, "inline")}
          />
        </div>
      ),
    },
  ]
}