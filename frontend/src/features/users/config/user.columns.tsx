import { DataRowMenu } from "../../../components/data-table/DataRowMenu";
import type { Column } from "../../../types/DataTable.types";
import { formatPriceToEuros } from "../../../utils/price/priceConverter";
import type { User } from "../types/user";
import { renderUserStatus } from "../utils/renderUserStatus";
import type { UserActionContext } from "./user.actions";
import { userActions } from "./userActionsRegistry";

export function createUserColumns(
  ctx: UserActionContext
): Column<User>[]  {

  return [
  { key: "email", label: "Email", sortable: true },
  { key: "firstname", label: "Nom", sortable: true },
  { 
    key: "role", 
    label: "Rôles", 
    sortable: true,
    render: (user) => 
        <p  className="detail-info slug font-mono text-xs px-2 py-1 rounded inline-block mr-1">
          {user.role.name}
        </p>
    },
  { key: "totalOrders", label: "Commandes", sortable: true },
  {
    key: "totalSpent", 
    label: "Montant", 
    sortable: true,
    render: (user) => formatPriceToEuros(user.totalSpent)
  },
  {
    key: "createdAt",
    label: "Créée le",
    sortable: true,
    render: (user) =>
      new Date(user.createdAt).toLocaleDateString(),
  },
  {
    key: "status",
    label: "Status",
    sortable: true,
    render: (user) => renderUserStatus(user)
  },
  {
    key: "actions",
    label: "",
    render: (user) => (
      <div className="table-actions">
        <DataRowMenu
          actions={userActions.getActions(user, ctx,"rowMenu")}
        />
      </div>
    ),
  },
]
}