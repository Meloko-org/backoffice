import { ConfirmPanel } from "../../../layouts/admin/components/ConfirmPanel";
import type { RightPanelMap } from "../../../layouts/admin/registries/rightPanel/rightPanelRegistry";
import UserDetails from "../components/UserDetails";


const rightPanel: RightPanelMap = {
  user: {
    component: UserDetails,
    fullPanel: false,
    actions: ["display","edit","suspend","delete"],
  },
  confirm: {
    component: ConfirmPanel,
    fullPanel: true
  }
}

export default rightPanel;