import type { RightPanelMap } from "../../../layouts/admin/config/rightPanelRegistry";
import CategoryDetails from "../components/CategoryDetails";

const rightPanel: RightPanelMap = {
  category: {
    component: CategoryDetails,
    fullPanel: true,
  },
}

export default rightPanel;