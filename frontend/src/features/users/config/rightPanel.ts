import type { RightPanelMap } from "../../../layouts/admin/config/rightPanelRegistry";
import UserDetails from "../components/UserDetails";


const rightPanel: RightPanelMap = {
  user: {
    component: UserDetails,
    fullPanel: false,
    actions: ["display","edit","suspend","delete"],
  },
}

export default rightPanel;