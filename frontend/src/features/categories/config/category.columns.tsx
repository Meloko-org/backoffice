import type { Column } from "../../../components/data-table/DataTable";
import type { ProductCategory } from "../types/category";
import type { CategoryActionContext } from "./category.actions";
import { DataInlineRowActions } from "../../../components/data-table/DataInlineRowActions";
import { categoryActions } from "./categoryActionsRegistry";

export function createCategoriesColumns(
  ctx: CategoryActionContext
): Column<ProductCategory>[] {

  return [
    { key: "name", label: "Nom", sortable: true },
    { key: "slug", label: "Slug", sortable: true },
    {
      key: "type",
      label: "Type",
      render: (cat) => cat.type?.name,
    },
    {
      key: "createdAt",
      label: "Créée le",
      sortable: true,
      render: (cat) =>
        new Date(cat.createdAt).toLocaleDateString(),
    },
    {
      key: "actions",
      label: "",
      render: (cat) => (
        <div className="table-actions">
          <DataInlineRowActions
            actions={categoryActions.getActions(cat, ctx,"inline")}
          />
        </div>
      ),
    },
  ]
}