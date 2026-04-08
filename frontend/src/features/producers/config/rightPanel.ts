import type { RightPanelMap } from "../../../layouts/admin/registries/rightPanel/rightPanelRegistry";
import ProducerDetails from "../components/ProducerDetails";

const rightPanel: RightPanelMap = {
  producer: {
    component: ProducerDetails,
    fullPanel: true,
    actions: ["edit", "userDisplay", "shopDisplay"]
  }
}


export default rightPanel;