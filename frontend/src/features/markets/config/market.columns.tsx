import { DataInlineRowActions } from "../../../components/data-table/DataInlineRowActions";
import type { Column } from "../../../components/data-table/DataTable";
import type { Market } from "../types/markets";
import type { MarketActionContext } from "./market.actions";
import { marketActions } from "./marketActionsRegistry";

export function createMarketsColumns(
  ctx: MarketActionContext
): Column<Market>[] {

  return [
    { key: "name", label: "Nom", sortable: true },
    { 
      key: "city", 
      label: "Ville", 
      sortable: true,
      render: (market) => market.address.city,
    },
    {
      key: "createdAt",
      label: "Créée le",
      sortable: true,
      render: (market) =>
        new Date(market.createdAt).toLocaleDateString(),
    },
    {
      key: "actions",
      label: "",
      render: (market) => (
        <div className="table-actions">
          <DataInlineRowActions
            actions={marketActions.getActions(market, ctx, "inline")}
          />
        </div>
      ),
    },
  ]
}