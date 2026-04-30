import { ConfirmPanel } from "../../../layouts/admin/components/ConfirmPanel";
import type { RightPanelMap } from "../../../layouts/admin/registries/rightPanel/rightPanelRegistry";
import ShopCrewDetails from "../components/ShopCrewDetails";
import ShopDescDetails from "../components/ShopDescDetails";
import ShopDetails from "../components/ShopDetails";
import ShopNoteDetails from "../components/ShopNoteDetails";
import ShopOrderDetails from "../components/ShopOrderDetails";
import ShopPhotoDetails from "../components/ShopPhotoDetails";
import ShopSocialDetails from "../components/ShopSocialDetails";
import ShopVideoDetails from "../components/ShopVideoDetails";
import ShopWithdrawModeDetails from "../components/ShopWithdrawModeDetails";

const rightPanel: RightPanelMap = {
  shop: {
    component: ShopDetails,
    fullPanel: true,
    actions: ["display", "edit"]
  },
  shopWithdrawModes: {
    component: ShopWithdrawModeDetails,
    fullPanel: true,
  },
  shopDescriptions: {
    component: ShopDescDetails,
    fullPanel: true,
  },
  shopSocials: {
    component: ShopSocialDetails,
    fullPanel: true,
  },
  shopCrew: {
    component: ShopCrewDetails,
    fullPanel: true,
  },
  shopPhotos: {
    component: ShopPhotoDetails,
    fullPanel: true,
  },
  shopVideos: {
    component: ShopVideoDetails,
    fullPanel: true,
  },
  shopSubOrder: {
    component: ShopOrderDetails,
    fullPanel: true,
  },
  shopNote: {
    component: ShopNoteDetails,
    fullPanel: true,
  },
  confirm: {
    component: ConfirmPanel,
    fullPanel: true,
  }
}

export default rightPanel;