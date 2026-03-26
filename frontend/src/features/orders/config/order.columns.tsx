import { DataInlineRowActions } from "../../../components/data-table/DataInlineRowActions";
import type { Column } from "../../../components/data-table/DataTable";
import { formatPriceToEuros } from "../../../utils/price/priceConverter";
import type { Order } from "../types/order";
import type { OrderActionContext } from "./order.actions";
import { orderActions } from "./orderActionRegistry";

export function createOrdersColumns(
  ctx: OrderActionContext
): Column<Order>[] {

  return [
    { key: "orderNumber", label: "Numéro", sortable: true },
    { 
      key: "customer", 
      label: "Client", 
      sortable: true,
      render: (order) =>  
      `${order.user.firstname} ${order.user.lastname}`
    },
    {
      key: "totalTTC", 
      label: "Montant TTC", 
      sortable: true,
      render: (order) => formatPriceToEuros(order.totalTTC)
    },
    {
      key: "isPaid",
      label: "Payée",
      sortable: true,
      render: (order) => (order.isPaid ? "Oui" : "Non")
    },
    {
      key: "isWithdrawn",
      label: "Status",
      sortable: true,
      render: (order) => order.isWithdrawn ? "retirée" : "non retirée"
    },
    {
      key: "actions",
      label: "",
      render: (order) => (
        <div className="table-actions">
          <DataInlineRowActions
            actions={orderActions.getActions(order, ctx, "inline")}
          />
        </div>
      ),
    },
  ]
}