import { ConfirmPanel } from "./components/ConfirmPanel";
import { rightPanelRegistry } from "./config/rightPanelRegistry";
import { useInfoLayout } from "./contexts/AdminInfoContext";
import { useConfirm } from "./contexts/ConfirmContext";


export default function AdminSidebarRight() {

	const { infoContext } = useInfoLayout();
	const { options, isConfirmOpen } = useConfirm();

	if (!infoContext) return null;

	const panelConfig = rightPanelRegistry[infoContext.type]

	if (!panelConfig) return null;

	const PanelComponent = panelConfig.component;
	const isFullPanel = panelConfig.fullPanel;
		
  return (
    <aside
      className={`
        fixed inset-y-0 right-0 w-120 
				${isConfirmOpen ? "z-50" : "z-10"}
				${!panelConfig.component ? "flex items-center" : ""}
      `}
      style={{ background: "var(--app-sidebar-bg)" }}
      >

				{/* Si un content est défini, on l'affiche */}
				{panelConfig.component && (
					<div className={`${!isFullPanel ? "h-[80%] overflow-y-auto" : ""} `}>
						<div className={isConfirmOpen ? "pointer-events-none opacity-50" : "" }>
							<div className="text-center uppercase tracking-wide mt-3">
								{infoContext && infoContext.title}
							</div>
							<div>
								<PanelComponent {...infoContext} />
							</div>
						</div>
					</div>
				)}
			

			<div className={`${PanelComponent ? "h-[20%]" : "h-auto w-full"}`}>
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