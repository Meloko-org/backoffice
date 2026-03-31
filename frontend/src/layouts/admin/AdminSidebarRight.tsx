import { ConfirmPanel } from "./components/ConfirmPanel";
import { rightPanelRegistry } from "./registries/rightPanel/rightPanelRegistry";
import { useAdminInfo } from "./contexts/AdminInfoContext";
import { useConfirm } from "./contexts/ConfirmContext";
import { renderRightPanel } from "../../helpers/rightPanelHelper";
import { AnimatePresence, motion } from "motion/react";


export default function AdminSidebarRight() {


	const { infoContext } = useAdminInfo();
	const { options, isConfirmOpen } = useConfirm();

	const panelConfig = infoContext 
		? rightPanelRegistry[infoContext.type]
		: null;
	const level = infoContext?.level ?? 0;
	const direction = infoContext?.direction ?? "forward";

	const initialX = direction === "forward" ? "100%" : "-100%";
	const exitX = direction === "forward" ? "-100%" : "100%";

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
							<div className="text-center uppercase tracking-wide pt-2 font-semibold">
								{infoContext && infoContext.title}
							</div>
							<div>

								<AnimatePresence mode="wait">
									<motion.div
										key={infoContext.type + (("id" in infoContext && infoContext.id) || "")}
    
										initial={
											level > 0
												? { x: direction === "forward" ? 100 : -100, opacity: 0 }
												: false // ❌ pas d'animation si level 0
										}

										animate={{ x: 0, opacity: 1 }}

										exit={
											level > 0
												? { x: direction === "forward" ? -100 : 100, opacity: 0 }
												: undefined
										}

										transition={{ duration: 0.2 }}
									>
										{panelConfig && infoContext &&
											renderRightPanel(
												panelConfig as any,
												infoContext as any
											)
										}
									</motion.div>
								</AnimatePresence>
								
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