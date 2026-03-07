import type { RightPanelMap } from "../../../layouts/admin/config/rightPanelRegistry";
import FamilyDetails from "../components/FamilyDetails";

const rightPanel: RightPanelMap = {
  family: {
    component: FamilyDetails,
    fullPanel: true,
  },
}

export default rightPanel;