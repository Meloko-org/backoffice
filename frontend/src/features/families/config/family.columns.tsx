import { DataInlineRowActions } from "../../../components/data-table/DataInlineRowActions";
import type { Column } from "../../../components/data-table/DataTable";
import type { ProductFamily } from "../types/family";
import type { FamilyActionContext } from "./family.actions";
import { familyActions } from "./familyActionsRegistry";

export function createFamiliesColumns(
  ctx: FamilyActionContext
): Column<ProductFamily>[] {

  return [
    { key: "name", label: "Nom", sortable: true },
    { key: "slug", label: "Slug", sortable: true },
    {
      key: "category",
      label: "Catégorie",
      render: (fam) => fam.category?.name,
    },
    {
      key: "createdAt",
      label: "Créée le",
      sortable: true,
      render: (fam) =>
        new Date(fam.createdAt).toLocaleDateString(),
    },
    {
      key: "actions",
      label: "",
      render: (fam) => (
        <div className="table-actions">
          <DataInlineRowActions
            actions={familyActions.getActions(fam, ctx, "inline")}
          />
        </div>
      ),
    },
  ]
}