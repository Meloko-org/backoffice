import type { RightPanelMap } from "../../../layouts/admin/config/rightPanelRegistry";
import ProductDetails from "../components/ProductDetails";

const rightPanel: RightPanelMap = {
  product: {
    component: ProductDetails,
    fullPanel: true,
  },
}

export default rightPanel;