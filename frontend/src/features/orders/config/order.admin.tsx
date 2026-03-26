import { createModelAdmin } from "../../../layouts/admin/registries/admin/createModelAdmin";
import { getOrdersList } from "../api/orders.api";
import OrderDetails from "../components/OrderDetails";
import { useOrderActionsContext } from "../hooks/useOrderActionsContext";
import { type Order } from "../types/order";
import type { OrderActionContext } from "./order.actions";
import { createOrdersColumns } from "./order.columns";
import { createOrderFilters } from "./order.filters";
import { orderActions } from "./orderActionRegistry";

export const ordersAdmin = createModelAdmin<
  Order,
  never,
  OrderActionContext,
  never
>({
  model: "orders",
    
    getList: getOrdersList,
    loaders: {},
  
    filters: createOrderFilters,
    columns: createOrdersColumns,
    toolbar: {},
  
    actions: {
      registry: orderActions,
      useContext: useOrderActionsContext
    },
  
    details: OrderDetails,
    entityName: "order",
  
})



