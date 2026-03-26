import { ConfirmPanel } from "./components/ConfirmPanel";
import { rightPanelRegistry } from "./registries/rightPanel/rightPanelRegistry";
import { useAdminInfo } from "./contexts/AdminInfoContext";
import { useConfirm } from "./contexts/ConfirmContext";
import { renderRightPanel } from "../../helpers/rightPanelHelper";


export default function AdminSidebarRight() {


	const { infoContext } = useAdminInfo();
	const { options, isConfirmOpen } = useConfirm();

	const panelConfig = infoContext 
		? rightPanelRegistry[infoContext.type]
		: null;

	if (!panelConfig || !infoContext) return null;


	const PanelComponent = panelConfig?.component ?? null;
	const isFullPanel = panelConfig?.fullPanel;

	const isConfirmOnly = !panelConfig && options;
		
  return (
    <aside
      className={`
        fixed inset-y-0 right-0 w-120 
				${isConfirmOpen ? "z-50" : "z-10"}
				${isConfirmOnly ? "flex items-center" : ""}
      `}
      style={{ background: "var(--app-sidebar-bg)" }}
      >

				{/* Si un content est défini, on l'affiche */}
				{PanelComponent && infoContext && (
					<div className={`${!isFullPanel ? "h-[78%] overflow-y-auto" : "h-full"} `}>
						<div className={isConfirmOpen ? "pointer-events-none opacity-50" : "" }>
							<div className="text-center uppercase tracking-wide pt-2">
								{infoContext && infoContext.title}
							</div>
							<div>
								{panelConfig && infoContext &&
									renderRightPanel(
										panelConfig as any,
										infoContext as any
									)
								}
							</div>
						</div>
					</div>
				)}
			

			<div className={`${PanelComponent ? "h-[22%]" : "h-auto w-full"}`}>
				{/* si les options du confirmPanel sont définies, on affiche confirmPanel */}
				<div className="p-2">
					{options && (
						<ConfirmPanel />
					)}
				</div>
			</div>

    </aside>
  );
}