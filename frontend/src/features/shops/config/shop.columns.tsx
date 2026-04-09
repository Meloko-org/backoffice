import { Crown } from "lucide-react";
import { DataInlineRowActions } from "../../../components/data-table/DataInlineRowActions";
import type { Column } from "../../../components/data-table/DataTable";
import type { Shop } from "../types/shop";
import type { ShopActionContext } from "./shop.actions";
import { shopActions } from "./shopActionsregistry";
import { renderOpenState, renderValidateState } from "../utils/renderStates";

export function createShopColumns(
  ctx: ShopActionContext
): Column<Shop>[] {

  return [
    { key: "name", label: "Nom", sortable: true },
    {
      key: "isValidated",
      label: "Validé",
      render: (shop) => renderValidateState(shop.isValidated)
    },
    { 
      key: "isOpen", 
      label: "Ouvert", 
      sortable: true, 
      render: (shop) => renderOpenState(shop.isOpen)
    },
    { 
      key: "isPremium", 
      label: "Premium", 
      render: (shop) => (
        <Crown className={`${shop.isPremium ? "text-warning" : "text-black"}`} />
      )
    },
    { 
      key: "createdAt", 
      label: "Crée le", 
      sortable: true, 
      render: (shop) => (
        new Date(shop.createdAt).toLocaleDateString()
      ) 
    },
    { 
      key: "types", 
      label: "Types", 
      render: (shop) => (
        shop.types.map(t => t.label).join(", ")
      )
    },
    {
      key: "actions",
      label: "",
      render: (shop) => (
        <div className="table-actions">
          <DataInlineRowActions
            actions={shopActions.getActions(shop, ctx, "inline")}
          />
        </div>
      )
    }
  ]
}