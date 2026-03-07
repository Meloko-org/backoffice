import type { RightPanelMap } from "../../../layouts/admin/config/rightPanelRegistry";
import OrderDetails from "../components/OrderDetails";
import OrderProductDetails from "../components/OrderProductDetails";

const rightPanel: RightPanelMap = {
  orderProduct: {
    component: OrderProductDetails,
    fullPanel: true,
  },
  order: {
    component: OrderDetails,
    fullPanel: true,
  }
}

export default rightPanel;